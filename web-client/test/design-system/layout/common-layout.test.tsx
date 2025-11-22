import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommonLayout } from '../../../src/design-system/layout/common-layout';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('CommonLayout Component', () => {
  describe('Rendering', () => {
    it('renders logo and application name', () => {
      const { container } = render(
        <CommonLayout>
          <div>Test content</div>
        </CommonLayout>
      );
      // Check for the SVG logo
      const logo = container.querySelector('svg');
      expect(logo).toBeInTheDocument();
      // Check for screen-reader text
      const srText = container.querySelector('.sr-only');
      expect(srText).toHaveTextContent('Dasein');
    });

    it('renders children in content area', () => {
      render(
        <CommonLayout>
          <div data-testid="test-content">Test content</div>
        </CommonLayout>
      );
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    it('renders header with proper styling', () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass(
        'bg-neutral-800',
        'border-b',
        'border-neutral-700'
      );
    });

    it('renders main content area with proper styling', () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('flex-1', 'px-6', 'py-8');
    });
  });

  describe('Layout Structure', () => {
    it('uses semantic HTML elements', () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
    });

    it('applies full height layout', () => {
      const { container } = render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass(
        'min-h-screen',
        'flex',
        'flex-col',
        'bg-neutral-900'
      );
    });
  });

  describe('Content Isolation', () => {
    it('renders multiple children correctly', () => {
      render(
        <CommonLayout>
          <div data-testid="child-1">First child</div>
          <div data-testid="child-2">Second child</div>
        </CommonLayout>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('renders complex React elements as children', () => {
      const ComplexChild = () => (
        <div>
          <h1>Page Title</h1>
          <p>Page content</p>
        </div>
      );
      render(
        <CommonLayout>
          <ComplexChild />
        </CommonLayout>
      );
      expect(screen.getByText('Page Title')).toBeInTheDocument();
      expect(screen.getByText('Page content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks', async () => {
      const { container } = render(
        <CommonLayout>
          <div>Accessible content</div>
        </CommonLayout>
      );
      await assertA11y(container);
    });

    it('includes screen reader heading for accessibility', () => {
      render(
        <CommonLayout>
          <div>Content</div>
        </CommonLayout>
      );
      const heading = screen.getByRole('heading', { name: 'Dasein', level: 1 });
      expect(heading).toHaveClass('sr-only');
    });
  });
});
