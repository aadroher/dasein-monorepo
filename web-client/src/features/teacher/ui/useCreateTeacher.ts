import { useState, useCallback } from 'react';
import { createTeacher } from '../services/createTeacher';
import { validateTeacher, ValidationError } from '../model/teacher';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';

export interface UseCreateTeacherReturn {
  fullName: string;
  error: string | null;
  isCreating: boolean;
  setFullName: (name: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for managing teacher creation form state and logic.
 *
 * Features:
 * - Form field state management
 * - Validation error handling
 * - Async creation with loading state
 * - Form reset after successful creation
 * - Callback on successful creation for UI updates
 *
 * @param storage - Storage adapter for persisting teachers
 * @param onCreated - Callback invoked after successful teacher creation
 * @returns Form state and handlers
 */
export function useCreateTeacher(
  storage: TeacherStoragePort,
  onCreated?: (teacher: Teacher) => void
): UseCreateTeacherReturn {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const reset = useCallback(() => {
    setFullName('');
    setError(null);
    setIsCreating(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsCreating(true);

      try {
        // Create teacher (generates UUID and timestamps)
        const teacher = createTeacher(fullName);

        // Validate before persisting
        validateTeacher(teacher);

        // Persist to storage
        const result = await storage.create(teacher);

        if (!result.success) {
          setError(result.error.message);
          setIsCreating(false);
          return;
        }

        // Success - reset form and notify callback
        reset();
        onCreated?.(result.data);
      } catch (err) {
        if (err instanceof ValidationError) {
          setError(err.message);
        } else {
          setError('Failed to create teacher. Please try again.');
        }
        setIsCreating(false);
      }
    },
    [fullName, storage, onCreated, reset]
  );

  return {
    fullName,
    error,
    isCreating,
    setFullName,
    handleSubmit,
    reset,
  };
}
