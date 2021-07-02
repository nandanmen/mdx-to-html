import * as React from "react";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import { build } from "esbuild";
import { getMDXComponent } from "mdx-bundler/client";
import { renderToString } from "react-dom/server";

import type { File } from "./index";
import type { FilePath } from "./path";
import { createDirectory } from "../directory";

export function parseMarkdownFile(path: FilePath): File {
  return {
    name: path.name,
    async compile(source: string) {
      const result = await bundleMDX(source, {
        cwd: join(process.cwd(), path.workingDir),
      });

      const script = await createClientBundle(path.name, result);
      const html = createHTMLPage(path.name, result);

      return { script, html };
    },
  };
}

// --

type BundleResult = {
  code: string;
  frontmatter: {
    [key: string]: any;
  };
};

async function createClientBundle(name: string, bundle: BundleResult) {
  const tempFolder = await createDirectory(`tmp-${name}`);

  const clientCode = `
import React from "react";
import ReactDOM from "react-dom";
import { getMDXComponent } from "mdx-bundler/client";

const { code } = ${JSON.stringify(bundle)};

const Component = getMDXComponent(code);

ReactDOM.hydrate(<Component />, document.getElementById("app"));
`;

  await tempFolder.write({ "client.jsx": clientCode });

  const result = await build({
    entryPoints: [`tmp-${name}/client.jsx`],
    bundle: true,
    write: false,
  });

  await tempFolder.cleanup();

  return result.outputFiles[0].contents;
}

function createHTMLPage(name: string, bundle: BundleResult) {
  const Component = getMDXComponent(bundle.code);
  return `<!DOCTYPE html>
<html>
<body>
  <main id="app">
    ${renderToString(React.createElement(Component))}
  </main>
  <script src="${name}.js"></script>
</body>
</html>`;
}
