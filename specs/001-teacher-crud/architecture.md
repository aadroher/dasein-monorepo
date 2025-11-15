# Architecture Decisions: Teacher CRUD Feature

**Feature**: Teacher CRUD Operations  
**Date**: November 2025  
**Status**: Implemented

## Overview

This document captures the key architectural decisions made during the implementation of the Teacher CRUD feature, following the Constitutional AI development principles established in the project constitution.

## Decision Records

### ADR-001: Local-First Architecture with IndexedDB

**Context**: Need persistent storage that works offline and doesn't require backend infrastructure for MVP.

**Decision**: Use IndexedDB as primary storage with in-memory fallback.

**Rationale**:
- **Local-First (Principle II)**: Data lives in the browser, available immediately without network requests
- **Privacy (Principle IV)**: No data leaves the user's device
- **Offline-Capable**: Full functionality without internet connection
- **Browser Standard**: IndexedDB is widely supported across modern browsers

**Consequences**:
- ✅ Zero latency for CRUD operations
- ✅ Works offline by default
- ✅ No server costs or infrastructure needed
- ⚠️ Data limited to single browser/device (future sync can address)
- ⚠️ Storage quota limits (typically 50MB+, sufficient for thousands of teachers)

**Alternatives Considered**:
- **localStorage**: Limited to 5-10MB, synchronous API blocks UI
- **Backend API**: Requires infrastructure, network dependency, violates local-first principle

---

### ADR-002: Storage Port Abstraction Layer

**Context**: Need flexibility to add sync capabilities in the future without rewriting business logic.

**Decision**: Define `TeacherStoragePort` interface with multiple implementations (IndexedDB, in-memory).

**Rationale**:
- **Vendor Neutrality (Principle VIII)**: Not locked into specific storage mechanism
- **Separation of Concerns (Principle X)**: Business logic independent of storage details
- **Technology Agnostic (Principle IX)**: Can swap storage implementations
- **Testability**: Easy to mock storage in tests

**Consequences**:
- ✅ Business logic doesn't know about IndexedDB details
- ✅ Easy to add Replicache or other sync engines later
- ✅ Simple test doubles with in-memory implementation
- ⚠️ Additional abstraction layer adds minimal complexity

**Code Structure**:
```
storage/
├── storage-port.ts         # Interface definition
├── indexeddb-adapter.ts    # IndexedDB implementation
└── memory-adapter.ts       # In-memory fallback
```

---

### ADR-003: React 19 with TypeScript

**Context**: Need modern, type-safe UI framework with good developer experience.

**Decision**: Use React 19 with TypeScript (ESNext) and Vite for tooling.

**Rationale**:
- **Type Safety**: TypeScript catches errors at compile time
- **Modern Features**: React 19 improvements in performance and DX
- **Fast Development**: Vite provides instant HMR
- **Ecosystem**: Large community, excellent testing tools

**Consequences**:
- ✅ Excellent IDE support and autocomplete
- ✅ Catches type errors before runtime
- ✅ Fast development with HMR
- ✅ Strong testing ecosystem (Vitest, Testing Library, Playwright)

---

### ADR-004: Test-First Development with Multi-Layer Testing

**Context**: Must ensure quality and prevent regressions per Test-First Principle (V).

**Decision**: Three-tier testing strategy: Unit + Integration + E2E + Accessibility.

**Rationale**:
- **Test-First (Principle V)**: Write tests before implementation
- **Confidence**: Multiple test layers catch different bug types
- **Accessibility (Principle VI)**: Automated axe-core testing ensures WCAG 2.1 AA compliance

**Test Layers**:

| Layer             | Tool                     | Purpose                             | Coverage                            |
| ----------------- | ------------------------ | ----------------------------------- | ----------------------------------- |
| **Unit**          | Vitest                   | Pure functions, isolated components | Model validation, sorting, services |
| **Integration**   | Vitest + Testing Library | Component + storage interactions    | Persistence, form state             |
| **E2E**           | Playwright               | Full user workflows                 | Complete user stories               |
| **Accessibility** | axe-core                 | WCAG compliance                     | All interactive components          |

**Consequences**:
- ✅ High confidence in changes (99+ tests)
- ✅ Fast feedback loop (unit tests run in <1s)
- ✅ Accessibility built-in, not bolted-on
- ⚠️ More upfront effort writing tests (pays off in maintenance)

---

### ADR-005: Functional Programming Style for Business Logic

**Context**: Need predictable, testable business logic per FP Principle (XI).

**Decision**: Pure functions for all business logic (validation, sorting, CRUD operations).

**Rationale**:
- **Functional Programming (Principle XI)**: Prefer pure functions
- **Testability**: Pure functions easy to test with no mocks
- **Predictability**: Same inputs always produce same outputs
- **Composability**: Functions can be combined easily

**Examples**:
```typescript
// Pure function - no side effects
export function createTeacher(fullName: string): Teacher {
  return {
    uuid: generateUUID(),
    full_name: fullName.trim(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Pure function - deterministic
export function sortTeachers(teachers: Teacher[]): Teacher[] {
  return [...teachers].sort((a, b) => 
    a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())
  );
}
```

**Consequences**:
- ✅ Easy to test without mocks
- ✅ No hidden dependencies or global state
- ✅ Referentially transparent
- ✅ Easy to reason about and debug

---

