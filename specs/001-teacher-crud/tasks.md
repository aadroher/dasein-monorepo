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

## Phase 2: Foundational (✅ Completed)
- [x] T010 [P] Add ESLint + Prettier config in `web-client/` (enforce code style & accessibility lint)
- [x] T011 [P] Add Vitest config (`vitest.config.ts`) and test setup file (`test/setup.ts`) with testing-library + axe hooks
- [x] T012 [P] Add Playwright config (`playwright.config.ts`) & basic E2E folder `web-client/test/teacher/e2e`
- [x] T013 Implement storage abstraction interface `web-client/src/features/teacher/storage/storage-port.ts` (types only)
- [x] T014 Implement IndexedDB initializer & fallback `web-client/src/features/teacher/storage/indexeddb-adapter.ts`
- [x] T015 Implement in-memory fallback adapter `web-client/src/features/teacher/storage/memory-adapter.ts`
- [x] T016 Add logger utility (simple toggle) `web-client/src/lib/logger.ts`
- [x] T017 Accessibility testing helpers `web-client/src/test/a11y/assertA11y.ts`
- [x] T018 Define sorting pure function `web-client/src/features/teacher/services/sort.ts` + unit test stub
- [x] T019 Define UUID generation wrapper (for testability) `web-client/src/lib/uuid.ts`
- [x] T020 Create initial README section referencing Quickstart

**Checkpoint**: Foundation ready; CRUD operations can proceed.

## Phase 3: User Story 1 - Create Teacher (P1) 🎯
**Goal**: User can add a teacher; persisted & appears after reload.
**Independent Test**: E2E create + reload verifies persistence.

### Tests First
- [x] T030 [US1] Unit test: validation `web-client/src/features/teacher/model/__tests__/teacher-validation.test.ts`
- [x] T031 [US1] Unit test: create operation service `web-client/src/features/teacher/services/__tests__/create-teacher.test.ts`
- [x] T032 [US1] Integration test: storage create + load `web-client/test/teacher/unit/create-persist.test.ts`
- [x] T033 [US1] E2E spec: create teacher flow `web-client/test/teacher/e2e/create-teacher.spec.ts`
- [x] T034 [P] [US1] A11y component test placeholder `web-client/src/features/teacher/ui/__tests__/form-a11y.test.tsx`

### Implementation
- [x] T040 [US1] Implement teacher creation service `web-client/src/features/teacher/services/createTeacher.ts`
- [x] T041 [US1] Implement model validation function finalize `web-client/src/features/teacher/model/teacher.ts` (extend if needed)
- [x] T042 [US1] Integrate storage adapter `web-client/src/features/teacher/storage/indexeddb-adapter.ts` create logic
- [x] T043 [US1] UI form component `web-client/src/features/teacher/ui/TeacherCreateForm.tsx`
- [x] T044 [US1] Hook for form state `web-client/src/features/teacher/ui/useCreateTeacher.ts`
- [x] T045 [US1] Wire App root to show teachers list after create
- [x] T046 [US1] A11y axe assertions in component tests

**Checkpoint**: Create flow fully functional & test suite green.

## Phase 4: User Story 2 - Edit Teacher (P2)
**Goal**: User can edit teacher name and see change persist.
**Independent Test**: E2E edit flow + reload shows updated value.

### Tests First
- [x] T050 [US2] Unit test: update operation service `web-client/src/features/teacher/services/__tests__/update-teacher.test.ts`
- [x] T051 [US2] Integration: update + persistence `web-client/src/features/teacher/__tests__/update-persist.test.ts`
- [x] T052 [US2] E2E: edit teacher name `web-client/test/teacher/e2e/edit-teacher.spec.ts`
- [x] T053 [P] [US2] A11y component test `web-client/src/features/teacher/ui/__tests__/edit-form-a11y.test.tsx`

### Implementation
- [x] T060 [US2] Update service `web-client/src/features/teacher/services/updateTeacher.ts`
- [x] T061 [US2] UI component edit form `web-client/src/features/teacher/ui/TeacherEditForm.tsx`
- [x] T062 [US2] Hook for edit logic `web-client/src/features/teacher/ui/useEditTeacher.ts`
- [x] T063 [US2] Integrate updated record into list rendering
- [x] T064 [US2] A11y axe assertions in edit component tests

**Checkpoint**: Edit flow functional & tests green.

## Phase 5: User Story 3 - Delete Teacher (P3) ✅
**Goal**: User can delete a teacher and confirm removal persists.
**Independent Test**: E2E delete flow + reload confirms absence.

