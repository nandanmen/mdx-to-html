import { exec } from "./exec";

const mdxFile = process.argv[2];
const outputPath = "./dist";

exec(mdxFile, outputPath);
