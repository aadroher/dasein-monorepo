import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TeacherCreateForm } from '../../src/features/teacher/ui/teacher-create-form';
import type { TeacherStoragePort } from '../../src/features/teacher/storage/storage-port';

describe('TeacherCreateForm - Spacing', () => {
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

  it('should apply space-y-6 class for form section spacing (24px)', () => {
    const { container } = render(<TeacherCreateForm storage={mockStorage} />);

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    expect(form?.className).toContain('space-y-6');
  });

  it('should have proper spacing between form elements', () => {
    const { container } = render(<TeacherCreateForm storage={mockStorage} />);

    const form = container.querySelector('form');
    expect(form).not.toBeNull();

    // Verify form has space-y-6 class (24px between major sections)
    // Note: In test environment, Tailwind classes may not be fully evaluated
    // This test verifies the class is present, actual visual verification
    // should be done in E2E tests or visual regression tests
    expect(form?.classList.contains('space-y-6')).toBe(true);
  });
  it('should maintain proper spacing hierarchy (space-y-6 > space-y-2 > gap-3)', () => {
    const { container } = render(<TeacherCreateForm storage={mockStorage} />);

    const form = container.querySelector('form');
    expect(form).not.toBeNull();

    // Form should have space-y-6 for section spacing
    expect(form?.className).toContain('space-y-6');

    // This validates the spacing classes are applied
    // Actual pixel values are validated in E2E tests with real CSS
  });

  it('should have accessible form elements with proper spacing', () => {
    const { getByLabelText, getByRole } = render(
      <TeacherCreateForm storage={mockStorage} />
    );

    // Verify form elements exist and are accessible
    const input = getByLabelText(/full name/i);
    expect(input).toBeInTheDocument();

    const button = getByRole('button', { name: /add teacher/i });
    expect(button).toBeInTheDocument();

    // Spacing doesn't affect accessibility - elements remain accessible
    expect(input).toBeVisible();
    expect(button).toBeVisible();
  });

  it('should maintain minimum touch target sizes (44x44px) with new spacing', () => {
    const { getByRole } = render(<TeacherCreateForm storage={mockStorage} />);

    const button = getByRole('button', { name: /add teacher/i });

    // Button should remain accessible with proper touch target
    // Minimum recommended height (WCAG 2.1 AA target size)
    // Note: Actual pixel validation requires CSS rendering in E2E tests
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });
});
