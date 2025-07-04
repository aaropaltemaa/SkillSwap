import { test, expect } from '@playwright/test';

test('homepage loads and shows SkillSwap', async ({ page }) => {
  await page.goto('/'); 
  await expect(page.getByText('Exchange Skills')).toBeVisible();
});