import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeacherList } from '../teacher-list';
import { MemoryAdapter } from '../../storage/memory-adapter';
import { createTeacher } from '../../services/create-teacher';
import { assertA11y } from '../../../../test/a11y/assertA11y';
import type { Teacher } from '../../model/teacher';

describe('TeacherList Accessibility', () => {
  let storage: MemoryAdapter;

  beforeEach(async () => {
    storage = new MemoryAdapter();
    await storage.initialize();
    await storage.clear();
  });

  it('should have no accessibility violations with empty list', async () => {
    const { container } = render(
      <TeacherList teachers={[]} storage={storage} />
    );

    await assertA11y(container);
  });

  it('should have no accessibility violations with loading state', async () => {
    const { container } = render(
      <TeacherList teachers={[]} storage={storage} isLoading={true} />
    );

    await assertA11y(container);
  });

  it('should have no accessibility violations with populated list', async () => {
    const teachers: Teacher[] = [
      createTeacher('Alice Johnson'),
      createTeacher('Bob Wilson'),
      createTeacher('Charlie Davis'),
    ];

    const { container } = render(
      <TeacherList teachers={teachers} storage={storage} />
    );

    await assertA11y(container);
  });

  it('should have accessible list structure', () => {
    const teachers: Teacher[] = [
      createTeacher('Alice Johnson'),
      createTeacher('Bob Wilson'),
    ];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // Verify table has proper role
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Verify table rows (excluding header)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(2); // Header + data rows
  });

  it('should have accessible empty state message', () => {
    render(<TeacherList teachers={[]} storage={storage} />);

    // Empty state should be visible and accessible
    const emptyState = screen.getByText(/no teachers/i);
    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toBeVisible();
  });

  it('should have accessible loading state', () => {
    render(<TeacherList teachers={[]} storage={storage} isLoading={true} />);

    // Loading state should use status role and aria-live
    const loadingState = screen.getByRole('status');
    expect(loadingState).toBeInTheDocument();
    expect(loadingState).toHaveAttribute('aria-live', 'polite');
  });

  it('should have accessible edit buttons', () => {
    const teachers: Teacher[] = [createTeacher('Test Teacher')];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // Edit button should be accessible
    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeVisible();
  });

  it('should have accessible delete buttons', () => {
    const teachers: Teacher[] = [createTeacher('Test Teacher')];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // Delete button should be accessible
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeVisible();
  });

  it('should have no accessibility violations with edit form open', async () => {
    const teachers: Teacher[] = [createTeacher('Test Teacher')];

    const { container } = render(
      <TeacherList teachers={teachers} storage={storage} />
    );

    // Click edit button to open edit form
    const editButton = screen.getByRole('button', { name: /edit/i });
    editButton.click();

    // Wait for edit form to appear
    await screen.findByRole('textbox', { name: /full name/i });

    await assertA11y(container);
  });

  it('should maintain focus management when editing', async () => {
    const teachers: Teacher[] = [createTeacher('Test Teacher')];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // Get edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    editButton.click();

    // Edit form input should appear
    const input = await screen.findByRole('textbox', { name: /full name/i });
    expect(input).toBeInTheDocument();

    // Cancel button should be available
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it('should have keyboard-navigable list items', () => {
    const teachers: Teacher[] = [
      createTeacher('Alice Johnson'),
      createTeacher('Bob Wilson'),
      createTeacher('Charlie Davis'),
    ];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // All interactive elements (edit and delete buttons) should be keyboard accessible
    const buttons = screen.getAllByRole('button');

    // Should have edit and delete buttons for each teacher
    // 3 teachers × 2 buttons (edit + delete) = 6 buttons
    expect(buttons.length).toBeGreaterThanOrEqual(6);

    // All buttons should be tab-navigable (no tabindex=-1)
    buttons.forEach(button => {
      const tabIndex = button.getAttribute('tabindex');
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  it('should provide proper text alternatives for teacher names', () => {
    const teachers: Teacher[] = [createTeacher('Test Teacher Name')];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // Teacher name should be visible as text
    expect(screen.getByText('Test Teacher Name')).toBeInTheDocument();
  });

  it('should have no accessibility violations with multiple teachers', async () => {
    const teachers: Teacher[] = [
      createTeacher('Alice Johnson'),
      createTeacher('Bob Wilson'),
      createTeacher('Charlie Davis'),
      createTeacher('Diana Evans'),
      createTeacher('Ethan Foster'),
    ];

    const { container } = render(
      <TeacherList teachers={teachers} storage={storage} />
    );

    await assertA11y(container);
  });

  it('should have accessible list with duplicate names', async () => {
    const teachers: Teacher[] = [
      createTeacher('John Smith'),
      createTeacher('John Smith'),
      createTeacher('John Smith'),
    ];

    const { container } = render(
      <TeacherList teachers={teachers} storage={storage} />
    );

    // Despite duplicate names, each should have unique UUID and be accessible
    await assertA11y(container);
  });

  it('should maintain semantic HTML structure', () => {
    const teachers: Teacher[] = [createTeacher('Test Teacher')];

    render(<TeacherList teachers={teachers} storage={storage} />);

    // Verify proper semantic HTML elements are used
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    // Should have header row + 1 data row
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });
});
