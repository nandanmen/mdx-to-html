import * as React from "react";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import { build } from "esbuild";
import { getMDXComponent } from "mdx-bundler/client";
import { renderToString } from "react-dom/server";

import type { File } from "../file";
import { createDirectory } from "../directory";

export async function compileMarkdown(file: File) {
  const { name, workingDir } = file.path;

  const result = await bundleMDX(file.contents, {
    cwd: join(process.cwd(), workingDir),
  });

  const script = await createClientBundle(name, result);
  const html = createHTMLPage(name, result);

  return { script, html };
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
