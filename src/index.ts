import { compile } from "./compile";

const mdxFile = process.argv[2];
const outputPath = "./dist";

compile(mdxFile, outputPath);
