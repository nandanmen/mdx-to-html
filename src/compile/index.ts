import type { File } from "../file";
import { compileMarkdown } from "./markdown";

export async function compile(file: File) {
  switch (file.path.extension) {
    case "md":
    case "mdx":
      return compileMarkdown(file);
    default:
      throw new Error(`Unsupported file format: ${file.path.extension}`);
  }
}
