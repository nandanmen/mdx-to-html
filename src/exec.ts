import { createDirectory } from "./directory";
import { parseFile } from "./file";
import { compile } from "./compile";

export async function exec(path: string, outputPath: string) {
  const file = await parseFile(path);
  const { html, script } = await compile(file);

  const outDir = await createDirectory(outputPath);
  outDir.write({
    [`${file.path.name}.html`]: html,
    [`${file.path.name}.js`]: script,
  });
  return true;
}
