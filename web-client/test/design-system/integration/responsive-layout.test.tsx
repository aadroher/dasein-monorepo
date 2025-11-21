import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainContainer } from '../../../src/design-system/layout/main-container';
import { Grid, GridItem } from '../../../src/design-system/layout/grid';

describe('Responsive Layout Integration Tests', () => {
  describe('MainContainer Responsive Behavior', () => {
    it('should render with responsive container classes', () => {
      render(
        <MainContainer>
          <div data-testid="content">Test Content</div>
        </MainContainer>
      );

      const main = screen.getByRole('main');
      const container = main.querySelector('div');

      // Verify responsive padding classes are present
      expect(container?.className).toContain('px-4'); // Mobile base
      expect(container?.className).toContain('md:px-6'); // Tablet
      expect(container?.className).toContain('lg:px-8'); // Desktop

      // Verify responsive vertical padding
      expect(container?.className).toContain('py-6'); // Mobile base
      expect(container?.className).toContain('md:py-8'); // Tablet
      expect(container?.className).toContain('lg:py-12'); // Desktop

      // Verify max-width constraint
      expect(container?.className).toContain('max-w-7xl');

      // Verify content is present
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('should maintain semantic main landmark', () => {
      render(
        <MainContainer>
          <p>Content</p>
        </MainContainer>
      );

      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('id', 'main-content');
    });

    it('should accept custom className without overriding responsive behavior', () => {
      render(
        <MainContainer className="custom-class">
          <p>Content</p>
        </MainContainer>
      );

      const main = screen.getByRole('main');
      expect(main.className).toContain('custom-class');
      expect(main.className).toContain('flex-1');
    });
  });

  describe('Grid Responsive Behavior', () => {
    it('should render with default responsive grid columns', () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );

      const grid = screen.getByText('Item 1').parentElement;

      // Default: 1 col base, 2 col md, 3 col lg
      expect(grid?.className).toContain('grid-cols-1');
      expect(grid?.className).toContain('md:grid-cols-2');
      expect(grid?.className).toContain('lg:grid-cols-3');
    });

    it('should render with custom column configuration', () => {
      render(
        <Grid cols={{ base: 2, md: 3, lg: 4 }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );

      const grid = screen.getByText('Item 1').parentElement;

      expect(grid?.className).toContain('grid-cols-2');
      expect(grid?.className).toContain('md:grid-cols-3');
      expect(grid?.className).toContain('lg:grid-cols-4');
    });

    it('should render with custom gap', () => {
      render(
        <Grid gap={8}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );

      const grid = screen.getByText('Item 1').parentElement;
      expect(grid?.className).toContain('gap-8');
    });

    it('should accept custom className', () => {
      render(
        <Grid className="custom-grid">
          <div>Item 1</div>
        </Grid>
      );

      const grid = screen.getByText('Item 1').parentElement;
      expect(grid?.className).toContain('custom-grid');
      expect(grid?.className).toContain('grid');
    });
  });

  describe('GridItem Responsive Behavior', () => {
    it('should render with responsive column span', () => {
      render(
        <Grid>
          <GridItem span={{ base: 1, md: 2, lg: 3 }}>
            <div>Spanning Item</div>
          </GridItem>
        </Grid>
      );

      const gridItem = screen.getByText('Spanning Item').parentElement;

      expect(gridItem?.className).toContain('col-span-1');
      expect(gridItem?.className).toContain('md:col-span-2');
      expect(gridItem?.className).toContain('lg:col-span-3');
    });

    it('should render without span classes when not provided', () => {
      render(
        <Grid>
          <GridItem>
            <div>Regular Item</div>
          </GridItem>
        </Grid>
      );

      const gridItem = screen.getByText('Regular Item').parentElement;
      // Should not have col-span classes when span is not provided
      expect(gridItem?.className).not.toContain('col-span');
    });
  });

  describe('Responsive Layout Integration', () => {
    it('should combine MainContainer and Grid for responsive page layout', () => {
      render(
        <MainContainer>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <div data-testid="card-1">Card 1</div>
            <div data-testid="card-2">Card 2</div>
            <div data-testid="card-3">Card 3</div>
          </Grid>
        </MainContainer>
      );

      // Verify main container is present
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();

      // Verify grid items are rendered
      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
      expect(screen.getByTestId('card-3')).toBeInTheDocument();

      // Verify grid has responsive classes
      const grid = screen.getByTestId('card-1').parentElement;
      expect(grid?.className).toContain('grid');
      expect(grid?.className).toContain('grid-cols-1');
      expect(grid?.className).toContain('md:grid-cols-2');
      expect(grid?.className).toContain('lg:grid-cols-3');
    });

    it('should support nested grids for complex layouts', () => {
      render(
        <MainContainer>
          <Grid cols={{ base: 1, lg: 2 }} gap={8}>
            <GridItem span={{ base: 1, lg: 2 }}>
              <h1>Full Width Header</h1>
            </GridItem>
            <GridItem>
              <div>Sidebar</div>
            </GridItem>
            <GridItem>
              <Grid cols={{ base: 1, md: 2 }} gap={4}>
                <div>Nested 1</div>
                <div>Nested 2</div>
              </Grid>
            </GridItem>
          </Grid>
        </MainContainer>
      );

      expect(screen.getByText('Full Width Header')).toBeInTheDocument();
      expect(screen.getByText('Sidebar')).toBeInTheDocument();
      expect(screen.getByText('Nested 1')).toBeInTheDocument();
      expect(screen.getByText('Nested 2')).toBeInTheDocument();
    });
  });

  describe('No Horizontal Scroll Verification', () => {
    it('should ensure content container has proper constraints', () => {
      const { container } = render(
        <MainContainer>
          <div style={{ width: '2000px' }}>Wide content</div>
        </MainContainer>
      );

      const mainContainer = container.querySelector('main > div');

      // Container should have max-width constraint
      expect(mainContainer?.className).toContain('max-w-7xl');

      // Container class should have container which provides responsive width
      expect(mainContainer?.className).toContain('container');
    });
    it('should ensure grid respects container boundaries', () => {
      render(
        <MainContainer>
          <Grid>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i}>Item {i + 1}</div>
            ))}
          </Grid>
        </MainContainer>
      );

      const grid = screen.getByText('Item 1').parentElement;

      // Grid should be constrained by parent container
      expect(grid?.className).toContain('grid');
      // No overflow classes that would cause horizontal scroll
      expect(grid?.className).not.toContain('overflow-x');
    });
  });
});
