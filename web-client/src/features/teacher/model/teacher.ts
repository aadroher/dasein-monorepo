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
 * Validation error class for teacher-related validation failures.
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Validates a teacher object according to business rules:
 * - full_name must not be empty (after trimming)
 * - full_name must not exceed 200 characters
 *
 * @throws {ValidationError} if validation fails
 */
export function validateTeacher(teacher: Teacher): void {
  const trimmedName = teacher.full_name.trim();

  if (trimmedName.length === 0) {
    throw new ValidationError('Full name cannot be empty');
  }

  if (trimmedName.length > 200) {
    throw new ValidationError('Full name cannot exceed 200 characters');
  }
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
