import React from 'react';

export interface NavContainerProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * NavContainer component - Semantic navigation landmark.
 * Wraps navigation content with proper ARIA labeling for accessibility.
 */
export const NavContainer: React.FC<NavContainerProps> = ({
  children,
  className = '',
  'aria-label': ariaLabel = 'Main navigation',
}) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={`
        w-full
        ${className}
      `.trim()}
    >
      {children}
    </nav>
  );
};
