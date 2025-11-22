/**
 * Token Integrity Tests
 *
 * Validates that design tokens maintain consistency and expected structure.
 */

import { describe, it, expect } from 'vitest';
import {
  colors,
  spacing,
  typography,
  radii,
  shadows,
  breakpoints,
  containers,
} from '../../../src/design-system/tokens';

describe('Token Integrity', () => {
  describe('Colors', () => {
    it('should have complete primary scale (50-900) with magenta base', () => {
      expect(colors.primary).toHaveProperty('50');
      expect(colors.primary).toHaveProperty('100');
      expect(colors.primary).toHaveProperty('200');
      expect(colors.primary).toHaveProperty('300');
      expect(colors.primary).toHaveProperty('400');
      expect(colors.primary).toHaveProperty('500');
      expect(colors.primary).toHaveProperty('600');
      expect(colors.primary).toHaveProperty('700');
      expect(colors.primary).toHaveProperty('800');
      expect(colors.primary).toHaveProperty('900');
      // Verify the corporate identity color
      expect(colors.primary[500]).toBe('#cc4bae');
    });

    it('should have complete secondary scale (50-900) with purple base', () => {
      expect(colors.secondary).toHaveProperty('50');
      expect(colors.secondary).toHaveProperty('900');
      expect(colors.secondary[500]).toBe('#a855f7');
    });

    it('should have complete neutral scale (50-900) with cool grays', () => {
      expect(colors.neutral).toHaveProperty('50');
      expect(colors.neutral).toHaveProperty('900');
      // Verify dark mode background
      expect(colors.neutral[900]).toBe('#0d1117');
    });

    it('should have all semantic colors with light and dark variants', () => {
      expect(colors.semantic.success).toHaveProperty('light');
      expect(colors.semantic.success).toHaveProperty('dark');
      expect(colors.semantic.warning).toHaveProperty('light');
      expect(colors.semantic.warning).toHaveProperty('dark');
      expect(colors.semantic.error).toHaveProperty('light');
      expect(colors.semantic.error).toHaveProperty('dark');
      expect(colors.semantic.info).toHaveProperty('light');
      expect(colors.semantic.info).toHaveProperty('dark');
    });

    it('should use valid hex color format', () => {
      const hexPattern = /^#[0-9A-F]{6}$/i;
      expect(colors.primary[500]).toMatch(hexPattern);
      expect(colors.neutral[50]).toMatch(hexPattern);
      expect(colors.semantic.success.dark).toMatch(hexPattern);
      expect(colors.semantic.success.light).toMatch(hexPattern);
    });
  });

  describe('Spacing', () => {
    it('should have all required spacing values', () => {
      expect(spacing).toHaveProperty('1');
      expect(spacing).toHaveProperty('2');
      expect(spacing).toHaveProperty('4');
      expect(spacing).toHaveProperty('6');
      expect(spacing).toHaveProperty('8');
      expect(spacing).toHaveProperty('12');
      expect(spacing).toHaveProperty('16');
      expect(spacing).toHaveProperty('24');
      expect(spacing).toHaveProperty('32');
    });

    it('should use pixel units', () => {
      expect(spacing[1]).toBe('4px');
      expect(spacing[2]).toBe('8px');
      expect(spacing[4]).toBe('16px');
    });

    it('should have ascending values', () => {
      const values = Object.values(spacing).map(v => parseInt(v));
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  describe('Typography', () => {
    it('should have font families defined', () => {
      expect(typography.fontFamily.sans).toContain('system');
      expect(typography.fontFamily.mono).toContain('Monaco');
    });

    it('should have complete font size scale', () => {
      expect(typography.fontSize).toHaveProperty('xs');
      expect(typography.fontSize).toHaveProperty('sm');
      expect(typography.fontSize).toHaveProperty('base');
      expect(typography.fontSize).toHaveProperty('lg');
      expect(typography.fontSize).toHaveProperty('xl');
      expect(typography.fontSize).toHaveProperty('2xl');
      expect(typography.fontSize).toHaveProperty('3xl');
      expect(typography.fontSize).toHaveProperty('4xl');
    });

    it('should have ascending font sizes', () => {
      const sizes = Object.values(typography.fontSize).map(v => parseInt(v));
      for (let i = 1; i < sizes.length; i++) {
        expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
      }
    });

    it('should have all font weights', () => {
      expect(typography.fontWeight.normal).toBe('400');
      expect(typography.fontWeight.medium).toBe('500');
      expect(typography.fontWeight.semibold).toBe('600');
      expect(typography.fontWeight.bold).toBe('700');
    });

    it('should have all line heights', () => {
      expect(typography.lineHeight.tight).toBe('1.25');
      expect(typography.lineHeight.normal).toBe('1.5');
      expect(typography.lineHeight.relaxed).toBe('1.75');
    });
  });

  describe('Border Radii', () => {
    it('should have all radius values', () => {
      expect(radii).toHaveProperty('none');
      expect(radii).toHaveProperty('sm');
      expect(radii).toHaveProperty('base');
      expect(radii).toHaveProperty('md');
      expect(radii).toHaveProperty('lg');
      expect(radii).toHaveProperty('xl');
      expect(radii).toHaveProperty('full');
    });

    it('should have none as 0px', () => {
      expect(radii.none).toBe('0px');
    });

    it('should have full as max value', () => {
      expect(radii.full).toBe('9999px');
    });
  });

  describe('Shadows', () => {
    it('should have all shadow levels', () => {
      expect(shadows).toHaveProperty('none');
      expect(shadows).toHaveProperty('sm');
      expect(shadows).toHaveProperty('base');
      expect(shadows).toHaveProperty('md');
      expect(shadows).toHaveProperty('lg');
      expect(shadows).toHaveProperty('xl');
    });

    it('should have none as "none"', () => {
      expect(shadows.none).toBe('none');
    });

    it('should use rgba format for shadows', () => {
      expect(shadows.sm).toContain('rgba');
      expect(shadows.base).toContain('rgba');
    });
  });

  describe('Breakpoints', () => {
    it('should have all breakpoints defined', () => {
      expect(breakpoints.tablet).toBe('768px');
      expect(breakpoints.desktop).toBe('1024px');
      expect(breakpoints.wide).toBe('1440px');
    });

    it('should have ascending breakpoint values', () => {
      const values = Object.values(breakpoints).map(v => parseInt(v));
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });

    it('should have corresponding container widths', () => {
      expect(containers.tablet).toBe('720px');
      expect(containers.desktop).toBe('960px');
      expect(containers.wide).toBe('1200px');
    });

    it('should have container widths less than breakpoints', () => {
      expect(parseInt(containers.tablet)).toBeLessThan(
        parseInt(breakpoints.tablet)
      );
      expect(parseInt(containers.desktop)).toBeLessThan(
        parseInt(breakpoints.desktop)
      );
      expect(parseInt(containers.wide)).toBeLessThan(
        parseInt(breakpoints.wide)
      );
    });
  });
});
