import React from 'react';

export interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Header component - Semantic header landmark for top-of-page content.
 * Uses <header> element for accessibility and consistent styling.
 */
export const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  return (
    <header
      className={`
        w-full
        bg-surface
        border-b border-neutral-200
        ${className}
      `.trim()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </header>
  );
};
