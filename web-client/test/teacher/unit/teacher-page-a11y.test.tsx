import { describe, it, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { TeacherPage } from '../../../src/features/teacher/ui/teacher-page';
import { assertA11y } from '../../../src/test/a11y/assertA11y';
import { MemoryAdapter } from '../../../src/features/teacher/storage/memory-adapter';

/**
 * TeacherPage Accessibility Tests
 *
 * Ensures WCAG 2.1 AA compliance for TeacherPage component
 * Tests cover:
 * - Page structure with CommonLayout integration
 * - PageHeader accessibility
 * - Form and list sections together
 * - Complete page accessibility
 */
describe('TeacherPage - Accessibility (WCAG 2.1 AA)', () => {
  let storage: MemoryAdapter;

  beforeEach(async () => {
    storage = new MemoryAdapter();
    await storage.initialize();
  });

  describe('Empty State', () => {
    it('has no accessibility violations with no teachers', async () => {
      const { container } = render(<TeacherPage storage={storage} />);
      await waitFor(async () => {
        await assertA11y(container);
      });
    });
  });

  describe('With Teachers', () => {
    it('has no accessibility violations with teachers in list', async () => {
      // Create some teachers
      await storage.create({
        uuid: 'teacher-1',
        full_name: 'Alice Johnson',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      await storage.create({
        uuid: 'teacher-2',
        full_name: 'Bob Smith',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const { container } = render(<TeacherPage storage={storage} />);
      await waitFor(async () => {
        await assertA11y(container);
      });
    });
  });

  describe('Page Structure', () => {
    it('has no accessibility violations with heading hierarchy', async () => {
      const { container } = render(<TeacherPage storage={storage} />);
      await waitFor(async () => {
        await assertA11y(container);
      });
    });
  });

  describe('Form Section', () => {
    it('has no accessibility violations in create form section', async () => {
      const { container } = render(<TeacherPage storage={storage} />);
      await waitFor(async () => {
        await assertA11y(container);
      });
    });
  });

  describe('List Section', () => {
    it('has no accessibility violations in teacher list section', async () => {
      await storage.create({
        uuid: 'teacher-1',
        full_name: 'Test Teacher',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const { container } = render(<TeacherPage storage={storage} />);
      await waitFor(async () => {
        await assertA11y(container);
      });
    });
  });
});
