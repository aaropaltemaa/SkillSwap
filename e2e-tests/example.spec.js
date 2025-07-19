import { test, expect, describe, beforeEach } from "@playwright/test";

describe("SkillSwap", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("homepage loads and shows SkillSwap", async ({ page }) => {
    await expect(page.getByText("Exchange Skills")).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByTestId("username").fill("aaropaltemaa");
    await page.getByTestId("password").fill("salainen");

    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Welcome back, aaropaltemaa!")).toBeVisible();
  });
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "Sign In" }).click();
      await page.getByTestId("username").fill("aaropaltemaa");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });
    test("create exchange page can be opened", async ({ page }) => {
      await page.getByRole("link", { name: "Create" }).click();
      await expect(page.getByText("Create Exchange Request")).toBeVisible();
    });
  });
});
