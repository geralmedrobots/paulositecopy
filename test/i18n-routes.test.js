import test from "node:test";
import assert from "node:assert/strict";
import { LEGACY_REDIRECTS, ROUTE_MATRIX, equivalentPath, getPageMetadata, isPortuguesePath, localizePath } from "../src/i18n/routes.js";

test("detects language from the URL only", () => {
  assert.equal(isPortuguesePath("/pt"), true);
  assert.equal(isPortuguesePath("/pt/company"), true);
  assert.equal(isPortuguesePath("/company"), false);
  assert.equal(isPortuguesePath("/pt-example"), false);
});

test("generates localized and equivalent paths", () => {
  assert.equal(localizePath("/", "pt"), "/pt");
  assert.equal(localizePath("/contact", "pt"), "/pt/contact");
  assert.equal(equivalentPath("/projects/pharmarobot", "pt"), "/pt/projects/pharmarobot");
  assert.equal(equivalentPath("/pt/projects/pharmarobot", "en"), "/projects/pharmarobot");
  for (const routes of ROUTE_MATRIX) {
    assert.equal(equivalentPath(routes.en, "pt"), routes.pt);
    assert.equal(equivalentPath(routes.pt, "en"), routes.en);
  }
});

test("defines the complete bilingual public route matrix", () => {
  assert.deepEqual(ROUTE_MATRIX, [
    { en: "/", pt: "/pt" },
    { en: "/solutions", pt: "/pt/solutions" },
    { en: "/projects/pharmarobot", pt: "/pt/projects/pharmarobot" },
    { en: "/company", pt: "/pt/company" },
    { en: "/contact", pt: "/pt/contact" },
    { en: "/ultrabot", pt: "/pt/ultrabot" },
    { en: "/faq", pt: "/pt/faq" },
  ]);
});

test("preserves project and legacy redirects", () => {
  assert.equal(LEGACY_REDIRECTS["/projects"], "/projects/pharmarobot");
  assert.equal(LEGACY_REDIRECTS["/pt/projects"], "/pt/projects/pharmarobot");
  assert.equal(LEGACY_REDIRECTS["/benefits"], "/solutions");
  assert.equal(LEGACY_REDIRECTS["/contacts"], "/contact");
});

test("returns localized metadata and safe 404 metadata", () => {
  for (const routes of ROUTE_MATRIX) {
    assert.equal(getPageMetadata(routes.en).valid, true);
    assert.equal(getPageMetadata(routes.pt).valid, true);
  }
  const page = getPageMetadata("/pt/company");
  assert.equal(page.valid, true);
  assert.equal(page.lang, "pt");
  assert.equal(page.canonical, "https://www.medrobots.pt/pt/company");
  assert.equal(page.alternates.en, "https://www.medrobots.pt/company");
  const missing = getPageMetadata("/pt/nao-existe");
  assert.equal(missing.valid, false);
  assert.equal(missing.canonical, undefined);
  assert.match(missing.title, /Página não encontrada/);
});
