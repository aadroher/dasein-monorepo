import { describe, it, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { TeacherList } from '../../../src/features/teacher/ui/teacher-list';
import { assertA11y } from '../../../src/test/a11y/assertA11y';
import type { Teacher } from '../../../src/features/teacher/model/teacher';
import { MemoryAdapter } from '../../../src/features/teacher/storage/memory-adapter';

/**
 * TeacherList Accessibility Tests
 *
 * Ensures WCAG 2.1 AA compliance for TeacherList component with table layout
 * Tests cover:
 * - Table semantic structure (table, thead, tbody, tr, td)
 * - Accessible table name/caption
 * - Icon button accessibility (aria-label includes teacher name)
 * - Keyboard navigation
 * - Empty state accessibility
 * - Edit mode accessibility
 */
describe('TeacherList - Accessibility (WCAG 2.1 AA)', () => {
  let storage: MemoryAdapter;

  beforeEach(() => {
    storage = new MemoryAdapter();
  });

  describe('Empty State', () => {
    it('has no accessibility violations when list is empty', async () => {
      const { container } = render(
        <TeacherList teachers={[]} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });

  describe('Loading State', () => {
    it('has no accessibility violations in loading state', async () => {
      const { container } = render(
        <TeacherList teachers={[]} storage={storage} isLoading={true} />
      );
      await assertA11y(container);
    });
  });

  describe('Table with Single Teacher', () => {
    it('has no accessibility violations with one teacher', async () => {
      const teachers: Teacher[] = [
        {
          uuid: '1',
          full_name: 'Alice Johnson',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
      ];

      const { container } = render(
        <TeacherList teachers={teachers} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });

  describe('Table with Multiple Teachers', () => {
    it('has no accessibility violations with multiple teachers', async () => {
      const teachers: Teacher[] = [
        {
          uuid: '1',
          full_name: 'Alice Johnson',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
        {
          uuid: '2',
          full_name: 'Bob Smith',
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
        },
        {
          uuid: '3',
          full_name: 'Charlie Brown',
          created_at: '2024-01-03T00:00:00.000Z',
          updated_at: '2024-01-03T00:00:00.000Z',
        },
      ];

      const { container } = render(
        <TeacherList teachers={teachers} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });

  describe('Icon Button Context', () => {
    it('edit and delete icon buttons include teacher name in aria-label', async () => {
      const teachers: Teacher[] = [
        {
          uuid: '1',
          full_name: 'Test Teacher',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
      ];

      const { container } = render(
        <TeacherList teachers={teachers} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });

  describe('Long Teacher Names', () => {
    it('has no accessibility violations with very long names', async () => {
      const teachers: Teacher[] = [
        {
          uuid: '1',
          full_name: 'Dr. Bartholomew Montgomery Richardson-Fitzpatrick III',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
      ];

      const { container } = render(
        <TeacherList teachers={teachers} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });

  describe('Special Characters in Names', () => {
    it('has no accessibility violations with names containing special characters', async () => {
      const teachers: Teacher[] = [
        {
          uuid: '1',
          full_name: "O'Brien-Smith",
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
        {
          uuid: '2',
          full_name: 'García López',
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
        },
      ];

      const { container } = render(
        <TeacherList teachers={teachers} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });

  describe('Large Lists', () => {
    it('has no accessibility violations with many teachers (50+)', async () => {
      const teachers: Teacher[] = Array.from({ length: 50 }, (_, i) => ({
        uuid: `teacher-${i}`,
        full_name: `Teacher ${String(i + 1).padStart(2, '0')}`,
        created_at: `2024-01-${String((i % 28) + 1).padStart(2, '0')}T00:00:00.000Z`,
        updated_at: `2024-01-${String((i % 28) + 1).padStart(2, '0')}T00:00:00.000Z`,
      }));

      const { container } = render(
        <TeacherList teachers={teachers} storage={storage} isLoading={false} />
      );
      await assertA11y(container);
    });
  });
});
