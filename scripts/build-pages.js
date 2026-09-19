import { mkdir, readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { routes, redirects } from "../src/data/routes.js";
import { metadataFor, siteOrigin } from "../src/data/metadata.js";
const origin = siteOrigin(loadEnv("production", process.cwd()).VITE_SITE_URL);
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const path of [
  ...routes.map((route) => route.path),
  "/404",
  ...Object.keys(redirects),
]) {
  const metadata = metadataFor(redirects[path] || path, origin);
  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${metadata.language}"`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(metadata.title)}</title>`);
  const values = {
    description: metadata.description,
    robots: metadata.noindex ? "noindex,follow" : "index,follow",
    "og:title": metadata.title,
    "og:description": metadata.description,
    "og:url": metadata.canonical,
    "og:locale": metadata.language === "pt" ? "pt_PT" : "en_GB",
    "og:image": origin + "/social-preview.png",
  };
  for (const [name, value] of Object.entries(values))
    html = html.replace(
      new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*(")`),
      `$1${escape(value)}$2`,
    );
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${escape(metadata.canonical)}$2`,
  );
  const directory = path === "/" ? "dist" : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
  if (path === "/404") await writeFile("dist/404.html", html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .filter((route) => !route.noindex)
  .map((route) => `  <url><loc>${origin}${route.path}</loc></url>`)
  .join("\n")}\n</urlset>\n`;
await writeFile("dist/sitemap.xml", sitemap);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  `Generated ${routes.length} page shells, ${Object.keys(redirects).length} legacy shells and 404 metadata.`,
);
