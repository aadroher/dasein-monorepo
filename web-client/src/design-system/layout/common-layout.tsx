import React from 'react';
import { AppLogo } from './app-logo';

export interface CommonLayoutProps {
  /** Page content to render within the layout */
  children: React.ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="px-6 py-4">
          <h1 className="sr-only">Dasein</h1>
          <AppLogo />
        </div>
      </header>
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-[1080px]">{children}</div>
      </main>
    </div>
  );
};
