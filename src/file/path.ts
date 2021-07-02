export type FilePath = {
  workingDir: string;
  name: string;
  extension: string;
  fullPath: string;
};

export function parsePath(path: string): FilePath {
  const pathRegex = new RegExp(/\/?\w+\./g);
  const [workingDir, extension] = path.split(pathRegex);

  let name = pathRegex.exec(path)[0];
  name = name.startsWith("/")
    ? name.slice(1, name.length - 1)
    : name.slice(0, name.length - 1);

  return { workingDir, name, extension, fullPath: path };
}
