import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pageIds, pagePath } from "../../src/data/routes.js";
const widths = [375, 390, 414, 768, 1024, 1280, 1440, 1920];
for (const lang of ["en", "pt"])
  for (const width of widths) {
    test(`all ${lang} pages at ${width}px: routes, layout, media and links`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors = [];
      const external = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("request", (request) => {
        if (!request.url().startsWith("http://127.0.0.1:4173"))
          external.push(request.url());
      });
      for (const id of pageIds) {
        const path = pagePath(id, lang);
        const response = await page.goto(path);
        expect(response.status(), path).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
          "href",
          "https://www.medrobots.pt" + path,
        );
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (const image of document.images) {
            image.loading = "eager";
            await image.decode().catch(() => {});
          }
        });
        const issues = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          images: [...document.images]
            .filter(
              (i) => !i.complete || !i.naturalWidth || !i.hasAttribute("alt"),
            )
            .map((i) => i.src),
          links: [...document.querySelectorAll("a[href]")]
            .map((a) => a.getAttribute("href"))
            .filter((h) => h.startsWith("/") && !h.startsWith("/assets/")),
          video: [...document.querySelectorAll("video")].some((v) =>
            Boolean(v.currentSrc),
          ),
        }));
        expect(issues.overflow, path).toBe(false);
        expect(issues.images, path).toEqual([]);
        expect(issues.video, path).toBe(false);
        for (const link of issues.links)
          expect(
            pageIds
              .map((id) => pagePath(id, lang))
              .concat(
                pageIds.map((id) => pagePath(id, lang === "en" ? "pt" : "en")),
              ),
            link,
          ).toContain(link);
      }
      expect(errors).toEqual([]);
      expect(external).toEqual([]);
    });
  }
for (const lang of ["en", "pt"])
  for (const width of [375, 1440]) {
    test(`accessibility audit ${lang} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const id of pageIds) {
        await page.goto(pagePath(id, lang));
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(
          results.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
          `${lang}/${id}`,
        ).toEqual([]);
      }
    });
  }
test("mobile navigation, focus, Escape, resizing and language equivalence", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto("/ultrabot");
  const menu = page.getByRole("button", { name: "Menu", exact: false }).first();
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.locator("#main-navigation > a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .locator(".language-switch")
    .getByText("PT", { exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt\/ultrabot$/);
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.locator(".menu-toggle").click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.setViewportSize({ width: 375, height: 700 });
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
test("FAQ works with keyboard and connected accessible panels", async ({
  page,
}) => {
  await page.goto("/faq");
  const button = page.locator(".faq-item button").first();
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  const id = await button.getAttribute("aria-controls");
  await expect(page.locator("#" + id)).toBeVisible();
  await page.keyboard.press("Space");
  await expect(page.locator("#" + id)).toBeHidden();
});
test("form is honest, validates email and never sends without an endpoint", async ({
  page,
}) => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/contacts");
  await expect(page.getByText("SUBMISSION NOT AVAILABLE")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Submit", exact: true }),
  ).toBeDisabled();
  await page.getByLabel("Email").fill("invalid");
  await page.getByLabel("Phone").focus();
  await expect(page.getByLabel("Email")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByLabel("Email").fill("person@server.pt");
  await page.getByLabel("Phone").focus();
  await expect(page.getByLabel("Email")).toHaveAttribute(
    "aria-invalid",
    "false",
  );
  expect(posts).toEqual([]);
});
test("direct reload, server redirects, 404 and no-JavaScript content", async ({
  page,
  request,
  browser,
}) => {
  for (const [from, to] of [
    ["/copy-of-home", "/"],
    ["/copy-of-ultrabot", "/ultrabot"],
    ["/copy-of-the-company", "/recruitment"],
    ["/portugal2030", "/projeto"],
    ["/benefits/", "/benefits"],
    ["/ultrabot?lang=pt", "/pt/ultrabot"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(to);
  }
  await page.goto("/ultrabot");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("UltraBot");
  const response = await page.goto("/does-not-exist");
  expect(response.status()).toBe(404);
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:4173/ultrabot");
  await expect(staticPage.locator("h1")).toHaveText("UltraBot");
  await expect(
    staticPage.getByText("What is UV-C disinfection?"),
  ).toBeVisible();
  await context.close();
});
test("reduced motion, video opt-in and local-only runtime", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const external = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4173")) external.push(r.url());
  });
  await page.goto("/");
  expect(await page.locator("video").evaluate((v) => v.currentSrc)).toBe("");
  await page.getByRole("button", { name: "Play background video" }).click();
  await expect(
    page.getByRole("button", { name: "Pause background video" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause background video" }).click();
  await expect(
    page.getByRole("button", { name: "Play background video" }),
  ).toHaveAttribute("aria-pressed", "false");
  expect(external).toEqual([]);
});
