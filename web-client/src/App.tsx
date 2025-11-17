import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './design-system/theme/ThemeProvider';
import { IndexedDBAdapter } from './features/teacher/storage/indexeddb-adapter';
import { MemoryAdapter } from './features/teacher/storage/memory-adapter';
import { TeacherCreateForm } from './features/teacher/ui/teacher-create-form';
import { TeacherList } from './features/teacher/ui/teacher-list';
import { useTeachers } from './features/teacher/ui/use-teachers';
import type { TeacherStoragePort } from './features/teacher/storage/storage-port';

function App() {
  const [storage, setStorage] = useState<TeacherStoragePort | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Initialize storage adapter (IndexedDB with fallback to Memory)
  useEffect(() => {
    async function initializeStorage() {
      const indexedDB = new IndexedDBAdapter();
      const result = await indexedDB.initialize();

      if (result.success) {
        setStorage(indexedDB);
      } else {
        console.warn(
          'IndexedDB unavailable, falling back to in-memory storage'
        );
        const memory = new MemoryAdapter();
        const memoryResult = await memory.initialize();

        if (memoryResult.success) {
          setStorage(memory);
        } else {
          setStorageError('Failed to initialize storage');
        }
      }
    }

    initializeStorage();
  }, []);

  // Load teachers using the hook
  const { teachers, isLoading, error, refresh } = useTeachers(
    storage || new MemoryAdapter()
  );

  if (storageError) {
    return (
      <div className="app-error">
        <h1>Error</h1>
        <p>{storageError}</p>
      </div>
    );
  }

  if (!storage) {
    return (
      <div className="app-loading">
        <h1>Teacher Management</h1>
        <p>Initializing storage...</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <h1>Teacher Management</h1>
        </header>

        <main>
          <section className="create-section">
            <h2>Add New Teacher</h2>
            <TeacherCreateForm storage={storage} onCreated={refresh} />
          </section>

          <section className="list-section">
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}
            <TeacherList
              teachers={teachers}
              storage={storage}
              isLoading={isLoading}
              onTeacherUpdated={refresh}
              onTeacherDeleted={refresh}
            />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
