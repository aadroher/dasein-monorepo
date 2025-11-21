import React from 'react';
import { AppLogo } from './app-logo';

export interface CommonLayoutProps {
  /** Page content to render within the layout */
  children: React.ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <AppLogo />
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
};
