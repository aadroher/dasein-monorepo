/**
 * Accessibility testing helpers using axe-core
 * Provides utilities for automated WCAG 2.1 AA compliance testing
 */

import { configureAxe } from 'jest-axe';
import type { AxeResults, ElementContext } from 'axe-core';

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
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
});

/**
 * Assert that an element has no accessibility violations
 * @param element - DOM element or document to test
 * @param options - Additional axe options
 */
export async function assertA11y(
  element: Element | Document = document,
  options?: {
    include?: ElementContext;
    exclude?: ElementContext;
    rules?: Record<string, { enabled: boolean }>;
  }
): Promise<void> {
  const results = await axe(element, options);
  expect(results).toHaveNoViolations();
}

/**
 * Get detailed accessibility results without throwing
 * @param element - DOM element or document to test
 * @param options - Additional axe options
 * @returns Promise resolving to axe results
 */
export async function getA11yResults(
  element: Element | Document = document,
  options?: {
    include?: ElementContext;
    exclude?: ElementContext;
    rules?: Record<string, { enabled: boolean }>;
  }
): Promise<AxeResults> {
  return await axe(element, options);
}

/**
 * Test specific accessibility rule
 * @param element - DOM element to test
 * @param rule - Specific axe rule to test
 */
export async function assertA11yRule(
  element: Element | Document,
  rule: string
): Promise<void> {
  const results = await axe(element, {
    rules: {
      [rule]: { enabled: true },
    },
  });

  const ruleViolations = results.violations.filter(v => v.id === rule);

  if (ruleViolations.length > 0) {
    const violation = ruleViolations[0];
    throw new Error(
      `Accessibility violation for rule "${rule}": ${violation.description}\n` +
        `Found ${violation.nodes.length} violations:\n` +
        violation.nodes.map(node => `- ${node.failureSummary}`).join('\n')
    );
  }
}

/**
 * Common accessibility test patterns for teacher components
 */
export const teacherA11yTests = {
  /**
   * Test form accessibility
   */
  async form(formElement: Element): Promise<void> {
    await assertA11yRule(formElement, 'label');
    await assertA11yRule(formElement, 'form-field-multiple-labels');
    await assertA11yRule(formElement, 'aria-required-attr');
    await assertA11yRule(formElement, 'color-contrast');
  },

  /**
   * Test list accessibility
   */
  async list(listElement: Element): Promise<void> {
    await assertA11yRule(listElement, 'list');
    await assertA11yRule(listElement, 'listitem');
    await assertA11yRule(listElement, 'color-contrast');
  },

  /**
   * Test button accessibility
   */
  async button(buttonElement: Element): Promise<void> {
    await assertA11yRule(buttonElement, 'button-name');
    await assertA11yRule(buttonElement, 'color-contrast');
    await assertA11yRule(buttonElement, 'focus-order-semantics');
  },

  /**
   * Test navigation accessibility
   */
  async navigation(navElement: Element): Promise<void> {
    await assertA11yRule(navElement, 'landmark-one-main');
    await assertA11yRule(navElement, 'page-has-heading-one');
    await assertA11yRule(navElement, 'bypass');
  },
};

/**
 * Mock axe results for testing the testing helpers themselves
 */
export const mockA11yResults = {
  clean: {
    violations: [],
    passes: [],
    incomplete: [],
    inapplicable: [],
  } as AxeResults,

  withViolations: (violations: string[] = ['color-contrast']) =>
    ({
      violations: violations.map(id => ({
        id,
        description: `Mock violation for ${id}`,
        nodes: [
          {
            failureSummary: `Mock failure for ${id}`,
          },
        ],
      })),
      passes: [],
      incomplete: [],
      inapplicable: [],
    }) as AxeResults,
};
