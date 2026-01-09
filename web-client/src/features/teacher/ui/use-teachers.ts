import { useState, useEffect, useCallback } from 'react';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { sortTeachersAlphabetically } from '../services/sort';

export interface UseTeachersReturn {
  teachers: Teacher[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for managing the teachers list.
 *
 * Features:
 * - Loads teachers from storage on mount
 * - Provides loading and error states
 * - Exposes refresh function for manual reload
 * - Teachers are sorted alphabetically (case-insensitive)
 *
 * @param storage - Storage adapter for loading teachers
 * @returns Teachers list state and refresh function
 */
export const useTeachers = (storage: TeacherStoragePort): UseTeachersReturn => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await storage.list();

      if (!result.success) {
        setError(result.error.message);
        setTeachers([]);
      } else {
        // Sort teachers alphabetically (case-insensitive) after loading
        const sortedTeachers = sortTeachersAlphabetically(result.data);
        setTeachers(sortedTeachers);
      }
    } catch {
      setError('Failed to load teachers. Please try again.');
      setTeachers([]);
    } finally {
      setIsLoading(false);
    }
  }, [storage]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    teachers,
    isLoading,
    error,
    refresh,
  };
}
