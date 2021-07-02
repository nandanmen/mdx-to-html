import * as fs from "fs/promises";

import { createDirectory } from "./directory";
import { parseFile } from "./file";

export async function compile(path: string, outputPath: string) {
  const source = await fs.readFile(path);

  const file = parseFile(path);
  const { html, script } = await file.compile(source.toString());

  const outDir = await createDirectory(outputPath);
  outDir.write({
    [`${file.name}.html`]: html,
    [`${file.name}.js`]: script,
  });
  return true;
}
