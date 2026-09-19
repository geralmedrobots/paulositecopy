import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { resolveRoute } from "../src/data/routes.js";
const root = resolve("dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};
export const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  try {
    const url = new URL(request.url, "http://localhost");
    const route = resolveRoute(url.href);
    if (route.redirect) {
      response.writeHead(301, { Location: route.redirect });
      response.end();
      return;
    }
    const file = resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    let target = file;
    let status = 200;
    try {
      if ((await stat(target)).isDirectory())
        target = resolve(target, "index.html");
      await stat(target);
    } catch {
      status = 404;
      target = resolve(root, route.lang === "pt" ? "pt/404.html" : "404.html");
    }
    if (url.pathname.endsWith("404.html")) status = 404;
    const buffer = await readFile(target);
    const headers = {
      "Content-Type": types[extname(target)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
      "Cache-Control":
        extname(target) === ".html" ? "no-cache" : "public, max-age=3600",
    };
    if (status === 404) headers["X-Robots-Tag"] = "noindex";
    if (extname(target) === ".mp4" && request.headers.range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range);
      if (!match) {
        response.writeHead(416);
        response.end();
        return;
      }
      const start = Number(match[1]),
        end = Math.min(
          Number(match[2] || buffer.length - 1),
          buffer.length - 1,
        );
      if (start > end) {
        response.writeHead(416, {
          "Content-Range": `bytes */${buffer.length}`,
        });
        response.end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${buffer.length}`,
        "Content-Length": end - start + 1,
      });
      response.end(
        request.method === "HEAD" ? undefined : buffer.subarray(start, end + 1),
      );
      return;
    }
    response.writeHead(status, { ...headers, "Content-Length": buffer.length });
    response.end(request.method === "HEAD" ? undefined : buffer);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Med Robots: http://127.0.0.1:${port}`),
);
