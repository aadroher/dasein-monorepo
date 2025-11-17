import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppLayout } from '../../../src/design-system/layout/app-layout';
import { Header } from '../../../src/design-system/layout/header';
import { NavContainer } from '../../../src/design-system/layout/nav-container';
import { MainContainer } from '../../../src/design-system/layout/main-container';
import { Footer } from '../../../src/design-system/layout/footer';

describe('Layout Components Integration', () => {
  describe('AppLayout', () => {
    it('renders all layout sections when provided', () => {
      render(
        <AppLayout
          header={<div>Header Content</div>}
          navigation={<div>Navigation Content</div>}
          footer={<div>Footer Content</div>}
        >
          <div>Main Content</div>
        </AppLayout>
      );

      expect(screen.getByText('Header Content')).toBeInTheDocument();
      expect(screen.getByText('Navigation Content')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('renders without optional sections', () => {
      render(
        <AppLayout>
          <div>Main Content Only</div>
        </AppLayout>
      );

      expect(screen.getByText('Main Content Only')).toBeInTheDocument();
    });

    it('includes skip navigation link', () => {
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );

      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('applies min-height and flex layout classes', () => {
      const { container } = render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('min-h-screen');
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('flex-col');
    });
  });

  describe('Header', () => {
    it('renders with semantic header element', () => {
      const { container } = render(<Header>Header content</Header>);
      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header content');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Header className="custom-class">Content</Header>
      );
      const header = container.querySelector('header');

      expect(header).toHaveClass('custom-class');
    });
  });

  describe('NavContainer', () => {
    it('renders with semantic nav element', () => {
      const { container } = render(<NavContainer>Nav content</NavContainer>);
      const nav = container.querySelector('nav');

      expect(nav).toBeInTheDocument();
      expect(nav).toHaveTextContent('Nav content');
    });

    it('has default aria-label', () => {
      const { container } = render(<NavContainer>Nav content</NavContainer>);
      const nav = container.querySelector('nav');

      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('accepts custom aria-label', () => {
      const { container } = render(
        <NavContainer aria-label="Secondary navigation">
          Nav content
        </NavContainer>
      );
      const nav = container.querySelector('nav');

      expect(nav).toHaveAttribute('aria-label', 'Secondary navigation');
    });
  });

  describe('MainContainer', () => {
    it('renders with semantic main element', () => {
      const { container } = render(<MainContainer>Main content</MainContainer>);
      const main = container.querySelector('main');

      expect(main).toBeInTheDocument();
      expect(main).toHaveTextContent('Main content');
    });

    it('has id for skip link target', () => {
      const { container } = render(<MainContainer>Content</MainContainer>);
      const main = container.querySelector('main');

      expect(main).toHaveAttribute('id', 'main-content');
    });

    it('includes responsive padding classes', () => {
      const { container } = render(<MainContainer>Content</MainContainer>);
      const main = container.querySelector('main');
      const innerDiv = main?.querySelector('div');

      expect(innerDiv).toHaveClass('px-4');
      expect(innerDiv).toHaveClass('sm:px-6');
      expect(innerDiv).toHaveClass('lg:px-8');
    });

    it('includes max-width constraint', () => {
      const { container } = render(<MainContainer>Content</MainContainer>);
      const main = container.querySelector('main');
      const innerDiv = main?.querySelector('div');

      expect(innerDiv).toHaveClass('max-w-7xl');
    });
  });

  describe('Footer', () => {
    it('renders with semantic footer element', () => {
      const { container } = render(<Footer>Footer content</Footer>);
      const footer = container.querySelector('footer');

      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Footer content');
    });

    it('applies margin-top auto for sticky footer', () => {
      const { container } = render(<Footer>Content</Footer>);
      const footer = container.querySelector('footer');

      expect(footer).toHaveClass('mt-auto');
    });
  });

  describe('Layout Structure Integrity', () => {
    it('maintains correct DOM hierarchy', () => {
      const { container } = render(
        <AppLayout
          header={<div>Header</div>}
          navigation={<div>Nav</div>}
          footer={<div>Footer</div>}
        >
          <div>Main</div>
        </AppLayout>
      );

      const wrapper = container.firstChild as HTMLElement;
      const header = wrapper.querySelector('header');
      const nav = wrapper.querySelector('nav');
      const main = wrapper.querySelector('main');
      const footer = wrapper.querySelector('footer');

      // Verify all landmarks exist
      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      // Verify order (header before nav before main before footer)
      const landmarks = Array.from(wrapper.children);
      const headerIndex = landmarks.indexOf(header!);
      const navIndex = landmarks.indexOf(nav!);
      const mainIndex = landmarks.indexOf(main!);
      const footerIndex = landmarks.indexOf(footer!);

      expect(headerIndex).toBeLessThan(navIndex);
      expect(navIndex).toBeLessThan(mainIndex);
      expect(mainIndex).toBeLessThan(footerIndex);
    });
  });
});
