import React from 'react';
import type { Teacher } from '../model/teacher';

export interface TeacherListProps {
  teachers: Teacher[];
  isLoading?: boolean;
}

/**
 * Component for displaying a list of teachers.
 *
 * Features:
 * - Displays teachers in alphabetical order (assumed from data source)
 * - Shows empty state when no teachers exist
 * - Accessible list markup with proper ARIA roles
 * - Loading state support
 *
 * @param teachers - Array of teacher objects to display
 * @param isLoading - Optional loading state indicator
 */
export function TeacherList({ teachers, isLoading = false }: TeacherListProps) {
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

  return (
    <div className="teacher-list">
      <h2>Teachers ({teachers.length})</h2>
      <ul aria-label="Teachers list">
        {teachers.map(teacher => (
          <li key={teacher.uuid} className="teacher-list-item">
            <span className="teacher-name">{teacher.full_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
