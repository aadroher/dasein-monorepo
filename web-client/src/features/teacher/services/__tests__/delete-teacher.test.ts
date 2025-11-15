import { describe, it, expect } from 'vitest';
import { deleteTeacher } from '../delete-teacher';
import { createTeacher } from '../create-teacher';

describe('Delete Teacher Service', () => {
  describe('deleteTeacher', () => {
    it('should successfully validate deletion request for existing teacher', () => {
      const teacher = createTeacher('John Doe');

      const result = deleteTeacher(teacher.uuid);

      expect(result).toEqual({
        uuid: teacher.uuid,
      });
    });

    it('should return deletion request object with uuid', () => {
      const uuid = '12345678-1234-1234-1234-123456789abc';

      const result = deleteTeacher(uuid);

      expect(result).toEqual({ uuid });
      expect(result.uuid).toBe(uuid);
    });

    it('should accept any string as uuid (validation at storage layer)', () => {
      const customUuid = 'custom-uuid-format';

      const result = deleteTeacher(customUuid);

      expect(result.uuid).toBe(customUuid);
    });

    it('should be a pure function with no side effects', () => {
      const uuid = 'test-uuid';

      const result1 = deleteTeacher(uuid);
      const result2 = deleteTeacher(uuid);

      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2); // Different object instances
    });
  });
});
