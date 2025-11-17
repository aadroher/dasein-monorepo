import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from '../../../src/design-system/components/heading';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('Heading Component', () => {
  describe('Rendering', () => {
    it('renders h1 element when level is 1', () => {
      render(<Heading level={1}>Heading 1</Heading>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('renders h2 element when level is 2', () => {
      render(<Heading level={2}>Heading 2</Heading>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders h3 element when level is 3', () => {
      render(<Heading level={3}>Heading 3</Heading>);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('renders h4 element when level is 4', () => {
      render(<Heading level={4}>Heading 4</Heading>);
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H4');
    });

    it('renders h5 element when level is 5', () => {
      render(<Heading level={5}>Heading 5</Heading>);
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H5');
    });

    it('renders h6 element when level is 6', () => {
      render(<Heading level={6}>Heading 6</Heading>);
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H6');
    });

    it('renders children content', () => {
      render(<Heading level={2}>Custom Content</Heading>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Typography Classes', () => {
    it('applies text-4xl font-bold for h1', () => {
      render(<Heading level={1}>H1</Heading>);
      expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
        'text-4xl',
        'font-bold'
      );
    });

    it('applies text-3xl font-bold for h2', () => {
      render(<Heading level={2}>H2</Heading>);
      expect(screen.getByRole('heading', { level: 2 })).toHaveClass(
        'text-3xl',
        'font-bold'
      );
    });

    it('applies text-2xl font-semibold for h3', () => {
      render(<Heading level={3}>H3</Heading>);
      expect(screen.getByRole('heading', { level: 3 })).toHaveClass(
        'text-2xl',
        'font-semibold'
      );
    });

    it('applies text-xl font-semibold for h4', () => {
      render(<Heading level={4}>H4</Heading>);
      expect(screen.getByRole('heading', { level: 4 })).toHaveClass(
        'text-xl',
        'font-semibold'
      );
    });

    it('applies text-lg font-medium for h5', () => {
      render(<Heading level={5}>H5</Heading>);
      expect(screen.getByRole('heading', { level: 5 })).toHaveClass(
        'text-lg',
        'font-medium'
      );
    });

    it('applies text-base font-medium for h6', () => {
      render(<Heading level={6}>H6</Heading>);
      expect(screen.getByRole('heading', { level: 6 })).toHaveClass(
        'text-base',
        'font-medium'
      );
    });

    it('applies text-text-primary base class to all levels', () => {
      for (let level = 1; level <= 6; level++) {
        const { unmount } = render(<Heading level={level as 1}>Text</Heading>);
        expect(screen.getByRole('heading')).toHaveClass('text-text-primary');
        unmount();
      }
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className alongside default classes', () => {
      render(
        <Heading level={2} className="custom-class">
          Custom
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('custom-class', 'text-3xl', 'font-bold');
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks for h1', async () => {
      const { container } = render(<Heading level={1}>Main Title</Heading>);
      await assertA11y(container);
    });

    it('passes accessibility checks for h2', async () => {
      const { container } = render(<Heading level={2}>Section Title</Heading>);
      await assertA11y(container);
    });

    it('passes accessibility checks for h3', async () => {
      const { container } = render(
        <Heading level={3}>Subsection Title</Heading>
      );
      await assertA11y(container);
    });

    it('maintains proper heading hierarchy', () => {
      const { container } = render(
        <div>
          <Heading level={1}>Main</Heading>
          <Heading level={2}>Section</Heading>
          <Heading level={3}>Subsection</Heading>
        </div>
      );

      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('h3')).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards standard HTML attributes', () => {
      render(
        <Heading level={2} id="section-title" data-testid="heading">
          Title
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('id', 'section-title');
      expect(heading).toHaveAttribute('data-testid', 'heading');
    });

    it('forwards aria attributes', () => {
      render(
        <Heading level={2} aria-label="Custom label">
          Title
        </Heading>
      );
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });
  });
});
