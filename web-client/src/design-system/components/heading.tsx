import { createElement } from 'react';
import type { FC, HTMLAttributes, ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: ReactNode;
}

const headingClasses: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold leading-tight',
  2: 'text-3xl font-bold leading-tight',
  3: 'text-2xl font-semibold leading-snug',
  4: 'text-xl font-semibold leading-snug',
  5: 'text-lg font-medium leading-normal',
  6: 'text-base font-medium leading-normal',
};

const baseClasses = 'text-text-primary';

export const Heading: FC<HeadingProps> = ({
  level,
  className = '',
  children,
  ...props
}) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const classes = [baseClasses, headingClasses[level], className]
    .filter(Boolean)
    .join(' ');

  return createElement(Tag, { className: classes, ...props }, children);
};
