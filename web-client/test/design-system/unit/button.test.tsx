import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../../../src/design-system/components/button';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole('button', { name: 'Click me' })
      ).toBeInTheDocument();
    });

    it('applies primary variant classes by default', () => {
      render(<Button>Primary Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary-500');
    });

    it('applies secondary variant classes when specified', () => {
      render(<Button variant="secondary">Secondary Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary-500');
    });

    it('applies tertiary variant classes when specified', () => {
      render(<Button variant="tertiary">Tertiary Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'border-primary-500');
    });

    it('applies medium size classes by default', () => {
      render(<Button>Medium Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2');
    });

    it('applies small size classes when specified', () => {
      render(<Button size="small">Small Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5');
    });

    it('applies large size classes when specified', () => {
      render(<Button size="large">Large Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3');
    });

    it('applies custom className alongside variant classes', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class', 'bg-primary-500');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled opacity when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });

  describe('Focus Styles', () => {
    it('includes focus-visible ring classes', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'focus-visible:ring-2',
        'focus-visible:outline-none'
      );
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks for primary variant', async () => {
      const { container } = render(<Button>Primary Accessible</Button>);
      await assertA11y(container);
    });

    it('passes accessibility checks for secondary variant', async () => {
      const { container } = render(
        <Button variant="secondary">Secondary Accessible</Button>
      );
      await assertA11y(container);
    });

    it('passes accessibility checks for tertiary variant', async () => {
      const { container } = render(
        <Button variant="tertiary">Tertiary Accessible</Button>
      );
      await assertA11y(container);
    });

    it('passes accessibility checks when disabled', async () => {
      const { container } = render(
        <Button disabled>Disabled Accessible</Button>
      );
      await assertA11y(container);
    });

    it('maintains semantic button role', () => {
      render(<Button>Semantic Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards standard button props', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} type="submit">
          Submit
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('forwards aria attributes', () => {
      render(<Button aria-label="Special action">Icon</Button>);
      expect(
        screen.getByRole('button', { name: 'Special action' })
      ).toBeInTheDocument();
    });
  });
});
