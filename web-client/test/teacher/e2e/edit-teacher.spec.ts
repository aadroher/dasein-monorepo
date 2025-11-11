import { test, expect } from '@playwright/test';

test.describe('Edit Teacher Flow (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure clean state
    await page.goto('http://localhost:5173');

    // Clear any existing data
    await page.evaluate(() => {
      indexedDB.deleteDatabase('dasein-teachers');
    });

    await page.reload();

    // Create a teacher to edit
    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Original Name');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await expect(page.getByText('Original Name')).toBeVisible();
  });

  test('should edit teacher name and display updated name', async ({
    page,
  }) => {
    // Find and click edit button for the teacher
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await teacherRow.getByRole('button', { name: /edit/i }).click();

    // Fill new name in edit form
    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('Updated Name');

    // Save the edit
    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify updated name appears
    await expect(page.getByText('Updated Name')).toBeVisible();

    // Verify original name is gone
    await expect(page.getByText('Original Name')).not.toBeVisible();
  });

  test('should persist edited teacher after page reload', async ({ page }) => {
    // Edit the teacher
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await teacherRow.getByRole('button', { name: /edit/i }).click();

    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('Persisted Edit');

    await page.getByRole('button', { name: /save|update/i }).click();
    await expect(page.getByText('Persisted Edit')).toBeVisible();

    // Reload the page
    await page.reload();

    // Verify edited name still appears
    await expect(page.getByText('Persisted Edit')).toBeVisible();
    await expect(page.getByText('Original Name')).not.toBeVisible();
  });

  test('should show validation error for empty name on edit', async ({
    page,
  }) => {
    // Start editing
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await teacherRow.getByRole('button', { name: /edit/i }).click();

    // Clear the name
    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();

    // Try to save
    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify error message appears
    await expect(page.getByText(/cannot be empty|required/i)).toBeVisible();

    // Verify original name is still in list
    await expect(page.getByText('Original Name')).toBeVisible();
  });

  test('should show validation error for whitespace-only name on edit', async ({
    page,
  }) => {
    // Start editing
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await teacherRow.getByRole('button', { name: /edit/i }).click();

    // Enter whitespace only
    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('   ');

    // Try to save
    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify error message appears
    await expect(page.getByText(/cannot be empty|required/i)).toBeVisible();
  });

  test('should allow canceling edit', async ({ page }) => {
    // Start editing
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await teacherRow.getByRole('button', { name: /edit/i }).click();

    // Change the name
    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('Should Not Save');

    // Cancel instead of save
    await page.getByRole('button', { name: /cancel/i }).click();

    // Verify original name is still shown
    await expect(page.getByText('Original Name')).toBeVisible();
    await expect(page.getByText('Should Not Save')).not.toBeVisible();
  });

  test('should edit multiple teachers independently', async ({ page }) => {
    // Create second and third teachers
    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Second Teacher');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Second Teacher')).toBeVisible();

    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Third Teacher');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Third Teacher')).toBeVisible();

    // Edit second teacher
    const secondTeacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Second Teacher' });
    await secondTeacherRow.getByRole('button', { name: /edit/i }).click();

    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('Edited Second');
    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify only second teacher was edited
    await expect(page.getByText('Original Name')).toBeVisible();
    await expect(page.getByText('Edited Second')).toBeVisible();
    await expect(page.getByText('Third Teacher')).toBeVisible();
    await expect(page.getByText('Second Teacher')).not.toBeVisible();
  });

  test('should allow editing to duplicate name', async ({ page }) => {
    // Create second teacher
    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Duplicate Name');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Duplicate Name')).toBeVisible();

    // Edit first teacher to have same name
    const firstTeacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await firstTeacherRow.getByRole('button', { name: /edit/i }).click();

    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('Duplicate Name');
    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify both teachers with same name are visible
    const duplicateNames = page.getByText('Duplicate Name');
    await expect(duplicateNames).toHaveCount(2);
  });

  test('should trim whitespace from edited name', async ({ page }) => {
    // Start editing
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Original Name' });
    await teacherRow.getByRole('button', { name: /edit/i }).click();

    // Enter name with extra whitespace
    const editInput = page.getByRole('textbox', {
      name: /full name|edit.*name/i,
    });
    await editInput.clear();
    await editInput.fill('  Trimmed Name  ');

    await page.getByRole('button', { name: /save|update/i }).click();

    // Verify trimmed name appears (without extra spaces)
    await expect(page.getByText('Trimmed Name')).toBeVisible();
  });
});
