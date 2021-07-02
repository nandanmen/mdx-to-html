import { parsePath } from "./path";
import { parseMarkdownFile } from "./markdown";

export type File = {
  name: string;
  compile(source: string): Promise<{ html: string; script: Uint8Array }>;
};

export function parseFile(path: string): File {
  const filePath = parsePath(path);
  switch (filePath.extension) {
    case "md":
    case "mdx":
      return parseMarkdownFile(filePath);
    default:
      throw new Error(`Unknown file extension: ${filePath.extension}`);
  }
}
