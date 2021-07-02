import * as fs from "fs/promises";

import { parsePath } from "./path";
import type { FilePath } from "./path";

export type File = {
  path: FilePath;
  contents: string;
};

export type FileDriver = {
  readFile: (path: string) => Promise<string>;
};

const DEFAULT_DRIVER: FileDriver = {
  readFile: (path) => fs.readFile(path).then((contents) => contents.toString()),
};

export async function parseFile(
  path: string,
  driver: FileDriver = DEFAULT_DRIVER
): Promise<File> {
  const filePath = parsePath(path);
  return {
    path: filePath,
    contents: await driver.readFile(path),
  };
}
