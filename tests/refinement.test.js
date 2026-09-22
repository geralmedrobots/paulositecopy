import { test } from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import content from "../src/data/content.json" with { type: "json" };
import { contactFields, emptyContact } from "../src/data/contact.js";
import { getSEO } from "../src/data/seo.js";
import { pageIds, pagePath } from "../src/data/routes.js";
test("contact field labels and attributes are keyed by name in both languages", () => {
  const expected = {
    firstName: ["First Name", "Primeiro nome", "text", "given-name", 100],
    lastName: ["Last Name", "Último nome", "text", "family-name", 100],
    email: ["Email", "O email", "email", "email", 250],
    phone: ["Phone", "Telefone", "tel", "tel", 50],
    address: ["Address", "Endereço", "text", "street-address", 250],
    message: ["Type your message here", "Digite sua mensagem aqui", "textarea", "off", 5000],
  };
  assert.deepEqual(
    contactFields.map((f) => f.name),
    Object.keys(emptyContact),
  );
  for (const field of [...contactFields].reverse()) {
    const [en, pt, type, autoComplete, maxLength] = expected[field.name];
    assert.equal(content.en.contacts.fields[field.name], en);
    assert.equal(content.pt.contacts.fields[field.name], pt);
    assert.equal(field.type, type);
    assert.equal(field.autoComplete, autoComplete);
    assert.equal(field.maxLength, maxLength);
    assert.equal(field.required, field.name === "email");
  }
});
test("social images use relevant local assets and a deterministic central fallback", async () => {
  const images = {
    home: "home-2",
    ultrabot: "ultrabot-2",
    benefits: "benefits-0",
    "healthcare-industry-1": "healthcare-industry-1-0",
    thecompany: "thecompany-0",
    recruitment: "copy-of-the-company-0",
    contacts: "contacts-0",
  };
  for (const id of pageIds)
    for (const lang of ["en", "pt"]) {
      const seo = getSEO(pagePath(id, lang));
      const asset = `/assets/${images[id] || "home-2"}.webp`;
      assert.equal(seo.image, `https://www.medrobots.pt${asset}`);
      await access(`public${asset}`);
    }
});
test("incomplete language variants remain excluded, complete variants remain indexable", () => {
  const incomplete = ["/pt/", "/pt/ultrabot", "/pt/genderequality", "/projeto"];
  for (const id of pageIds)
    for (const lang of ["en", "pt"]) {
      const path = pagePath(id, lang);
      const seo = getSEO(path);
      assert.equal(
        seo.robots,
        incomplete.includes(path) ? "noindex, follow" : "index, follow",
      );
      assert.equal(seo.lang, lang);
      assert.equal(seo.canonical, `https://www.medrobots.pt${path}`);
      for (const alternate of seo.alternates) {
        assert.equal(getSEO(alternate.href).robots, "index, follow");
        assert.equal(
          alternate.href,
          `https://www.medrobots.pt${pagePath(id, alternate.lang)}`,
        );
      }
    }
});
