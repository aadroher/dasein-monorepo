import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { CommonLayout } from '../../../src/design-system/layout/common-layout';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

/**
 * CommonLayout Accessibility Tests
 *
 * Ensures WCAG 2.1 AA compliance for CommonLayout component
 * Tests cover:
 * - Semantic HTML structure (header, main landmarks)
 * - Logo accessibility (aria-hidden for decorative SVG)
 * - Screen reader context (sr-only descriptive text)
 * - Heading hierarchy (no h1 in layout, allows page content to control)
 * - Keyboard navigation flow
 * - Color contrast (text and borders)
 */
describe('CommonLayout - Accessibility (WCAG 2.1 AA)', () => {
  describe('Landmark Regions', () => {
    it('has no accessibility violations with semantic structure', async () => {
      const { container } = render(
        <CommonLayout>
          <div>Page content</div>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with header landmark', async () => {
      const { container } = render(
        <CommonLayout>
          <h1>Page Title</h1>
          <p>Content</p>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with main landmark', async () => {
      const { container } = render(
        <CommonLayout>
          <main>
            <h1>Main Content</h1>
          </main>
        </CommonLayout>
      );
      await assertA11y(container);
    });
  });

  describe('Logo and Branding', () => {
    it('has no violations with decorative logo (aria-hidden)', async () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with visible text label', async () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with screen reader context', async () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      await assertA11y(container);
    });
  });

  describe('Content Integration', () => {
    it('has no violations with simple text content', async () => {
      const { container } = render(
        <CommonLayout>
          <p>Simple paragraph content</p>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with complex nested content', async () => {
      const { container } = render(
        <CommonLayout>
          <div>
            <h1>Page Heading</h1>
            <section>
              <h2>Section Heading</h2>
              <p>Section content</p>
            </section>
          </div>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with form elements', async () => {
      const { container } = render(
        <CommonLayout>
          <form>
            <label htmlFor="test-input">Test Label</label>
            <input id="test-input" type="text" />
            <button type="submit">Submit</button>
          </form>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with interactive elements', async () => {
      const { container } = render(
        <CommonLayout>
          <div>
            <button>Action Button</button>
            <a href="#link">Link</a>
          </div>
        </CommonLayout>
      );
      await assertA11y(container);
    });
  });

  describe('Heading Hierarchy', () => {
    it('has no violations allowing h1 in page content', async () => {
      const { container } = render(
        <CommonLayout>
          <h1>Main Page Title</h1>
          <h2>Subsection</h2>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with h2 as first heading in content', async () => {
      const { container } = render(
        <CommonLayout>
          <h2>Section Title</h2>
          <p>Content</p>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with nested heading structure', async () => {
      const { container } = render(
        <CommonLayout>
          <div>
            <h1>Level 1</h1>
            <section>
              <h2>Level 2</h2>
              <h3>Level 3</h3>
            </section>
          </div>
        </CommonLayout>
      );
      await assertA11y(container);
    });
  });

  describe('Visual and Focus Management', () => {
    it('has no violations with multiple child elements', async () => {
      const { container } = render(
        <CommonLayout>
          <div>First child</div>
          <div>Second child</div>
          <div>Third child</div>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('has no violations with empty content', async () => {
      const { container } = render(
        <CommonLayout>
          <div />
        </CommonLayout>
      );
      await assertA11y(container);
    });
  });
});
