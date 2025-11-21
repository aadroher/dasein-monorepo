/**
 * Breakpoint Tokens - Tablet & Desktop Only (768px+)
 *
 * Mobile (<768px) explicitly out of scope.
 * Container max-widths prevent excessive line lengths.
 */

export const breakpoints = {
  tablet: '768px', // iPad portrait, small tablets
  desktop: '1024px', // iPad landscape, laptops
  wide: '1440px', // Large desktops (optional enhancement)
} as const;

export const containers = {
  tablet: '720px', // 768–1023px: 720px + 24px padding
  desktop: '960px', // 1024–1439px: 960px + 32px padding
  wide: '1200px', // 1440px+: 1200px + 48px padding
} as const;

export type BreakpointToken = typeof breakpoints;
export type ContainerToken = typeof containers;
