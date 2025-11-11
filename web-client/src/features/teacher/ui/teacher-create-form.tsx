import React from 'react';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { ValidationError } from '../model/teacher';
import { useCreateTeacher } from './use-create-teacher';

export interface TeacherCreateFormProps {
  storage: TeacherStoragePort;
  onCreated?: (teacher: Teacher) => void;
}

/**
 * Form component for creating new teachers.
 *
 * Features:
 * - Accessible form with proper ARIA labels
 * - Real-time validation feedback
 * - Loading state during submission
 * - Auto-clears on successful creation
 * - Keyboard navigation support
 *
 * @param storage - Storage adapter for persistence
 * @param onCreated - Optional callback invoked after successful creation
 */
export function TeacherCreateForm({
  storage,
  onCreated,
}: TeacherCreateFormProps) {
  const { fullName, error, isCreating, setFullName, handleSubmit } =
    useCreateTeacher(storage, onCreated);

  return (
    <form onSubmit={handleSubmit} className="teacher-create-form">
      <div className="form-group">
        <label htmlFor="teacher-full-name">
          Full Name
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <input
          id="teacher-full-name"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          aria-label="Full name"
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'teacher-name-error' : undefined}
          disabled={isCreating}
          placeholder="Enter teacher's full name"
          autoComplete="name"
        />
        {error && (
          <div
            id="teacher-name-error"
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isCreating || !fullName.trim()}
        aria-label={isCreating ? 'Creating teacher...' : 'Add teacher'}
      >
        {isCreating ? 'Adding...' : 'Add Teacher'}
      </button>
    </form>
  );
}