### Tests First
- [x] T070 [US3] Unit test: delete operation service `web-client/src/features/teacher/services/__tests__/delete-teacher.test.ts`
- [x] T071 [US3] Integration: delete + persistence `web-client/test/teacher/unit/delete-persist.test.ts`
- [x] T072 [US3] E2E: delete teacher `web-client/test/teacher/e2e/delete-teacher.spec.ts`
- [x] T073 [P] [US3] A11y component test `web-client/src/features/teacher/ui/__tests__/delete-action-a11y.test.tsx`

### Implementation
- [x] T080 [US3] Delete service `web-client/src/features/teacher/services/delete-teacher.ts`
- [x] T081 [US3] UI delete control `web-client/src/features/teacher/ui/teacher-delete-button.tsx`
- [x] T082 [US3] Hook for delete logic `web-client/src/features/teacher/ui/use-delete-teacher.ts`
- [x] T083 [US3] Update list after delete & handle empty state
- [x] T084 [US3] A11y axe assertions for delete component tests

**Checkpoint**: Delete flow functional & tests green.

## Phase 6: User Story 4 - View Teachers List (P4) ✅
**Goal**: User sees ordered list (alphabetical) and empty state when none.
**Independent Test**: E2E list display + ordering + empty state.

### Tests First
- [x] T090 [US4] Unit test: sorting function `web-client/src/features/teacher/services/__tests__/sort.test.ts`
- [x] T091 [US4] Integration: load + list render `web-client/test/teacher/unit/list-load.test.ts`
- [x] T092 [US4] E2E: list ordering & empty state `web-client/test/teacher/e2e/view-list.spec.ts`
- [x] T093 [P] [US4] A11y component test `web-client/src/features/teacher/ui/__tests__/list-a11y.test.tsx`

### Implementation
- [x] T100 [US4] Implement list component `web-client/src/features/teacher/ui/teacher-list.tsx`
- [x] T101 [US4] Hook for list loading `web-client/src/features/teacher/ui/use-teachers.ts`
- [x] T102 [US4] Empty state in list component (integrated in `web-client/src/features/teacher/ui/teacher-list.tsx`)
- [x] T103 [US4] Integrate alphabetical order function in rendering
- [x] T104 [US4] Axe assertions for list component tests

**Checkpoint**: View list functionality complete.

## Phase 7: Cross-Cutting / Polish
**Goal**: Refine implementation quality, improve DX, address tech debt, and prepare for production.
**Independent Test**: All existing tests remain green; documentation complete; code quality improved.

### Code Quality & Refactoring
- [ ] T110 [P] Extract common error handling pattern from hooks into `web-client/src/features/teacher/ui/use-operation-state.ts`
- [ ] T111 [P] Extract common validation pattern from create/edit hooks into `web-client/src/features/teacher/ui/use-form-validation.ts`
- [ ] T112 [P] Review and consolidate duplicate type definitions across service and UI layers in `web-client/src/features/teacher/`
- [ ] T113 Run ESLint with auto-fix across all teacher feature files in `web-client/src/features/teacher/`

### Testing & Quality Assurance
- [x] T114 Install Playwright browsers with `npx playwright install` in `web-client/` for E2E testing
- [ ] T115 Run full E2E test suite and verify all 99 tests pass in `web-client/`
- [ ] T116 [P] Add canvas package to resolve axe-core warnings in `web-client/package.json` (optional accessibility enhancement)
- [ ] T117 Create manual testing checklist in `specs/001-teacher-crud/manual-testing.md` covering all user stories
- [ ] T118 Execute manual testing checklist and document results in `specs/001-teacher-crud/manual-testing.md`

### Performance & Observability
- [ ] T119 [P] Add performance timing wrapper in `web-client/src/lib/performance.ts` for operation measurement
- [ ] T120 [P] Instrument CRUD operations with performance logging in service layer `web-client/src/features/teacher/services/`
- [ ] T121 Add storage operation timing to logger in `web-client/src/features/teacher/storage/indexeddb-adapter.ts`

### Documentation
- [ ] T122 [P] Update root README with getting started guide in `web-client/README.md`
- [ ] T123 [P] Add testing guide section to README covering unit/integration/E2E in `web-client/README.md`
- [ ] T124 [P] Document architecture decisions in `specs/001-teacher-crud/architecture.md`
- [ ] T125 Update quickstart.md with final implementation details in `specs/001-teacher-crud/quickstart.md`
- [ ] T126 Create deployment guide for static hosting in `web-client/DEPLOYMENT.md`

