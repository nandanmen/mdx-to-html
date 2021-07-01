import esbuild from "esbuild";
import * as fs from "fs/promises";

export async function buildClientBundle(name) {
  const tempFolder = `tmp-${name}`;
  const mdxResult = (
    await fs.readFile(`./${tempFolder}/mdx-result`)
  ).toString();

  const clientCode = `
import React from "react";
import ReactDOM from "react-dom";
import { getMDXComponent } from "mdx-bundler/client";

const { code } = ${mdxResult};

const Component = getMDXComponent(code);

ReactDOM.hydrate(<Component />, document.getElementById("app"));
`;

  await fs.writeFile(`./${tempFolder}/client.jsx`, clientCode);

  return esbuild.build({
    entryPoints: [`${tempFolder}/client.jsx`],
    bundle: true,
    outfile: `out/${name}.js`,
    minify: true,
  });
}
