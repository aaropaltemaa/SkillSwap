// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e-tests",

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: [
    {
      command: "npm run start:test --prefix backend",
      url: "http://localhost:3001",
      reuseExistingServer: !process.env.CI,
      cwd: "./",
      timeout: 60 * 1000,
    },
    {
      command: "npm run dev --prefix frontend",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
      cwd: "./",
      timeout: 60 * 1000,
    },
  ],
});
