import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('IconButton Component', () => {
  describe('Rendering', () => {
    it('renders icon with correct classes', () => {
      render(
        <IconButton icon={MockIcon} label="Test action" onClick={() => {}} />
      );
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveClass('w-5', 'h-5');
    });

    it('renders with primary variant by default', () => {
      render(
        <IconButton icon={MockIcon} label="Test action" onClick={() => {}} />
      );
      const button = screen.getByRole('button', { name: 'Test action' });
      expect(button).toHaveClass('text-primary-500');
    });

    it('renders with danger variant when specified', () => {
      render(
        <IconButton
          icon={MockIcon}
          label="Delete"
          onClick={() => {}}
          variant="danger"
        />
      );
      const button = screen.getByRole('button', { name: 'Delete' });
      expect(button).toHaveClass('text-red-500');
    });

    it('applies custom className alongside variant classes', () => {
      render(
        <IconButton
          icon={MockIcon}
          label="Custom"
          onClick={() => {}}
          className="custom-class"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class', 'text-primary-500');
    });

    it('has minimum touch target size (44x44px)', () => {
      render(
        <IconButton icon={MockIcon} label="Touch target" onClick={() => {}} />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    });
  });

  describe('Accessibility', () => {
    it('has aria-label matching the label prop', () => {
      render(
        <IconButton icon={MockIcon} label="Edit teacher" onClick={() => {}} />
      );
      const button = screen.getByRole('button', { name: 'Edit teacher' });
      expect(button).toHaveAttribute('aria-label', 'Edit teacher');
    });

    it('sets aria-hidden=true on icon', () => {
      render(<IconButton icon={MockIcon} label="Test" onClick={() => {}} />);
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('has type="button" to prevent form submission', () => {
      render(<IconButton icon={MockIcon} label="Test" onClick={() => {}} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('passes accessibility checks for primary variant', async () => {
      const { container } = render(
        <IconButton icon={MockIcon} label="Primary" onClick={() => {}} />
      );
      await assertA11y(container);
    });

    it('passes accessibility checks for danger variant', async () => {
      const { container } = render(
        <IconButton
          icon={MockIcon}
          label="Delete"
          onClick={() => {}}
          variant="danger"
        />
      );
      await assertA11y(container);
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styles when disabled', () => {
      render(
        <IconButton
          icon={MockIcon}
          label="Disabled"
          onClick={() => {}}
          disabled
        />
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });

    it('sets aria-disabled when disabled', () => {
      render(
        <IconButton
          icon={MockIcon}
          label="Disabled"
          onClick={() => {}}
          disabled
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={MockIcon}
          label="Disabled"
          onClick={handleClick}
          disabled
        />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Focus Styles', () => {
    it('includes focus-visible ring classes', () => {
      render(
        <IconButton icon={MockIcon} label="Focusable" onClick={() => {}} />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'focus-visible:ring-2',
        'focus-visible:outline-none'
      );
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton icon={MockIcon} label="Click me" onClick={handleClick} />
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when activated with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton icon={MockIcon} label="Press me" onClick={handleClick} />
      );
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when activated with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton icon={MockIcon} label="Press me" onClick={handleClick} />
      );
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
