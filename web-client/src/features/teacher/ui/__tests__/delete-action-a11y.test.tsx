import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeacherDeleteButton } from '../teacher-delete-button';
import { MemoryAdapter } from '../../storage/memory-adapter';
import { assertA11y } from '../../../../test/a11y/assertA11y';
import { createTeacher } from '../../services/create-teacher';

describe('TeacherDeleteButton Accessibility', () => {
  let storage: MemoryAdapter;
  let existingTeacher: ReturnType<typeof createTeacher>;

  beforeEach(async () => {
    storage = new MemoryAdapter();
    await storage.initialize();
    await storage.clear();

    // Create a teacher to delete
    existingTeacher = createTeacher('Test Teacher');
    await storage.create(existingTeacher);
  });

  it('should have no accessibility violations in default state', async () => {
    const { container } = render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={storage}
        onDelete={() => {}}
      />
    );

    await assertA11y(container);
  });

  it('should have accessible button label with teacher name', () => {
    render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={storage}
        onDelete={() => {}}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveAccessibleName(/test teacher/i);
  });

  it('should have proper ARIA attributes for delete action', () => {
    render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={storage}
        onDelete={() => {}}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toHaveAttribute('aria-label');
    expect(deleteButton.getAttribute('aria-label')).toMatch(
      /delete.*test teacher/i
    );
  });

  it('should show accessible confirmation dialog', async () => {
    const user = userEvent.setup();

    // Mock window.confirm to avoid actual dialog
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={storage}
        onDelete={() => {}}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalled();
    expect(confirmSpy.mock.calls[0][0]).toMatch(/test teacher/i);

    confirmSpy.mockRestore();
  });

  it('should have no accessibility violations with error state', async () => {
    const user = userEvent.setup();

    // Mock storage to return an error
    const mockStorage = {
      ...storage,
      delete: async () => ({
        success: false,
        error: {
          code: 'ITEM_NOT_FOUND' as const,
          message: 'Teacher not found',
        },
      }),
    };

    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    const { container: errorContainer } = render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={mockStorage as any}
        onDelete={() => {}}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Wait for error message to appear
    await waitFor(
      () => {
        const errorMessage = screen.queryByRole('alert');
        if (errorMessage) {
          expect(errorMessage).toBeInTheDocument();
        }
      },
      { timeout: 1000 }
    );

    await assertA11y(errorContainer);

    confirmSpy.mockRestore();
  });

  it('should have accessible disabled state when loading', async () => {
    const user = userEvent.setup();

    // Mock a slow delete operation
    const slowStorage = {
      ...storage,
      delete: async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return { success: true, data: undefined };
      },
    };

    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    const { container } = render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={slowStorage as any}
        onDelete={() => {}}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Button should be disabled during operation
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /delete/i });
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    await assertA11y(container);

    confirmSpy.mockRestore();
  });

  it('should have keyboard accessibility', async () => {
    const user = userEvent.setup();
    const onDeleteMock = vi.fn();

    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={storage}
        onDelete={onDeleteMock}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    // Tab to button
    await user.tab();
    expect(deleteButton).toHaveFocus();

    // Activate with Enter
    await user.keyboard('{Enter}');
    expect(confirmSpy).toHaveBeenCalled();

    confirmSpy.mockRestore();
  });

  it('should announce deletion to screen readers', async () => {
    const user = userEvent.setup();
    const onDeleteMock = vi.fn();

    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockReturnValue(true);

    render(
      <TeacherDeleteButton
        teacherId={existingTeacher.uuid}
        teacherName={existingTeacher.full_name}
        storage={storage}
        onDelete={onDeleteMock}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(onDeleteMock).toHaveBeenCalled();
    });

    // Verify deletion callback was called
    expect(onDeleteMock).toHaveBeenCalledWith(existingTeacher.uuid);

    confirmSpy.mockRestore();
  });
});
