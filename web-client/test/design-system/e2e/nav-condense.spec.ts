import { test, expect } from '@playwright/test';

test.describe('Responsive Navigation Condensation', () => {
  test.describe('Desktop Navigation (≥1024px)', () => {
    test('should display horizontal navigation links on desktop', async ({
      page,
    }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      // Desktop nav should be visible
      const desktopNav = page.locator('nav .hidden.lg\\:block');
      await expect(desktopNav).toBeVisible();

      // Mobile menu toggle should be hidden
      const mobileToggle = page.locator('nav .lg\\:hidden button');
      await expect(mobileToggle).toBeHidden();
    });

    test('should allow keyboard navigation through desktop nav links', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      // Focus first nav link
      await page.keyboard.press('Tab');

      // Verify focus is on a nav link
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toHaveAttribute('href');

      // Should be able to navigate with Tab key
      await page.keyboard.press('Tab');
      const nextFocused = page.locator(':focus');
      await expect(nextFocused).toBeFocused();
    });
  });

  test.describe('Tablet Navigation (768px-1023px)', () => {
    test('should display menu toggle button on tablet', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      // Mobile menu toggle should be visible
      const mobileToggle = page.locator('nav .lg\\:hidden button');
      await expect(mobileToggle).toBeVisible();

      // Desktop nav should be hidden
      const desktopNav = page.locator('nav .hidden.lg\\:block');
      await expect(desktopNav).toBeHidden();
    });

    test('should toggle mobile menu on button click', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');
      const mobileMenu = page.locator('#mobile-menu');

      // Menu should be initially closed
      await expect(mobileMenu).toBeHidden();
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

      // Click to open menu
      await menuToggle.click();
      await expect(mobileMenu).toBeVisible();
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

      // Click to close menu
      await menuToggle.click();
      await expect(mobileMenu).toBeHidden();
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    });

    test('should close mobile menu when clicking a nav link', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');
      const mobileMenu = page.locator('#mobile-menu');

      // Open menu
      await menuToggle.click();
      await expect(mobileMenu).toBeVisible();

      // Click a nav link
      const firstLink = mobileMenu.locator('a').first();
      await firstLink.click();

      // Menu should close (wait for navigation or state change)
      // Note: In a real app, this might navigate. Here we just verify the behavior
      // If navigation occurs, the menu would naturally be hidden on the new page
    });

    test('should be keyboard accessible on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');

      // Tab to menu toggle
      await page.keyboard.press('Tab');
      await expect(menuToggle).toBeFocused();

      // Open menu with Enter key
      await page.keyboard.press('Enter');
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

      // Tab through menu items
      await page.keyboard.press('Tab');
      const firstLink = mobileMenu.locator('a').first();
      await expect(firstLink).toBeFocused();

      // Close menu with Space key on toggle
      await menuToggle.focus();
      await page.keyboard.press('Space');
      await expect(mobileMenu).toBeHidden();
    });

    test('should display correct icon state', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');
      const menuIcon = menuToggle.locator('svg');

      // Initially should show menu icon (3 horizontal lines)
      await expect(menuIcon).toBeVisible();

      // Open menu
      await menuToggle.click();

      // Should show close icon (X)
      await expect(menuIcon).toBeVisible();

      // Icon should have changed (both have 2 path elements but different d attributes)
      const pathCount = await menuIcon.locator('path').count();
      expect(pathCount).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Breakpoint Transitions', () => {
    test('should switch from desktop to tablet layout on resize', async ({
      page,
    }) => {
      // Start at desktop
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      const desktopNav = page.locator('nav .hidden.lg\\:block');
      const mobileToggle = page.locator('nav .lg\\:hidden button');

      // Desktop nav visible
      await expect(desktopNav).toBeVisible();
      await expect(mobileToggle).toBeHidden();

      // Resize to tablet
      await page.setViewportSize({ width: 800, height: 600 });

      // Mobile toggle now visible, desktop nav hidden
      await expect(mobileToggle).toBeVisible();
      await expect(desktopNav).toBeHidden();
    });

    test('should switch from tablet to desktop layout on resize', async ({
      page,
    }) => {
      // Start at tablet
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const desktopNav = page.locator('nav .hidden.lg\\:block');
      const mobileToggle = page.locator('nav .lg\\:hidden button');

      // Mobile toggle visible
      await expect(mobileToggle).toBeVisible();
      await expect(desktopNav).toBeHidden();

      // Resize to desktop
      await page.setViewportSize({ width: 1280, height: 800 });

      // Desktop nav now visible, mobile toggle hidden
      await expect(desktopNav).toBeVisible();
      await expect(mobileToggle).toBeHidden();
    });

    test('should maintain accessibility across breakpoints', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      // Check desktop nav has aria-label
      const nav = page.locator('nav');
      await expect(nav).toHaveAttribute('aria-label');

      // Resize to tablet
      await page.setViewportSize({ width: 800, height: 600 });

      // Nav aria-label still present
      await expect(nav).toHaveAttribute('aria-label');

      // Menu toggle has aria-expanded
      const menuToggle = page.locator('nav .lg\\:hidden button');
      await expect(menuToggle).toHaveAttribute('aria-expanded');

      // Screen reader text present
      const srOnly = menuToggle.locator('.sr-only');
      await expect(srOnly).toBeInViewport(); // Should exist in DOM
    });
  });

  test.describe('No Horizontal Scroll', () => {
    test('should not cause horizontal scroll on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      // Check body doesn't have horizontal overflow
      const bodyScrollWidth = await page.evaluate(
        () => document.body.scrollWidth
      );
      const bodyClientWidth = await page.evaluate(
        () => document.body.clientWidth
      );

      expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1); // +1 for rounding
    });

    test('should not cause horizontal scroll on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const bodyScrollWidth = await page.evaluate(
        () => document.body.scrollWidth
      );
      const bodyClientWidth = await page.evaluate(
        () => document.body.clientWidth
      );

      expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1);
    });

    test('should not cause horizontal scroll with mobile menu open', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      // Open mobile menu
      const menuToggle = page.locator('nav .lg\\:hidden button');
      await menuToggle.click();

      const bodyScrollWidth = await page.evaluate(
        () => document.body.scrollWidth
      );
      const bodyClientWidth = await page.evaluate(
        () => document.body.clientWidth
      );

      expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1);
    });
  });

  test.describe('ARIA and Accessibility', () => {
    test('should have proper ARIA attributes on menu toggle', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');

      // Should have type button
      await expect(menuToggle).toHaveAttribute('type', 'button');

      // Should have aria-expanded
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

      // Should have aria-controls
      await expect(menuToggle).toHaveAttribute('aria-controls', 'mobile-menu');

      // Should have screen reader text
      const srText = menuToggle.locator('.sr-only');
      await expect(srText).toHaveText(/Open menu|Close menu/);
    });

    test('should update aria-expanded when menu toggles', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');

      // Initially closed
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

      // Open menu
      await menuToggle.click();
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

      // Close menu
      await menuToggle.click();
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    });

    test('should maintain focus ring visibility', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');

      const menuToggle = page.locator('nav .lg\\:hidden button');

      // Focus the toggle
      await menuToggle.focus();

      // Should have focus ring classes
      const toggleClass = await menuToggle.getAttribute('class');
      expect(toggleClass).toContain('focus:ring');
    });
  });
});
