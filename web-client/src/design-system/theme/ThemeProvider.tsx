import React, { useState, useEffect, useMemo } from 'react';
import { ThemeContext, type Theme } from '../hooks/useTheme';
import { getStoredTheme, setStoredTheme, getSystemTheme } from './persist';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Priority: 1. Stored preference, 2. Default prop, 3. System preference
    const stored = getStoredTheme();
    if (stored) return stored;
    if (defaultTheme) return defaultTheme;
    return getSystemTheme();
  });

  // Apply initial theme on mount
  useEffect(() => {
    // Dark mode is default (no class), light mode needs 'light' class
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Listen to system theme changes (optional enhancement)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no stored preference exists
      if (!getStoredTheme()) {
        setThemeState(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        setThemeState(newTheme);
        setStoredTheme(newTheme);

        // Apply theme to document root (dark is default, light needs class)
        if (newTheme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
      },
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setThemeState(newTheme);
        setStoredTheme(newTheme);

        if (newTheme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
