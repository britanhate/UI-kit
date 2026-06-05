import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getSourceCode(relativePath: string) {
  const normalizedPath = path.normalize(relativePath);

  if (normalizedPath.startsWith("..") || path.isAbsolute(normalizedPath)) {
    throw new Error(`Source path must be relative to the project root: ${relativePath}`);
  }

  const filePath = path.join(/* turbopackIgnore: true */ process.cwd(), normalizedPath);

  return readFile(filePath, "utf8");
}
