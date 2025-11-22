import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './design-system/theme/ThemeProvider';
import { CommonLayout } from './design-system/layout/common-layout';
import { IndexedDBAdapter } from './features/teacher/storage/indexeddb-adapter';
import { MemoryAdapter } from './features/teacher/storage/memory-adapter';
import { TeacherPage } from './features/teacher/ui/teacher-page';
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

  if (storageError) {
    return (
      <ThemeProvider>
        <CommonLayout>
          <div className="app-error">
            <h1>Error</h1>
            <p>{storageError}</p>
          </div>
        </CommonLayout>
      </ThemeProvider>
    );
  }

  if (!storage) {
    return (
      <ThemeProvider>
        <CommonLayout>
          <div className="app-loading">
            <p>Initializing storage...</p>
          </div>
        </CommonLayout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <CommonLayout>
        <TeacherPage storage={storage} />
      </CommonLayout>
    </ThemeProvider>
  );
}

export default App;
