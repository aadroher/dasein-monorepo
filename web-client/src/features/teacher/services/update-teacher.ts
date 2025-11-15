import {
  normalizeFullName,
  type Teacher,
  validateTeacher,
} from '../model/teacher';

/**
 * Update an existing Teacher with a new full name.
 *
 * - Preserves the original UUID and created_at timestamp
 * - Normalizes the new full name (trim)
 * - Updates the updated_at timestamp to current time
 * - Applies domain validation rules
 * - Returns a new Teacher object (immutable update)
 *
 * @param teacher - The existing teacher to update
 * @param newFullName - The new full name for the teacher
 * @returns A new Teacher object with updated fields
 * @throws {ValidationError} if the new name violates validation rules
 */
export function updateTeacher(teacher: Teacher, newFullName: string): Teacher {
  const normalizedFullName = normalizeFullName(newFullName);
  const timestamp = new Date().toISOString();

  const updatedTeacher: Teacher = {
    uuid: teacher.uuid,
    full_name: normalizedFullName,
    created_at: teacher.created_at,
    updated_at: timestamp,
  };

  validateTeacher(updatedTeacher);

  return updatedTeacher;
}
