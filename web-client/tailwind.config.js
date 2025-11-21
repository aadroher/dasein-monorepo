import { colors, spacing, typography, radii, shadows, breakpoints } from './src/design-system/tokens/index.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Color tokens - modern dark-first scheme with magenta accent
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        neutral: colors.neutral,
        // Semantic colors - expose both light and dark variants
        success: {
          light: colors.semantic.success.light,
          dark: colors.semantic.success.dark,
          DEFAULT: colors.semantic.success.dark, // Default to dark mode value
        },
        warning: {
          light: colors.semantic.warning.light,
          dark: colors.semantic.warning.dark,
          DEFAULT: colors.semantic.warning.dark,
        },
        error: {
          light: colors.semantic.error.light,
          dark: colors.semantic.error.dark,
          DEFAULT: colors.semantic.error.dark,
        },
        info: {
          light: colors.semantic.info.light,
          dark: colors.semantic.info.dark,
          DEFAULT: colors.semantic.info.dark,
        },
      },
      // Spacing tokens
      spacing: spacing,
      // Typography tokens
      fontFamily: {
        sans: typography.fontFamily.sans,
        mono: typography.fontFamily.mono,
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      // Border radius tokens
      borderRadius: radii,
      // Shadow tokens
      boxShadow: shadows,
      // Breakpoint tokens (for manual use in responsive classes)
      screens: breakpoints,
    },
  },
  plugins: [],
};
