# Tasks: Teacher CRUD

**Input**: `spec.md`, `plan.md`, `data-model.md`, `teacher-operations.md`, `quickstart.md`
**Prerequisites**: Foundational project scaffolding in `web-client/` (already created)
**Principles**: Test-first, accessibility, local-first, transport-agnostic operations

## Format
`[ID] [P?] [Story] Description`

## Phase 1: Setup (✅ Completed)
- [x] T001 Create `web-client` base structure
- [x] T002 Initialize TypeScript + React + Vite config  
- [x] T003 Add initial package.json dependencies

## Phase 2: Foundational (Blocking)
- [ ] T010 [P] Add ESLint + Prettier config in `web-client/` (enforce code style & accessibility lint)
- [ ] T011 [P] Add Vitest config (`vitest.config.ts`) and test setup file (`test/setup.ts`) with testing-library + axe hooks
- [ ] T012 [P] Add Playwright config (`playwright.config.ts`) & basic E2E folder `web-client/test/teacher/e2e`
- [ ] T013 Implement storage abstraction interface `web-client/src/features/teacher/storage/storage-port.ts` (types only)
- [ ] T014 Implement IndexedDB initializer & fallback `web-client/src/features/teacher/storage/indexeddb-adapter.ts`
- [ ] T015 Implement in-memory fallback adapter `web-client/src/features/teacher/storage/memory-adapter.ts`
- [ ] T016 Add logger utility (simple toggle) `web-client/src/lib/logger.ts`
- [ ] T017 Accessibility testing helpers `web-client/src/test/a11y/assertA11y.ts`
- [ ] T018 Define sorting pure function `web-client/src/features/teacher/services/sort.ts` + unit test stub
- [ ] T019 Define UUID generation wrapper (for testability) `web-client/src/lib/uuid.ts`
- [ ] T020 Create initial README section referencing Quickstart

**Checkpoint**: Foundation ready; CRUD operations can proceed.

## Phase 3: User Story 1 - Create Teacher (P1) 🎯
**Goal**: User can add a teacher; persisted & appears after reload.
**Independent Test**: E2E create + reload verifies persistence.

### Tests First
- [ ] T030 [US1] Unit test: validation `web-client/src/features/teacher/model/__tests__/teacher-validation.test.ts`
- [ ] T031 [US1] Unit test: create operation service `web-client/src/features/teacher/services/__tests__/create-teacher.test.ts`
- [ ] T032 [US1] Integration test: storage create + load `web-client/test/teacher/unit/create-persist.test.ts`
- [ ] T033 [US1] E2E spec: create teacher flow `web-client/test/teacher/e2e/create-teacher.spec.ts`
- [ ] T034 [P] [US1] A11y component test placeholder `web-client/src/features/teacher/ui/__tests__/form-a11y.test.tsx`

### Implementation
- [ ] T040 [US1] Implement teacher creation service `web-client/src/features/teacher/services/createTeacher.ts`
- [ ] T041 [US1] Implement model validation function finalize `web-client/src/features/teacher/model/teacher.ts` (extend if needed)
- [ ] T042 [US1] Integrate storage adapter `web-client/src/features/teacher/storage/indexeddb-adapter.ts` create logic
- [ ] T043 [US1] UI form component `web-client/src/features/teacher/ui/TeacherCreateForm.tsx`
- [ ] T044 [US1] Hook for form state `web-client/src/features/teacher/ui/useCreateTeacher.ts`
- [ ] T045 [US1] Wire App root to show teachers list after create
- [ ] T046 [US1] A11y axe assertions in component tests

**Checkpoint**: Create flow fully functional & test suite green.

## Phase 4: User Story 2 - Edit Teacher (P2)
**Goal**: User can edit teacher name and see change persist.
**Independent Test**: E2E edit flow + reload shows updated value.

### Tests First
- [ ] T050 [US2] Unit test: update operation service `web-client/src/features/teacher/services/__tests__/update-teacher.test.ts`
- [ ] T051 [US2] Integration: update + persistence `web-client/test/teacher/unit/update-persist.test.ts`
- [ ] T052 [US2] E2E: edit teacher name `web-client/test/teacher/e2e/edit-teacher.spec.ts`
- [ ] T053 [P] [US2] A11y component test `web-client/src/features/teacher/ui/__tests__/edit-form-a11y.test.tsx`

