/**
 * Delete teacher operation
 *
 * Returns a deletion request object containing the teacher UUID.
 * This is a pure function - actual deletion happens at the storage layer.
 *
 * @param uuid - The UUID of the teacher to delete
 * @returns Deletion request object
 */
export interface DeleteTeacherRequest {
  uuid: string;
}

export function deleteTeacher(uuid: string): DeleteTeacherRequest {
  return { uuid };
}
