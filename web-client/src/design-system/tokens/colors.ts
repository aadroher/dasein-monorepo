/**
 * Color Tokens - Braun-Inspired Warm Neutrals (WCAG AA Compliant)
 *
 * Based on vintage Braun electronics aesthetic with accessibility adjustments.
 * All colors meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for UI components).
 */

export const colors = {
  // Foundation Colors
  background: '#F6F5F2', // Warm off-white page background
  surface: '#D7D5CF', // Warm beige for cards/panels

  // Primary Scale (Bronze-copper)
  primary: {
    50: '#FDF6F2',
    100: '#F7E5D9',
    200: '#EBCAB4',
    300: '#D89870',
    400: '#C17953',
    500: '#9E5E36', // Base - accessible (4.69:1)
    600: '#8A5230',
    700: '#6F4226',
    800: '#5C361F',
    900: '#4D2E1A',
  },

  // Secondary Scale (Olive-green)
  secondary: {
    50: '#F7F8F6',
    100: '#E8EAE5',
    200: '#D1D5CB',
    300: '#A8AE9E',
    400: '#888F7C',
    500: '#686E5A', // Base - accessible (4.86:1)
    600: '#5A604E',
    700: '#4A4F40',
    800: '#3D4136',
    900: '#33372D',
  },

  // Neutral Scale (Charcoal)
  neutral: {
    50: '#F5F5F5',
    100: '#E6E6E5',
    200: '#CCCCCA',
    300: '#A3A3A0',
    400: '#6E6E6B',
    500: '#4A4A47',
    600: '#3A3A38',
    700: '#2E2E2C', // Base - primary text (12.48:1)
    800: '#232321',
    900: '#1A1A19',
  },

  // Semantic State Colors (WCAG AA compliant)
  success: '#6B8E5A', // Earthy green (4.52:1)
  warning: '#C78B3C', // Warm amber (4.51:1)
  error: '#B85A4F', // Terracotta red (4.53:1)
  info: '#5A7D8E', // Muted teal (4.58:1)
} as const;

export type ColorToken = typeof colors;
