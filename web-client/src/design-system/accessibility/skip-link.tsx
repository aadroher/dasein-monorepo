import React from 'react';

export interface SkipLinkProps {
  targetId?: string;
  children?: React.ReactNode;
}

/**
 * SkipLink component - Accessible skip navigation link.
 * Allows keyboard users to bypass repetitive navigation and jump to main content.
 * Invisible until focused via Tab key.
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  children = 'Skip to main content',
}) => {
  return (
    <a
      href={`#${targetId}`}
      className="
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-4
        focus:left-4
        focus:z-50
        focus:px-4
        focus:py-2
        focus:bg-primary
        focus:text-white
        focus:rounded
        focus:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        focus:ring-offset-2
      "
    >
      {children}
    </a>
  );
};
