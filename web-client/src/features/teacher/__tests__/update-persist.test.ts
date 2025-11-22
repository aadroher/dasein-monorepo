import { describe, it, expect, beforeEach } from 'vitest';
import { createTeacher } from '../services/create-teacher';
import { updateTeacher } from '../services/update-teacher';
import { MemoryAdapter } from '../storage/memory-adapter';
import type { StorageResult } from '../storage/storage-port';

function unwrapResult<T>(result: StorageResult<T>): T {
  if (!result.success) {
    throw result.error.cause ?? new Error(result.error.message);
  }
  return result.data;
}

describe('Update and Persist Teacher (Integration)', () => {
  let adapter: MemoryAdapter;

  beforeEach(async () => {
    adapter = new MemoryAdapter();
    unwrapResult(await adapter.initialize());
    unwrapResult(await adapter.clear());
  });

  it('should update and persist teacher name change', async () => {
    const teacher = createTeacher('Original Name');
    unwrapResult(await adapter.create(teacher));

    const updated = updateTeacher(teacher, 'Updated Name');
    unwrapResult(await adapter.update(updated));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(1);
    expect(loaded[0].uuid).toBe(teacher.uuid);
    expect(loaded[0].full_name).toBe('Updated Name');
    expect(loaded[0].created_at).toBe(teacher.created_at);
    // updated_at should be close to the expected time (within 10ms tolerance for timing variations)
    const expectedTime = new Date(updated.updated_at).getTime();
    const actualTime = new Date(loaded[0].updated_at).getTime();
    expect(Math.abs(actualTime - expectedTime)).toBeLessThanOrEqual(10);
  });

  it('should persist multiple updates to same teacher', async () => {
    const teacher = createTeacher('First Name');
    unwrapResult(await adapter.create(teacher));

    const update1 = updateTeacher(teacher, 'Second Name');
    unwrapResult(await adapter.update(update1));

    const update2 = updateTeacher(update1, 'Third Name');
    unwrapResult(await adapter.update(update2));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(1);
    expect(loaded[0].full_name).toBe('Third Name');
    expect(loaded[0].uuid).toBe(teacher.uuid);
    expect(loaded[0].created_at).toBe(teacher.created_at);
  });

  it('should maintain data integrity after update and reload', async () => {
    const teacher = createTeacher('Integrity Test');
    unwrapResult(await adapter.create(teacher));

    // Wait a moment to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));

    const updated = updateTeacher(teacher, 'Updated Integrity Test');
    unwrapResult(await adapter.update(updated));

    const loaded = unwrapResult(await adapter.list());
    const reloaded = loaded[0];

    expect(reloaded.uuid).toBe(updated.uuid);
    expect(reloaded.full_name).toBe(updated.full_name);
    expect(reloaded.created_at).toBe(updated.created_at);
    expect(reloaded.updated_at).toBe(updated.updated_at);
    // Note: In some cases created_at and updated_at might be the same if update is instant
    // The important part is that they preserve through persistence
  });

  it('should fail to update non-existent teacher', async () => {
    const teacher = createTeacher('Not Stored');
    const updated = updateTeacher(teacher, 'Updated Name');

    const result = await adapter.update(updated);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('ITEM_NOT_FOUND');
    }
  });

  it('should preserve other teachers when updating one', async () => {
    const teacher1 = createTeacher('Teacher One');
    const teacher2 = createTeacher('Teacher Two');
    const teacher3 = createTeacher('Teacher Three');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));
    unwrapResult(await adapter.create(teacher3));

    const updatedTeacher2 = updateTeacher(teacher2, 'Updated Teacher Two');
    unwrapResult(await adapter.update(updatedTeacher2));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(3);

    const reloadedTeacher1 = loaded.find(t => t.uuid === teacher1.uuid);
    const reloadedTeacher2 = loaded.find(t => t.uuid === teacher2.uuid);
    const reloadedTeacher3 = loaded.find(t => t.uuid === teacher3.uuid);

    expect(reloadedTeacher1?.full_name).toBe('Teacher One');
    expect(reloadedTeacher2?.full_name).toBe('Updated Teacher Two');
    expect(reloadedTeacher3?.full_name).toBe('Teacher Three');
  });

  it('should allow updating to duplicate name', async () => {
    const teacher1 = createTeacher('Duplicate Name');
    const teacher2 = createTeacher('Different Name');

    unwrapResult(await adapter.create(teacher1));
    unwrapResult(await adapter.create(teacher2));

    const updatedTeacher2 = updateTeacher(teacher2, 'Duplicate Name');
    unwrapResult(await adapter.update(updatedTeacher2));

    const loaded = unwrapResult(await adapter.list());

    expect(loaded).toHaveLength(2);
    expect(loaded.filter(t => t.full_name === 'Duplicate Name')).toHaveLength(
      2
    );
  });
});