### Implementation
- [ ] T060 [US2] Update service `web-client/src/features/teacher/services/updateTeacher.ts`
- [ ] T061 [US2] UI component edit form `web-client/src/features/teacher/ui/TeacherEditForm.tsx`
- [ ] T062 [US2] Hook for edit logic `web-client/src/features/teacher/ui/useEditTeacher.ts`
- [ ] T063 [US2] Integrate updated record into list rendering
- [ ] T064 [US2] A11y axe assertions in edit component tests

**Checkpoint**: Edit flow functional & tests green.

## Phase 5: User Story 3 - Delete Teacher (P3)
**Goal**: User can delete a teacher and confirm removal persists.
**Independent Test**: E2E delete flow + reload confirms absence.

### Tests First
- [ ] T070 [US3] Unit test: delete operation service `web-client/src/features/teacher/services/__tests__/delete-teacher.test.ts`
- [ ] T071 [US3] Integration: delete + persistence `web-client/test/teacher/unit/delete-persist.test.ts`
- [ ] T072 [US3] E2E: delete teacher `web-client/test/teacher/e2e/delete-teacher.spec.ts`
- [ ] T073 [P] [US3] A11y component test `web-client/src/features/teacher/ui/__tests__/delete-action-a11y.test.tsx`

### Implementation
- [ ] T080 [US3] Delete service `web-client/src/features/teacher/services/deleteTeacher.ts`
- [ ] T081 [US3] UI delete control `web-client/src/features/teacher/ui/TeacherDeleteButton.tsx`
- [ ] T082 [US3] Hook for delete logic `web-client/src/features/teacher/ui/useDeleteTeacher.ts`
- [ ] T083 [US3] Update list after delete & handle empty state
- [ ] T084 [US3] A11y axe assertions for delete component tests

**Checkpoint**: Delete flow functional & tests green.

## Phase 6: User Story 4 - View Teachers List (P4)
**Goal**: User sees ordered list (alphabetical) and empty state when none.
**Independent Test**: E2E list display + ordering + empty state.

### Tests First
- [ ] T090 [US4] Unit test: sorting function `web-client/src/features/teacher/services/__tests__/sort.test.ts`
- [ ] T091 [US4] Integration: load + list render `web-client/test/teacher/unit/list-load.test.ts`
- [ ] T092 [US4] E2E: list ordering & empty state `web-client/test/teacher/e2e/view-list.spec.ts`
- [ ] T093 [P] [US4] A11y component test `web-client/src/features/teacher/ui/__tests__/list-a11y.test.tsx`

### Implementation
- [ ] T100 [US4] Implement list component `web-client/src/features/teacher/ui/TeacherList.tsx`
- [ ] T101 [US4] Hook for list loading `web-client/src/features/teacher/ui/useTeachers.ts`
- [ ] T102 [US4] Empty state component `web-client/src/features/teacher/ui/EmptyState.tsx`
- [ ] T103 [US4] Integrate alphabetical order function in rendering
- [ ] T104 [US4] Axe assertions for list component tests

**Checkpoint**: View list functionality complete.

## Phase 7: Cross-Cutting / Polish
- [ ] T110 Refactor duplication across hooks/services
- [ ] T111 Add performance measurement harness (simple timestamp logs)
- [ ] T112 Add documentation updates to root README
- [ ] T113 Add conflict resolution stub fields (version, last_updated) in data model (no logic yet)
- [ ] T114 Improve error messaging components
- [ ] T115 Add manual testing notes

## Parallelization Notes
- Tasks marked [P] are parallelizable.
- Each user story’s test tasks should precede implementation tasks.
- Services can progress while UI form components are developed independently.

## Completion Definition
- All user story checkpoints reached
- All specified tests pass (unit, integration, E2E, a11y)
- No unresolved clarifications remain
- Documentation (quickstart + README) reflects final implementation

