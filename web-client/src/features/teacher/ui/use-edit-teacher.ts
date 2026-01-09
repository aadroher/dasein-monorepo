import { useState, useCallback, useRef } from 'react';
import { updateTeacher } from '../services/update-teacher';
import { validateTeacher, ValidationError } from '../model/teacher';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';

export interface UseEditTeacherReturn {
  fullName: string;
  error: string | null;
  isUpdating: boolean;
  setFullName: (name: string) => void;
  handleSubmit: () => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Custom hook for managing teacher edit form state and logic.
 *
 * Features:
 * - Pre-populated form field state from existing teacher
 * - Validation error handling
 * - Async update with loading state
 * - Input ref for focus management
 * - Callback on successful update for UI updates
 *
 * @param teacher - The existing teacher to edit
 * @param storage - Storage adapter for persisting teachers
 * @param onSave - Callback invoked after successful teacher update
 * @returns Form state and handlers
 */
export const useEditTeacher = (
  teacher: Teacher,
  storage: TeacherStoragePort,
  onSave?: (teacher: Teacher) => void
): UseEditTeacherReturn => {
  const [fullName, setFullName] = useState(teacher.full_name);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setIsUpdating(true);

    try {
      // Update teacher (preserves UUID and created_at, updates updated_at)
      const updatedTeacher = updateTeacher(teacher, fullName);

      // Validate before persisting
      validateTeacher(updatedTeacher);

      // Persist to storage
      const result = await storage.update(updatedTeacher);

      if (!result.success) {
        setError(result.error.message);
        setIsUpdating(false);
        return;
      }

      // Success - notify callback
      setIsUpdating(false);
      onSave?.(result.data);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.message);
      } else {
        setError('Failed to update teacher. Please try again.');
      }
      setIsUpdating(false);
    }
  }, [teacher, fullName, storage, onSave]);

  return {
    fullName,
    error,
    isUpdating,
    setFullName,
    handleSubmit,
    inputRef,
  };
}
