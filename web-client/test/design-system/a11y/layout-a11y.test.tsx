import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { assertA11y } from '../../../src/test/a11y/assertA11y';
import { AppLayout } from '../../../src/design-system/layout/app-layout';
import { SkipLink } from '../../../src/design-system/accessibility/skip-link';

describe('Layout Accessibility', () => {
  describe('AppLayout - WCAG 2.1 AA Compliance', () => {
    it('has no accessibility violations with all sections', async () => {
      const { container } = render(
        <AppLayout
          header={
            <div>
              <h1>Site Title</h1>
            </div>
          }
          navigation={
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          }
          footer={<p>&copy; 2025 Company</p>}
        >
          <h2>Page Heading</h2>
          <p>Main content area</p>
        </AppLayout>
      );

      await assertA11y(container);
    });

    it('has no violations with minimal content', async () => {
      const { container } = render(
        <AppLayout>
          <div>Minimal content</div>
        </AppLayout>
      );

      await assertA11y(container);
    });

    it('contains semantic header landmark', () => {
      const { container } = render(
        <AppLayout header={<div>Header</div>}>
          <div>Content</div>
        </AppLayout>
      );

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('contains semantic nav landmark with aria-label', () => {
      const { container } = render(
        <AppLayout navigation={<div>Nav</div>}>
          <div>Content</div>
        </AppLayout>
      );

      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label');
    });

    it('contains semantic main landmark', () => {
      const { container } = render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );

      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('contains semantic footer landmark', () => {
      const { container } = render(
        <AppLayout footer={<div>Footer</div>}>
          <div>Content</div>
        </AppLayout>
      );

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('main landmark has id for skip link', () => {
      const { container } = render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );

      const main = container.querySelector('main');
      expect(main).toHaveAttribute('id', 'main-content');
    });
  });

  describe('SkipLink - Keyboard Navigation', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<SkipLink />);
      await assertA11y(container);
    });

    it('is a valid link element', () => {
      const { container } = render(<SkipLink />);
      const link = container.querySelector('a');

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
    });

    it('links to main-content by default', () => {
      const { container } = render(<SkipLink />);
      const link = container.querySelector('a');

      expect(link).toHaveAttribute('href', '#main-content');
    });

    it('accepts custom target id', () => {
      const { container } = render(<SkipLink targetId="custom-target" />);
      const link = container.querySelector('a');

      expect(link).toHaveAttribute('href', '#custom-target');
    });

    it('has descriptive text content', () => {
      const { container } = render(<SkipLink />);
      const link = container.querySelector('a');

      expect(link).toHaveTextContent('Skip to main content');
    });

    it('accepts custom text', () => {
      const { container } = render(<SkipLink>Skip navigation</SkipLink>);
      const link = container.querySelector('a');

      expect(link).toHaveTextContent('Skip navigation');
    });

    it('is visually hidden until focused (sr-only class)', () => {
      const { container } = render(<SkipLink />);
      const link = container.querySelector('a');

      expect(link).toHaveClass('sr-only');
    });

    it('becomes visible on focus', () => {
      const { container } = render(<SkipLink />);
      const link = container.querySelector('a');

      // Check for focus-visible utility classes
      expect(link).toHaveClass('focus:not-sr-only');
      expect(link).toHaveClass('focus:absolute');
    });
  });

  describe('Landmark Structure', () => {
    it('maintains proper landmark hierarchy', () => {
      const { container } = render(
        <AppLayout
          header={<div>Header</div>}
          navigation={<div>Nav</div>}
          footer={<div>Footer</div>}
        >
          <div>Main</div>
        </AppLayout>
      );

      // Each landmark should appear exactly once
      const headers = container.querySelectorAll('header');
      const navs = container.querySelectorAll('nav');
      const mains = container.querySelectorAll('main');
      const footers = container.querySelectorAll('footer');

      expect(headers).toHaveLength(1);
      expect(navs).toHaveLength(1);
      expect(mains).toHaveLength(1);
      expect(footers).toHaveLength(1);
    });

    it('ensures main landmark is always present', () => {
      const { container } = render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );

      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('allows optional header, nav, and footer landmarks', () => {
      const { container } = render(
        <AppLayout>
          <div>Content only</div>
        </AppLayout>
      );

      expect(container.querySelector('header')).not.toBeInTheDocument();
      expect(container.querySelector('nav')).not.toBeInTheDocument();
      expect(container.querySelector('footer')).not.toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('skip link appears before main content in DOM order', () => {
      const { container } = render(
        <AppLayout>
          <div>Main content</div>
        </AppLayout>
      );

      const skipLink = container.querySelector('a[href="#main-content"]');
      const main = container.querySelector('main');

      expect(skipLink).toBeInTheDocument();
      expect(main).toBeInTheDocument();

      // Skip link should be earlier in DOM
      const allElements = Array.from(container.querySelectorAll('*'));
      const skipLinkIndex = allElements.indexOf(skipLink!);
      const mainIndex = allElements.indexOf(main!);

      expect(skipLinkIndex).toBeLessThan(mainIndex);
    });
  });
});
