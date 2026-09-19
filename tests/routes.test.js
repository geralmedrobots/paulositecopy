import test from "node:test";
import assert from "node:assert/strict";
import { routes, redirects, findRoute } from "../src/data/routes.js";
import { metadataFor, siteOrigin } from "../src/data/metadata.js";
import { navItems, footerLinks } from "../src/data/navigation.js";
test("All canonical routes are unique and aliases resolve without chains", () => {
  assert.equal(new Set(routes.map((route) => route.path)).size, routes.length);
  for (const [alias, target] of Object.entries(redirects)) {
    assert.ok(findRoute(target));
    assert.equal(findRoute(alias), undefined);
    assert.equal(redirects[target], undefined);
  }
  for (const link of [...navItems, ...footerLinks.legal])
    assert.ok(findRoute(link.path));
  assert.equal(findRoute("/ultrabot/").key, "ultrabot");
  assert.equal(findRoute("/missing"), undefined);
});
test("Metadata is specific, uses actual language, and excludes historical copies from indexing", () => {
  for (const route of routes) {
    const metadata = metadataFor(route.path);
    assert.equal(metadata.canonical, `https://www.medrobots.pt${route.path}`);
    assert.equal(metadata.language, route.language);
    assert.ok(metadata.description);
  }
  assert.equal(metadataFor("/projeto").language, "pt");
  assert.equal(metadataFor("/missing").noindex, true);
  assert.equal(metadataFor("/solutions").noindex, true);
  assert.equal(siteOrigin("javascript:alert(1)"), "https://www.medrobots.pt");
  assert.equal(
    siteOrigin("https://preview.example/path"),
    "https://preview.example",
  );
});
