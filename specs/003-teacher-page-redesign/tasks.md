# Tasks: Teacher Management Page Redesign

**Input**: Design documents from `/specs/003-teacher-page-redesign/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-interfaces.md, quickstart.md

**Tests**: This feature specification explicitly requires test updates and accessibility testing. All existing E2E tests must be updated to reflect new UI structure, and new accessibility tests are required.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- Web client application: `web-client/src/`, `web-client/test/`
- Design system components: `web-client/src/design-system/`
- Feature components: `web-client/src/features/teacher/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [X] T001 Install Heroicons React package in web-client/package.json
- [X] T002 Verify existing test infrastructure (Vitest, Playwright, jest-axe) is configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Reusable design system components that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Create IconButton component in web-client/src/design-system/components/icon-button.tsx
- [X] T004 [P] Create AppLogo component in web-client/src/design-system/layout/app-logo.tsx
- [X] T005 [P] Create PageHeader component in web-client/src/design-system/layout/page-header.tsx
- [X] T006 Create CommonLayout component in web-client/src/design-system/layout/common-layout.tsx (depends on T004, T005)
- [X] T007 [P] Create accessibility test for IconButton in web-client/test/design-system/components/icon-button-a11y.test.tsx
- [X] T008 [P] Create accessibility test for CommonLayout in web-client/test/design-system/layout/common-layout-a11y.test.tsx
- [X] T009 [P] Create unit test for IconButton in web-client/test/design-system/components/icon-button.test.tsx
- [X] T010 [P] Create unit test for CommonLayout in web-client/test/design-system/layout/common-layout.test.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Teacher List in Improved Layout (Priority: P1) 🎯 MVP

**Goal**: Convert teacher list from card-based to table/list layout with inline icon-based actions

**Independent Test**: Navigate to teacher management page and verify teachers display in list/table format with actions on same row as teacher names

### Tests for User Story 1 ⚠️

**NOTE: Update existing E2E tests FIRST to reflect new UI structure before implementation**

- [X] T011 [US1] Update E2E test for teacher list layout in web-client/test/teacher/e2e/view-list.spec.ts to expect table structure instead of cards
- [X] T012 [US1] Update E2E test for create teacher flow in web-client/test/teacher/e2e/create-teacher.spec.ts to interact with new list layout
- [X] T013 [US1] Update E2E test for edit teacher flow in web-client/test/teacher/e2e/edit-teacher.spec.ts to use icon buttons
- [X] T014 [US1] Update E2E test for delete teacher flow in web-client/test/teacher/e2e/delete-teacher.spec.ts to use icon buttons
- [X] T015 [P] [US1] Create accessibility test for TeacherList in web-client/test/teacher/unit/teacher-list-a11y.test.tsx
- [X] T016 [P] [US1] Create unit test for TeacherListItem in web-client/test/teacher/unit/teacher-list-item.test.tsx

### Implementation for User Story 1

- [X] T017 [P] [US1] Create TeacherListItem component in web-client/src/features/teacher/ui/teacher-list-item.tsx
- [X] T018 [US1] Modify TeacherList component to use table layout in web-client/src/features/teacher/ui/teacher-list.tsx
- [X] T019 [US1] Update TeacherEditForm to use IconButton components in web-client/src/features/teacher/ui/teacher-edit-form.tsx
- [X] T020 [US1] Update TeacherDeleteButton to use IconButton component in web-client/src/features/teacher/ui/teacher-delete-button.tsx
- [X] T021 [US1] Verify all E2E tests pass with new table layout
- [X] T022 [US1] Verify accessibility tests pass for teacher list with icon buttons

**Checkpoint**: At this point, User Story 1 should be fully functional - teachers display in table format with inline icon actions

---

## Phase 4: User Story 2 - Navigate Using Common Application Header (Priority: P2)

**Goal**: Add consistent header with Dasein logo across application and use smaller page-specific heading

**Independent Test**: Load teacher management page and verify common header appears with logo and "Dasein" branding, with "Teachers" as smaller page heading below

### Tests for User Story 2 ⚠️

- [X] T023 [P] [US2] Create accessibility test for TeacherPage in web-client/test/teacher/unit/teacher-page-a11y.test.tsx
- [X] T024 [P] [US2] Create integration test for TeacherPage with CommonLayout in web-client/test/teacher/unit/teacher-page.test.tsx
- [X] T025 [US2] Update E2E test to verify common header presence in web-client/test/teacher/e2e/app.spec.ts

### Implementation for User Story 2

