import React, { useEffect } from 'react';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { useEditTeacher } from './useEditTeacher';

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
      <div className="form-group">
        <label htmlFor={`teacher-edit-name-${teacher.uuid}`}>
          Full Name
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <input
          id={`teacher-edit-name-${teacher.uuid}`}
          ref={inputRef}
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          aria-label="Full name"
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `teacher-edit-error-${teacher.uuid}` : undefined
          }
          disabled={isUpdating}
          placeholder="Enter teacher's full name"
          autoComplete="name"
        />
        {error && (
          <div
            id={`teacher-edit-error-${teacher.uuid}`}
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isUpdating || !fullName.trim()}
          aria-label={isUpdating ? 'Saving changes...' : 'Save changes'}
        >
          {isUpdating ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          disabled={isUpdating}
          aria-label="Cancel editing"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
