import { test, expect } from '@playwright/test';

test.describe('View Teachers List (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure clean state
    await page.goto('http://localhost:5173');

    // Clear any existing data
    await page.evaluate(() => {
      indexedDB.deleteDatabase('TeacherCRUD');
    });

    await page.reload();
  });

  test('should display empty state when no teachers exist', async ({
    page,
  }) => {
    // Verify empty state message is visible
    await expect(
      page.getByText(/no teachers|no teachers yet|empty/i)
    ).toBeVisible();

    // Verify no teacher entries are shown
    const teacherListItems = page.locator('[role="list"] [role="listitem"]');
    await expect(teacherListItems).toHaveCount(0);
  });

  test('should display teachers list when teachers exist', async ({ page }) => {
    // Create some teachers
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

    // Verify list shows both teachers
    const teacherNames = await page
      .locator('[role="list"] [role="listitem"]')
      .allTextContents();

    expect(teacherNames.some(name => name.includes('Alice'))).toBeTruthy();
    expect(teacherNames.some(name => name.includes('Bob'))).toBeTruthy();

    // Verify empty state is not visible
    await expect(
      page.getByText(/no teachers|no teachers yet|empty/i)
    ).not.toBeVisible();
  });

  test('should display teachers in alphabetical order', async ({ page }) => {
    // Create teachers in non-alphabetical order
    await page.getByRole('textbox', { name: /full name/i }).fill('Zara Wilson');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Zara Wilson')).toBeVisible();

    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Alice Johnson');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Alice Johnson')).toBeVisible();

    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Michael Chen');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Michael Chen')).toBeVisible();

    // Verify alphabetical order
    const teacherListItems = page.locator('[role="list"] [role="listitem"]');
    const count = await teacherListItems.count();

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await teacherListItems.nth(i).textContent();
      if (text) names.push(text);
    }

    // Check that Alice appears before Michael, and Michael before Zara
    const aliceIndex = names.findIndex(name => name.includes('Alice Johnson'));
    const michaelIndex = names.findIndex(name => name.includes('Michael Chen'));
    const zaraIndex = names.findIndex(name => name.includes('Zara Wilson'));

    expect(aliceIndex).toBeLessThan(michaelIndex);
    expect(michaelIndex).toBeLessThan(zaraIndex);
  });

  test('should maintain alphabetical order with case-insensitive sorting', async ({
    page,
  }) => {
    // Create teachers with mixed case names
    await page.getByRole('textbox', { name: /full name/i }).fill('alice');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('Bob');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('CHARLIE');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Get all list items
    const teacherListItems = page.locator('[role="list"] [role="listitem"]');
    const count = await teacherListItems.count();

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await teacherListItems.nth(i).textContent();
      if (text) names.push(text);
    }

    // Verify alphabetical order regardless of case
    const aliceIndex = names.findIndex(name =>
      name.toLowerCase().includes('alice')
    );
    const bobIndex = names.findIndex(name =>
      name.toLowerCase().includes('bob')
    );
    const charlieIndex = names.findIndex(name =>
      name.toLowerCase().includes('charlie')
    );

    expect(aliceIndex).toBeLessThan(bobIndex);
    expect(bobIndex).toBeLessThan(charlieIndex);
  });

  test('should persist list order after reload', async ({ page }) => {
    // Create teachers in non-alphabetical order
    await page.getByRole('textbox', { name: /full name/i }).fill('Zoe');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('Alice');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('Mike');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Reload the page
    await page.reload();

    // Wait for list to load
    await expect(page.getByText('Alice')).toBeVisible();

    // Verify alphabetical order is maintained
    const teacherListItems = page.locator('[role="list"] [role="listitem"]');
    const count = await teacherListItems.count();

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await teacherListItems.nth(i).textContent();
      if (text) names.push(text);
    }

    const aliceIndex = names.findIndex(name => name.includes('Alice'));
    const mikeIndex = names.findIndex(name => name.includes('Mike'));
    const zoeIndex = names.findIndex(name => name.includes('Zoe'));

    expect(aliceIndex).toBeLessThan(mikeIndex);
    expect(mikeIndex).toBeLessThan(zoeIndex);
  });

  test('should handle duplicate names in the list', async ({ page }) => {
    // Create multiple teachers with the same name
    await page.getByRole('textbox', { name: /full name/i }).fill('John Smith');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('John Smith').first()).toBeVisible();

    await page.getByRole('textbox', { name: /full name/i }).fill('John Smith');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    await page.getByRole('textbox', { name: /full name/i }).fill('John Smith');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Verify all three instances are displayed
    const johnSmithItems = page.getByText('John Smith');
    await expect(johnSmithItems).toHaveCount(3);
  });

  test('should return to empty state after all teachers are deleted', async ({
    page,
  }) => {
    // Create a teacher
    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Test Teacher');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();
    await expect(page.getByText('Test Teacher')).toBeVisible();

    // Verify list is not empty
    await expect(
      page.getByText(/no teachers|no teachers yet|empty/i)
    ).not.toBeVisible();

    // Delete the teacher
    await page
      .getByRole('button', { name: /delete|remove/i })
      .first()
      .click();

    // Verify empty state is shown again
    await expect(
      page.getByText(/no teachers|no teachers yet|empty/i)
    ).toBeVisible();
  });

  test('should display list with proper semantic structure', async ({
    page,
  }) => {
    // Create a teacher
    await page
      .getByRole('textbox', { name: /full name/i })
      .fill('Semantic Test');
    await page
      .getByRole('button', { name: /add teacher|create teacher/i })
      .click();

    // Verify list has proper ARIA role
    const list = page.locator('[role="list"]');
    await expect(list).toBeVisible();

    // Verify list items have proper ARIA role
    const listItems = page.locator('[role="list"] [role="listitem"]');
    await expect(listItems).toHaveCount(1);
  });

  test('should show loading state briefly when loading teachers', async ({
    page,
  }) => {
    // This test may need adjustment based on actual loading implementation
    // Navigate to page
    await page.goto('http://localhost:5173');

    // Check if loading indicator appears (may be too fast to catch in some cases)
    const loadingIndicator = page.getByText(/loading/i);

    // Either loading appears or list loads immediately
    const hasLoading = await loadingIndicator.isVisible().catch(() => false);

    if (hasLoading) {
      // Wait for loading to disappear
      await expect(loadingIndicator).not.toBeVisible();
    }

    // Verify either empty state or list is shown after loading
    const emptyState = page.getByText(/no teachers|no teachers yet|empty/i);
    const list = page.locator('[role="list"]');

    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    const hasList = await list.isVisible().catch(() => false);

    expect(hasEmptyState || hasList).toBeTruthy();
  });
});
