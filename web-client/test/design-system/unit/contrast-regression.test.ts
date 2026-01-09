/**
 * Contrast Regression Tests
 *
 * Ensures color contrast ratios remain WCAG 2.1 AA compliant over time
 * Tests all critical color combinations used in the design system
 *
 * WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum):
 * - Normal text: 4.5:1 minimum
 * - Large text (18pt+ or 14pt+ bold): 3:1 minimum
 * - UI components and graphical objects: 3:1 minimum
 *
 * These tests serve as regression protection - if tokens change,
 * these tests will catch any accessibility violations.
 */

import { describe, it, expect } from 'vitest';
import { colors } from '../../../src/design-system/tokens';

/**
 * Calculate relative luminance per WCAG formula
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const [rs, gs, bs] = [r, g, b].map(c => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Assertion helper with detailed error messages
 */
const expectContrast = (
  foreground: string,
  background: string,
  minRatio: number,
  description: string
) => {
  const ratio = getContrastRatio(foreground, background);
  expect(
    ratio,
    `${description}: ${foreground} on ${background} = ${ratio.toFixed(2)}:1 (requires ${minRatio}:1)`
  ).toBeGreaterThanOrEqual(minRatio);
};

describe('Contrast Regression - WCAG 2.1 AA Compliance', () => {
  const WCAG_AA_NORMAL = 4.5; // Normal text
  const WCAG_AA_LARGE = 3.0; // Large text (18pt+) or UI components

  // Dark mode (default) backgrounds
  const darkBg = colors.neutral[900]; // #0d1117
  const darkSurface = colors.neutral[800]; // #212529

  // Light mode backgrounds
  const lightBg = colors.neutral[50]; // #f8f9fa
  const lightSurface = '#ffffff';

  describe('Dark Mode - Primary Text Combinations (Normal Size)', () => {
    it('maintains contrast for primary text on dark background', () => {
      expectContrast(
        colors.neutral[50],
        darkBg,
        WCAG_AA_NORMAL,
        'Light text on dark background'
      );
    });

    it('maintains contrast for primary text on dark surface', () => {
      expectContrast(
        colors.neutral[50],
        darkSurface,
        WCAG_AA_NORMAL,
        'Light text on dark surface'
      );
    });

    it('maintains contrast for secondary text on dark background', () => {
      expectContrast(
        colors.neutral[300],
        darkBg,
        WCAG_AA_NORMAL,
        'Secondary text on dark background'
      );
    });
  });

  describe('Light Mode - Primary Text Combinations (Normal Size)', () => {
    it('maintains contrast for primary text on light background', () => {
      expectContrast(
        colors.neutral[900],
        lightBg,
        WCAG_AA_NORMAL,
        'Dark text on light background'
      );
    });

    it('maintains contrast for primary text on white', () => {
      expectContrast(
        colors.neutral[900],
        lightSurface,
        WCAG_AA_NORMAL,
        'Dark text on white'
      );
    });

    it('maintains contrast for secondary text on light background', () => {
      expectContrast(
        colors.neutral[700],
        lightBg,
        WCAG_AA_NORMAL,
        'Dark secondary text on light background'
      );
    });
  });

  describe('Dark Mode - Primary Brand Color Combinations', () => {
    it('maintains contrast for primary-500 magenta on dark background', () => {
      expectContrast(
        colors.primary[500],
        darkBg,
        WCAG_AA_NORMAL,
        'Magenta brand color on dark background'
      );
    });

    it('maintains contrast for white text on primary-500 button', () => {
      expectContrast(
        colors.neutral[50],
        colors.primary[500],
        WCAG_AA_LARGE,
        'Light text on magenta button'
      );
    });

    it('maintains contrast for white text on primary-600 button', () => {
      expectContrast(
        colors.neutral[50],
        colors.primary[600],
        WCAG_AA_NORMAL,
        'Light text on darker magenta button'
      );
    });
  });

  describe('Light Mode - Primary Brand Color Combinations', () => {
    it('maintains contrast for darker primary-600 on light background', () => {
      expectContrast(
        colors.primary[600],
        lightBg,
        WCAG_AA_NORMAL,
        'Darker magenta on light background'
      );
    });

    it('maintains contrast for white text on primary-600 button', () => {
      expectContrast(
        '#FFFFFF',
        colors.primary[600],
        WCAG_AA_NORMAL,
        'White text on magenta button (light mode)'
      );
    });
  });

  describe('Dark Mode - Secondary Brand Color Combinations', () => {
    it('maintains contrast for secondary cyan as UI accent on dark background', () => {
      expectContrast(
        colors.secondary[400],
        darkBg,
        WCAG_AA_LARGE,
        'Cyan accent on dark background (UI elements)'
      );
    });

    it('maintains contrast for dark text on secondary-400 button', () => {
      expectContrast(
        colors.neutral[900],
        colors.secondary[400],
        WCAG_AA_NORMAL,
        'Dark text on cyan button (better contrast)'
      );
    });
  });

  describe('Light Mode - Secondary Brand Color Combinations', () => {
    it('maintains contrast for darker secondary-600 as UI accent on light background', () => {
      expectContrast(
        colors.secondary[600],
        lightBg,
        WCAG_AA_LARGE,
        'Darker cyan on light background (UI accents)'
      );
    });

    it('maintains contrast for white text on secondary-600', () => {
      expectContrast(
        '#FFFFFF',
        colors.secondary[600],
        WCAG_AA_LARGE,
        'White text on cyan button (light mode)'
      );
    });
  });

  describe('Dark Mode - Semantic State Colors', () => {
    it('maintains contrast for success on dark background', () => {
      expectContrast(
        colors.semantic.success.dark,
        darkBg,
        WCAG_AA_LARGE,
        'Success green on dark background (badges/UI)'
      );
    });

    it('maintains contrast for warning on dark background', () => {
      expectContrast(
        colors.semantic.warning.dark,
        darkBg,
        WCAG_AA_LARGE,
        'Warning amber on dark background (badges/UI)'
      );
    });

    it('maintains contrast for error on dark background', () => {
      expectContrast(
        colors.semantic.error.dark,
        darkBg,
        WCAG_AA_LARGE,
        'Error red on dark background (badges/UI)'
      );
    });

    it('maintains contrast for info on dark background', () => {
      expectContrast(
        colors.semantic.info.dark,
        darkBg,
        WCAG_AA_LARGE,
        'Info blue on dark background (badges/UI)'
      );
    });
  });

  describe('Light Mode - Semantic State Colors', () => {
    it('maintains contrast for success on light background', () => {
      expectContrast(
        colors.semantic.success.light,
        lightBg,
        WCAG_AA_LARGE,
        'Success green on light background (badges/UI)'
      );
    });

    it('maintains contrast for warning on light background', () => {
      expectContrast(
        colors.semantic.warning.light,
        lightBg,
        WCAG_AA_LARGE,
        'Warning amber on light background (badges/UI)'
      );
    });

    it('maintains contrast for error on light background', () => {
      expectContrast(
        colors.semantic.error.light,
        lightBg,
        WCAG_AA_LARGE,
        'Error red on light background (badges/UI)'
      );
    });

    it('maintains contrast for info on light background', () => {
      expectContrast(
        colors.semantic.info.light,
        lightBg,
        WCAG_AA_LARGE,
        'Info blue on light background (badges/UI)'
      );
    });
  });

  describe('Dark Mode - UI Component Contrast (3:1 minimum)', () => {
    it('maintains contrast for button borders on dark background', () => {
      expectContrast(
        colors.primary[500],
        darkBg,
        WCAG_AA_LARGE,
        'Magenta border on dark background'
      );
    });

    it('maintains contrast for input borders on dark background', () => {
      const ratio = getContrastRatio(colors.neutral[500], darkBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE); // UI component minimum
    });

    it('maintains contrast for focus indicators on dark background', () => {
      expectContrast(
        colors.primary[500],
        darkBg,
        WCAG_AA_LARGE,
        'Focus ring on dark background'
      );
    });

    it('documents disabled state text (informational)', () => {
      const ratio = getContrastRatio(colors.neutral[600], darkBg);
      expect(ratio).toBeGreaterThan(2.0); // Disabled is exempt but still visible
    });
  });

  describe('Light Mode - UI Component Contrast (3:1 minimum)', () => {
    it('maintains contrast for button borders on light background', () => {
      expectContrast(
        colors.primary[600],
        lightBg,
        WCAG_AA_LARGE,
        'Magenta border on light background'
      );
    });

    it('maintains contrast for input borders on light background', () => {
      const ratio = getContrastRatio(colors.neutral[400], lightBg);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE); // UI component minimum
    });

    it('maintains contrast for focus indicators on light background', () => {
      expectContrast(
        colors.primary[600],
        lightBg,
        WCAG_AA_LARGE,
        'Focus ring on light background'
      );
    });

    it('documents disabled state text (informational)', () => {
      const ratio = getContrastRatio(colors.neutral[400], lightBg);
      expect(ratio).toBeGreaterThan(2.0); // Disabled is exempt but still visible
    });
  });

  describe('Color Scale Contrast Progression', () => {
    it('lighter primary shades have higher contrast on dark background', () => {
      const ratio300 = getContrastRatio(colors.primary[300], darkBg);
      const ratio700 = getContrastRatio(colors.primary[700], darkBg);
      expect(ratio300).toBeGreaterThan(ratio700);
    });

    it('darker neutral shades have higher contrast on light background', () => {
      const ratio300 = getContrastRatio(colors.neutral[300], lightBg);
      const ratio700 = getContrastRatio(colors.neutral[700], lightBg);
      expect(ratio700).toBeGreaterThan(ratio300);
    });
  });

  describe('Dark Mode - Link Contrast', () => {
    it('maintains contrast for default link color on dark background', () => {
      expectContrast(
        colors.primary[500],
        darkBg,
        WCAG_AA_NORMAL,
        'Magenta link on dark background'
      );
    });

    it('maintains contrast for visited links on dark background', () => {
      expectContrast(
        colors.primary[400],
        darkBg,
        WCAG_AA_NORMAL,
        'Lighter magenta visited link on dark background'
      );
    });

    it('maintains contrast for hover state on dark background', () => {
      expectContrast(
        colors.primary[400],
        darkBg,
        WCAG_AA_NORMAL,
        'Lighter magenta hover link on dark background'
      );
    });
  });

  describe('Light Mode - Link Contrast', () => {
    it('maintains contrast for default link color on light background', () => {
      expectContrast(
        colors.primary[600],
        lightBg,
        WCAG_AA_NORMAL,
        'Darker magenta link on light background'
      );
    });

    it('maintains contrast for visited links on light background', () => {
      expectContrast(
        colors.primary[700],
        lightBg,
        WCAG_AA_NORMAL,
        'Darkest magenta visited link on light background'
      );
    });

    it('maintains contrast for hover state on light background', () => {
      expectContrast(
        colors.primary[500],
        lightBg,
        WCAG_AA_LARGE,
        'Magenta hover link on light background'
      );
    });
  });

  describe('Dark Mode - Card and Container Backgrounds', () => {
    it('maintains contrast for text on dark card surface', () => {
      expectContrast(
        colors.neutral[50],
        darkSurface,
        WCAG_AA_NORMAL,
        'Light text on dark card surface'
      );
    });

    it('maintains contrast for primary color on dark card surface', () => {
      expectContrast(
        colors.primary[500],
        darkSurface,
        WCAG_AA_LARGE,
        'Magenta on dark card surface (UI accents)'
      );
    });
  });

  describe('Light Mode - Card and Container Backgrounds', () => {
    it('maintains contrast for text on light card surface', () => {
      expectContrast(
        colors.neutral[900],
        lightSurface,
        WCAG_AA_NORMAL,
        'Dark text on white card surface'
      );
    });

    it('maintains contrast for darker primary color on light card surface', () => {
      expectContrast(
        colors.primary[600],
        lightSurface,
        WCAG_AA_NORMAL,
        'Darker magenta on white card surface'
      );
    });
  });

  describe('Dark Mode - Heading Contrast (Large Text)', () => {
    it('maintains contrast for h1-h2 on dark background', () => {
      expectContrast(
        colors.neutral[50],
        darkBg,
        WCAG_AA_NORMAL,
        'Large light heading on dark background'
      );
    });

    it('maintains contrast for h3-h6 on dark background', () => {
      expectContrast(
        colors.neutral[100],
        darkBg,
        WCAG_AA_NORMAL,
        'Small light heading on dark background'
      );
    });
  });

  describe('Light Mode - Heading Contrast (Large Text)', () => {
    it('maintains contrast for h1-h2 on light background', () => {
      expectContrast(
        colors.neutral[900],
        lightBg,
        WCAG_AA_NORMAL,
        'Large dark heading on light background'
      );
    });

    it('maintains contrast for h3-h6 on light background', () => {
      expectContrast(
        colors.neutral[800],
        lightBg,
        WCAG_AA_NORMAL,
        'Small dark heading on light background'
      );
    });
  });

  describe('Dark Mode - Button Text Contrast', () => {
    it('maintains contrast for primary button text on magenta', () => {
      expectContrast(
        colors.neutral[50],
        colors.primary[500],
        WCAG_AA_LARGE,
        'Light text on magenta button'
      );
    });

    it('maintains contrast for secondary button text on cyan', () => {
      expectContrast(
        colors.neutral[900],
        colors.secondary[400],
        WCAG_AA_NORMAL,
        'Dark text on cyan button'
      );
    });

    it('maintains contrast for tertiary/ghost button text', () => {
      expectContrast(
        colors.primary[500],
        darkBg,
        WCAG_AA_NORMAL,
        'Magenta text on dark background (tertiary button)'
      );
    });
  });

  describe('Light Mode - Button Text Contrast', () => {
    it('maintains contrast for primary button text on magenta', () => {
      expectContrast(
        '#FFFFFF',
        colors.primary[600],
        WCAG_AA_NORMAL,
        'White text on darker magenta button'
      );
    });

    it('maintains contrast for secondary button text on cyan', () => {
      expectContrast(
        '#FFFFFF',
        colors.secondary[600],
        WCAG_AA_LARGE,
        'White text on darker cyan button'
      );
    });

    it('maintains contrast for tertiary/ghost button text', () => {
      expectContrast(
        colors.primary[600],
        lightBg,
        WCAG_AA_NORMAL,
        'Darker magenta text on light background (tertiary button)'
      );
    });
  });

  describe('Dark Mode - Form Element Contrast', () => {
    it('maintains contrast for input text on dark surface', () => {
      expectContrast(
        colors.neutral[50],
        darkSurface,
        WCAG_AA_NORMAL,
        'Light input text on dark input background'
      );
    });

    it('maintains contrast for placeholder text on dark surface', () => {
      expectContrast(
        colors.neutral[400],
        darkSurface,
        WCAG_AA_LARGE,
        'Gray placeholder on dark input background'
      );
    });

    it('maintains contrast for label text on dark background', () => {
      expectContrast(
        colors.neutral[200],
        darkBg,
        WCAG_AA_NORMAL,
        'Light label on dark background'
      );
    });

    it('maintains contrast for error text on dark background', () => {
      expectContrast(
        colors.semantic.error.dark,
        darkBg,
        WCAG_AA_LARGE,
        'Error red on dark background'
      );
    });

    it('maintains contrast for helper text on dark background', () => {
      expectContrast(
        colors.neutral[400],
        darkBg,
        WCAG_AA_NORMAL,
        'Helper text on dark background'
      );
    });
  });

  describe('Light Mode - Form Element Contrast', () => {
    it('maintains contrast for input text on light surface', () => {
      expectContrast(
        colors.neutral[900],
        lightSurface,
        WCAG_AA_NORMAL,
        'Dark input text on white input background'
      );
    });

    it('maintains contrast for placeholder text on light surface', () => {
      expectContrast(
        colors.neutral[500],
        lightSurface,
        WCAG_AA_LARGE,
        'Gray placeholder on white input background'
      );
    });

    it('maintains contrast for label text on light background', () => {
      expectContrast(
        colors.neutral[700],
        lightBg,
        WCAG_AA_NORMAL,
        'Dark label on light background'
      );
    });

    it('maintains contrast for error text on light background', () => {
      expectContrast(
        colors.semantic.error.light,
        lightBg,
        WCAG_AA_LARGE,
        'Error red on light background'
      );
    });

    it('maintains contrast for helper text on light background', () => {
      expectContrast(
        colors.neutral[600],
        lightBg,
        WCAG_AA_NORMAL,
        'Helper text on light background'
      );
    });
  });

  describe('Dark Mode - Regression Protection', () => {
    it('ensures excellent primary text contrast on dark background', () => {
      const ratio = getContrastRatio(colors.neutral[50], darkBg);
      // Should maintain excellent contrast (AAA level: 7:1)
      expect(ratio).toBeGreaterThan(7.0);
    });

    it('ensures magenta brand color remains accessible on dark background', () => {
      const ratio = getContrastRatio(colors.primary[500], darkBg);
      // Should be comfortably above AA threshold
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('ensures semantic colors remain accessible for UI elements on dark background', () => {
      const successRatio = getContrastRatio(colors.semantic.success.dark, darkBg);
      const errorRatio = getContrastRatio(colors.semantic.error.dark, darkBg);
      const infoRatio = getContrastRatio(colors.semantic.info.dark, darkBg);
      const warningRatio = getContrastRatio(colors.semantic.warning.dark, darkBg);

      expect(successRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(errorRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(infoRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(warningRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('prevents accidental use of insufficient contrast combinations on dark background', () => {
      const badCombos = [
        {
          fg: colors.neutral[700],
          bg: darkBg,
          name: 'Dark gray on dark background',
        },
        {
          fg: colors.neutral[800],
          bg: darkBg,
          name: 'Very dark gray on dark background',
        },
        {
          fg: colors.primary[800],
          bg: darkBg,
          name: 'Dark primary on dark background',
        },
      ];

      badCombos.forEach(combo => {
        const ratio = getContrastRatio(combo.fg, combo.bg);
        expect(
          ratio,
          `${combo.name} should fail WCAG AA for normal text`
        ).toBeLessThan(WCAG_AA_NORMAL);
      });
    });
  });

  describe('Light Mode - Regression Protection', () => {
    it('ensures excellent primary text contrast on light background', () => {
      const ratio = getContrastRatio(colors.neutral[900], lightBg);
      // Should maintain excellent contrast (AAA level: 7:1)
      expect(ratio).toBeGreaterThan(7.0);
    });

    it('ensures darker magenta brand color remains accessible on light background', () => {
      const ratio = getContrastRatio(colors.primary[600], lightBg);
      // Should be comfortably above AA threshold
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it('ensures semantic colors remain accessible for UI elements on light background', () => {
      const successRatio = getContrastRatio(colors.semantic.success.light, lightBg);
      const errorRatio = getContrastRatio(colors.semantic.error.light, lightBg);
      const infoRatio = getContrastRatio(colors.semantic.info.light, lightBg);
      const warningRatio = getContrastRatio(colors.semantic.warning.light, lightBg);

      expect(successRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(errorRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(infoRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(warningRatio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it('prevents accidental use of insufficient contrast combinations on light background', () => {
      const badCombos = [
        {
          fg: colors.neutral[300],
          bg: lightBg,
          name: 'Light gray on light background',
        },
        {
          fg: colors.neutral[200],
          bg: lightBg,
          name: 'Very light gray on light background',
        },
        {
          fg: colors.primary[200],
          bg: lightBg,
          name: 'Light primary on light background',
        },
      ];

      badCombos.forEach(combo => {
        const ratio = getContrastRatio(combo.fg, combo.bg);
        expect(
          ratio,
          `${combo.name} should fail WCAG AA for normal text`
        ).toBeLessThan(WCAG_AA_NORMAL);
      });
    });
  });
});
