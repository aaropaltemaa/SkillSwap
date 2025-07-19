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
      command: "npm run start:test",
      port: 3001,
      reuseExistingServer: false,
      cwd: "./backend",
      timeout: 30000,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      command: "npm run dev",
      port: 5173,
      reuseExistingServer: false,
      cwd: "./frontend",
      timeout: 30000,
      stdout: "pipe",
      stderr: "pipe",
    },
  ],
});
