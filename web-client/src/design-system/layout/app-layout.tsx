import React from 'react';
import { Header } from './header';
import { NavContainer } from './nav-container';
import { MainContainer } from './main-container';
import { Footer } from './footer';
import { SkipLink } from '../accessibility/skip-link';

export interface AppLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * AppLayout component - Main application layout composition.
 * Combines Header, Navigation, Main content area, and Footer with semantic HTML5 landmarks.
 * Includes skip navigation link for keyboard accessibility.
 *
 * Provides consistent page structure across the application with:
 * - Semantic landmarks (<header>, <nav>, <main>, <footer>)
 * - Skip navigation for keyboard users
 * - Responsive container widths (768px–1920px)
 * - Proper vertical spacing and max-width constraints
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  header,
  navigation,
  footer,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />

      {header && <Header>{header}</Header>}

      {navigation && <NavContainer>{navigation}</NavContainer>}

      <MainContainer>{children}</MainContainer>

      {footer && <Footer>{footer}</Footer>}
    </div>
  );
};
