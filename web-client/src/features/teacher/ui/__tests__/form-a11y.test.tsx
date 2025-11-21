import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeacherCreateForm } from '../teacher-create-form';
import { MemoryAdapter } from '../../storage/memory-adapter';
import { assertA11y } from '../../../../test/a11y/assertA11y';

describe('TeacherCreateForm Accessibility', () => {
  let storage: MemoryAdapter;

  beforeEach(async () => {
    storage = new MemoryAdapter();
    await storage.initialize();
    await storage.clear();
  });

  it('should have no accessibility violations in default state', async () => {
    const { container } = render(<TeacherCreateForm storage={storage} />);

    await assertA11y(container);
  });

  it('should have no accessibility violations with error state', async () => {
    const user = userEvent.setup();

    // Create a teacher with a name that will cause a validation error
    // (In this case, we'll mock a storage error)
    const mockStorage = {
      ...storage,
      create: async () => ({
        success: false,
        error: {
          code: 'VALIDATION_ERROR' as const,
          message: 'Test error message',
        },
      }),
    };

    const { container: errorContainer } = render(
      <TeacherCreateForm storage={mockStorage as any} />
    );

    const input = screen.getByLabelText(/full name/i);
    await user.type(input, 'Test Name');

    const submitButton = screen.getByRole('button', { name: /add teacher/i });
    await user.click(submitButton);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    await assertA11y(errorContainer);
  });

  it('should have accessible form label', () => {
    render(<TeacherCreateForm storage={storage} />);

    const input = screen.getByLabelText(/full name/i);
    expect(input).toBeInTheDocument();
    // Input is properly labeled via <label> element, no aria-label needed
    expect(input).toHaveAttribute('id', 'teacher-full-name');
  });

  it('should mark required field appropriately', () => {
    render(<TeacherCreateForm storage={storage} />);

    const input = screen.getByLabelText(/full name/i);
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('should associate error message with input field', async () => {
    const user = userEvent.setup();

    // Mock storage to return an error
    const mockStorage = {
      ...storage,
      create: async () => ({
        success: false,
        error: {
          code: 'VALIDATION_ERROR' as const,
          message: 'Full name cannot be empty',
        },
      }),
    };

    render(<TeacherCreateForm storage={mockStorage as any} />);

    // Fill with a valid name to enable button
    const input = screen.getByLabelText(/full name/i);
    await user.type(input, 'Valid Name');

    const submitButton = screen.getByRole('button', { name: /add teacher/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
    });

    const inputField = screen.getByLabelText(/full name/i);
    expect(inputField).toHaveAttribute('aria-invalid', 'true');
    expect(inputField).toHaveAttribute(
      'aria-describedby',
      'teacher-full-name-error'
    );
  });

  it('should have accessible button states', () => {
    render(<TeacherCreateForm storage={storage} />);

    const submitButton = screen.getByRole('button', { name: /add teacher/i });
    expect(submitButton).toHaveAttribute('aria-label');
  });
});
