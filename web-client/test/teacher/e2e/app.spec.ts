import { test, expect } from '@playwright/test';

test.describe('Teacher Management App', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');

    // Verify the app loads
    await expect(page).toHaveTitle(/Teacher Management/);
    await expect(page.locator('h1')).toContainText('Teacher Management');
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');

    // Basic accessibility check - will be enhanced with axe-core
    await expect(page.locator('h1')).toBeVisible();

    // TODO: Add axe-core accessibility testing
    // This will be implemented when we have actual teacher components
  });
});
