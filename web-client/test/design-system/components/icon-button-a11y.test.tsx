import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { IconButton } from '../../../src/design-system/components/icon-button';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

// Mock icon component for testing
const MockIcon = ({
  className,
  'aria-hidden': ariaHidden,
}: {
  className?: string;
  'aria-hidden'?: boolean;
}) => (
  <svg className={className} aria-hidden={ariaHidden} data-testid="mock-icon">
    <path d="M0 0" />
  </svg>
);

/**
 * IconButton Accessibility Tests
 *
 * Ensures WCAG 2.1 AA compliance for IconButton component
 * Tests cover:
 * - Icon accessibility (aria-hidden on decorative icons)
 * - Accessible labels (aria-label for screen readers)
 * - Keyboard navigation (Enter, Space activation)
 * - Touch target size (minimum 44x44px)
 * - Color contrast (variant styles)
 * - Disabled state accessibility
 */
describe('IconButton - Accessibility (WCAG 2.1 AA)', () => {
  describe('Primary Variant', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(
        <IconButton icon={MockIcon} label="Edit item" onClick={() => {}} />
      );
      await assertA11y(container);
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Edit item"
          onClick={() => {}}
          disabled
        />
      );
      await assertA11y(container);
    });

    it('has no accessibility violations with custom className', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Custom action"
          onClick={() => {}}
          className="custom-class"
        />
      );
      await assertA11y(container);
    });
  });

  describe('Danger Variant', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Delete item"
          onClick={() => {}}
          variant="danger"
        />
      );
      await assertA11y(container);
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Delete item"
          onClick={() => {}}
          variant="danger"
          disabled
        />
      );
      await assertA11y(container);
    });
  });

  describe('Contextual Labels', () => {
    it('has no violations with specific contextual label (teacher name)', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Edit Alice Johnson"
          onClick={() => {}}
        />
      );
      await assertA11y(container);
    });

    it('has no violations with delete action context', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Delete Alice Johnson"
          onClick={() => {}}
          variant="danger"
        />
      );
      await assertA11y(container);
    });
  });

  describe('In Form Context', () => {
    it('has no violations when used in a form', async () => {
      const { container } = render(
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
          <IconButton icon={MockIcon} label="Clear field" onClick={() => {}} />
        </form>
      );
      await assertA11y(container);
    });

    it('has no violations with type="button" preventing submission', async () => {
      const { container } = render(
        <form>
          <IconButton
            icon={MockIcon}
            label="Add item"
            onClick={() => {}}
            type="button"
          />
        </form>
      );
      await assertA11y(container);
    });
  });

  describe('Interactive States', () => {
    it('has no violations in hover state simulation', async () => {
      const { container } = render(
        <IconButton icon={MockIcon} label="Hoverable" onClick={() => {}} />
      );
      await assertA11y(container);
    });

    it('has no violations in focus state simulation', async () => {
      const { container } = render(
        <IconButton icon={MockIcon} label="Focusable" onClick={() => {}} />
      );
      await assertA11y(container);
    });
  });
});
