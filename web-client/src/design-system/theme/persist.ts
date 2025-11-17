export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'dasein-theme-preference';

export const getStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return null;
  } catch {
    // localStorage not available (SSR, privacy mode, etc.)
    return null;
  }
};

export const setStoredTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
};
