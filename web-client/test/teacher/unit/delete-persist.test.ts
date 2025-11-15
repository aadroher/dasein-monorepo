import { describe, it, expect, beforeEach } from 'vitest';
import { createTeacher } from '../../../src/features/teacher/services/create-teacher';
import { MemoryAdapter } from '../../../src/features/teacher/storage/memory-adapter';
import type { StorageResult } from '../../../src/features/teacher/storage/storage-port';

function unwrapResult<T>(result: StorageResult<T>): T {
  if (!result.success) {
    throw result.error.cause ?? new Error(result.error.message);
  }
  return result.data;
}

describe('Delete and Persist Teacher (Integration)', () => {
  let adapter: MemoryAdapter;

  beforeEach(async () => {
    adapter = new MemoryAdapter();
    unwrapResult(await adapter.initialize());
    unwrapResult(await adapter.clear());
  });

  it('should delete teacher and remove from storage', async () => {
    const teacher = createTeacher('John Doe');
    unwrapResult(await adapter.create(teacher));

    unwrapResult(await adapter.delete(teacher.uuid));
    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(0);
  });

  it('should delete specific teacher from multiple teachers', async () => {
    const teacher1 = createTeacher('Alice');
    const teacher2 = createTeacher('Bob');
    const teacher3 = createTeacher('Charlie');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    unwrapResult(await adapter.delete(teacher2.uuid));
    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(2);
    expect(loaded.map(t => t.full_name)).toContain('Alice');
    expect(loaded.map(t => t.full_name)).toContain('Charlie');
    expect(loaded.map(t => t.full_name)).not.toContain('Bob');
  });

  it('should fail to delete non-existent teacher', async () => {
    const result = await adapter.delete('non-existent-uuid');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('ITEM_NOT_FOUND');
    }
  });

  it('should handle deletion from empty storage', async () => {
    const result = await adapter.delete('some-uuid');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('ITEM_NOT_FOUND');
    }
  });

  it('should preserve other teachers after deletion', async () => {
    const teacher1 = createTeacher('Teacher One');
    const teacher2 = createTeacher('Teacher Two');
    const teacher3 = createTeacher('Teacher Three');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    unwrapResult(await adapter.delete(teacher2.uuid));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(2);

    const reloadedTeacher1 = loaded.find(t => t.uuid === teacher1.uuid);
    const reloadedTeacher3 = loaded.find(t => t.uuid === teacher3.uuid);

    expect(reloadedTeacher1).toBeDefined();
    expect(reloadedTeacher3).toBeDefined();
    expect(reloadedTeacher1?.full_name).toBe('Teacher One');
    expect(reloadedTeacher3?.full_name).toBe('Teacher Three');
  });

  it('should handle multiple deletions', async () => {
    const teacher1 = createTeacher('Teacher One');
    const teacher2 = createTeacher('Teacher Two');
    const teacher3 = createTeacher('Teacher Three');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    unwrapResult(await adapter.delete(teacher1.uuid));
    unwrapResult(await adapter.delete(teacher3.uuid));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(1);
    expect(loaded[0].full_name).toBe('Teacher Two');
  });

  it('should be idempotent - deleting same teacher twice (second fails)', async () => {
    const teacher = createTeacher('Idempotent Test');
    unwrapResult(await adapter.create(teacher));

    unwrapResult(await adapter.delete(teacher.uuid));
    const result = await adapter.delete(teacher.uuid);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('ITEM_NOT_FOUND');
    }
  });

  it('should result in empty list when all teachers deleted', async () => {
    const teacher1 = createTeacher('First');
    const teacher2 = createTeacher('Second');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));

    unwrapResult(await adapter.delete(teacher1.uuid));
    unwrapResult(await adapter.delete(teacher2.uuid));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toEqual([]);
  });
});
