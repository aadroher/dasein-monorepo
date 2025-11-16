/**
 * Border Radius Tokens - Subtle Rounding with Scale
 *
 * Professional/data-focused UI with subtle, hierarchical rounding.
 */

export const radii = {
  none: '0px', // Flush elements (tables, alerts)
  sm: '2px', // Inputs, small buttons
  base: '4px', // Cards, standard buttons
  md: '6px', // Larger cards, containers
  lg: '8px', // Modals, prominent containers
  xl: '12px', // Hero sections (optional)
  full: '9999px', // Pills, avatars
} as const;

export type RadiiToken = typeof radii;
