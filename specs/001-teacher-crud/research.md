# Research: Teacher CRUD Feature (Phase 0)

## Decisions & Rationale

### Language / Framework
- **Decision**: TypeScript + React.
- **Rationale**: React widely adopted, rich ecosystem for test-first (component testing & accessibility), facilitates future expansion to more complex interactive features while remaining technology agnostic at architecture level.
- **Alternatives Considered**: Pure JavaScript (reduced type safety), Framework-free (more manual state/UI orchestration), Svelte (compile step + different paradigm), Web Components (native but less standard patterns for team onboarding).

### Storage Mechanism
- **Decision**: IndexedDB via a small wrapper (fallback to in-memory ephemeral only if IndexedDB initialization fails).
- **Rationale**: Scales for future entities (schedules, attendance), supports indexing/query evolution, non-blocking async operations; aligns with local-first and future offline sync patterns.
- **Alternatives**: localStorage (simpler but synchronous & less scalable), Cache API (unsuited for structured records), Plain in-memory (no persistence), WebSQL (deprecated).

### Testing Stack
- **Decision**: Vitest for unit tests (NEEDS CLARIFICATION) + Playwright for E2E (NEEDS CLARIFICATION) with accessibility assertions.
- **Rationale**: Vitest fast TS-friendly unit runner; Playwright reliable cross-browser automation and accessibility hooks.
- **Alternatives**: Jest (heavier), Cypress (strong E2E but single-browser), WebdriverIO (more setup).

### Accessibility Approach
- **Decision**: Semantic HTML + ARIA only where needed; use `getByRole` selectors in tests (NEEDS CLARIFICATION: confirm test library usage).
- **Rationale**: Aligns with WCAG 2.1 AA and test-first principle for public UI.
- **Alternatives**: Heavier component libraries (risk of lock-in), manual ad-hoc attributes (less reliable).

### Observability (Deferred)
- **Decision**: Add simple console log hooks behind a toggle; full OpenTelemetry deferred.
- **Rationale**: MVP scope minimal; avoid premature complexity.
- **Alternatives**: Integrate OpenTelemetry now (overkill), no logging (harder debugging).

### Functional Programming Style
- **Decision**: Pure functions for CRUD operations returning new arrays; avoid in-place mutation.
- **Rationale**: Testability and easier reasoning.
- **Alternatives**: In-place mutation (less verbose but harder to test thoroughly).

## Outstanding NEEDS CLARIFICATION

None (test stack finalized: Vitest + @testing-library/react + Playwright + axe-core).

These will be resolved in early Phase 1 planning or next clarification cycle.

## Next Steps
- Confirm remaining clarifications.
- Generate data model and contracts.
