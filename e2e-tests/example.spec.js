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
    await page.getByTestId("username").fill("root");
    await page.getByTestId("password").fill("sekret");

    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Welcome back, root!")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", { name: "Sign In" }).click();
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("sekret");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("create exchange page can be opened & new request created", async ({
      page,
    }) => {
      await page.getByRole("link", { name: "Create" }).click();
      await page.selectOption("select", "user2");
      await page.getByTestId("skills-offered").fill("drawing, piano");
      await page.getByTestId("skills-wanted").fill("dancing, history lessons");

      await page.getByRole("button", { name: "Create" }).click();

      await expect(
        page.getByText("Exchange request created successfully!")
      ).toBeVisible();
    });
  });
});
