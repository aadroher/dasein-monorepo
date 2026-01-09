import { Teacher } from '../model/teacher';

/**
 * Pure sorting functions for teacher data.
 * Provides consistent alphabetical sorting across the application.
 */

/**
 * Sort teachers alphabetically by full_name (case-insensitive)
 * @param teachers - Array of teacher objects to sort
 * @returns New array with teachers sorted alphabetically
 */
export const sortTeachersAlphabetically = (teachers: Teacher[]): Teacher[] =>
  [...teachers].sort((a, b) =>
    a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())
  );

/**
 * Sort teachers by creation date (newest first)
 * @param teachers - Array of teacher objects to sort
 * @returns New array with teachers sorted by creation date
 */
export const sortTeachersByCreationDate = (teachers: Teacher[]): Teacher[] =>
  [...teachers].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

/**
 * Sort teachers by last update date (most recently updated first)
 * @param teachers - Array of teacher objects to sort
 * @returns New array with teachers sorted by update date
 */
export const sortTeachersByUpdateDate = (teachers: Teacher[]): Teacher[] =>
  [...teachers].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

/**
 * Generic sorting function for teachers
 * @param teachers - Array of teacher objects to sort
 * @param sortBy - Field to sort by
 * @param order - Sort order (asc or desc)
 * @returns New array with teachers sorted according to criteria
 */
export const sortTeachers = (
  teachers: Teacher[],
  sortBy: keyof Teacher = 'full_name',
  order: 'asc' | 'desc' = 'asc'
): Teacher[] =>
  [...teachers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    let comparison = 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      // String comparison (case-insensitive for names)
      if (sortBy === 'full_name') {
        comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      } else {
        comparison = aValue.localeCompare(bValue);
      }
    } else {
      // For other types (like dates), convert to string and compare
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return order === 'desc' ? -comparison : comparison;
  });
