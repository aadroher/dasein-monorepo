/**
 * Teacher entity model for the local-first CRUD application.
 *
 * This is a placeholder implementation that defines the core Teacher interface
 * and basic validation functions. The actual storage implementation will be
 * added in subsequent tasks.
 */

export interface Teacher {
  id: string; // UUID
  full_name: string;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

/**
 * Basic validation for teacher data.
 * This will be expanded with more comprehensive validation rules.
 */
export function isValidTeacher(teacher: Partial<Teacher>): teacher is Teacher {
  return !!(
    teacher.id &&
    teacher.full_name &&
    teacher.created_at &&
    teacher.updated_at
  );
}

/**
 * Creates a new Teacher object with generated ID and timestamps.
 * This is a placeholder - will be moved to appropriate service layer.
 */
export function createTeacherRecord(full_name: string): Teacher {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    full_name,
    created_at: now,
    updated_at: now,
  };
}
