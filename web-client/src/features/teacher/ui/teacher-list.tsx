import { useState } from 'react';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { TeacherEditForm } from './teacher-edit-form';
import { TeacherDeleteButton } from './teacher-delete-button';

export interface TeacherListProps {
  teachers: Teacher[];
  storage: TeacherStoragePort;
  isLoading?: boolean;
  onTeacherUpdated?: () => void;
  onTeacherDeleted?: () => void;
}

/**
 * Component for displaying a list of teachers with edit and delete functionality.
 *
 * Features:
 * - Displays teachers in alphabetical order (assumed from data source)
 * - Shows empty state when no teachers exist
 * - Accessible list markup with proper ARIA roles
 * - Loading state support
 * - Inline editing with cancel support
 * - Edit and delete buttons for each teacher
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

  const handleEditClick = (teacherId: string) => {
    setEditingTeacherId(teacherId);
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
      <h2>Teachers ({teachers.length})</h2>
      <ul aria-label="Teachers list">
        {teachers.map(teacher => (
          <li key={teacher.uuid} className="teacher-list-item">
            {editingTeacherId === teacher.uuid ? (
              <TeacherEditForm
                teacher={teacher}
                storage={storage}
                onSave={handleEditSave}
                onCancel={handleEditCancel}
              />
            ) : (
              <div className="teacher-item-view">
                <span className="teacher-name">{teacher.full_name}</span>
                <div className="teacher-actions">
                  <button
                    onClick={() => handleEditClick(teacher.uuid)}
                    aria-label={`Edit ${teacher.full_name}`}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <TeacherDeleteButton
                    teacherId={teacher.uuid}
                    teacherName={teacher.full_name}
                    storage={storage}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
