import { test, expect } from "@playwright/test";
test.use({ baseURL: "http://127.0.0.1:4174" });
test("configured contact handles loading, duplicate submits, success, and server errors", async ({
  page,
}) => {
  let requests = 0;
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    requests++;
    if (requests === 1) {
      await gate;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"ok":true}',
      });
    } else {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: '{"ok":false}',
      });
    }
  });
  await page.goto("/contacts");
  const submit = page.getByRole("button", { name: "Submit", exact: true });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  expect(requests).toBe(0);
  await page.getByLabel("Email").fill("person@example.org");
  await submit.click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await page
    .getByRole("button", { name: "Sending…" })
    .evaluate((button) => button.click());
  expect(requests).toBe(1);
  release();
  await expect(page.getByText("Thanks for submitting!")).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveValue("");
  await page.getByLabel("Email").fill("person@example.org");
  await submit.click();
  await expect(page.getByText("Your message could not be sent.")).toBeVisible();
  await expect(submit).toBeEnabled();
  expect(requests).toBe(2);
});
