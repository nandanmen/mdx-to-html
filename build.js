import * as fs from "fs";
import { bundleMDX } from "mdx-bundler";

import { buildHTMLPage } from "./build-html.js";
import { buildClientBundle } from "./build-client.js";

const mdxFile = process.argv[2];

const name = mdxFile.split(".mdx")[0];

if (!fs.existsSync("out")) {
  await fs.promises.mkdir("out");
}

if (!fs.existsSync(`tmp-${name}`)) {
  await fs.promises.mkdir(`tmp-${name}`);
}

const mdxSource = await fs.promises.readFile(mdxFile);

const result = await bundleMDX(mdxSource, {
  cwd: process.cwd(),
});

await fs.promises.writeFile(`tmp-${name}/mdx-result`, JSON.stringify(result));

await Promise.all([buildHTMLPage(name), buildClientBundle(name)]);

await fs.promises.rm(`tmp-${name}`, { recursive: true });
