import { test, expect } from '@playwright/test';

test.describe('Teacher Management App', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');

    // Verify the app loads
    await expect(page).toHaveTitle(/Teacher Management/);
  });

  test('should display common header with Dasein logo and branding', async ({
    page,
  }) => {
    await page.goto('/');

    // Verify Dasein branding is visible in header
    await expect(page.getByText('Dasein')).toBeVisible();

    // Verify logo is present and accessible
    const logo = page.getByRole('img', { name: /dasein/i });
    await expect(logo).toBeVisible();
  });

  test('should display "Teachers" as page heading', async ({ page }) => {
    await page.goto('/');

    // Verify "Teachers" heading exists as h2 (page-level heading)
    await expect(
      page.getByRole('heading', { name: /^teachers$/i, level: 2 })
    ).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // h1 should be in the common header
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // h2 "Teachers" should be the page heading
    const h2Teachers = page.getByRole('heading', {
      name: /^teachers$/i,
      level: 2,
    });
    await expect(h2Teachers).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');

    // Basic accessibility check
    await expect(page.getByText('Dasein')).toBeVisible();

    // TODO: Add axe-core accessibility testing
    // This will be implemented when we have actual teacher components
  });
});
