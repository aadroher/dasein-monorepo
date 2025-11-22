import React from 'react';
import { Button } from '../../../design-system/components/button';
import { Input } from '../../../design-system/components/input';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
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
    <form onSubmit={handleSubmit} className="teacher-create-form space-y-6">
      <Input
        id="teacher-full-name"
        type="text"
        label="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        error={error || undefined}
        disabled={isCreating}
        placeholder="Enter teacher's full name"
        aria-required="true"
      />

      <Button
        type="submit"
        disabled={isCreating || !fullName.trim()}
        aria-label={isCreating ? 'Creating teacher...' : 'Add teacher'}
      >
        {isCreating ? 'Adding...' : 'Add Teacher'}
      </Button>
    </form>
  );
}