- [X] T026 [US2] Create TeacherPage component in web-client/src/features/teacher/ui/teacher-page.tsx
- [X] T027 [US2] Update App.tsx to wrap TeacherPage in CommonLayout in web-client/src/App.tsx
- [X] T028 [US2] Update TeacherPage to use PageHeader with "Teachers" title
- [X] T029 [US2] Verify logo displays correctly and is accessible (screen reader announces "Dasein")
- [X] T030 [US2] Verify page heading hierarchy (h2 for "Teachers" vs h1 in header)
- [X] T031 [US2] Verify all E2E tests pass with common layout

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - table layout with common header and branding

---

## Phase 5: User Story 3 - Create New Teachers with Improved Form Layout (Priority: P3)

**Goal**: Improve spacing between form elements for better visual organization and reduced clutter

**Independent Test**: Access teacher creation section and verify improved spacing between form fields and buttons

### Tests for User Story 3 ⚠️

- [X] T032 [P] [US3] Create visual regression test for form spacing in web-client/test/teacher/teacher-create-form-spacing.test.tsx
- [X] T033 [US3] Update E2E test to verify form spacing in web-client/test/teacher/e2e/create-teacher.spec.ts

### Implementation for User Story 3

- [X] T034 [US3] Update TeacherCreateForm with improved spacing (space-y-6, space-y-2, gap-3) in web-client/src/features/teacher/ui/teacher-create-form.tsx
- [X] T035 [US3] Verify form element spacing matches design (24px between sections, 8px between field elements, 12px between buttons)
- [X] T036 [US3] Verify form remains accessible with new spacing (focus indicators, touch targets)
- [X] T037 [US3] Verify all E2E tests pass with updated form spacing

**Checkpoint**: All user stories should now be independently functional - improved table layout, common header, and better form spacing

---

## Phase 5.5: Dark Theme Implementation (Additional Work)

**Purpose**: Fix theme rendering to use dark mode by default as per design system

- [X] T047.1 Update CommonLayout to use dark theme background colors (bg-neutral-900, bg-neutral-800)
- [X] T047.2 Update PageHeader text color for dark theme (text-neutral-50)
- [X] T047.3 Update TeacherPage heading colors for dark theme (text-neutral-100)
- [X] T047.4 Update TeacherList loading/empty states with light text (text-neutral-300)
- [X] T047.5 Update TeacherList table headers with light text (text-neutral-200)
- [X] T047.6 Update TeacherListItem teacher names with light text (text-neutral-100)
- [X] T047.7 Update design-system/theme/variables.css to apply dark theme to #root
- [X] T047.8 Update CommonLayout tests to expect dark theme classes
- [X] T047.9 Verify all 535 tests pass with dark theme implementation

**Checkpoint**: Dark theme properly applied throughout application with good text contrast

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T038 [P] Add CSS size measurement script validation in web-client/scripts/measure-css-size.mjs
- [ ] T039 [P] Review and update DEPLOYMENT.md with any UI changes
- [X] T040 Run complete E2E test suite and verify all tests pass
- [X] T041 Run accessibility test suite (jest-axe) and verify WCAG 2.1 AA compliance
- [ ] T042 Manual testing per quickstart.md validation checklist
- [X] T043 [P] Code cleanup - remove unused card-based layout styles
- [ ] T044 [P] Update README.md with any relevant UI changes
- [X] T045 Verify keyboard navigation works across all new components
- [X] T046 Verify screen reader compatibility (VoiceOver/NVDA)
- [X] T047 Performance check - verify 60fps UI interactions and <100ms input response
- [ ] T048 Update CommonLayout to center content horizontally in web-client/src/design-system/layout/common-layout.tsx
- [ ] T049 Update CommonLayout to set max-width of 1080px for main content in web-client/src/design-system/layout/common-layout.tsx
- [ ] T050 Verify CommonLayout centering and max-width work correctly across all viewport sizes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 (P1) can start after Phase 2
  - User Story 2 (P2) can start after Phase 2 (but should wait for US1 for TeacherPage integration)
  - User Story 3 (P3) can start after Phase 2 (independent of US1 and US2)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational (Phase 2) - IconButton and CommonLayout components must exist
  - Blocking tasks within US1: T017 (TeacherListItem) must complete before T018 (TeacherList modification)
  - Tests (T011-T016) should be updated/created before implementation (T017-T020)
  
- **User Story 2 (P2)**: Depends on Foundational (Phase 2) - CommonLayout and PageHeader must exist
  - Should integrate with TeacherPage from US1 (T026 depends on TeacherList being converted in T018)
  - Can technically start in parallel with US1 but practical implementation suggests sequential
  
- **User Story 3 (P3)**: Depends on Foundational (Phase 2) only
  - Completely independent of US1 and US2
  - Can be implemented in parallel with US1 or US2 if team capacity allows

### Within Each User Story

