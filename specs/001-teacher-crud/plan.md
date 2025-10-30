# Implementation Plan: Teacher CRUD Feature

**Branch**: `001-teacher-crud` | **Date**: 2025-10-30 | **Spec**: `specs/001-teacher-crud/spec.md`
**Input**: Feature specification for CRUD operations on Teacher entity (local-first persistence, alphabetical listing).

## Summary

Implement local-first browser-based CRUD for Teacher entities (UUID + full name) with persistent storage across sessions and deterministic alphabetical ordering. This forms the initial data foundation for future scheduling/timetable features.

## Technical Context

**Language/Version**: TypeScript (ESNext)  
**Primary Dependencies**: React (UI), potential lightweight storage helper (to be decided)  
**Storage**: IndexedDB (teacher store) with in-memory fallback on init failure  
**Testing**: Vitest (unit) + @testing-library/react (component) + Playwright (E2E) + axe-core (accessibility audits)  
**Target Platform**: Modern browsers (desktop + mobile)  
**Project Type**: Web (frontend only initial slice)  
**Performance Goals**: List render < 3s for 50 teachers (from spec)  
**Constraints**: Local-first, offline capable, WCAG 2.1 AA accessibility, test-first, alphabetical ordering, vendor neutrality  
**Scale/Scope**: MVP (single-user local dataset up to few hundred teachers)  

## Constitution Check

| Principle                         | Alignment             | Notes                                                      |
| --------------------------------- | --------------------- | ---------------------------------------------------------- |
| Web app (I)                       | ✅                     | Pure browser implementation                                |
| Local-first (II)                  | ✅                     | All data stored locally; no backend                        |
| Centralized auth (III)            | N/A (Deferred)        | No auth needed for local MVP                               |
| Privacy by design (IV)            | ✅                     | Minimal data: only UUID + full name                        |
| Test-first (V)                    | ⚠️ NEEDS CLARIFICATION | Must select testing stack before implementation            |
| Accessibility (VI)                | ⚠️ NEEDS CLARIFICATION | Need approach (semantic HTML + testing)                    |
| Observability (VII)               | ⚠️ Deferred            | Minimal logging; formal telemetry later                    |
| Vendor neutrality (VIII)          | ✅                     | Avoid storage APIs that lock-in; use standard browser APIs |
| Technology agnostic (IX)          | ✅                     | React chosen for UI but architecture remains decoupled     |
| Separation of concerns (X)        | ✅                     | Plan for distinct modules: model, persistence, UI, tests   |
| Functional programming style (XI) | ✅                     | Favor pure functions for CRUD operations                   |
| Monorepo (XII)                    | ✅                     | Feature lives within monorepo structure                    |

Gate Outcome: Proceed but resolve NEEDS CLARIFICATION items (language/framework, storage mechanism choice, testing + accessibility strategy) in Phase 0 research.

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
web-client/
  src/
    features/
      teacher/
        model/            # pure data types & validation
        storage/          # persistence adapter (IndexedDB + fallback)
        ui/               # React components/pages for list + form
        services/         # orchestration, sorting logic
  test/
    teacher/
      unit/              # model + storage + sorting tests
      e2e/               # user stories (create/edit/delete/view)
docs/ (optional)         # quickstart, contracts reference
```

**Structure Decision**: Single web frontend React feature module under `web-client/src/features/teacher` with clear separation of model, storage, UI (React components), and service orchestration to uphold separation of concerns and test-first principles.

## Complexity Tracking

No constitutional violations introduced. No additional complexity requiring justification at this MVP stage.

## Phase 1 Outputs Summary

Artifacts created:
- `research.md` (Phase 0 decisions; remaining clarifications noted)
- `data-model.md` (Teacher entity, validation, lifecycle)
- `contracts/teacher-operations.md` (Transport-agnostic operation contracts for CRUD actions)
- `quickstart.md` (Implementation & test-first guidance)

## Post-Design Constitution Re-Check

| Principle                         | Status After Design | Notes                                                        |
| --------------------------------- | ------------------- | ------------------------------------------------------------ |
| Web app (I)                       | ✅                   | Still pure browser artifacts                                 |
| Local-first (II)                  | ✅                   | Storage abstraction remains local only                       |
| Centralized auth (III)            | Deferred            | No auth introduced prematurely                               |
| Privacy by design (IV)            | ✅                   | Minimal PII (names only) maintained                          |
| Test-first (V)                    | ⚠️ Pending           | Tests planned; framework selection pending confirmation      |
| Accessibility (VI)                | ⚠️ Pending           | Guidance added; concrete a11y acceptance tests to be written |
| Observability (VII)               | Deferred            | MVP logging approach outlined in research                    |
| Vendor neutrality (VIII)          | ✅                   | Standard browser APIs only                                   |
| Technology agnostic (IX)          | ✅                   | React adopted; abstraction layers keep future swap feasible  |
| Separation of concerns (X)        | ✅                   | Structure partitions model/storage/ui/services               |
| Functional programming style (XI) | ✅                   | CRUD pure function approach specified                        |
| Monorepo (XII)                    | ✅                   | Feature isolated within monorepo plan                        |

Gate Check: All non-negotiable principles satisfied or appropriately deferred (auth not required). Pending items (test stack, accessibility tooling, storage choice) to be finalized before implementation tasks.

## Phase 2 Preview (Tasks Not Generated Here)

Planned task themes (to be formalized via `/speckit.tasks`):
1. Choose stack: finalize TS + storage + test frameworks.
2. Implement model & validation tests.
3. Implement pure CRUD functions + unit tests.
4. Implement storage adapter + persistence tests.
5. Service orchestration layer tests (load/save, sorting).
6. UI components + accessibility tests.
7. E2E user story tests (create/edit/delete/view ordering/empty state).
8. Edge case tests (long name, duplicates, invalid input, persistence failure simulation).
9. Minimal logging hook.
10. Documentation updates (README + quickstart refinements).

Pending Clarifications Before Coding:
None (all clarifications resolved).

## Testing Conventions

| Aspect                        | Convention                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Unit/component test placement | Colocated next to source: `ComponentName.test.tsx`                                              |
| Hooks tests                   | Colocated: `useThing.test.ts` in same folder as hook                                            |
| Test naming                   | Use behavior-driven describe blocks; file name mirrors component                                |
| Accessibility assertions      | Use testing-library queries by role/name; axe automated check in each component root test       |
| E2E specs                     | Under `tests/teacher/e2e/` with filenames matching user stories: `create-teacher.spec.ts`, etc. |
| Sorting logic tests           | In `web-client/src/features/teacher/services/__tests__/sorting.test.ts` (pure function tests)   |
| Data model tests              | In `web-client/src/features/teacher/model/__tests__/teacher-validation.test.ts`                 |

