import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipLink } from '../../../src/design-system/accessibility/skip-link';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('SkipLink - Keyboard Navigation', () => {
  describe('WCAG 2.1 Compliance', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <SkipLink />
          <main id="main-content">
            <h1>Main Content</h1>
          </main>
        </div>
      );

      await assertA11y(container);
    });
  });

  describe('Keyboard Navigation Behavior', () => {
    beforeEach(() => {
      // Reset focus before each test
      document.body.focus();
    });

    it('is the first focusable element when using Tab', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SkipLink />
          <nav>
            <a href="/home">Home</a>
            <a href="/about">About</a>
          </nav>
          <main id="main-content">
            <h1>Main Content</h1>
          </main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Press Tab - skip link should receive focus first
      await user.tab();

      expect(skipLink).toHaveFocus();
    });

    it('navigates to main content when activated with Enter', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SkipLink targetId="main-content" />
          <nav>
            <a href="/home">Home</a>
            <a href="/about">About</a>
          </nav>
          <main id="main-content" tabIndex={-1}>
            <h1>Main Content</h1>
            <button>First Interactive Element</button>
          </main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Tab to skip link
      await user.tab();
      expect(skipLink).toHaveFocus();

      // Activate skip link with Enter
      await user.keyboard('{Enter}');

      // Main content should now be in view (hash changes)
      expect(window.location.hash).toBe('#main-content');
    });

    it('navigates to main content when activated with Space', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SkipLink targetId="main-content" />
          <nav>
            <a href="/home">Home</a>
          </nav>
          <main id="main-content" tabIndex={-1}>
            <h1>Main Content</h1>
          </main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Tab to skip link
      await user.tab();
      expect(skipLink).toHaveFocus();

      // Activate skip link with Space
      await user.keyboard(' ');

      // Main content should now be in view (hash changes)
      expect(window.location.hash).toBe('#main-content');
    });

    it('supports custom target ID', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SkipLink targetId="custom-main">Skip to custom area</SkipLink>
          <div id="custom-main">
            <h1>Custom Main Area</h1>
          </div>
        </div>
      );

      const skipLink = screen.getByText('Skip to custom area');

      await user.tab();
      expect(skipLink).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(window.location.hash).toBe('#custom-main');
    });

    it('supports custom children text', () => {
      render(
        <div>
          <SkipLink>Skip navigation menu</SkipLink>
          <main id="main-content">Content</main>
        </div>
      );

      expect(screen.getByText('Skip navigation menu')).toBeInTheDocument();
    });

    it('is visually hidden until focused', () => {
      render(
        <div>
          <SkipLink />
          <main id="main-content">Content</main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Should have sr-only class (screen reader only)
      expect(skipLink).toHaveClass('sr-only');

      // Should have focus styles that make it visible
      expect(skipLink).toHaveClass('focus:not-sr-only');
      expect(skipLink).toHaveClass('focus:absolute');
    });

    it('has proper ARIA role and accessible name', () => {
      render(
        <div>
          <SkipLink />
          <main id="main-content">Content</main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Skip link should be a link (implicit role)
      expect(skipLink.tagName).toBe('A');

      // Should have href pointing to target
      expect(skipLink).toHaveAttribute('href', '#main-content');

      // Accessible name comes from text content
      expect(skipLink).toHaveAccessibleName('Skip to main content');
    });

    it('bypasses navigation when activated', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SkipLink />
          <nav>
            <a href="/link1">Link 1</a>
            <a href="/link2">Link 2</a>
            <a href="/link3">Link 3</a>
          </nav>
          <main id="main-content" tabIndex={-1}>
            <h1>Main Content</h1>
            <button>First Button</button>
          </main>
        </div>
      );

      // Tab to skip link
      await user.tab();
      expect(screen.getByText('Skip to main content')).toHaveFocus();

      // Activate skip link
      await user.keyboard('{Enter}');

      // Hash should change to main content
      expect(window.location.hash).toBe('#main-content');

      // Next tab should go to first interactive element in main, not nav
      // (Note: actual focus management after hash navigation depends on browser behavior)
    });
  });

  describe('Visual Presentation', () => {
    it('has focus indicator styles', () => {
      render(
        <div>
          <SkipLink />
          <main id="main-content">Content</main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Check for focus ring classes
      expect(skipLink).toHaveClass('focus:ring-2');
      expect(skipLink).toHaveClass('focus:ring-primary');
      expect(skipLink).toHaveClass('focus:ring-offset-2');
    });

    it('has appropriate positioning when focused', () => {
      render(
        <div>
          <SkipLink />
          <main id="main-content">Content</main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Check positioning classes
      expect(skipLink).toHaveClass('focus:absolute');
      expect(skipLink).toHaveClass('focus:top-4');
      expect(skipLink).toHaveClass('focus:left-4');
      expect(skipLink).toHaveClass('focus:z-50');
    });

    it('has sufficient padding and visual prominence when focused', () => {
      render(
        <div>
          <SkipLink />
          <main id="main-content">Content</main>
        </div>
      );

      const skipLink = screen.getByText('Skip to main content');

      // Check visual prominence classes
      expect(skipLink).toHaveClass('focus:px-4');
      expect(skipLink).toHaveClass('focus:py-2');
      expect(skipLink).toHaveClass('focus:bg-primary');
      expect(skipLink).toHaveClass('focus:text-white');
      expect(skipLink).toHaveClass('focus:rounded');
      expect(skipLink).toHaveClass('focus:shadow-lg');
    });
  });

  describe('Multiple SkipLinks', () => {
    it('supports multiple skip links with different targets', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <SkipLink targetId="main-content">Skip to main</SkipLink>
          <SkipLink targetId="footer-content">Skip to footer</SkipLink>
          <nav>Navigation</nav>
          <main id="main-content">Main</main>
          <footer id="footer-content">Footer</footer>
        </div>
      );

      // First Tab - first skip link
      await user.tab();
      expect(screen.getByText('Skip to main')).toHaveFocus();

      // Second Tab - second skip link
      await user.tab();
      expect(screen.getByText('Skip to footer')).toHaveFocus();
    });
  });
});
