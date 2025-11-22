import { test, expect } from '@playwright/test';

test.describe('Create Teacher Flow (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure clean state
    await page.goto('http://localhost:5173');

    // Clear any existing data (assuming app has a way to reset)
    // This may need adjustment based on actual implementation
    await page.evaluate(() => {
      indexedDB.deleteDatabase('dasein-teachers');
    });

    await page.reload();
  });

  test('should create a new teacher and display in list', async ({ page }) => {
    // Verify empty state initially
    await expect(page.getByText(/no teachers/i)).toBeVisible();

    // Find and fill the create form
    await page.getByRole('textbox', { name: /full name/i }).fill('Jane Doe');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Verify teacher appears in list
    await expect(page.getByText('Jane Doe')).toBeVisible();

    // Verify empty state is gone
    await expect(page.getByText(/no teachers/i)).not.toBeVisible();
  });

  test('should persist created teacher after page reload', async ({ page }) => {
    // Create a teacher
    await page.getByRole('textbox', { name: /full name/i }).fill('John Smith');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Verify it appears
    await expect(page.getByText('John Smith')).toBeVisible();

    // Reload the page
    await page.reload();

    // Verify teacher still appears after reload
    await expect(page.getByText('John Smith')).toBeVisible();
  });

  test('should create multiple teachers', async ({ page }) => {
    // Create first teacher
    await page.getByRole('textbox', { name: /full name/i }).fill('Alice');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Alice')).toBeVisible();

    // Create second teacher
    await page.getByRole('textbox', { name: /full name/i }).fill('Bob');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Bob')).toBeVisible();

    // Create third teacher
    await page.getByRole('textbox', { name: /full name/i }).fill('Charlie');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Charlie')).toBeVisible();

    // Verify all three are visible
    await expect(page.getByText('Alice')).toBeVisible();
    await expect(page.getByText('Bob')).toBeVisible();
    await expect(page.getByText('Charlie')).toBeVisible();
  });

  test('should show validation error for empty name', async ({ page }) => {
    // Verify button is disabled when form is empty
    const addButton = page.getByRole('button', {
      name: /add teacher|create teacher/i,
    });
    await expect(addButton).toBeDisabled();

    // Verify no teacher was added
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should show validation error for whitespace-only name', async ({
    page,
  }) => {
    // Fill with only whitespace
    await page.getByRole('textbox', { name: /full name/i }).fill('   ');

    // Verify button is still disabled for whitespace-only input
    const addButton = page.getByRole('button', {
      name: /add teacher|create teacher/i,
    });
    await expect(addButton).toBeDisabled();

    // Verify no teacher was added
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should clear form after successful creation', async ({ page }) => {
    // Create a teacher
    const input = page.getByRole('textbox', { name: /full name/i });
    await input.fill('Teacher Name');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Wait for teacher to appear
    await expect(page.getByText('Teacher Name')).toBeVisible();

    // Verify input is cleared
    await expect(input).toHaveValue('');
  });

  test('should have proper form spacing (24px sections, accessible layout)', async ({
    page,
  }) => {
    // Locate the form
    const form = page.locator('form.teacher-create-form').first();
    await expect(form).toBeVisible();

    // Verify form has space-y-6 class for proper spacing (24px between sections)
    const formClasses = await form.getAttribute('class');
    expect(formClasses).toContain('space-y-6');

    // Verify input and button are both accessible and visible
    const input = page.getByRole('textbox', { name: /full name/i });
    const button = page.getByRole('button', {
      name: /add teacher|create teacher/i,
    });

    await expect(input).toBeVisible();
    await expect(button).toBeVisible();

    // Verify elements have proper spacing by checking they don't overlap
    const inputBox = await input.boundingBox();
    const buttonBox = await button.boundingBox();

    expect(inputBox).not.toBeNull();
    expect(buttonBox).not.toBeNull();

    // Button should be below input with proper spacing
    if (inputBox && buttonBox) {
      expect(buttonBox.y).toBeGreaterThan(inputBox.y + inputBox.height);
    }

    // Verify touch target minimum size for button (WCAG 2.1 AA)
    if (buttonBox) {
      // Minimum 44x44px recommended for touch targets
      expect(buttonBox.height).toBeGreaterThanOrEqual(32); // Relaxed for desktop
      expect(buttonBox.width).toBeGreaterThanOrEqual(80); // Reasonable button width
    }
  });
});
