import { PageHeader } from '../../../design-system/layout/page-header';
import { TeacherCreateForm } from './teacher-create-form';
import { TeacherList } from './teacher-list';
import { useTeachers } from './use-teachers';
import type { TeacherStoragePort } from '../storage/storage-port';

export interface TeacherPageProps {
  /** Storage adapter for teacher operations */
  storage: TeacherStoragePort;
}

/**
 * Main page component for teacher management functionality.
 *
 * Features:
 * - PageHeader with "Teachers" title
 * - Create form section for adding new teachers
 * - Teacher list section with table layout
 * - Integrated with storage for CRUD operations
 * - Automatic list refresh after create/edit/delete
 *
 * @param storage - Storage port implementation for teacher operations
 */
export function TeacherPage({ storage }: TeacherPageProps) {
  const { teachers, isLoading, error, refresh } = useTeachers(storage);

  return (
    <div className="teacher-page">
      <PageHeader title="Teachers" />

      <section className="create-section mb-8">
        <TeacherCreateForm storage={storage} onCreated={refresh} />
      </section>

      <section className="list-section">
        {error && (
          <div
            className="error-message mb-4 p-4 bg-error-50 text-error-700 rounded"
            role="alert"
          >
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
    </div>
  );
}
