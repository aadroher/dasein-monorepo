import React from 'react';

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Number of columns at different breakpoints
   * Default: { base: 1, md: 2, lg: 3 }
   */
  cols?: {
    base?: number;
    md?: number;
    lg?: number;
  };
  /**
   * Gap between grid items
   * Default: 6 (24px)
   */
  gap?: number;
}

/**
 * Grid component - Responsive grid system for organizing content.
 * Supports adaptive column counts from tablet (≥768px) to desktop (≥1024px).
 *
 * @example
 * <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 */
export const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  cols = { base: 1, md: 2, lg: 3 },
  gap = 6,
}) => {
  // Map column counts to Tailwind classes
  const getColClass = (breakpoint: 'base' | 'md' | 'lg', count?: number) => {
    if (!count) return '';

    const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
    const colMap: Record<number, string> = {
      1: `${prefix}grid-cols-1`,
      2: `${prefix}grid-cols-2`,
      3: `${prefix}grid-cols-3`,
      4: `${prefix}grid-cols-4`,
      5: `${prefix}grid-cols-5`,
      6: `${prefix}grid-cols-6`,
    };

    return colMap[count] || '';
  };

  // Map gap values to Tailwind classes
  const gapMap: Record<number, string> = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
  };

  const colClasses = [
    getColClass('base', cols.base),
    getColClass('md', cols.md),
    getColClass('lg', cols.lg),
  ]
    .filter(Boolean)
    .join(' ');

  const gapClass = gapMap[gap] || 'gap-6';

  return (
    <div
      className={`
        grid
        ${colClasses}
        ${gapClass}
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
};

/**
 * GridItem component - Individual grid item wrapper (optional).
 * Use this for specific grid item customization.
 */
export interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Column span at different breakpoints
   */
  span?: {
    base?: number;
    md?: number;
    lg?: number;
  };
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  className = '',
  span,
}) => {
  const getSpanClass = (breakpoint: 'base' | 'md' | 'lg', count?: number) => {
    if (!count) return '';

    const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
    const spanMap: Record<number, string> = {
      1: `${prefix}col-span-1`,
      2: `${prefix}col-span-2`,
      3: `${prefix}col-span-3`,
      4: `${prefix}col-span-4`,
      5: `${prefix}col-span-5`,
      6: `${prefix}col-span-6`,
    };

    return spanMap[count] || '';
  };

  const spanClasses = span
    ? [
        getSpanClass('base', span.base),
        getSpanClass('md', span.md),
        getSpanClass('lg', span.lg),
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return (
    <div
      className={`
        ${spanClasses}
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
};
