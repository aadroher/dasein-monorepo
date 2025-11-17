import React, { useEffect } from 'react';
import { Button } from '../../../design-system/components/button';
import { Input } from '../../../design-system/components/input';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { useEditTeacher } from './use-edit-teacher';

export interface TeacherEditFormProps {
  teacher: Teacher;
  storage: TeacherStoragePort;
  onSave?: (teacher: Teacher) => void;
  onCancel?: () => void;
}

/**
 * Form component for editing existing teachers.
 *
 * Features:
 * - Accessible form with proper ARIA labels
 * - Pre-populated with existing teacher data
 * - Real-time validation feedback
 * - Loading state during submission
 * - Auto-focus on mount for editing
 * - Keyboard navigation support
 * - Cancel option to discard changes
 *
 * @param teacher - The existing teacher to edit
 * @param storage - Storage adapter for persistence
 * @param onSave - Optional callback invoked after successful update
 * @param onCancel - Optional callback invoked when edit is cancelled
 */
export function TeacherEditForm({
  teacher,
  storage,
  onSave,
  onCancel,
}: TeacherEditFormProps) {
  const { fullName, error, isUpdating, setFullName, handleSubmit, inputRef } =
    useEditTeacher(teacher, storage, onSave);

  // Focus the input on mount for better UX
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Select all text for easy replacement
      inputRef.current.select();
    }
  }, [inputRef]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="teacher-edit-form">
      <Input
        id={`teacher-edit-name-${teacher.uuid}`}
        type="text"
        label="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        error={error || undefined}
        disabled={isUpdating}
        placeholder="Enter teacher's full name"
        aria-required="true"
      />

      <div className="form-actions">
        <Button
          type="submit"
          disabled={isUpdating || !fullName.trim()}
          aria-label={isUpdating ? 'Saving changes...' : 'Save changes'}
        >
          {isUpdating ? 'Saving...' : 'Save'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancelClick}
          disabled={isUpdating}
          aria-label="Cancel editing"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
