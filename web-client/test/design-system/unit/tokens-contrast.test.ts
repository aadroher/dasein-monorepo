/**
 * Contrast Ratio Validation Tests
 *
 * Validates WCAG 2.1 AA compliance for color combinations.
 * Minimum ratios:
 * - Normal text: 4.5:1
 * - Large text (18pt+): 3:1
 * - UI components: 3:1
 */

import { describe, it, expect } from 'vitest';
import { colors } from '../../../src/design-system/tokens';

/**
 * Calculate relative luminance per WCAG formula
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const [rs, gs, bs] = [r, g, b].map(c => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Contrast Ratio Validation', () => {
  const WCAG_AA_NORMAL = 4.5; // Normal text
  const WCAG_AA_LARGE = 3.0; // Large text (18pt+) or UI components

  // Dark mode (default) background colors
  const darkBg = colors.neutral[900]; // #0d1117
  const darkSurface = colors.neutral[800]; // #212529

  // Light mode background colors
  const lightBg = colors.neutral[50]; // #f8f9fa
  const lightSurface = '#ffffff';

  describe('Dark Mode (Default) - Text on Background', () => {
    it('should have sufficient contrast for primary text on dark background', () => {
      const ratio = getContrastRatio(colors.neutral[50], darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      // Light text on dark background should have excellent contrast
      expect(ratio).toBeGreaterThan(15);
    });

    it('should have sufficient contrast for secondary text on dark background', () => {
      const ratio = getContrastRatio(colors.neutral[300], darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('should have sufficient contrast for primary text on dark surface', () => {
      const ratio = getContrastRatio(colors.neutral[50], darkSurface);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('should have sufficient contrast for primary magenta on dark background', () => {
      const ratio = getContrastRatio(colors.primary[500], darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      // Magenta #cc4bae should have good contrast on dark
    });

    it('should have sufficient contrast for secondary cyan as UI accent on dark background', () => {
      const ratio = getContrastRatio(colors.secondary[400], darkBg);
      // Secondary is used for accents, not body text - WCAG AA Large is appropriate
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });
  });

  describe('Light Mode - Text on Background', () => {
    it('should have sufficient contrast for primary text on light background', () => {
      const ratio = getContrastRatio(colors.neutral[900], lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      // Dark text on light background should have excellent contrast
      expect(ratio).toBeGreaterThan(15);
    });

    it('should have sufficient contrast for secondary text on light background', () => {
      const ratio = getContrastRatio(colors.neutral[700], lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('should have sufficient contrast for primary text on light surface', () => {
      const ratio = getContrastRatio(colors.neutral[900], lightSurface);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('should have sufficient contrast for darker magenta on light background', () => {
      const ratio = getContrastRatio(colors.primary[600], lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      // Using darker primary-600 for better light mode contrast
    });

    it('should have sufficient contrast for secondary as UI accent on light background', () => {
      const ratio = getContrastRatio(colors.secondary[600], lightBg);
      // Use darker shade for light mode, suitable for UI accents
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });
  });

  describe('Semantic Colors - Dark Mode', () => {
    it('should have sufficient contrast for success on dark background', () => {
      const ratio = getContrastRatio(colors.semantic.success.dark, darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for warning on dark background', () => {
      const ratio = getContrastRatio(colors.semantic.warning.dark, darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for error on dark background', () => {
      const ratio = getContrastRatio(colors.semantic.error.dark, darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for info on dark background', () => {
      const ratio = getContrastRatio(colors.semantic.info.dark, darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });
  });

  describe('Semantic Colors - Light Mode', () => {
    it('should have sufficient contrast for success on light background', () => {
      const ratio = getContrastRatio(colors.semantic.success.light, lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for warning on light background', () => {
      const ratio = getContrastRatio(colors.semantic.warning.light, lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for error on light background', () => {
      const ratio = getContrastRatio(colors.semantic.error.light, lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for info on light background', () => {
      const ratio = getContrastRatio(colors.semantic.info.light, lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });
  });

  describe('Interactive States - Dark Mode', () => {
    it('should have sufficient contrast for light text on primary button', () => {
      const ratio = getContrastRatio(colors.neutral[50], colors.primary[500]);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('should have sufficient contrast for dark text on secondary button', () => {
      // Cyan secondary buttons use dark text for better contrast
      const ratio = getContrastRatio(colors.neutral[900], colors.secondary[400]);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });
  });

  describe('Interactive States - Light Mode', () => {
    it('should have sufficient contrast for light text on darker primary button', () => {
      const ratio = getContrastRatio(colors.neutral[50], colors.primary[600]);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('should have sufficient contrast for light text on secondary button', () => {
      const ratio = getContrastRatio(colors.neutral[50], colors.secondary[600]);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });
  });

  describe('Color Scale Contrast Progression', () => {
    it('should have increasing contrast from 50 to 900 in primary scale (dark bg)', () => {
      const ratios = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
        shade =>
          getContrastRatio(
            colors.primary[shade as keyof typeof colors.primary],
            darkBg
          )
      );

      // Lighter shades should have higher contrast on dark background
      expect(ratios[0]).toBeGreaterThan(ratios[9]);
      expect(ratios[3]).toBeGreaterThan(ratios[7]);
    });

    it('should have increasing contrast from 50 to 900 in neutral scale (dark bg)', () => {
      const ratios = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
        shade =>
          getContrastRatio(
            colors.neutral[shade as keyof typeof colors.neutral],
            darkBg
          )
      );

      // Lighter neutrals should have higher contrast on dark background
      expect(ratios[0]).toBeGreaterThan(ratios[9]);
    });
  });
});
