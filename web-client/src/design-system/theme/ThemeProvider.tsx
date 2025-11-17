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
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Listen to system theme changes (optional enhancement)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no stored preference exists
      if (!getStoredTheme()) {
        setThemeState(e.matches ? 'dark' : 'light');
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

        // Apply theme to document root
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setThemeState(newTheme);
        setStoredTheme(newTheme);

        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
