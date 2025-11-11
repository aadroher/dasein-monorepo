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

describe('Create and Persist Teacher (Integration)', () => {
  let adapter: MemoryAdapter;

  beforeEach(async () => {
    adapter = new MemoryAdapter();
    unwrapResult(await adapter.initialize());
    unwrapResult(await adapter.clear());
  });

  it('should persist a created teacher to storage', async () => {
    const teacher = createTeacher('Jane Doe');

    unwrapResult(await adapter.create(teacher));
    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toEqual(teacher);
  });

  it('should persist and reload multiple teachers', async () => {
    const teacher1 = createTeacher('Alice');
    const teacher2 = createTeacher('Bob');
    const teacher3 = createTeacher('Charlie');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(3);
    expect(loaded.map(t => t.full_name)).toContain('Alice');
    expect(loaded.map(t => t.full_name)).toContain('Bob');
    expect(loaded.map(t => t.full_name)).toContain('Charlie');
  });

  it('should maintain teacher data integrity after reload', async () => {
    const teacher = createTeacher('Data Integrity Test');

    unwrapResult(await adapter.create(teacher));
    const loaded = unwrapResult(await adapter.list());
    const reloaded = loaded[0];

    expect(reloaded.uuid).toBe(teacher.uuid);
    expect(reloaded.full_name).toBe(teacher.full_name);
    expect(reloaded.created_at).toBe(teacher.created_at);
    expect(reloaded.updated_at).toBe(teacher.updated_at);
  });

  it('should handle empty storage load', async () => {
    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toEqual([]);
  });

  it('should overwrite teacher if updated with same UUID', async () => {
    const teacher = createTeacher('Original Name');
    unwrapResult(await adapter.create(teacher));

    const updated = {
      ...teacher,
      full_name: 'Updated Name',
      updated_at: new Date().toISOString(),
    };
    unwrapResult(await adapter.update(updated));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(1);
    expect(loaded[0].full_name).toBe('Updated Name');
  });
});
