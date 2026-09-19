import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveRoute,
  pagePath,
  pageIds,
  aliases,
} from "../src/data/routes.js";
import { getSEO } from "../src/data/seo.js";
import {
  emptyContact,
  validateContact,
  sendContact,
} from "../src/data/contact.js";
import content from "../src/data/content.json" with { type: "json" };
import source from "../docs/source-blocks.json" with { type: "json" };
import {
  navigation,
  secondaryNavigation,
  legalNavigation,
} from "../src/data/site.js";
test("canonical routes, language equivalents and trailing slashes", () => {
  for (const id of pageIds)
    for (const lang of ["en", "pt"]) {
      const path = pagePath(id, lang),
        result = resolveRoute(path);
      assert.equal(result.id, id);
      assert.equal(result.lang, lang);
      assert.equal(result.redirect, null);
      if (!path.endsWith("/"))
        assert.equal(resolveRoute(path + "/").redirect, path);
      assert.ok(content[lang][id]);
    }
  assert.equal(resolveRoute("/ultrabot?lang=pt").redirect, "/pt/ultrabot");
  assert.equal(resolveRoute("/pt").redirect, "/pt/");
  assert.equal(
    resolveRoute("/ultrabot?lang=pt#how-it-works").redirect,
    "/pt/ultrabot#how-it-works",
  );
});
test("legacy redirects preserve equivalent language and avoid duplicate pages", () => {
  for (const [from, to] of Object.entries(aliases))
    for (const lang of ["en", "pt"]) {
      const result = resolveRoute((lang === "pt" ? "/pt" : "") + from);
      assert.equal(result.id, to);
      assert.equal(result.redirect, pagePath(to, lang));
    }
});
test("unknown routes are not indexable", () => {
  for (const path of ["/missing", "/pt/missing", "/404.html"]) {
    assert.equal(resolveRoute(path).found, false);
    assert.equal(getSEO(path).robots, "noindex, follow");
  }
});
test("all navigation links have a canonical target", () => {
  for (const item of [
    ...navigation,
    ...secondaryNavigation,
    ...legalNavigation,
  ])
    assert.ok(pageIds.includes(item.id));
});
test("current page copy matches the captured public source", () => {
  const names = {
    "copy-of-the-company": "recruitment",
  };
  function values(input) {
    if (typeof input === "string") return [input];
    if (Array.isArray(input)) return input.flatMap(values);
    if (input && typeof input === "object")
      return Object.values(input).flatMap(values);
    return [];
  }
  for (const [sourceName, languages] of Object.entries(source)) {
    if (["projeto", "contacts"].includes(sourceName)) continue;
    for (const lang of ["en", "pt"]) {
      // The public PT equality page repeats cookies. It is archived separately.
      if (sourceName === "genderequality" && lang === "pt") continue;
      const page = content[lang][names[sourceName] || sourceName];
      const captured = new Set(values(page));
      for (const block of languages[lang].blocks)
        assert.ok(
          captured.has(block),
          `${lang}/${sourceName}: ${block.slice(0, 80)}`,
        );
    }
  }
});
test("each canonical page has unique metadata and valid language alternates", () => {
  const titles = new Set(),
    descriptions = new Set();
  for (const id of pageIds)
    for (const lang of ["en", "pt"]) {
      const seo = getSEO(pagePath(id, lang));
      assert.ok(!titles.has(seo.title), seo.title);
      titles.add(seo.title);
      assert.ok(!descriptions.has(seo.description), seo.description);
      descriptions.add(seo.description);
      assert.equal(seo.lang, lang);
      assert.equal(
        seo.alternates.length,
        seo.robots.startsWith("index") &&
          !["home", "ultrabot", "genderequality", "projeto"].includes(id)
          ? 2
          : 0,
      );
      assert.equal(
        seo.canonical,
        "https://www.medrobots.pt" + pagePath(id, lang),
      );
    }
});
test("contact validation preserves optional fields and rejects invalid emails", () => {
  for (const email of [
    "",
    "person",
    "person@",
    "person@server",
    "person @server.pt",
  ])
    assert.ok(validateContact({ ...emptyContact, email }).email);
  assert.deepEqual(
    validateContact({ ...emptyContact, email: "person@server.pt" }),
    {},
  );
});
test("contact service never simulates delivery and propagates network failures", async () => {
  let requests = 0;
  const success = async (_, options) => {
    requests++;
    assert.equal(options.method, "POST");
    assert.equal(JSON.parse(options.body).email, "person@server.pt");
    return {
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ ok: true }),
    };
  };
  const values = { ...emptyContact, email: "person@server.pt" };
  await assert.rejects(
    sendContact("", values, success),
    /SUBMISSION NOT AVAILABLE/,
  );
  await assert.rejects(
    sendContact("https://remote.invalid", values, success),
    /same-origin/,
  );
  assert.equal(requests, 0);
  await sendContact("/contact-test", values, success);
  assert.equal(requests, 1);
  await assert.rejects(
    sendContact("/contact-test", values, async () => ({ ok: false })),
    /failed/,
  );
  await assert.rejects(
    sendContact("/contact-test", values, async () => ({
      ok: true,
      headers: { get: () => "text/html" },
    })),
    /failed/,
  );
  await assert.rejects(
    sendContact("/contact-test", values, async () => {
      throw new Error("Offline");
    }),
    /Offline/,
  );
});
