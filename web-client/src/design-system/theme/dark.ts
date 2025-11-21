/**
 * Dark theme token overrides
 * These values are applied when dark mode is active
 */

export const darkThemeTokens = {
  // Background colors (darker for dark mode)
  background: '#1A1A19',
  surface: '#2E2E2C',

  // Text colors (lighter for dark mode)
  textPrimary: '#F6F5F2',
  textSecondary: '#D7D5CF',

  // Neutral scale adjustments (inverted)
  neutral: {
    50: '#33372D',
    100: '#3D4136',
    200: '#4A4F40',
    300: '#5A604E',
    400: '#686E5A',
    500: '#888F7C',
    600: '#A8AE9E',
    700: '#D1D5CB',
    800: '#E8EAE5',
    900: '#F7F8F6',
  },

  // Primary (bronze-copper) - slightly lighter for visibility
  primary: {
    50: '#4D2E1A',
    100: '#5C361F',
    200: '#6F4226',
    300: '#8A5230',
    400: '#9E5E36',
    500: '#C17953',
    600: '#D89870',
    700: '#EBCAB4',
    800: '#F7E5D9',
    900: '#FDF6F2',
  },

  // Secondary (olive-green) - slightly lighter for visibility
  secondary: {
    50: '#33372D',
    100: '#3D4136',
    200: '#4A4F40',
    300: '#5A604E',
    400: '#686E5A',
    500: '#888F7C',
    600: '#A8AE9E',
    700: '#D1D5CB',
    800: '#E8EAE5',
    900: '#F7F8F6',
  },

  // Semantic colors remain similar but adjusted for dark backgrounds
  success: '#7AA368',
  warning: '#D99B52',
  error: '#C86F64',
  info: '#6A8FA2',
} as const;
