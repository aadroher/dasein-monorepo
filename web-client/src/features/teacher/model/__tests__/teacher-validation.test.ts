import { describe, it, expect } from 'vitest';
import { validateTeacher, type Teacher } from '../teacher';

describe('Teacher Validation', () => {
  describe('validateTeacher', () => {
    it('should accept valid teacher with trimmed name', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: 'Jane Doe',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).not.toThrow();
    });

    it('should reject empty full_name', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).toThrow(
        'Full name cannot be empty'
      );
    });

    it('should reject whitespace-only full_name', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: '   ',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).toThrow(
        'Full name cannot be empty'
      );
    });

    it('should reject full_name longer than 200 characters', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: 'a'.repeat(201),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).toThrow(
        'Full name cannot exceed 200 characters'
      );
    });

    it('should accept full_name at 200 character limit', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: 'a'.repeat(200),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).not.toThrow();
    });

    it('should accept full_name between 1 and 100 characters', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: 'John Smith',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).not.toThrow();
    });

    it('should trim whitespace before validation', () => {
      const teacher: Teacher = {
        id: 'test-uuid-123',
        full_name: '  Alice Johnson  ',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      expect(() => validateTeacher(teacher)).not.toThrow();
    });
  });
});
