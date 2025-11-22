import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TeacherListItem } from '../../../src/features/teacher/ui/teacher-list-item';
import type { Teacher } from '../../../src/features/teacher/model/teacher';
import { MemoryAdapter } from '../../../src/features/teacher/storage/memory-adapter';

describe('TeacherListItem', () => {
  const mockTeacher: Teacher = {
    uuid: 'test-uuid-1',
    full_name: 'Alice Johnson',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
  };

  let storage: MemoryAdapter;

  beforeEach(() => {
    storage = new MemoryAdapter();
  });

  describe('Rendering', () => {
    it('renders teacher name in table row', () => {
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    it('renders as table row (tr element)', () => {
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      const { container } = render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      const row = container.querySelector('tr');
      expect(row).toBeInTheDocument();
    });

    it('renders edit and delete icon buttons', () => {
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      const editButton = screen.getByRole('button', {
        name: /edit alice johnson/i,
      });
      const deleteButton = screen.getByRole('button', {
        name: /delete alice johnson/i,
      });

      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe('Edit Action', () => {
    it('calls onEdit when edit button is clicked', async () => {
      const user = userEvent.setup();
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      const editButton = screen.getByRole('button', {
        name: /edit alice johnson/i,
      });
      await user.click(editButton);

      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(mockTeacher);
    });
  });

  describe('Delete Action', () => {
    it('shows delete button with correct label', () => {
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      const deleteButton = screen.getByRole('button', {
        name: /delete alice johnson/i,
      });

      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('includes teacher name in edit button aria-label', () => {
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      const editButton = screen.getByRole('button', {
        name: /edit alice johnson/i,
      });
      expect(editButton).toHaveAccessibleName(/edit.*alice johnson/i);
    });

    it('includes teacher name in delete button aria-label', () => {
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={mockTeacher}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      const deleteButton = screen.getByRole('button', {
        name: /delete alice johnson/i,
      });
      expect(deleteButton).toHaveAccessibleName(/delete.*alice johnson/i);
    });
  });

  describe('Special Characters in Names', () => {
    it('handles apostrophes in teacher names', () => {
      const teacherWithApostrophe: Teacher = {
        ...mockTeacher,
        full_name: "O'Brien",
      };
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={teacherWithApostrophe}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      expect(screen.getByText("O'Brien")).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /edit o'brien/i })
      ).toBeInTheDocument();
    });

    it('handles accented characters in teacher names', () => {
      const teacherWithAccents: Teacher = {
        ...mockTeacher,
        full_name: 'José García',
      };
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={teacherWithAccents}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      expect(screen.getByText('José García')).toBeInTheDocument();
    });

    it('handles very long teacher names', () => {
      const teacherWithLongName: Teacher = {
        ...mockTeacher,
        full_name: 'Dr. Bartholomew Montgomery Richardson-Fitzpatrick III',
      };
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <table>
          <tbody>
            <TeacherListItem
              teacher={teacherWithLongName}
              storage={storage}
              onEdit={onEdit}
              onDelete={onDelete}
              isEditing={false}
            />
          </tbody>
        </table>
      );

      expect(
        screen.getByText(
          'Dr. Bartholomew Montgomery Richardson-Fitzpatrick III'
        )
      ).toBeInTheDocument();
    });
  });
});
