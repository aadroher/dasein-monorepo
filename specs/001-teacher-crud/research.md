# Research: Teacher CRUD Feature (Phase 0)

## Decisions & Rationale

### Language / Framework
- **Decision**: TypeScript + minimal framework-free (progressive enhancement) or a light component approach (NEEDS CLARIFICATION: consider React vs. no-framework).
- **Rationale**: TypeScript improves reliability and test-first development; aligns with web app principle.
- **Alternatives Considered**: Pure JavaScript (less type safety), React (adds dependency), Svelte (compile step), Web Components (native but less common patterns).

### Storage Mechanism
- **Decision**: IndexedDB via a small wrapper (NEEDS CLARIFICATION: may fallback to localStorage for simplicity initially).
- **Rationale**: IndexedDB scales better for future features (scheduling data) and supports structured querying; localStorage simpler but limited size and synchronous.
- **Alternatives**: localStorage (simple API, synchronous performance considerations), Cache API (not for structured data), Plain in-memory (no persistence), WebSQL (deprecated).

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

1. Final choice of UI framework (None vs. React).  
2. IndexedDB wrapper vs. initial localStorage MVP.  
3. Testing stack (Vitest + Playwright) acceptance.  

These will be resolved in early Phase 1 planning or next clarification cycle.

## Next Steps
- Confirm remaining clarifications.
- Generate data model and contracts.
