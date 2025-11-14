import { describe, it, expect, beforeEach } from 'vitest';
import { createTeacher } from '../../../src/features/teacher/services/create-teacher';
import { MemoryAdapter } from '../../../src/features/teacher/storage/memory-adapter';
import { sortTeachersAlphabetically } from '../../../src/features/teacher/services/sort';
import type { StorageResult } from '../../../src/features/teacher/storage/storage-port';

function unwrapResult<T>(result: StorageResult<T>): T {
  if (!result.success) {
    throw result.error.cause ?? new Error(result.error.message);
  }
  return result.data;
}

describe('List Load Integration', () => {
  let adapter: MemoryAdapter;

  beforeEach(async () => {
    adapter = new MemoryAdapter();
    unwrapResult(await adapter.initialize());
    unwrapResult(await adapter.clear());
  });

  it('should load an empty list when no teachers exist', async () => {
    const teachers = unwrapResult(await adapter.list());

    expect(teachers).toEqual([]);
    expect(teachers).toHaveLength(0);
  });

  it('should load all teachers from storage', async () => {
    const teacher1 = createTeacher('John Smith');
    const teacher2 = createTeacher('Alice Johnson');
    const teacher3 = createTeacher('Bob Wilson');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    const teachers = unwrapResult(await adapter.list());

    expect(teachers).toHaveLength(3);
    expect(teachers.map(t => t.full_name)).toContain('John Smith');
    expect(teachers.map(t => t.full_name)).toContain('Alice Johnson');
    expect(teachers.map(t => t.full_name)).toContain('Bob Wilson');
  });

  it('should load teachers in alphabetical order', async () => {
    // Create teachers in non-alphabetical order
    const teacherZ = createTeacher('Zara Adams');
    const teacherA = createTeacher('Alice Baker');
    const teacherM = createTeacher('Michael Chen');

    unwrapResult(await adapter.create(teacherZ));
    unwrapResult(await adapter.create(teacherA));
    unwrapResult(await adapter.create(teacherM));

    const teachers = unwrapResult(await adapter.list());

    // Memory adapter returns unsorted, so we sort them
    const sorted = sortTeachersAlphabetically(teachers);

    expect(sorted[0].full_name).toBe('Alice Baker');
    expect(sorted[1].full_name).toBe('Michael Chen');
    expect(sorted[2].full_name).toBe('Zara Adams');
  });

  it('should handle case-insensitive alphabetical sorting', async () => {
    const teacher1 = createTeacher('alice');
    const teacher2 = createTeacher('Bob');
    const teacher3 = createTeacher('CHARLIE');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    const teachers = unwrapResult(await adapter.list());
    const sorted = sortTeachersAlphabetically(teachers);

    expect(sorted[0].full_name).toBe('alice');
    expect(sorted[1].full_name).toBe('Bob');
    expect(sorted[2].full_name).toBe('CHARLIE');
  });

  it('should maintain all teacher properties when loading', async () => {
    const teacher = createTeacher('Test Teacher');

    unwrapResult(await adapter.create(teacher));
    const teachers = unwrapResult(await adapter.list());

    expect(teachers[0]).toEqual({
      uuid: teacher.uuid,
      full_name: teacher.full_name,
      created_at: teacher.created_at,
      updated_at: teacher.updated_at,
    });
  });

  it('should reflect changes after CRUD operations', async () => {
    // Create initial teacher
    const teacher1 = createTeacher('Original Teacher');
    unwrapResult(await adapter.create(teacher1));

    // Add another teacher
    const teacher2 = createTeacher('Second Teacher');
    unwrapResult(await adapter.create(teacher2));

    let teachers = unwrapResult(await adapter.list());
    expect(teachers).toHaveLength(2);

    // Update one teacher
    const updated = {
      ...teacher1,
      full_name: 'Updated Teacher',
      updated_at: new Date().toISOString(),
    };
    unwrapResult(await adapter.update(updated));

    teachers = unwrapResult(await adapter.list());
    expect(teachers).toHaveLength(2);
    expect(teachers.find(t => t.uuid === teacher1.uuid)?.full_name).toBe(
      'Updated Teacher'
    );

    // Delete one teacher
    unwrapResult(await adapter.delete(teacher2.uuid));

    teachers = unwrapResult(await adapter.list());
    expect(teachers).toHaveLength(1);
    expect(teachers[0].full_name).toBe('Updated Teacher');
  });

  it('should handle duplicate names correctly', async () => {
    const teacher1 = createTeacher('John Smith');
    const teacher2 = createTeacher('John Smith');
    const teacher3 = createTeacher('John Smith');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    const teachers = unwrapResult(await adapter.list());

    expect(teachers).toHaveLength(3);
    // Ensure they have different UUIDs
    const uuids = teachers.map(t => t.uuid);
    expect(new Set(uuids).size).toBe(3);
  });

  it('should return empty list after clearing storage', async () => {
    const teacher1 = createTeacher('Teacher One');
    const teacher2 = createTeacher('Teacher Two');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));

    let teachers = unwrapResult(await adapter.list());
    expect(teachers).toHaveLength(2);

    unwrapResult(await adapter.clear());

    teachers = unwrapResult(await adapter.list());
    expect(teachers).toEqual([]);
  });
});
