# Quickstart: Teacher CRUD Feature

## Purpose
Implement and test local-first CRUD operations for Teacher entities using a simple modular structure.

## Recommended Stack (Pending Clarification)
- Language: TypeScript
- Build: Vite (optional; can start without)
- Unit Tests: Vitest
- E2E Tests: Playwright
- Persistence: IndexedDB wrapper (fallback localStorage for initial simplicity)

## Directory Setup
```
src/features/teacher/
  model/
  storage/
  services/
  ui/
```

## Implementation Steps (Test-First)
1. Define `Teacher` type and validation in `model/` with unit tests.
2. Implement pure CRUD functions (create/update/delete/list + sort) returning new arrays (no mutation) with tests.
3. Implement IndexedDB storage adapter (with in-memory fallback) and persistence tests.
4. Compose service layer combining CRUD + storage; test load & save semantics.
5. Build minimal React UI: list view + form + edit/delete controls with accessibility roles.
6. Write E2E tests for user stories (create, edit, delete, view list ordering, empty state).
7. Add edge case tests (long name, duplicate name, invalid input, persistence failure simulation).
8. Integrate axe-core accessibility assertions in component tests.

## Running Tests (Example Commands)
(Actual setup may vary; placeholder commands)
```
# Unit tests
npm test

# E2E tests
npm run e2e
```

## Accessibility Guidance
- Use native elements: `<form>`, `<input aria-label="Full name">`, `<button>` with clear text.
- Ensure focus states visible and keyboard navigation works.
- Use `role="alert"` or polite live region for validation messages.

## Persistence Choice Notes
- IndexedDB scales; asynchronous; choose if planning more complex queries soon.
- localStorage simpler; synchronous; acceptable for very small data (<500 records).

## Testing Conventions
- Component tests colocated: `ComponentName.test.tsx` adjacent to source.
- Hook tests: `useSomething.test.ts` adjacent to hook file.
- Pure logic tests (sorting, validation) under `__tests__` folder inside their respective module.
- E2E specs in `tests/teacher/e2e/` named after user stories.
- Axe accessibility check executed once per component mount test.

## Next Steps
- All clarifications resolved; proceed to task generation and initial scaffolding.
