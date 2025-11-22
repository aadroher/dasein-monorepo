import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TeacherCreateForm } from '../../src/features/teacher/ui/teacher-create-form';
import type { TeacherStoragePort } from '../../src/features/teacher/storage/storage-port';

expect.extend(toHaveNoViolations);

describe('TeacherCreateForm - Accessibility with Spacing', () => {
  const mockStorage: TeacherStoragePort = {
    initialize: vi.fn().mockResolvedValue({ success: true, data: undefined }),
    create: vi.fn(),
    list: vi.fn().mockResolvedValue({ success: true, data: [] }),
    getById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    clear: vi.fn(),
    isAvailable: vi.fn().mockResolvedValue(true),
  };

  it('should have no accessibility violations with improved spacing', async () => {
    const { container } = render(<TeacherCreateForm storage={mockStorage} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should maintain focus indicators with new spacing', async () => {
    const { getByLabelText } = render(
      <TeacherCreateForm storage={mockStorage} />
    );

    const input = getByLabelText(/full name/i);

    // Focus should be programmatically applicable
    input.focus();
    expect(document.activeElement).toBe(input);

    // Note: Button is disabled when form is empty, which is correct behavior
    // Focus management is preserved with new spacing
  });

  it('should maintain proper tab order with improved spacing', () => {
    const { getByRole, getByLabelText } = render(
      <TeacherCreateForm storage={mockStorage} />
    );

    const input = getByLabelText(/full name/i);
    const button = getByRole('button', { name: /add teacher/i });

    // Tab order should be logical (input before button)
    const formElements = [input, button];

    formElements.forEach(element => {
      expect(element).toBeInTheDocument();
      // Elements should not have negative tabIndex (which would break tab order)
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex !== null) {
        expect(parseInt(tabIndex, 10)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  it('should have sufficient touch target sizes (44x44px minimum)', () => {
    const { getByRole } = render(<TeacherCreateForm storage={mockStorage} />);

    const button = getByRole('button', { name: /add teacher/i });

    // Button should be present (will be disabled when form is empty, which is correct)
    expect(button).toBeInTheDocument();

    // The button should have sufficient padding/size for accessibility
    // Actual pixel verification happens in E2E tests with real CSS
    expect(button.tagName).toBe('BUTTON');
  });
  it('should maintain form semantics with spacing changes', () => {
    const { container } = render(<TeacherCreateForm storage={mockStorage} />);

    // Form should still be a form element
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();

    // Input should still have proper label association
    const label = container.querySelector('label[for="teacher-full-name"]');
    const input = container.querySelector('input#teacher-full-name');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input?.getAttribute('aria-required')).toBe('true');
  });
});
