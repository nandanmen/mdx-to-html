import * as fs from "fs";
import { join } from "path";

type Writeable = string | Uint8Array;

type Directory = {
  write(files: Record<string, Writeable>): Promise<void>;
  cleanup(): Promise<void>;
};

type DirectoryDriver = {
  exists(path: string): boolean;
  mkdir(path: string): Promise<void>;
  writeFile(path: string, content: Writeable): Promise<void>;
  rm(path: string, options: fs.RmOptions): Promise<void>;
};

const DEFAULT_DRIVER: DirectoryDriver = {
  exists: fs.existsSync,
  mkdir: fs.promises.mkdir,
  writeFile: fs.promises.writeFile,
  rm: fs.promises.rm,
};

/**
 * Directory helper with methods that:
 *  - Checks if a directory exists,
 *  - Writes multiple files into the directory
 *  - Recursively removes the directory
 */
export async function createDirectory(
  path: string,
  driver: DirectoryDriver = DEFAULT_DRIVER
): Promise<Directory> {
  if (!driver.exists(path)) {
    await driver.mkdir(path);
  }
  return {
    async write(files) {
      const promises = [];
      for (const [filePath, content] of Object.entries(files)) {
        promises.push(driver.writeFile(join(path, filePath), content));
      }
      await Promise.all(promises);
    },
    cleanup() {
      return driver.rm(path, { recursive: true });
    },
  };
}
