import { generateUUID } from '../../../lib/uuid';
import {
  normalizeFullName,
  type Teacher,
  validateTeacher,
} from '../model/teacher';

/**
 * Create a new Teacher domain object from the provided full name.
 *
 * - Generates a UUID for the teacher
 * - Normalizes the full name (trim)
 * - Applies domain validation rules
 */
export function createTeacher(fullName: string): Teacher {
  const normalizedFullName = normalizeFullName(fullName);
  const timestamp = new Date().toISOString();

  const teacher: Teacher = {
    uuid: generateUUID(),
    full_name: normalizedFullName,
    created_at: timestamp,
    updated_at: timestamp,
  };

  validateTeacher(teacher);

  return teacher;
}
