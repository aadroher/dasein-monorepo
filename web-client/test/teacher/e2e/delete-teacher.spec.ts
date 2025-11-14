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
    // Find and click delete button for the teacher
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

    // Verify teacher is removed from list
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();

    // Verify empty state appears
    await expect(page.getByText(/no teachers/i)).toBeVisible();
  });

  test('should persist deletion after page reload', async ({ page }) => {
    // Delete the teacher
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

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

    // Delete the middle teacher (Teacher To Delete)
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

    // Verify only the targeted teacher is deleted
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();
    await expect(page.getByText('Alice')).toBeVisible();
    await expect(page.getByText('Bob')).toBeVisible();
  });

  test('should show confirmation dialog before deleting', async ({ page }) => {
    // Set up dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toMatch(/delete|remove/i);
      await dialog.accept();
    });

    // Click delete button
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

    // Verify teacher is deleted after confirmation
    await expect(page.getByText('Teacher To Delete')).not.toBeVisible();
  });

  test('should cancel deletion when confirmation dialog is dismissed', async ({
    page,
  }) => {
    // Set up dialog handler to dismiss
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });

    // Click delete button
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

    // Verify teacher is NOT deleted after dismissing confirmation
    await expect(page.getByText('Teacher To Delete')).toBeVisible();
  });

  test('should show empty state when last teacher is deleted', async ({
    page,
  }) => {
    // Verify we start with one teacher
    await expect(page.getByText('Teacher To Delete')).toBeVisible();

    // Delete it
    const teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

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

    // Delete first teacher
    let teacherRow = page.locator('li, tr, div').filter({ hasText: 'First' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();
    await expect(page.getByText('First')).not.toBeVisible();

    // Delete second teacher
    teacherRow = page.locator('li, tr, div').filter({ hasText: 'Second' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();
    await expect(page.getByText('Second')).not.toBeVisible();

    // Delete original teacher
    teacherRow = page
      .locator('li, tr, div')
      .filter({ hasText: 'Teacher To Delete' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();
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

    // Delete the middle one (Teacher To Delete comes alphabetically between Alice and Charlie)
    // Note: "Teacher To Delete" comes after "Charlie" alphabetically, so we'll delete Alice
    const teacherRow = page.locator('li, tr, div').filter({ hasText: 'Alice' });
    await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

    // Verify remaining teachers are still in alphabetical order
    const remainingTeachers = await page
      .locator('li, tr, div')
      .allTextContents();

    // Charlie should come before Teacher To Delete
    const charlieIndex = remainingTeachers.findIndex(text =>
      text.includes('Charlie')
    );
    const teacherIndex = remainingTeachers.findIndex(text =>
      text.includes('Teacher To Delete')
    );

    expect(charlieIndex).toBeLessThan(teacherIndex);
  });
});
