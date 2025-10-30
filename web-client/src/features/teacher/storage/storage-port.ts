import { Teacher } from '../model/teacher';

/**
 * Storage operation results for better error handling
 */
export type StorageResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: StorageError;
};

/**
 * Storage error types for debugging and user feedback
 */
export interface StorageError {
  code: 'STORAGE_UNAVAILABLE' | 'ITEM_NOT_FOUND' | 'VALIDATION_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  cause?: Error;
}

/**
 * Storage port interface defining the contract for teacher persistence.
 * This abstraction allows switching between IndexedDB, in-memory, and future
 * storage implementations (e.g., remote sync with Replicache).
 * 
 * All operations are async to support both local and remote storage.
 * Results use a Result type for explicit error handling.
 */
export interface TeacherStoragePort {
  /**
   * Initialize the storage system.
   * @returns Promise resolving to success/error result
   */
  initialize(): Promise<StorageResult<void>>;

  /**
   * Create a new teacher record.
   * @param teacher - Teacher object to store
   * @returns Promise resolving to the created teacher or error
   */
  create(teacher: Teacher): Promise<StorageResult<Teacher>>;

  /**
   * List all teachers, sorted alphabetically by full_name.
   * @returns Promise resolving to array of teachers or error
   */
  list(): Promise<StorageResult<Teacher[]>>;

  /**
   * Get a specific teacher by ID.
   * @param id - Teacher UUID
   * @returns Promise resolving to teacher or error
   */
  getById(id: string): Promise<StorageResult<Teacher>>;

  /**
   * Update an existing teacher.
   * @param teacher - Updated teacher object
   * @returns Promise resolving to updated teacher or error
   */
  update(teacher: Teacher): Promise<StorageResult<Teacher>>;

  /**
   * Delete a teacher by ID.
   * @param id - Teacher UUID
   * @returns Promise resolving to success result or error
   */
  delete(id: string): Promise<StorageResult<void>>;

  /**
   * Clear all teacher data (useful for testing).
   * @returns Promise resolving to success result or error
   */
  clear(): Promise<StorageResult<void>>;

  /**
   * Check if storage is available and functional.
   * @returns Promise resolving to availability status
   */
  isAvailable(): Promise<boolean>;
}