import { Teacher } from '../model/teacher';
import { TeacherStoragePort, StorageResult } from './storage-port';

/**
 * IndexedDB adapter for teacher storage with automatic fallback handling.
 * Implements the TeacherStoragePort interface for local-first persistence.
 * 
 * Features:
 * - Automatic database initialization and migration
 * - Alphabetical sorting of teachers by full_name
 * - Robust error handling with meaningful error codes
 * - Graceful fallback detection for environments without IndexedDB
 */
export class IndexedDBAdapter implements TeacherStoragePort {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'TeacherCRUD';
  private readonly dbVersion = 1;
  private readonly storeName = 'teachers';

  async initialize(): Promise<StorageResult<void>> {
    try {
      if (!this.isIndexedDBAvailable()) {
        return {
          success: false,
          error: {
            code: 'STORAGE_UNAVAILABLE',
            message: 'IndexedDB is not available in this environment',
          }
        };
      }

      this.db = await this.openDatabase();
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'STORAGE_UNAVAILABLE',
          message: 'Failed to initialize IndexedDB',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async create(teacher: Teacher): Promise<StorageResult<Teacher>> {
    if (!this.db) {
      return this.createNotInitializedError();
    }

    try {
      await this.performTransaction('readwrite', async (store) => {
        await store.add(teacher);
      });

      return { success: true, data: teacher };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to create teacher',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async list(): Promise<StorageResult<Teacher[]>> {
    if (!this.db) {
      return this.createNotInitializedError();
    }

    try {
      const teachers = await this.performTransaction('readonly', async (store) => {
        const index = store.index('full_name');
        const request = index.getAll();
        return new Promise<Teacher[]>((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      });

      return { success: true, data: teachers };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to list teachers',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async getById(id: string): Promise<StorageResult<Teacher>> {
    if (!this.db) {
      return this.createNotInitializedError();
    }

    try {
      const teacher = await this.performTransaction('readonly', async (store) => {
        const request = store.get(id);
        return new Promise<Teacher | undefined>((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      });

      if (!teacher) {
        return {
          success: false,
          error: {
            code: 'ITEM_NOT_FOUND',
            message: `Teacher with ID ${id} not found`
          }
        };
      }

      return { success: true, data: teacher };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to get teacher by ID',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async update(teacher: Teacher): Promise<StorageResult<Teacher>> {
    if (!this.db) {
      return this.createNotInitializedError();
    }

    try {
      // Update the updated_at timestamp
      const updatedTeacher = {
        ...teacher,
        updated_at: new Date().toISOString()
      };

      await this.performTransaction('readwrite', async (store) => {
        await store.put(updatedTeacher);
      });

      return { success: true, data: updatedTeacher };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to update teacher',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async delete(id: string): Promise<StorageResult<void>> {
    if (!this.db) {
      return this.createNotInitializedError();
    }

    try {
      await this.performTransaction('readwrite', async (store) => {
        await store.delete(id);
      });

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to delete teacher',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async clear(): Promise<StorageResult<void>> {
    if (!this.db) {
      return this.createNotInitializedError();
    }

    try {
      await this.performTransaction('readwrite', async (store) => {
        await store.clear();
      });

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'Failed to clear teachers',
          cause: error instanceof Error ? error : new Error(String(error))
        }
      };
    }
  }

  async isAvailable(): Promise<boolean> {
    return this.isIndexedDBAvailable() && this.db !== null;
  }

  // Private helper methods

  private isIndexedDBAvailable(): boolean {
    return typeof window !== 'undefined' && 'indexedDB' in window;
  }

  private async openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create teachers object store
        const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
        
        // Create index for alphabetical sorting by full_name
        store.createIndex('full_name', 'full_name', { unique: false });
      };
    });
  }

  private async performTransaction<T>(
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => Promise<T>
  ): Promise<T> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const transaction = this.db.transaction([this.storeName], mode);
    const store = transaction.objectStore(this.storeName);

    try {
      const result = await operation(store);
      
      // Wait for transaction to complete
      await new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(new Error('Transaction aborted'));
      });

      return result;
    } catch (error) {
      transaction.abort();
      throw error;
    }
  }

  private createNotInitializedError(): StorageResult<any> {
    return {
      success: false,
      error: {
        code: 'STORAGE_UNAVAILABLE',
        message: 'Storage not initialized. Call initialize() first.'
      }
    };
  }
}