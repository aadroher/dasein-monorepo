/**
 * Spacing Tokens - Base-8 Progression with Fibonacci Extensions
 *
 * Divisible by common screen densities (72dpi, 96dpi).
 * Provides natural visual rhythm for layouts and components.
 */

export const spacing = {
  1: '4px', // Fine-tuning (button padding, icon spacing)
  2: '8px', // Component internal padding
  4: '16px', // Component spacing
  6: '24px', // Component spacing
  8: '32px', // Section spacing
  12: '48px', // Section spacing
  16: '64px', // Major layout gaps
  24: '96px', // Major layout gaps
  32: '128px', // Maximum for major section breaks
} as const;

export type SpacingToken = typeof spacing;
