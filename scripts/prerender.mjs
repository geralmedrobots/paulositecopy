import fs from "node:fs/promises";
import path from "node:path";
import { render } from "../.prerender/entry-server.js";
import { getSEO } from "../src/data/seo.js";
import { pageIds, pagePath, aliases } from "../src/data/routes.js";
import { site } from "../src/data/site.js";
const template = await fs.readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const paths = pageIds.flatMap((id) =>
  ["en", "pt"].map((lang) => pagePath(id, lang)),
);
for (const url of [...paths, "/404.html", "/pt/404.html"]) {
  const seo = getSEO(url);
  const tags = `<meta name="description" content="${escape(seo.description)}"><meta name="robots" content="${seo.robots}"><link rel="canonical" href="${escape(seo.canonical)}"><meta property="og:title" content="${escape(seo.title)}"><meta property="og:description" content="${escape(seo.description)}"><meta property="og:url" content="${escape(seo.canonical)}"><meta property="og:type" content="website"><meta property="og:image" content="${seo.image}"><meta property="og:locale" content="${seo.lang === "pt" ? "pt_PT" : "en_GB"}">${seo.alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}">`).join("")}`;
  const html = template
    .replace('<html lang="en">', `<html lang="${seo.lang}">`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(seo.title)}</title>${tags}`,
    )
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const file = url.endsWith(".html")
    ? `dist${url}`
    : path.join("dist", url, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}
await fs.writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
    .filter((p) => getSEO(p).robots.startsWith("index"))
    .map((p) => `<url><loc>${site.origin}${p}</loc></url>`)
    .join("")}</urlset>\n`,
);
await fs.writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`,
);
const redirects = Object.entries(aliases).flatMap(([from, to]) =>
  ["en", "pt"].map(
    (lang) => `${lang === "pt" ? "/pt" : ""}${from} ${pagePath(to, lang)} 301!`,
  ),
);
await fs.writeFile(
  "dist/_redirects",
  [
    ...redirects,
    ...paths.filter((p) => !p.endsWith("/")).map((p) => `${p}/ ${p} 301!`),
    "/pt/* /pt/404.html 404",
    "/* /404.html 404",
  ].join("\n") + "\n",
);
console.log(
  `Prerendered ${paths.length} canonical pages and two localized 404 pages.`,
);
