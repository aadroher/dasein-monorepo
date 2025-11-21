/**
 * Color Tokens - Modern Dark-First Scheme (WCAG AA Compliant)
 *
 * A contemporary color system centered around magenta (#cc4bae) as the corporate identity color,
 * with cool-toned neutrals and a dark-first approach for modern aesthetics.
 * All colors meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for UI components).
 *
 * Design Philosophy:
 * - Dark mode is the primary experience
 * - Magenta used strategically for CTAs, focus states, and brand moments
 * - Cool gray neutrals provide excellent readability and complement the warm magenta
 * - Semantic colors are muted and modern, working beautifully in both themes
 */

export const colors = {
  // Primary Scale (Magenta - Corporate Identity)
  // Base: #cc4bae - vibrant magenta for brand presence
  primary: {
    50: '#fdf4fb',   // Lightest tint
    100: '#fbe5f7',  // Very light
    200: '#f5c4ec',  // Light
    300: '#ed99dd',  // Medium light
    400: '#dd6dc9',  // Medium
    500: '#cc4bae',  // BASE - Corporate identity color
    600: '#b73d9a',  // Medium dark (better contrast for light mode)
    700: '#992f7f',  // Dark
    800: '#7a2765',  // Very dark
    900: '#5f1d4e',  // Darkest
  },

  // Neutral Scale (Cool Gray - Modern Feel)
  // Designed for dark-first: deep backgrounds with excellent text contrast
  neutral: {
    50: '#f8f9fa',   // Almost white (dark mode text)
    100: '#e9ecef',  // Very light gray
    200: '#d3d7db',  // Light gray (light mode borders)
    300: '#adb5bd',  // Medium light (dark mode secondary text)
    400: '#868e96',  // Medium (dark mode tertiary text)
    500: '#5c646c',  // Medium dark
    600: '#495057',  // Dark (dark mode borders)
    700: '#343a40',  // Very dark (dark mode elevated surfaces)
    800: '#212529',  // Near black (dark mode cards/panels)
    900: '#0d1117',  // True dark (dark mode background)
  },

  // Secondary/Accent Scale (Cyan - Complements Magenta)
  // Cool cyan provides visual balance to warm magenta
  secondary: {
    50: '#f0fdff',
    100: '#ccf7fb',
    200: '#99eff5',
    300: '#5de2ed',
    400: '#2dc9d9',
    500: '#14b8c5',  // BASE
    600: '#0e8a99',
    700: '#0d6d7a',
    800: '#0f5761',
    900: '#114851',
  },

  // Semantic State Colors (Modern & Muted)
  // Designed to work in both dark and light themes with appropriate shades
  semantic: {
    success: {
      light: '#059669',  // Emerald-600 for light mode
      dark: '#10b981',   // Emerald-500 for dark mode
    },
    warning: {
      light: '#d97706',  // Amber-600 for light mode
      dark: '#f59e0b',   // Amber-500 for dark mode
    },
    error: {
      light: '#dc2626',  // Rose-600 for light mode
      dark: '#f43f5e',   // Rose-500 for dark mode
    },
    info: {
      light: '#2563eb',  // Blue-600 for light mode
      dark: '#3b82f6',   // Blue-500 for dark mode
    },
  },
} as const;

export type ColorToken = typeof colors;
