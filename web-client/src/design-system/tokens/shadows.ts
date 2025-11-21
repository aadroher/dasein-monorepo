/**
 * Shadow Tokens - Layered Elevation System
 *
 * Multi-layer shadows for realistic depth perception.
 * Subtle opacity maintains professional aesthetic.
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.05)', // Subtle lift (cards)
  base: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)', // Standard elevation
  md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)', // Dropdowns, popovers
  lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)', // Modals
  xl: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)', // Large modals
} as const;

export type ShadowToken = typeof shadows;
