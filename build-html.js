import React from "react";
import * as fs from "fs/promises";
import { renderToString } from "react-dom/server.js";
import { getMDXComponent } from "mdx-bundler/client/index.js";

export async function buildHTMLPage(name) {
  const result = JSON.parse(await fs.readFile(`./tmp-${name}/mdx-result`));

  const Component = getMDXComponent(result.code);

  await fs.writeFile(
    `./out/${name}.html`,
    `<!DOCTYPE html>
<html>
<body>
  <main id="app">
    ${renderToString(React.createElement(Component))}
  </main>
  <script src="./${name}.js"></script>
</body>
</html>`
  );
}
