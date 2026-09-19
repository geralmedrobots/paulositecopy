import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { routes, redirects } from "./src/data/routes.js";

const canonicalPaths = new Set(routes.map((route) => route.path));
const publicFiles = new Set([
  "/favicon.png",
  "/social-preview.png",
  "/robots.txt",
  "/sitemap.xml",
  "/404.html",
]);

function previewPages() {
  return {
    name: "preview-pages",
    configurePreviewServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.method !== "GET" && request.method !== "HEAD")
          return next();

        const incoming = new URL(request.url, "http://localhost");
        const pathname = incoming.pathname.replace(/\/+$/, "") || "/";
        if (publicFiles.has(pathname)) return next();
        if (/^\/assets\/[A-Za-z0-9_.-]+$/.test(pathname)) {
          try {
            await access(resolve("dist", pathname.slice(1)));
            return next();
          } catch {
            response.writeHead(404);
            response.end();
            return;
          }
        }
        if (/\.[^/]+$/.test(pathname)) {
          response.writeHead(404);
          response.end();
          return;
        }
        if (redirects[pathname]) {
          response.writeHead(301, {
            Location: redirects[pathname] + incoming.search,
          });
          response.end();
          return;
        }

        const pageFile = canonicalPaths.has(pathname)
          ? resolve("dist", pathname.slice(1), "index.html")
          : resolve("dist", "404.html");
        try {
          const page = await readFile(pageFile);
          response.writeHead(canonicalPaths.has(pathname) ? 200 : 404, {
            "Content-Type": "text/html; charset=utf-8",
          });
          response.end(request.method === "HEAD" ? undefined : page);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), previewPages()],
});
