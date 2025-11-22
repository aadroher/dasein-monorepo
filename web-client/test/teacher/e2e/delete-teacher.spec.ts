import { test, expect } from '@playwright/test';

test.describe('Delete Teacher Flow (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure clean state
    await page.goto('http://localhost:5173');

    // Clear any existing data
    await page.evaluate(() => {
      indexedDB.deleteDatabase('dasein-teachers');
    });

    await page.reload();

    // Create a teacher to delete
    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Teacher To Delete');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await expect(page.getByText('Teacher To Delete')).toBeVisible();
  });

  test('should delete teacher and remove from list', async ({ page }) => {
    // Handle confirmation dialog
    page.once('dialog', dialog => dialog.accept());

    // Find and click delete button for the teacher
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();

    // Verify teacher is removed from list
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();

    // Verify empty state appears
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should persist deletion after page reload', async ({ page }) => {
    // Handle confirmation dialog
    page.once('dialog', dialog => dialog.accept());

    // Delete the teacher
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();

    // Verify deletion
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();

    // Reload the page
    await page.reload();

    // Verify teacher is still gone after reload
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should delete specific teacher from multiple teachers', async ({
    page,
  }) => {
    // Create additional teachers
    await page.getByRole('textbox', { name: /full name/i }).fill('Alice');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Alice')).toBeVisible();

    await page.getByRole('textbox', { name: /full name/i }).fill('Bob');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Bob')).toBeVisible();

    // Handle confirmation dialog
    page.once('dialog', dialog => dialog.accept());

    // Delete the middle teacher (Teacher To Delete)
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();

    // Verify only the targeted teacher is deleted
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();
    await expect(page.getByText('Alice')).toBeVisible();
    await expect(page.getByText('Bob')).toBeVisible();
  });

  test('should show confirmation dialog before deleting', async ({ page }) => {
    // Set up dialog handler
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toMatch(/delete|remove/i);
      await dialog.accept();
    });

    // Click delete button
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();

    // Verify teacher is deleted after confirmation
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();
  });

  test('should cancel deletion when confirmation dialog is dismissed', async ({
    page,
  }) => {
    // Set up dialog handler to dismiss
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });

    // Click delete button
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();

    // Verify teacher is NOT deleted after dismissing confirmation
    await expect(page.getByText('Teacher To Delete')).toBeVisible();
  });

  test('should show empty state when last teacher is deleted', async ({
    page,
  }) => {
    // Verify we start with one teacher
    await expect(page.getByText('Teacher To Delete')).toBeVisible();

    // Handle confirmation dialog
    page.once('dialog', dialog => dialog.accept());

    // Delete it
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();

    // Verify empty state
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should delete multiple teachers sequentially', async ({ page }) => {
    // Create additional teachers
    await page.getByRole('textbox', { name: /full name/i }).fill('First');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('Second');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Handle all confirmation dialogs
    page.on('dialog', dialog => dialog.accept());

    // Delete first teacher
    await page
      .getByRole('button', { name: 'Delete First', exact: true })
      .click();
    await expect(page.getByText('First')).not.toBeVisible();

    // Delete second teacher
    await page
      .getByRole('button', { name: 'Delete Second', exact: true })
      .click();
    await expect(page.getByText('Second')).not.toBeVisible();

    // Delete original teacher
    await page
      .getByRole('button', { name: 'Delete Teacher To Delete', exact: true })
      .click();
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();

    // Verify all are gone and empty state shows
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should maintain alphabetical order after deletion', async ({
    page,
  }) => {
    // Create teachers that will be alphabetically ordered
    await page.getByRole('textbox', { name: /full name/i }).fill('Alice');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('Charlie');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Handle confirmation dialog
    page.once('dialog', dialog => dialog.accept());

    // Delete the middle one (Teacher To Delete comes alphabetically between Alice and Charlie)
    // Note: "Teacher To Delete" comes after "Charlie" alphabetically, so we'll delete Alice
    await page
      .getByRole('button', { name: 'Delete Alice', exact: true })
      .click();

    // Wait for deletion to complete
    await expect(page.getByText('Alice')).not.toBeVisible();
    await expect(page.getByText('Charlie')).toBeVisible();
    await expect(page.getByText('Teacher To Delete')).toBeVisible();

    // Verify remaining teachers are still in alphabetical order
    const teacherRows = page
      .getByRole('row')
      .filter({ hasNot: page.locator('th') });
    const count = await teacherRows.count();

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await teacherRows.nth(i).textContent();
      if (text) names.push(text);
    }

    // Charlie should come before Teacher To Delete
    const charlieIndex = names.findIndex(name => name.includes('Charlie'));
    const teacherIndex = names.findIndex(name => name.includes('Teacher'));

    expect(charlieIndex).toBeGreaterThanOrEqual(0);
    expect(teacherIndex).toBeGreaterThanOrEqual(0);
    expect(charlieIndex).toBeLessThan(teacherIndex);
  });
});
