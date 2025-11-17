import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../../src/design-system/components/card';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders header when provided', () => {
      render(<Card header="Card Header">Content</Card>);
      expect(screen.getByText('Card Header')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(<Card footer="Card Footer">Content</Card>);
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });

    it('renders header, content, and footer together', () => {
      render(
        <Card header="Header" footer="Footer">
          Body Content
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('renders complex header content', () => {
      render(
        <Card header={<div data-testid="complex-header">Complex Header</div>}>
          Content
        </Card>
      );
      expect(screen.getByTestId('complex-header')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies base classes', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass(
        'bg-surface',
        'rounded-lg',
        'border',
        'border-neutral-200'
      );
    });

    it('applies medium elevation by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-md');
    });

    it('applies no elevation when specified', () => {
      const { container } = render(<Card elevation="none">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('shadow-sm', 'shadow-md', 'shadow-lg');
    });

    it('applies small elevation when specified', () => {
      const { container } = render(<Card elevation="sm">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-sm');
    });

    it('applies large elevation when specified', () => {
      const { container } = render(<Card elevation="lg">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-lg');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Card className="custom-card">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card', 'bg-surface');
    });
  });

  describe('Layout Structure', () => {
    it('applies padding to content section', () => {
      const { container } = render(<Card>Content</Card>);
      const contentDiv = container.querySelector('.px-6.py-4');
      expect(contentDiv).toHaveClass('px-6', 'py-4');
    });

    it('applies padding and border to header section', () => {
      const { container } = render(<Card header="Header">Content</Card>);
      const headerDiv = container.querySelector('.border-b');
      expect(headerDiv).toHaveClass(
        'px-6',
        'py-4',
        'border-b',
        'border-neutral-200'
      );
    });

    it('applies padding and border to footer section', () => {
      const { container } = render(<Card footer="Footer">Content</Card>);
      const footerDiv = container.querySelector('.border-t');
      expect(footerDiv).toHaveClass(
        'px-6',
        'py-4',
        'border-t',
        'border-neutral-200'
      );
    });

    it('maintains correct order: header, content, footer', () => {
      const { container } = render(
        <Card header="Header" footer="Footer">
          Content
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      const childDivs = Array.from(cardElement.children) as HTMLElement[];

      expect(childDivs[0]).toHaveTextContent('Header');
      expect(childDivs[1]).toHaveTextContent('Content');
      expect(childDivs[2]).toHaveTextContent('Footer');
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks with content only', async () => {
      const { container } = render(<Card>Simple Content</Card>);
      await assertA11y(container);
    });

    it('passes accessibility checks with header and content', async () => {
      const { container } = render(<Card header="Title">Content</Card>);
      await assertA11y(container);
    });

    it('passes accessibility checks with full structure', async () => {
      const { container } = render(
        <Card header="Card Title" footer="Card Footer">
          Card body content
        </Card>
      );
      await assertA11y(container);
    });

    it('passes accessibility checks with complex nested content', async () => {
      const { container } = render(
        <Card header={<h3>Semantic Heading</h3>}>
          <p>Paragraph content</p>
          <ul>
            <li>List item</li>
          </ul>
        </Card>
      );
      await assertA11y(container);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards standard div props', () => {
      const { container } = render(
        <Card data-testid="test-card" id="card-1">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('data-testid', 'test-card');
      expect(card).toHaveAttribute('id', 'card-1');
    });

    it('forwards aria attributes', () => {
      const { container } = render(
        <Card aria-label="Product card">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('aria-label', 'Product card');
    });
  });
});
