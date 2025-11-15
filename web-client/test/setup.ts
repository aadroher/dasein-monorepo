import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// Setup for React 19 testing environment
// This file is automatically loaded before running tests

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Add axe-core accessibility matcher
expect.extend(toHaveNoViolations);

// Global test utilities
declare global {
  namespace Vi {
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): any;
    }
  }
}
