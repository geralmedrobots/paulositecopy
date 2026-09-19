import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const banned = ["wi" + "x", "para" + "storage", "wi" + "xpress"];
async function walk(dir) {
  const result = [];
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    if (
      [
        "node_modules",
        ".git",
        ".prerender",
        "test-results",
        "artifacts",
        "docs",
      ].includes(item.name)
    )
      continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...(await walk(full)));
    else result.push(full);
  }
  return result;
}
const files = await walk(".");
const findings = [];
for (const file of files) {
  if (!/\.(js|jsx|mjs|css|json|html|xml|txt|svg)$/.test(file)) continue;
  // SRI checksums are opaque base64; dependency names are checked below.
  if (file === "package-lock.json") continue;
  const text = (await fs.readFile(file, "utf8")).toLowerCase();
  if (banned.some((word) => text.includes(word))) findings.push(file);
}
const packages = JSON.parse(await fs.readFile("package-lock.json", "utf8"));
const dependencies = Object.keys(packages.packages).filter((name) =>
  banned.some((word) => name.toLowerCase().includes(word)),
);
const assets = await fs.readdir("dist/assets");
const sizes = await Promise.all(
  assets.map(async (name) => ({
    name,
    bytes: (await fs.stat("dist/assets/" + name)).size,
  })),
);
const js = sizes.filter((a) => a.name.endsWith(".js"));
const css = sizes.filter((a) => a.name.endsWith(".css"));
const compressed = await Promise.all(
  [...js, ...css].map(async (a) => ({
    name: a.name,
    bytes: a.bytes,
    gzip: gzipSync(await fs.readFile("dist/assets/" + a.name)).length,
  })),
);
const result = {
  date: new Date().toISOString(),
  scannedFiles: files.length,
  references: findings,
  dependencies,
  assets: sizes,
  compressed,
};
await fs.mkdir("artifacts", { recursive: true });
await fs.writeFile("artifacts/audit.json", JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    {
      scannedFiles: files.length,
      prohibitedReferences: findings,
      prohibitedDependencies: dependencies,
      compressed,
    },
    null,
    2,
  ),
);
if (findings.length || dependencies.length) process.exitCode = 1;
