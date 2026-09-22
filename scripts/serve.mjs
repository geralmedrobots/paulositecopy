import http from "node:http";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { pathToFileURL } from "node:url";
import { stat } from "node:fs/promises";
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
    const { size } = await stat(target);
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
    const video = extname(target) === ".mp4";
    if (video) headers["Accept-Ranges"] = "bytes";
    let start = 0;
    let end = size - 1;
    // Range applies to GET; HEAD describes the full representation without IO.
    if (video && request.method === "GET" && request.headers.range) {
      const range = parseRange(request.headers.range, size);
      if (!range) {
        response.writeHead(416, {
          ...headers,
          "Content-Range": `bytes */${size}`,
          "Content-Length": 0,
        });
        response.end();
        return;
      }
      ({ start, end } = range);
      status = 206;
      headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
    }
    response.writeHead(status, {
      ...headers,
      "Content-Length": end - start + 1,
    });
    if (request.method === "HEAD" || size === 0) {
      response.end();
      return;
    }
    // pipeline propagates backpressure and closes the file on client disconnect.
    await pipeline(createReadStream(target, { start, end }), response);
  } catch {
    if (response.headersSent || response.destroyed) {
      response.destroy();
      return;
    }
    response.writeHead(400);
    response.end("Bad request");
  }
});
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  server.listen(port, "127.0.0.1", () =>
    console.log(`Med Robots: http://127.0.0.1:${port}`),
  );
}

// One byte range; malformed, empty and multipart ranges use a consistent 416.
export function parseRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value);
  if (!match || (!match[1] && !match[2]) || size === 0) return null;
  const first = Number(match[1]);
  const last = Number(match[2]);
  if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last)) return null;
  const start = match[1] ? first : Math.max(0, size - last);
  const end = match[1] && match[2] ? Math.min(last, size - 1) : size - 1;
  if (start >= size || start > end) return null;
  return { start, end };
}