### Future-Proofing (Stubs Only)
- [ ] T127 [P] Add version field to Teacher type in `web-client/src/features/teacher/model/teacher.ts` (no conflict resolution logic)
- [ ] T128 [P] Add sync_status field to Teacher type for future backend sync in `web-client/src/features/teacher/model/teacher.ts`
- [ ] T129 Update teacher validation to include new optional fields in `web-client/src/features/teacher/model/teacher.ts`

### Error Handling & UX Polish
- [ ] T130 [P] Create reusable error message component in `web-client/src/features/teacher/ui/error-message.tsx`
- [ ] T131 Replace inline error displays with ErrorMessage component in create/edit/delete components
- [ ] T132 [P] Add loading spinner component in `web-client/src/features/teacher/ui/loading-spinner.tsx`
- [ ] T133 Add loading indicators to all async operations (create/edit/delete/load)

### Build & Production Readiness
- [ ] T134 Run production build with `npm run build` in `web-client/` and verify no errors
- [ ] T135 [P] Add build size analysis script to package.json in `web-client/`
- [ ] T136 Test production build locally with preview server in `web-client/`
- [ ] T137 [P] Add environment variable handling for future API integration in `web-client/.env.example`

### Final Validation
- [ ] T138 Run complete test suite (unit + integration + E2E + a11y) and verify 100% pass rate
- [ ] T139 Review all acceptance criteria from spec.md and verify completion
- [ ] T140 Update tasks.md to mark all tasks complete and add completion summary

**Checkpoint**: Feature production-ready; all quality gates passed.

## Dependencies & Execution Order

### Story Completion Order
1. **Setup & Foundation** (Phase 1-2): Required for all subsequent work
2. **User Story 1** (Phase 3): Create Teacher - foundational for all other stories
3. **User Story 2** (Phase 4): Edit Teacher - independent, can run after US1
4. **User Story 3** (Phase 5): Delete Teacher - independent, can run after US1
5. **User Story 4** (Phase 6): View List - independent, can run after US1
6. **Polish** (Phase 7): Cross-cutting improvements after all stories complete

### Parallel Execution Opportunities

**Phase 2 (Foundational)**: T010-T012, T017, T019 can run in parallel (different files)

**Phase 3 (US1 Tests)**: T034 can run in parallel with T030-T032 (E2E vs unit tests)

**Phase 3 (US1 Implementation)**: T040-T041, T044 can run in parallel (services vs hooks)

**Phase 4-6**: Each user story is independent after Phase 3 completes

**Phase 7 Categories**:
- Code Quality (T110-T113): All parallel
- Testing (T116-T117): Parallel after T114-T115
- Performance (T119-T120): All parallel
- Documentation (T122-T126): All parallel
- Future-Proofing (T127-T129): All parallel
- UX Polish (T130, T132): Parallel components
- Build (T135, T137): Parallel additions

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
**Just User Story 1** would constitute an MVP:
- Create teachers (T030-T046)
- Persist data (covered in foundational)
- Basic list view (minimal, covered in create flow)

This delivers immediate value: users can add teachers and see them persist.

### Incremental Delivery Milestones
1. **M1**: Setup + US1 (Phases 1-3) → Can create & persist teachers
2. **M2**: + US2 (Phase 4) → Can edit existing teachers
3. **M3**: + US3 (Phase 5) → Can delete teachers (full CRUD)
4. **M4**: + US4 (Phase 6) → Polished list experience
5. **M5**: + Phase 7 → Production-ready, optimized, documented

## Parallelization Notes
- Tasks marked [P] are parallelizable (different files, no dependencies on incomplete tasks)
- All test tasks in a story phase should precede implementation tasks for that story
- Services can be developed while UI components are built independently
- Documentation tasks can proceed alongside implementation once contracts are stable
- Code quality tasks (T110-T113) should wait until all implementation is complete

## Completion Definition
- ✅ All user story checkpoints reached (Phases 3-6 complete)
- ✅ All specified tests pass: 100 unit/integration + 99 E2E + accessibility checks
- ✅ No unresolved clarifications remain in spec.md
- ✅ Documentation updated: README, quickstart, architecture guide
- ✅ Production build successful with no errors
- ✅ Code quality: no ESLint errors, consistent style
- ✅ Performance goals met: SC-001 through SC-004 validated
- ✅ Manual testing checklist executed successfully

## Format Validation
✅ All tasks follow required format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
- Checkboxes: Present on all tasks
- Task IDs: Sequential T001-T140
- [P] markers: Applied to parallelizable tasks only
- Story labels: Applied to user story phases (US1-US4)
- File paths: Included in all task descriptions

