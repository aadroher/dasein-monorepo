import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from '../../../src/design-system/components/link';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('Link Component', () => {
  describe('Rendering', () => {
    it('renders anchor element', () => {
      render(<Link href="/test">Test Link</Link>);
      expect(
        screen.getByRole('link', { name: 'Test Link' })
      ).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<Link href="/">Click here</Link>);
      expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('applies href attribute', () => {
      render(<Link href="/about">About</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
    });
  });

  describe('Variants', () => {
    it('applies default variant classes by default', () => {
      render(<Link href="/default">Default Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-primary-500', 'underline');
    });

    it('applies subtle variant classes when specified', () => {
      render(
        <Link href="/subtle" variant="subtle">
          Subtle Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-text-primary', 'no-underline');
    });

    it('includes hover classes for default variant', () => {
      render(<Link href="/hover">Hover Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('hover:text-primary-600', 'hover:no-underline');
    });

    it('includes hover classes for subtle variant', () => {
      render(
        <Link href="/subtle" variant="subtle">
          Subtle
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('hover:text-primary-500', 'hover:underline');
    });
  });

  describe('Focus Styles', () => {
    it('includes focus-visible ring classes', () => {
      render(<Link href="/focus">Focus Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-primary-400'
      );
    });

    it('includes focus ring offset', () => {
      render(<Link href="/offset">Offset Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus-visible:ring-offset-2');
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className alongside variant classes', () => {
      render(
        <Link href="/custom" className="custom-link">
          Custom
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-link', 'text-primary-500');
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks for default variant', async () => {
      const { container } = render(<Link href="/test">Accessible Link</Link>);
      await assertA11y(container);
    });

    it('passes accessibility checks for subtle variant', async () => {
      const { container } = render(
        <Link href="/test" variant="subtle">
          Subtle Accessible Link
        </Link>
      );
      await assertA11y(container);
    });

    it('passes accessibility checks with external link', async () => {
      const { container } = render(
        <Link
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          External Link
        </Link>
      );
      await assertA11y(container);
    });

    it('maintains semantic link role', () => {
      render(<Link href="/semantic">Semantic Link</Link>);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards standard anchor props', () => {
      render(
        <Link href="https://example.com" target="_blank" rel="noopener">
          External
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener');
    });

    it('forwards aria attributes', () => {
      render(
        <Link href="/aria" aria-label="Descriptive label">
          Icon Link
        </Link>
      );
      expect(
        screen.getByRole('link', { name: 'Descriptive label' })
      ).toBeInTheDocument();
    });

    it('forwards data attributes', () => {
      render(
        <Link href="/data" data-testid="test-link">
          Data Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('data-testid', 'test-link');
    });
  });

  describe('Transition Classes', () => {
    it('includes transition-colors duration class', () => {
      render(<Link href="/transition">Transition Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('transition-colors', 'duration-150');
    });
  });
});
