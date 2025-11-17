import React from 'react';

export interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Footer component - Semantic footer landmark for bottom-of-page content.
 * Uses <footer> element for accessibility and consistent styling.
 */
export const Footer: React.FC<FooterProps> = ({ children, className = '' }) => {
  return (
    <footer
      className={`
        w-full
        bg-surface
        border-t border-neutral-200
        mt-auto
        ${className}
      `.trim()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </footer>
  );
};