- **US1**: Tests first (T011-T016) → TeacherListItem (T017) → TeacherList modification (T018) → Form updates (T019-T020) → Verification (T021-T022)
- **US2**: Tests first (T023-T025) → TeacherPage (T026) → App integration (T027-T028) → Verification (T029-T031)
- **US3**: Tests first (T032-T033) → Form spacing (T034) → Verification (T035-T037)

### Parallel Opportunities

- **Phase 1**: Both tasks (T001-T002) can run in parallel
- **Phase 2**: T003, T004, T005, T007, T008, T009, T010 can all run in parallel; T006 waits for T004 and T005
- **US1 Tests**: T011-T016 can be prepared in parallel (different test files)
- **US1 Implementation**: T017, T019, T020 can run in parallel (different files); T018 waits for T017
- **US2 Tests**: T023-T025 can run in parallel
- **US3 Tests**: T032-T033 can run in parallel
- **Polish**: T038, T039, T043, T044 can run in parallel

---

## Parallel Example: Phase 2 (Foundational)

```bash
# Launch all independent foundational components together:
Task T003: "Create IconButton component in web-client/src/design-system/components/icon-button.tsx"
Task T004: "Create AppLogo component in web-client/src/design-system/layout/app-logo.tsx"
Task T005: "Create PageHeader component in web-client/src/design-system/layout/page-header.tsx"
Task T007: "Create accessibility test for IconButton in web-client/test/design-system/components/icon-button-a11y.test.tsx"
Task T008: "Create accessibility test for CommonLayout in web-client/test/design-system/layout/common-layout-a11y.test.tsx"
Task T009: "Create unit test for IconButton in web-client/test/design-system/components/icon-button.test.tsx"
Task T010: "Create unit test for CommonLayout in web-client/test/design-system/layout/common-layout.test.tsx"

# After T004 and T005 complete, launch T006:
Task T006: "Create CommonLayout component in web-client/src/design-system/layout/common-layout.tsx"
```

---

## Parallel Example: User Story 1 Tests

```bash
# Update all E2E tests for new layout in parallel:
Task T011: "Update E2E test for teacher list layout in web-client/test/teacher/teacher-list-layout.e2e.ts"
Task T012: "Update E2E test for create teacher flow in web-client/test/teacher/create-teacher.e2e.ts"
Task T013: "Update E2E test for edit teacher flow in web-client/test/teacher/edit-teacher.e2e.ts"
Task T014: "Update E2E test for delete teacher flow in web-client/test/teacher/delete-teacher.e2e.ts"
Task T015: "Create accessibility test for TeacherList in web-client/test/teacher/teacher-list-a11y.test.tsx"
Task T016: "Create unit test for TeacherListItem in web-client/test/teacher/teacher-list-item.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T010) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 (T011-T022)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Teachers display in table format
   - Icon buttons work (edit/delete)
   - Keyboard navigation functional
   - Screen readers announce properly
5. Deploy/demo if ready (MVP with improved teacher list)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (IconButton, CommonLayout available)
2. Add User Story 1 (T011-T022) → Test independently → **MVP Release** (improved list layout)
3. Add User Story 2 (T023-T031) → Test independently → **Release v2** (with common header and branding)
4. Add User Story 3 (T032-T037) → Test independently → **Release v3** (complete redesign with improved forms)
5. Polish (T038-T047) → Final validation → **Release v4** (production-ready)

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (T001-T010)
2. Once Foundational is done (after T006-T010 complete):
   - **Developer A**: User Story 1 (T011-T022) - Table layout with icons
   - **Developer B**: User Story 2 (T023-T031) - Common header (waits for T026 after US1 T018)
   - **Developer C**: User Story 3 (T032-T037) - Form spacing (fully independent)
3. Stories complete and integrate independently
4. **Team completes Polish together** (T038-T047)

**Recommended Sequential Order for Small Team**:
1. Foundational (T001-T010)
2. User Story 1 (T011-T022) - Core visual improvement
3. User Story 2 (T023-T031) - Header/branding layer
4. User Story 3 (T032-T037) - Form polish
5. Polish (T038-T047)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **Test-First**: Update/create tests before implementation (per Constitutional Principle V)
- **Accessibility**: All new components must pass jest-axe and manual testing (per Constitutional Principle VI)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

## Total Task Count

- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 8 tasks
- **Phase 3 (User Story 1)**: 12 tasks
- **Phase 4 (User Story 2)**: 9 tasks
- **Phase 5 (User Story 3)**: 6 tasks
- **Phase 6 (Polish)**: 13 tasks

**Total**: 50 tasks

**Parallelizable**: 22 tasks marked [P]

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 22 tasks
