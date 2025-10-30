import { describe, it, expect } from 'vitest';
import {
  sortTeachersAlphabetically,
  sortTeachersByCreationDate,
  sortTeachers,
} from '../sort';
import { Teacher } from '../../model/teacher';

describe('Teacher Sorting Functions', () => {
  // Sample test data
  const mockTeachers: Teacher[] = [
    {
      id: '1',
      full_name: 'John Smith',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
    {
      id: '2',
      full_name: 'Alice Johnson',
      created_at: '2023-01-02T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
    },
    {
      id: '3',
      full_name: 'Bob Wilson',
      created_at: '2023-01-03T00:00:00Z',
      updated_at: '2023-01-03T00:00:00Z',
    },
  ];

  describe('sortTeachersAlphabetically', () => {
    it('should sort teachers alphabetically by full_name', () => {
      const sorted = sortTeachersAlphabetically(mockTeachers);

      expect(sorted[0].full_name).toBe('Alice Johnson');
      expect(sorted[1].full_name).toBe('Bob Wilson');
      expect(sorted[2].full_name).toBe('John Smith');
    });

    it('should not mutate the original array', () => {
      const original = [...mockTeachers];
      sortTeachersAlphabetically(mockTeachers);

      expect(mockTeachers).toEqual(original);
    });

    it('should handle empty array', () => {
      const result = sortTeachersAlphabetically([]);
      expect(result).toEqual([]);
    });
  });

  describe('sortTeachersByCreationDate', () => {
    it('should sort teachers by creation date (newest first)', () => {
      const sorted = sortTeachersByCreationDate(mockTeachers);

      expect(sorted[0].full_name).toBe('Bob Wilson'); // 2023-01-03
      expect(sorted[1].full_name).toBe('Alice Johnson'); // 2023-01-02
      expect(sorted[2].full_name).toBe('John Smith'); // 2023-01-01
    });
  });

  describe('sortTeachers (generic)', () => {
    it('should sort by full_name ascending by default', () => {
      const sorted = sortTeachers(mockTeachers);

      expect(sorted[0].full_name).toBe('Alice Johnson');
      expect(sorted[1].full_name).toBe('Bob Wilson');
      expect(sorted[2].full_name).toBe('John Smith');
    });

    it('should sort by full_name descending when specified', () => {
      const sorted = sortTeachers(mockTeachers, 'full_name', 'desc');

      expect(sorted[0].full_name).toBe('John Smith');
      expect(sorted[1].full_name).toBe('Bob Wilson');
      expect(sorted[2].full_name).toBe('Alice Johnson');
    });
  });
});