### ADR-006: Accessibility-First Component Design

**Context**: Must meet WCAG 2.1 AA compliance per Accessibility Principle (VI).

**Decision**: Semantic HTML + ARIA labels + keyboard navigation + automated testing.

**Rationale**:
- **Accessibility (Principle VI)**: Built-in from start, not added later
- **Semantic HTML**: Provides free accessibility features
- **Automated Testing**: axe-core catches violations early

**Implementation**:
- Use semantic HTML elements (`<button>`, `<form>`, `<label>`)
- Proper ARIA labels for screen readers
- Keyboard navigation (Tab, Enter, Escape)
- Focus management
- Automated axe-core testing in component tests

**Consequences**:
- ✅ WCAG 2.1 AA compliant
- ✅ Works with screen readers (VoiceOver, NVDA, JAWS)
- ✅ Keyboard-only navigation supported
- ✅ Automated tests catch accessibility regressions

---

### ADR-007: Alphabetical Sorting with Locale Comparison

**Context**: Teachers must be displayed in alphabetical order (Spec SC-002).

**Decision**: Use `String.localeCompare()` with lowercase normalization.

**Rationale**:
- **Internationalization**: Handles accented characters correctly
- **Case-Insensitive**: "alice" and "Alice" sort together
- **Browser Native**: No external dependencies

**Implementation**:
```typescript
export function sortTeachers(teachers: Teacher[]): Teacher[] {
  return [...teachers].sort((a, b) =>
    a.full_name.toLowerCase().localeCompare(
      b.full_name.toLowerCase()
    )
  );
}
```

**Consequences**:
- ✅ Correct sorting for international names (José, María, etc.)
- ✅ Case-insensitive ordering
- ✅ Predictable, deterministic results
- ✅ No external library needed

---

### ADR-008: Monorepo Structure with Feature Modules

**Context**: Code must be organized for maintainability and future growth per Monorepo Principle (XII).

**Decision**: Feature-based structure with clear separation of concerns.

**Structure**:
```
web-client/
├── src/
│   ├── features/teacher/      # Teacher domain
│   │   ├── model/             # Data types, validation
│   │   ├── services/          # Business logic
│   │   ├── storage/           # Persistence layer
│   │   └── ui/                # React components/hooks
│   └── lib/                   # Shared utilities
└── test/
    └── teacher/
        ├── unit/              # Integration tests
        └── e2e/               # User story tests
```

**Rationale**:
- **Separation of Concerns (Principle X)**: Clear boundaries between layers
- **Monorepo (Principle XII)**: Part of larger monorepo structure
- **Scalability**: Easy to add new features alongside teacher module
- **Dependency Direction**: UI depends on services, services depend on model

**Consequences**:
- ✅ Easy to find related code
- ✅ Clear dependency graph
- ✅ Can extract to separate package if needed
- ✅ New developers understand structure quickly

---

### ADR-009: Result Type for Error Handling

**Context**: Storage operations can fail; need explicit error handling.

**Decision**: Use discriminated union `StorageResult<T>` type for all storage operations.

**Type Definition**:
```typescript
export type StorageResult<T> =
  | { success: true; data: T }
  | { success: false; error: StorageError };
```

**Rationale**:
- **Type Safety**: Compiler forces error handling
- **Explicit**: Errors are part of the type signature
- **No Exceptions**: Predictable control flow
- **Functional**: Railway-oriented programming pattern

**Consequences**:
- ✅ Cannot forget to handle errors
- ✅ Clear success/failure paths
- ✅ No try/catch needed in business logic
- ✅ Easy to compose operations

---

### ADR-010: UUID for Teacher Identity

**Context**: Need unique identifiers that don't require server coordination.

**Decision**: Use client-generated UUIDs (v4) for teacher IDs.

**Rationale**:
- **Local-First**: Can create records offline without server
- **Uniqueness**: Collision probability negligible
- **Sync-Ready**: UUIDs work well with CRDTs and sync engines

**Consequences**:
- ✅ Offline creation works
- ✅ No ID conflicts when syncing
- ✅ Future-proof for multi-device sync
- ⚠️ Slightly larger than sequential IDs (not a concern for use case)

---

## Future Considerations

### Potential Future Decisions

1. **Sync Engine**: When adding multi-device sync (likely Replicache or PowerSync)
   - Storage port abstraction makes this straightforward
   - May need conflict resolution for concurrent edits

2. **Backend Integration**: If adding server-side features
   - Storage port can wrap API calls
   - Maintain local-first UX with optimistic updates

3. **Advanced Features**: Bulk operations, import/export, search
   - Current architecture supports these additions
   - May need indexed fields for search performance

4. **Performance Optimization**: For large datasets (1000+ teachers)
   - Virtual scrolling for list rendering
   - Pagination or infinite scroll
   - Web Workers for heavy operations

## Summary

These architectural decisions create a solid foundation for the Teacher CRUD feature while maintaining flexibility for future enhancements. The architecture respects all constitutional principles and provides a maintainable, testable, accessible codebase.

**Key Strengths**:
- Local-first with offline support
- Type-safe and well-tested
- Accessible by default  
- Easy to extend and maintain
- Future-proof for sync capabilities

**Trade-offs Accepted**:
- Additional abstraction layers for flexibility
- More comprehensive testing (more initial effort)
- Single-device limitation (acceptable for MVP)
