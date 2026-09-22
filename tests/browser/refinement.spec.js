import { test, expect } from "@playwright/test";
import content from "../../src/data/content.json" with { type: "json" };
import { pageIds, pagePath } from "../../src/data/routes.js";
import {
  navigation,
  secondaryNavigation,
  legalNavigation,
} from "../../src/data/site.js";
import { contactFields } from "../../src/data/contact.js";
import { getSEO } from "../../src/data/seo.js";
for (const lang of ["en", "pt"]) {
  test(`every ${lang} route renders its page and unique complete SEO tags`, async ({
    page,
  }) => {
    for (const id of pageIds) {
      const path = pagePath(id, lang);
      await page.goto(path);
      const data = content[lang][id];
      const title =
        id === "home"
          ? data.lead
          : id === "ultrabot"
            ? "UltraBot"
            : id === "healthcare-industry-1" && lang === "pt"
              ? "Setor da Saúde"
              : data.title;
      await expect(page.locator("main h1")).toHaveText(title);
      const seo = getSEO(path);
      for (const [key, value] of Object.entries({
        title: seo.title,
        description: seo.description,
        url: seo.canonical,
        type: "website",
        image: seo.image,
        locale: lang === "pt" ? "pt_PT" : "en_GB",
      })) {
        const tag = page.locator(`meta[property="og:${key}"]`);
        await expect(tag).toHaveCount(1);
        await expect(tag).toHaveAttribute("content", value);
      }
      await expect(page.locator("link[rel=canonical]")).toHaveCount(1);
      await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
        "href",
        seo.canonical,
      );
      await expect(page.locator("meta[name=robots]")).toHaveAttribute(
        "content",
        seo.robots,
      );
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("link[rel=alternate]")).toHaveCount(
        seo.alternates.length,
      );
      for (const alternate of seo.alternates)
        await expect(
          page.locator(`link[rel=alternate][hreflang=${alternate.lang}]`),
        ).toHaveAttribute("href", alternate.href);
      const other = lang === "en" ? "pt" : "en";
      await expect(
        page.locator(`.language-switch a[lang=${other}]`),
      ).toHaveAttribute("href", pagePath(id, other));
    }
  });
  for (const width of [375, 1440])
    test(`navigation groups and destinations ${lang} ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const [group, items] of [
        ["primary", navigation],
        ["secondary", secondaryNavigation],
        ["legal", legalNavigation],
      ]) {
        for (const item of items) {
          await page.goto(pagePath("home", lang));
          if (width === 375 && group !== "legal")
            await page.locator(".menu-toggle").click();
          if (group === "secondary")
            await page.locator(".more-nav > button").click();
          const scope =
            group === "legal" ? ".footer-bottom" : "#main-navigation";
          const link = page.locator(
            `${scope} a[href="${pagePath(item.id, lang)}"]`,
          );
          await expect(link).toHaveText(item[lang]);
          await link.click();
          await expect(page).toHaveURL(
            new RegExp(`${pagePath(item.id, lang)}$`),
          );
          if (group !== "legal")
            await expect(
              page.locator(
                `#main-navigation a:not([hreflang])[href="${pagePath(item.id, lang)}"]`,
              ),
            ).toHaveAttribute("aria-current", "page");
        }
      }
      await page.goto(pagePath("home", lang));
      if (width === 375) await page.locator(".menu-toggle").click();
      await page.locator(".more-nav > button").click();
      await page.keyboard.press("Escape");
      await expect(page.locator(".more-nav > button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      if (width === 375) await page.locator(".menu-toggle").click();
      await page.locator(".more-nav > button").click();
      await page.locator(".footer-bottom small").click();
      await expect(page.locator(".more-nav > button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  test(`contact field mapping ${lang}`, async ({ page }) => {
    await page.goto(pagePath("contacts", lang));
    for (const field of contactFields) {
      const control = page.locator(`[name=${field.name}]`);
      await expect(page.locator(`label[for=${field.name}]`)).toContainText(
        content[lang].contacts.fields[field.name],
      );
      await expect(control).toHaveAttribute("autocomplete", field.autoComplete);
      await expect(control).toHaveAttribute(
        "maxlength",
        String(field.maxLength),
      );
      if (field.type !== "textarea")
        await expect(control).toHaveAttribute("type", field.type);
      await expect(control).toHaveJSProperty("required", field.required);
      await expect(control).toHaveAttribute("aria-invalid", "false");
    }
    await expect(page.locator("button[type=submit]")).toBeDisabled();
  });
}
