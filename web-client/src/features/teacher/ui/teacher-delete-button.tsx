import React from 'react';
import { useDeleteTeacher } from './use-delete-teacher';
import type { TeacherStoragePort } from '../storage/storage-port';

export interface TeacherDeleteButtonProps {
  teacherId: string;
  teacherName: string;
  storage: TeacherStoragePort;
  onDelete: (uuid: string) => void;
}

/**
 * Delete button component for teacher entries.
 *
 * Features:
 * - Confirmation dialog before deletion
 * - Accessible button with ARIA labels
 * - Loading state during deletion
 * - Error display
 *
 * @param teacherId - UUID of the teacher to delete
 * @param teacherName - Full name of the teacher (for confirmation message)
 * @param storage - Storage adapter for deletion
 * @param onDelete - Callback invoked after successful deletion
 */
export function TeacherDeleteButton({
  teacherId,
  teacherName,
  storage,
  onDelete,
}: TeacherDeleteButtonProps) {
  const { error, isDeleting, handleDelete } = useDeleteTeacher(
    storage,
    onDelete
  );

  const handleClick = async () => {
    await handleDelete(teacherId, teacherName);
  };

  return (
    <div className="teacher-delete-button">
      <button
        onClick={handleClick}
        disabled={isDeleting}
        aria-label={`Delete ${teacherName}`}
        aria-disabled={isDeleting}
        className="delete-button"
        type="button"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
      {error && (
        <div role="alert" className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}
