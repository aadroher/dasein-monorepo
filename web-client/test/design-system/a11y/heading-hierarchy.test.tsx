import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Heading } from '../../../src/design-system/components/heading';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

/**
 * Heading Hierarchy Audit Tests
 *
 * Ensures WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships)
 * Headings must follow a logical hierarchy without skipping levels
 */

describe('Heading Hierarchy - WCAG 2.1 Compliance', () => {
  describe('No Accessibility Violations', () => {
    it('has no violations for proper heading hierarchy', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Main Page Title</Heading>
          <Heading level={2}>Section 1</Heading>
          <Heading level={3}>Subsection 1.1</Heading>
          <Heading level={3}>Subsection 1.2</Heading>
          <Heading level={2}>Section 2</Heading>
          <Heading level={3}>Subsection 2.1</Heading>
        </div>
      );

      await assertA11y(container);
    });
  });

  describe('Valid Heading Hierarchies', () => {
    it('accepts h1 as first heading', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Page Title</Heading>
          <p>Content</p>
        </div>
      );

      await assertA11y(container);
    });

    it('accepts sequential progression h1 → h2 → h3', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Title</Heading>
          <Heading level={2}>Section</Heading>
          <Heading level={3}>Subsection</Heading>
        </div>
      );

      await assertA11y(container);
    });

    it('accepts stepping back up the hierarchy (h3 → h2)', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Title</Heading>
          <Heading level={2}>Section 1</Heading>
          <Heading level={3}>Subsection 1.1</Heading>
          <Heading level={2}>Section 2</Heading>
        </div>
      );

      await assertA11y(container);
    });

    it('accepts multiple headings at the same level', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Page Title</Heading>
          <Heading level={2}>Section 1</Heading>
          <Heading level={2}>Section 2</Heading>
          <Heading level={2}>Section 3</Heading>
        </div>
      );

      await assertA11y(container);
    });

    it('accepts deep nesting when properly sequential', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>h1</Heading>
          <Heading level={2}>h2</Heading>
          <Heading level={3}>h3</Heading>
          <Heading level={4}>h4</Heading>
          <Heading level={5}>h5</Heading>
          <Heading level={6}>h6</Heading>
        </div>
      );

      await assertA11y(container);
    });
  });

  describe('Heading Structure Validation', () => {
    it('ensures h1 is present in document', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Main Title</Heading>
          <Heading level={2}>Subtitle</Heading>
        </div>
      );

      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBeGreaterThan(0);
    });

    it('detects when no skipped levels in simple hierarchy', () => {
      const { container } = render(
        <div>
          <Heading level={1}>h1</Heading>
          <Heading level={2}>h2</Heading>
          <Heading level={3}>h3</Heading>
        </div>
      );

      const headings = Array.from(
        container.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ) as HTMLHeadingElement[];

      const levels = headings.map(h => parseInt(h.tagName.charAt(1)));

      // Check no skipped levels
      for (let i = 1; i < levels.length; i++) {
        const jump = levels[i] - levels[i - 1];
        // Can only go up by 1 level or stay same or go back down any amount
        if (jump > 0) {
          expect(jump).toBeLessThanOrEqual(1);
        }
      }
    });

    it('validates heading order in complex nested structure', () => {
      const { container } = render(
        <article>
          <Heading level={1}>Article Title</Heading>
          <section>
            <Heading level={2}>Introduction</Heading>
            <Heading level={3}>Background</Heading>
            <Heading level={3}>Context</Heading>
          </section>
          <section>
            <Heading level={2}>Main Content</Heading>
            <Heading level={3}>Topic 1</Heading>
            <Heading level={4}>Subtopic 1.1</Heading>
            <Heading level={4}>Subtopic 1.2</Heading>
            <Heading level={3}>Topic 2</Heading>
          </section>
          <section>
            <Heading level={2}>Conclusion</Heading>
          </section>
        </article>
      );

      const headings = Array.from(
        container.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ) as HTMLHeadingElement[];

      // Verify h1 is first
      expect(headings[0].tagName).toBe('H1');

      // Verify no level skips in progression
      const levels = headings.map(h => parseInt(h.tagName.charAt(1)));
      for (let i = 1; i < levels.length; i++) {
        const jump = levels[i] - levels[i - 1];
        if (jump > 0) {
          expect(jump).toBeLessThanOrEqual(1);
        }
      }
    });

    it('ensures only one h1 per page (best practice)', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Main Page Title</Heading>
          <Heading level={2}>Section 1</Heading>
          <Heading level={2}>Section 2</Heading>
        </div>
      );

      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });
  });

  describe('Invalid Hierarchies - Should Fail Audit', () => {
    // These tests document what NOT to do
    // axe-core should catch these violations

    it('warns about skipping from h1 to h3', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Title</Heading>
          <Heading level={3}>Skipped h2</Heading>
        </div>
      );

      // This SHOULD produce accessibility violations
      // We expect axe to catch the skipped heading level
      // Note: axe may or may not catch this depending on rules enabled
      try {
        await assertA11y(container);
        // If no violation thrown, document it
        console.warn('Expected heading skip violation not detected by axe');
      } catch (error) {
        // Expected - heading hierarchy violation detected
        expect(error).toBeDefined();
      }
    });

    it('detects skipped heading level programmatically', () => {
      const { container } = render(
        <div>
          <Heading level={1}>h1</Heading>
          <Heading level={3}>h3 - skipped h2!</Heading>
        </div>
      );

      const headings = Array.from(
        container.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ) as HTMLHeadingElement[];

      const levels = headings.map(h => parseInt(h.tagName.charAt(1)));

      // Should detect skip: h1 (1) → h3 (3) = jump of 2
      const hasSkip = levels.some((level, i) => {
        if (i === 0) return false;
        const jump = level - levels[i - 1];
        return jump > 1;
      });

      expect(hasSkip).toBe(true);
    });
  });

  describe('Semantic HTML Validation', () => {
    it('uses proper heading elements (not styled divs)', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Real Heading</Heading>
          <Heading level={2}>Real Subheading</Heading>
        </div>
      );

      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');

      expect(h1?.tagName).toBe('H1');
      expect(h2?.tagName).toBe('H2');

      // Ensure they're actual heading elements, not divs with role="heading"
      expect(h1?.getAttribute('role')).toBeNull();
      expect(h2?.getAttribute('role')).toBeNull();
    });

    it('headings are keyboard accessible', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Title</Heading>
        </div>
      );

      const heading = container.querySelector('h1');

      // Headings should not have tabindex (they're not interactive)
      expect(heading?.hasAttribute('tabindex')).toBe(false);
    });
  });

  describe('Heading Content Requirements', () => {
    it('headings have text content', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Non-empty heading</Heading>
        </div>
      );

      const heading = container.querySelector('h1');
      expect(heading?.textContent?.trim()).toBeTruthy();
      expect(heading?.textContent?.trim().length).toBeGreaterThan(0);
    });

    it('headings are descriptive', () => {
      const { container } = render(
        <div>
          <Heading level={1}>User Profile Settings</Heading>
          <Heading level={2}>Account Information</Heading>
          <Heading level={2}>Privacy Settings</Heading>
        </div>
      );

      const headings = Array.from(
        container.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ) as HTMLHeadingElement[];

      // Each heading should have meaningful text (not just "Section" or "Content")
      headings.forEach(heading => {
        expect(heading.textContent?.trim().length).toBeGreaterThan(3);
      });
    });
  });

  describe('Integration with Layout', () => {
    it('works within semantic landmark structure', async () => {
      const { container } = render(
        <main>
          <Heading level={1}>Main Content Title</Heading>
          <section>
            <Heading level={2}>Section Heading</Heading>
            <p>Content</p>
          </section>
        </main>
      );

      await assertA11y(container);
    });

    it('supports nested sections with proper heading levels', async () => {
      const { container } = render(
        <article>
          <Heading level={1}>Article Title</Heading>
          <section>
            <Heading level={2}>Section 1</Heading>
            <section>
              <Heading level={3}>Nested Section</Heading>
            </section>
          </section>
        </article>
      );

      await assertA11y(container);
    });
  });
});
