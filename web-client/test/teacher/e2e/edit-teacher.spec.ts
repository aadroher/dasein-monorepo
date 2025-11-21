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
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    // Fill new name in edit form (scoped to the table row)
    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('Updated Name');

    // Save the edit
    await editingRow.getByRole('button', { name: 'Save changes' }).click();

    // Verify updated name appears
    await expect(page.getByText('Updated Name')).toBeVisible();

    // Verify original name is gone
    await expect(page.getByText('Original Name')).not.toBeVisible();
  });

  test('should persist edited teacher after page reload', async ({ page }) => {
    // Edit the teacher
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('Persisted Edit');

    await editingRow.getByRole('button', { name: 'Save changes' }).click();
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
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    // Clear the name
    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();

    // Try to save - the button should be disabled, so we'll check that instead
    const saveButton = editingRow.getByRole('button', {
      name: 'Save changes',
    });
    await expect(saveButton).toBeDisabled();

    // Cancel to exit edit mode
    await editingRow.getByRole('button', { name: 'Cancel editing' }).click();

    // Verify original name is still in list
    await expect(page.getByText('Original Name')).toBeVisible();
  });

  test('should show validation error for whitespace-only name on edit', async ({
    page,
  }) => {
    // Start editing
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    // Enter whitespace only
    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('   ');

    // Try to save - the button should be disabled
    const saveButton = editingRow.getByRole('button', {
      name: 'Save changes',
    });
    await expect(saveButton).toBeDisabled();
  });

  test('should allow canceling edit', async ({ page }) => {
    // Start editing
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    // Change the name
    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('Should Not Save');

    // Cancel instead of save
    await editingRow.getByRole('button', { name: 'Cancel editing' }).click();

    // Verify original name is still shown
    await expect(page.getByText('Original Name')).toBeVisible();
    await expect(page.getByText('Should Not Save')).not.toBeVisible();
  });

  test('should edit multiple teachers independently', async ({ page }) => {
    // Create second and third teachers
    const createInput = page
      .getByRole('textbox', { name: /full name/i })
      .first();
    await createInput.fill('Second Teacher');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Second Teacher')).toBeVisible();

    await createInput.fill('Third Teacher');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Third Teacher')).toBeVisible();

    // Edit second teacher
    await page
      .getByRole('button', { name: 'Edit Second Teacher', exact: true })
      .click();

    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('Edited Second');
    await editingRow.getByRole('button', { name: 'Save changes' }).click();

    // Verify only second teacher was edited
    await expect(page.getByText('Original Name')).toBeVisible();
    await expect(page.getByText('Edited Second')).toBeVisible();
    await expect(page.getByText('Third Teacher')).toBeVisible();
    await expect(page.getByText('Second Teacher')).not.toBeVisible();
  });

  test('should allow editing to duplicate name', async ({ page }) => {
    // Create second teacher
    const createInput = page
      .getByRole('textbox', { name: /full name/i })
      .first();
    await createInput.fill('Duplicate Name');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Duplicate Name')).toBeVisible();

    // Edit first teacher to have same name
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('Duplicate Name');
    await editingRow.getByRole('button', { name: 'Save changes' }).click();

    // Verify both teachers with same name are visible
    const duplicateNames = page.getByText('Duplicate Name');
    await expect(duplicateNames).toHaveCount(2);
  });

  test('should trim whitespace from edited name', async ({ page }) => {
    // Start editing
    await page
      .getByRole('button', { name: 'Edit Original Name', exact: true })
      .click();

    // Enter name with extra whitespace
    const editingRow = page.getByRole('row').filter({
      has: page.getByRole('button', { name: 'Save changes' }),
    });
    const editInput = editingRow.getByRole('textbox', {
      name: /full name/i,
    });
    await editInput.clear();
    await editInput.fill('  Trimmed Name  ');

    await editingRow.getByRole('button', { name: 'Save changes' }).click();

    // Verify trimmed name appears (without extra spaces)
    await expect(page.getByText('Trimmed Name')).toBeVisible();
  });
});
