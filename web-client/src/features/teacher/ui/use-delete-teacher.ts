import { useState, useCallback } from 'react';
import type { TeacherStoragePort } from '../storage/storage-port';

export interface UseDeleteTeacherReturn {
  error: string | null;
  isDeleting: boolean;
  handleDelete: (uuid: string, teacherName: string) => Promise<void>;
}

/**
 * Custom hook for managing teacher deletion logic.
 *
 * Features:
 * - Confirmation dialog before deletion
 * - Async deletion with loading state
 * - Error handling
 * - Callback on successful deletion for UI updates
 *
 * @param storage - Storage adapter for persisting teachers
 * @param onDeleted - Callback invoked after successful teacher deletion
 * @returns Deletion state and handlers
 */
export function useDeleteTeacher(
  storage: TeacherStoragePort,
  onDeleted?: (uuid: string) => void
): UseDeleteTeacherReturn {
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    async (uuid: string, teacherName: string) => {
      // Show confirmation dialog
      const confirmed = window.confirm(
        `Are you sure you want to delete ${teacherName}? This action cannot be undone.`
      );

      if (!confirmed) {
        return;
      }

      setError(null);
      setIsDeleting(true);

      try {
        // Delete from storage
        const result = await storage.delete(uuid);

        if (!result.success) {
          setError(result.error.message);
          setIsDeleting(false);
          return;
        }

        // Success - notify callback
        setIsDeleting(false);
        onDeleted?.(uuid);
      } catch {
        setError('Failed to delete teacher. Please try again.');
        setIsDeleting(false);
      }
    },
    [storage, onDeleted]
  );

  return {
    error,
    isDeleting,
    handleDelete,
  };
}
