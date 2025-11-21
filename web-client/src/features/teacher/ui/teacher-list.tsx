import { useState } from 'react';
import { Heading } from '../../../design-system/components/heading';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { TeacherListItem } from './teacher-list-item';
import { TeacherEditForm } from './teacher-edit-form';

export interface TeacherListProps {
  teachers: Teacher[];
  storage: TeacherStoragePort;
  isLoading?: boolean;
  onTeacherUpdated?: () => void;
  onTeacherDeleted?: () => void;
}

/**
 * Component for displaying teachers in a table with edit and delete functionality.
 *
 * Features:
 * - Displays teachers in table format with inline actions
 * - Shows empty state when no teachers exist
 * - Accessible table markup with proper semantic structure
 * - Loading state support
 * - Inline editing with cancel support
 * - Icon buttons for edit and delete actions
 *
 * @param teachers - Array of teacher objects to display
 * @param storage - Storage adapter for persistence
 * @param isLoading - Optional loading state indicator
 * @param onTeacherUpdated - Callback when a teacher is updated
 * @param onTeacherDeleted - Callback when a teacher is deleted
 */
export function TeacherList({
  teachers,
  storage,
  isLoading = false,
  onTeacherUpdated,
  onTeacherDeleted,
}: TeacherListProps) {
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="teacher-list-loading" role="status" aria-live="polite">
        Loading teachers...
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="teacher-list-empty" role="status">
        <p>No teachers yet. Add your first teacher above!</p>
      </div>
    );
  }

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacherId(teacher.uuid);
  };

  const handleEditCancel = () => {
    setEditingTeacherId(null);
  };

  const handleEditSave = () => {
    setEditingTeacherId(null);
    onTeacherUpdated?.();
  };

  const handleDelete = () => {
    onTeacherDeleted?.();
  };

  return (
    <div className="teacher-list">
      <Heading level={2}>Teachers ({teachers.length})</Heading>
      <table className="teacher-table w-full" aria-label="Teachers">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-right px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => {
            if (editingTeacherId === teacher.uuid) {
              return (
                <tr key={teacher.uuid}>
                  <td colSpan={2} className="px-4 py-3">
                    <TeacherEditForm
                      teacher={teacher}
                      storage={storage}
                      onSave={handleEditSave}
                      onCancel={handleEditCancel}
                    />
                  </td>
                </tr>
              );
            }

            return (
              <TeacherListItem
                key={teacher.uuid}
                teacher={teacher}
                storage={storage}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEditing={false}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
