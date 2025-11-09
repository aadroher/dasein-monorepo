import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTeacher } from '../../../src/features/teacher/services/createTeacher';
import { IndexedDBAdapter } from '../../../src/features/teacher/storage/indexeddb-adapter';

describe('Create and Persist Teacher (Integration)', () => {
  let adapter: IndexedDBAdapter;

  beforeEach(async () => {
    adapter = new IndexedDBAdapter();
    await adapter.initialize();
    await adapter.clear(); // Clean slate for each test
  });

  afterEach(async () => {
    await adapter.clear();
  });

  it('should persist a created teacher to IndexedDB', async () => {
    const teacher = createTeacher('Jane Doe');

    await adapter.save(teacher);
    const loaded = await adapter.load();

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toEqual(teacher);
  });

  it('should persist and reload multiple teachers', async () => {
    const teacher1 = createTeacher('Alice');
    const teacher2 = createTeacher('Bob');
    const teacher3 = createTeacher('Charlie');

    await adapter.save(teacher1);
    await adapter.save(teacher2);
    await adapter.save(teacher3);

    const loaded = await adapter.load();

    expect(loaded).toHaveLength(3);
    expect(loaded.map(t => t.full_name)).toContain('Alice');
    expect(loaded.map(t => t.full_name)).toContain('Bob');
    expect(loaded.map(t => t.full_name)).toContain('Charlie');
  });

  it('should maintain teacher data integrity after reload', async () => {
    const teacher = createTeacher('Data Integrity Test');

    await adapter.save(teacher);
    const loaded = await adapter.load();
    const reloaded = loaded[0];

    expect(reloaded.id).toBe(teacher.id);
    expect(reloaded.full_name).toBe(teacher.full_name);
    expect(reloaded.created_at).toBe(teacher.created_at);
    expect(reloaded.updated_at).toBe(teacher.updated_at);
  });

  it('should handle empty storage load', async () => {
    const loaded = await adapter.load();

    expect(loaded).toEqual([]);
  });

  it('should overwrite teacher if saved with same ID', async () => {
    const teacher = createTeacher('Original Name');
    await adapter.save(teacher);

    const updated = {
      ...teacher,
      full_name: 'Updated Name',
      updated_at: new Date().toISOString(),
    };
    await adapter.save(updated);

    const loaded = await adapter.load();

    expect(loaded).toHaveLength(1);
    expect(loaded[0].full_name).toBe('Updated Name');
  });
});
