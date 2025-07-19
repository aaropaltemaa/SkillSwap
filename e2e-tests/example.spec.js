import { test, expect, describe } from '@playwright/test';

describe("SkillSwap", () => {
  test('homepage loads and shows SkillSwap', async ({ page }) => {
    await page.goto('/'); 
    await expect(page.getByText('Exchange Skills')).toBeVisible();
  });
  test("login form can be opened", async ({ page }) => {
    await page.goto("/")

    await page.getByRole('link', { name: 'Sign In' }).click()
    await expect(page.getByText("username")).toBeVisible()
  })
})