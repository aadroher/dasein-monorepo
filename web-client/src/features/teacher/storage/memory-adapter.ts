import { Teacher } from '../model/teacher';
import { TeacherStoragePort, StorageResult } from './storage-port';

/**
 * In-memory adapter for teacher storage.
 * Implements the TeacherStoragePort interface for testing and fallback scenarios.
 *
 * Features:
 * - Fast in-memory operations
 * - Alphabetical sorting by full_name
 * - Data persistence only during session (lost on reload)
 * - Useful for testing and environments where IndexedDB is unavailable
 */
export class MemoryAdapter implements TeacherStoragePort {
  private teachers: Map<string, Teacher> = new Map();
  private initialized = false;

  async initialize(): Promise<StorageResult<void>> {
    this.initialized = true;
    return { success: true, data: undefined };
  }

  async create(teacher: Teacher): Promise<StorageResult<Teacher>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      // Check for duplicate UUID (though collisions are extremely unlikely)
      if (this.teachers.has(teacher.uuid)) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: `Teacher with UUID ${teacher.uuid} already exists`,
          },
        };
      }

      this.teachers.set(teacher.uuid, { ...teacher });
      return { success: true, data: teacher };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to create teacher',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }

  async list(): Promise<StorageResult<Teacher[]>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      const teacherList = Array.from(this.teachers.values());

      // Sort alphabetically by full_name (case-insensitive)
      teacherList.sort((a, b) =>
        a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())
      );

      return { success: true, data: teacherList };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to list teachers',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }

  async getById(uuid: string): Promise<StorageResult<Teacher>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      const teacher = this.teachers.get(uuid);

      if (!teacher) {
        return {
          success: false,
          error: {
            code: 'ITEM_NOT_FOUND',
            message: `Teacher with UUID ${uuid} not found`,
          },
        };
      }

      return { success: true, data: { ...teacher } };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to get teacher by ID',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }

  async update(teacher: Teacher): Promise<StorageResult<Teacher>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      if (!this.teachers.has(teacher.uuid)) {
        return {
          success: false,
          error: {
            code: 'ITEM_NOT_FOUND',
            message: `Teacher with UUID ${teacher.uuid} not found`,
          },
        };
      }

      // Update the updated_at timestamp
      const updatedTeacher = {
        ...teacher,
        updated_at: new Date().toISOString(),
      };

      this.teachers.set(teacher.uuid, updatedTeacher);
      return { success: true, data: updatedTeacher };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to update teacher',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }

  async delete(uuid: string): Promise<StorageResult<void>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      const deleted = this.teachers.delete(uuid);

      if (!deleted) {
        return {
          success: false,
          error: {
            code: 'ITEM_NOT_FOUND',
            message: `Teacher with UUID ${uuid} not found`,
          },
        };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to delete teacher',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }

  async clear(): Promise<StorageResult<void>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      this.teachers.clear();
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to clear teachers',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }

  async isAvailable(): Promise<boolean> {
    return this.initialized;
  }

  // Private helper methods

  private createNotInitializedError(): StorageResult<never> {
    return {
      success: false,
      error: {
        code: 'STORAGE_UNAVAILABLE',
        message: 'Storage not initialized. Call initialize() first.',
      },
    };
  }

  // Additional methods for testing

  /**
   * Get the current number of teachers (useful for testing)
   */
  getCount(): number {
    return this.teachers.size;
  }

  /**
   * Seed the storage with initial data (useful for testing and demos)
   */
  async seed(teachers: Teacher[]): Promise<StorageResult<void>> {
    if (!this.initialized) {
      return this.createNotInitializedError();
    }

    try {
      this.teachers.clear();
      for (const teacher of teachers) {
        this.teachers.set(teacher.uuid, { ...teacher });
      }
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to seed teachers',
          cause: error instanceof Error ? error : new Error(String(error)),
        },
      };
    }
  }
}
