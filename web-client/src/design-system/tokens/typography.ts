/**
 * Typography Tokens - Modular Scale 1.25 (Major Third)
 *
 * System font stack for zero latency and native OS rendering.
 * 16px base for optimal readability and WCAG compliance.
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", "Courier New", monospace',
  },

  // Font Sizes (Modular scale 1.25)
  fontSize: {
    xs: '12px', // 0.75rem - captions, labels
    sm: '14px', // 0.875rem - small body, secondary text
    base: '16px', // 1rem - body text
    lg: '20px', // 1.25rem - large body, subheadings
    xl: '24px', // 1.5rem - h4
    '2xl': '32px', // 2rem - h3
    '3xl': '40px', // 2.5rem - h2
    '4xl': '48px', // 3rem - h1
  },

  // Font Weights
  fontWeight: {
    normal: '400', // Body text
    medium: '500', // Emphasis, buttons
    semibold: '600', // Subheadings, UI labels
    bold: '700', // Headings
  },

  // Line Heights (WCAG 2.1 compliant)
  lineHeight: {
    tight: '1.25', // Headings
    normal: '1.5', // Body text (WCAG minimum)
    relaxed: '1.75', // Long-form content
  },
} as const;

export type TypographyToken = typeof typography;
