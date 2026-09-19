import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60000,
  fullyParallel: true,
  workers: 4,
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  webServer: [
    {
      command: "npm run preview",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: true,
    },
    {
      command:
        "VITE_CONTACT_ENDPOINT=/api/contact npm run dev -- --host 127.0.0.1 --port 4174 --strictPort",
      url: "http://127.0.0.1:4174",
      reuseExistingServer: true,
    },
  ],
});
