import React, { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface ResponsiveNavProps {
  items: NavItem[];
  className?: string;
  'aria-label'?: string;
}

/**
 * ResponsiveNav component - Adaptive navigation with mobile menu.
 *
 * Behavior:
 * - Desktop (≥1024px): Horizontal nav links
 * - Tablet (768px-1023px): Condensed menu with toggle button
 * - Maintains keyboard accessibility in all states
 */
export const ResponsiveNav: React.FC<ResponsiveNavProps> = ({
  items,
  className = '',
  'aria-label': ariaLabel = 'Main navigation',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav aria-label={ariaLabel} className={`w-full ${className}`.trim()}>
      {/* Mobile Menu Toggle Button (visible on tablet, hidden on desktop) */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="
            flex items-center justify-center
            px-4 py-2
            text-charcoal-700 dark:text-neutral-100
            hover:bg-surface dark:hover:bg-charcoal-700
            focus:outline-none focus:ring-2 focus:ring-primary-500
            rounded-md
            transition-colors
          "
        >
          <span className="sr-only">
            {isMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
          {/* Menu Icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Menu icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          <span className="ml-2 text-sm font-medium">Menu</span>
        </button>
      </div>

      {/* Desktop Navigation (hidden on tablet, visible on desktop) */}
      <div className="hidden lg:block">
        <ul className="flex space-x-8">
          {items.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={`
                  inline-block
                  px-3 py-2
                  text-base font-medium
                  transition-colors
                  rounded-md
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                  ${
                    item.current
                      ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-charcoal-700 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-surface dark:hover:bg-charcoal-700'
                  }
                `
                  .trim()
                  .replace(/\s+/g, ' ')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile/Tablet Menu (toggleable on tablet, hidden on desktop) */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden mt-2 py-2 bg-background dark:bg-charcoal-800 rounded-md shadow-md"
        >
          <ul className="space-y-1">
            {items.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={item.current ? 'page' : undefined}
                  className={`
                    block
                    px-4 py-3
                    text-base font-medium
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${
                      item.current
                        ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-charcoal-700 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-surface dark:hover:bg-charcoal-700'
                    }
                  `
                    .trim()
                    .replace(/\s+/g, ' ')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
