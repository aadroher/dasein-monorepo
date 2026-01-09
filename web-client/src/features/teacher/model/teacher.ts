/**
 * Teacher entity representation for the local-first CRUD application.
 *
 * The canonical data model (spec) requires a UUID and a trimmed full name.
 *
 * Additional metadata such as timestamps can be layered on top in later
 * phases. For now we keep them optional to avoid blocking future evolution.
 */

export interface Teacher {
  uuid: string;
  full_name: string;
  created_at: string;
  updated_at: string;
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
 * Normalize a teacher full name by trimming surrounding whitespace.
 */
export const normalizeFullName = (fullName: string): string => fullName.trim();

/**
 * Validate that a teacher object satisfies the business rules.
 *
 * Rules:
 * - full_name MUST be non-empty after trimming
 * - full_name MUST NOT exceed 200 characters (hard cap)
 *
 * @throws {ValidationError} when rules are violated
 */
export const validateTeacher = (teacher: Teacher): void => {
  const trimmedName = normalizeFullName(teacher.full_name);

  if (trimmedName.length === 0) {
    throw new ValidationError('Full name cannot be empty');
  }

  if (trimmedName.length > 200) {
    throw new ValidationError('Full name cannot exceed 200 characters');
  }
};

/**
 * Type guard to assert that an arbitrary value satisfies the Teacher contract.
 */
export const isValidTeacher = (teacher: Partial<Teacher>): teacher is Teacher =>
  typeof teacher.uuid === 'string' && typeof teacher.full_name === 'string';
