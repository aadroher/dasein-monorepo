import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateTeacher } from '../updateTeacher';
import { ValidationError } from '../../model/teacher';
import { createTeacher } from '../createTeacher';

describe('Update Teacher Service', () => {
  describe('updateTeacher', () => {
    let existingTeacher: ReturnType<typeof createTeacher>;

    beforeEach(() => {
      existingTeacher = createTeacher('Original Name');
      // Allow time to pass for timestamp verification
      vi.useFakeTimers();
    });

    it('should update teacher name while preserving uuid and created_at', () => {
      const newName = 'Updated Name';

      vi.advanceTimersByTime(1000); // Advance time by 1 second

      const result = updateTeacher(existingTeacher, newName);

      expect(result.uuid).toBe(existingTeacher.uuid);
      expect(result.full_name).toBe(newName);
      expect(result.created_at).toBe(existingTeacher.created_at);
      expect(result.updated_at).not.toBe(existingTeacher.updated_at);

      vi.useRealTimers();
    });

    it('should trim whitespace from new name', () => {
      const result = updateTeacher(existingTeacher, '  Trimmed Name  ');

      expect(result.full_name).toBe('Trimmed Name');
    });

    it('should throw ValidationError for empty name', () => {
      expect(() => updateTeacher(existingTeacher, '')).toThrow(ValidationError);
      expect(() => updateTeacher(existingTeacher, '')).toThrow(
        'Full name cannot be empty'
      );
    });

    it('should throw ValidationError for whitespace-only name', () => {
      expect(() => updateTeacher(existingTeacher, '   ')).toThrow(
        ValidationError
      );
      expect(() => updateTeacher(existingTeacher, '   ')).toThrow(
        'Full name cannot be empty'
      );
    });

    it('should throw ValidationError for name exceeding 200 characters', () => {
      const longName = 'a'.repeat(201);
      expect(() => updateTeacher(existingTeacher, longName)).toThrow(
        ValidationError
      );
      expect(() => updateTeacher(existingTeacher, longName)).toThrow(
        'Full name cannot exceed 200 characters'
      );
    });

    it('should accept name at 200 character limit', () => {
      const maxName = 'a'.repeat(200);
      const result = updateTeacher(existingTeacher, maxName);

      expect(result.full_name).toBe(maxName);
    });

    it('should allow duplicate names (different teachers can have same name)', () => {
      const newName = 'Duplicate Name';
      const result = updateTeacher(existingTeacher, newName);

      expect(result.full_name).toBe(newName);
      expect(result.uuid).toBe(existingTeacher.uuid);
    });

    it('should update timestamp to current time', () => {
      vi.useFakeTimers();
      const startTime = new Date('2025-11-11T10:00:00Z');
      vi.setSystemTime(startTime);

      const teacher = createTeacher('Test Teacher');

      const updateTime = new Date('2025-11-11T10:05:00Z');
      vi.setSystemTime(updateTime);

      const result = updateTeacher(teacher, 'Updated Name');

      expect(result.updated_at).toBe(updateTime.toISOString());
      expect(result.created_at).toBe(startTime.toISOString());

      vi.useRealTimers();
    });

    it('should return a new teacher object (immutability)', () => {
      const result = updateTeacher(existingTeacher, 'New Name');

      expect(result).not.toBe(existingTeacher);
      expect(existingTeacher.full_name).toBe('Original Name');
      expect(result.full_name).toBe('New Name');
    });
  });
});
