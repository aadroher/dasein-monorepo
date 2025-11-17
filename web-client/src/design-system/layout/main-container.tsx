import React from 'react';

export interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MainContainer component - Semantic main content landmark.
 * Enforces max-width, responsive padding, and proper content spacing.
 * Adapts from tablet (≥768px) to desktop (≥1024px) viewports.
 */
export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <main
      id="main-content"
      className={`
        w-full
        flex-1
        ${className}
      `.trim()}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 max-w-7xl">
        {children}
      </div>
    </main>
  );
};
