import { describe, it, expect } from 'vitest';
import { createTeacher } from '../createTeacher';
import { ValidationError } from '../../model/teacher';

describe('Create Teacher Service', () => {
  describe('createTeacher', () => {
    it('should create a teacher with valid name', () => {
      const result = createTeacher('Jane Doe');

      expect(result).toHaveProperty('uuid');
      expect(result.full_name).toBe('Jane Doe');
      expect(result).toHaveProperty('created_at');
      expect(result).toHaveProperty('updated_at');
      expect(result.uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });

    it('should trim whitespace from name', () => {
      const result = createTeacher('  John Smith  ');

      expect(result.full_name).toBe('John Smith');
    });

    it('should throw ValidationError for empty name', () => {
      expect(() => createTeacher('')).toThrow(ValidationError);
      expect(() => createTeacher('')).toThrow('Full name cannot be empty');
    });

    it('should throw ValidationError for whitespace-only name', () => {
      expect(() => createTeacher('   ')).toThrow(ValidationError);
      expect(() => createTeacher('   ')).toThrow('Full name cannot be empty');
    });

    it('should throw ValidationError for name exceeding 200 characters', () => {
      const longName = 'a'.repeat(201);
      expect(() => createTeacher(longName)).toThrow(ValidationError);
      expect(() => createTeacher(longName)).toThrow(
        'Full name cannot exceed 200 characters'
      );
    });

    it('should accept name at 200 character limit', () => {
      const maxName = 'a'.repeat(200);
      const result = createTeacher(maxName);

      expect(result.full_name).toBe(maxName);
    });

    it('should create unique IDs for different teachers', () => {
      const teacher1 = createTeacher('Alice');
      const teacher2 = createTeacher('Bob');

      expect(teacher1.uuid).not.toBe(teacher2.uuid);
    });

    it('should set created_at and updated_at to same timestamp', () => {
      const teacher = createTeacher('Charlie');

      expect(teacher.created_at).toBe(teacher.updated_at);
    });

    it('should create ISO 8601 formatted timestamps', () => {
      const teacher = createTeacher('David');

      expect(teacher.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
      expect(teacher.updated_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
    });
  });
});
