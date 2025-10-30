# Data Model: Teacher CRUD

## Entities

### Teacher
- **uuid**: string (generated, canonical unique identifier)
- **full_name**: string (1-100 chars, trimmed)

## Validation Rules
- `full_name` MUST be non-empty after trimming whitespace.
- `full_name` length SHOULD NOT exceed 100 characters (hard cap 200 accepted but UI truncates beyond 100 for display).
- Duplicate `full_name` values allowed; uniqueness is only on `uuid`.

## Derived / Computed
- Sorting key: `full_name.toLocaleLowerCase()` for alphabetical ordering.

## State & Lifecycle
1. Created → Exists in storage → Updated (any number of times) → Deleted (removed from storage).
2. No soft-delete: deletion permanently removes the record.

## Persistence Considerations
- Local browser storage mechanism (IndexedDB preferred; fallback localStorage under consideration).
- All teachers loaded prior to initial list render.

## Edge Cases
- Long names truncated visually but stored fully.
- Persistence failures surface non-blocking notification; in-memory collection remains operational.

## Open Points (Pending Clarification)
- IndexedDB wrapper vs. localStorage initial implementation.
