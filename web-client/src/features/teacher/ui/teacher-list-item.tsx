import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../../../design-system/components/icon-button';
import type { Teacher } from '../model/teacher';
import type { TeacherStoragePort } from '../storage/storage-port';
import { useDeleteTeacher } from './use-delete-teacher';

export interface TeacherListItemProps {
  /** Teacher data to display */
  teacher: Teacher;

  /** Storage adapter for delete operation */
  storage: TeacherStoragePort;

  /** Callback when edit button clicked */
  onEdit: (teacher: Teacher) => void;

  /** Callback after successful deletion */
  onDelete: () => void;

  /** Whether this teacher is currently being edited */
  isEditing: boolean;
}

/**
 * Component for rendering a single teacher row in the teacher table.
 *
 * Features:
 * - Displays teacher name in table cell
 * - Edit and delete icon buttons with accessible labels
 * - Delete confirmation dialog
 * - Keyboard accessible actions
 * - Icon buttons include teacher name in aria-label for context
 *
 * @param teacher - Teacher object to display
 * @param storage - Storage adapter for delete operation
 * @param onEdit - Callback when edit button clicked
 * @param onDelete - Callback after successful deletion
 * @param isEditing - Whether this teacher is currently being edited
 */
export function TeacherListItem({
  teacher,
  storage,
  onEdit,
  onDelete,
  isEditing,
}: TeacherListItemProps) {
  const { isDeleting, handleDelete: performDelete } = useDeleteTeacher(
    storage,
    onDelete
  );

  if (isEditing) {
    // When editing, the edit form will be rendered instead
    // This is handled by the parent TeacherList component
    return null;
  }

  const handleEdit = () => {
    onEdit(teacher);
  };

  const handleDelete = async () => {
    await performDelete(teacher.uuid, teacher.full_name);
  };

  return (
    <tr className="teacher-list-item border-b border-neutral-700">
      <td className="teacher-name px-4 py-3 text-neutral-100">
        {teacher.full_name}
      </td>
      <td className="teacher-actions px-4 py-3">
        <div className="flex gap-2 justify-end">
          <IconButton
            icon={PencilIcon}
            label={`Edit ${teacher.full_name}`}
            onClick={handleEdit}
            variant="primary"
          />
          <IconButton
            icon={TrashIcon}
            label={`Delete ${teacher.full_name}`}
            onClick={handleDelete}
            disabled={isDeleting}
            variant="danger"
          />
        </div>
      </td>
    </tr>
  );
}
