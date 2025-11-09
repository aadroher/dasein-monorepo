/**
 * Accessibility testing helpers using axe-core
 * Provides utilities for automated WCAG 2.1 AA compliance testing
 */

import { configureAxe, type JestAxeConfigureOptions } from 'jest-axe';

// Import RunOptions from the configured axe instance to ensure type compatibility
type RunOptions = Parameters<typeof axe>[1];
type AxeResults = Awaited<ReturnType<typeof axe>>;

/**
 * Configured axe instance for WCAG 2.1 AA compliance
 */
export const axe = configureAxe({
  rules: {
    // WCAG 2.1 AA rules
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'focus-management': { enabled: true },
    'aria-labels': { enabled: true },
    'landmark-roles': { enabled: true },
    'heading-order': { enabled: true },
    'alt-text': { enabled: true },
    'form-labels': { enabled: true },
  },
} satisfies JestAxeConfigureOptions);

/**
 * Default axe options for WCAG 2.1 AA testing
 */
const defaultAxeOptions: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  },
} as const;

/**
 * Assert that an element has no accessibility violations
 * @param element - DOM element to test (defaults to document.body)
 * @param options - Additional axe options
 */
export async function assertA11y(
  element: Element = document.body,
  options?: RunOptions
): Promise<void> {
  const mergedOptions: RunOptions = {
    ...defaultAxeOptions,
    ...options,
  };
  const results = await axe(element, mergedOptions);
  expect(results).toHaveNoViolations();
}

/**
 * Get detailed accessibility results without throwing
 * @param element - DOM element to test (defaults to document.body)
 * @param options - Additional axe options
 * @returns Promise resolving to axe results
 */
export async function getA11yResults(
  element: Element = document.body,
  options?: RunOptions
): Promise<AxeResults> {
  const mergedOptions: RunOptions = {
    ...defaultAxeOptions,
    ...options,
  };
  return await axe(element, mergedOptions);
}
