# Teacher Operations (Transport-Agnostic Contracts)

Defines logical operations for Teacher CRUD independent of delivery mechanism (e.g., could map to local function calls, Replicache mutations, REST endpoints, or GraphQL resolvers later).

## Conventions
- All operations are pure from caller perspective (side effects limited to teacher collection persistence).
- Errors described abstractly; mapping to status codes or error types deferred until transport chosen.
- Idempotency: Delete and Update considered idempotent when applied to same UUID with same payload.

## Data Types

```ts
type UUID = string;
interface Teacher {
  uuid: UUID;
  full_name: string; // 1-100 display, up to 200 stored
}
```

## Operations

### CreateTeacher
- Input: `{ full_name: string }`
- Output: `Teacher`
- Errors:
  - `ValidationError` (empty or whitespace-only name, >200 chars)
- Notes: Generates UUID; caller receives persisted record.

### ListTeachers
- Input: `{}`
- Output: `Teacher[]` sorted alphabetically by `full_name` (case-insensitive)
- Errors: `PersistenceError` (read failure)

### UpdateTeacher
- Input: `{ uuid: UUID, full_name: string }`
- Output: `Teacher` (updated)
- Errors:
  - `NotFoundError` (unknown uuid)
  - `ValidationError` (invalid name rules)
  - `PersistenceError`
- Idempotency: Repeating with identical `full_name` yields same state.

### DeleteTeacher
- Input: `{ uuid: UUID }`
- Output: `{ success: true }`
- Errors:
  - `NotFoundError`
  - `PersistenceError`
- Idempotency: Multiple deletes on same UUID after first are treated as success (no-op).

### LoadPersistedTeachers (Initialization)
- Input: `{}`
- Output: `Teacher[]`
- Errors: `PersistenceError`
- Purpose: Distinct from ListTeachers to emphasize bootstrapping/load semantics prior to UI render.

## Error Model (Abstract)
| Error            | Trigger                    | Caller Guidance              |
| ---------------- | -------------------------- | ---------------------------- |
| ValidationError  | Input fails rules          | Prompt user to correct name  |
| NotFoundError    | UUID doesn't exist         | Refresh list or inform user  |
| PersistenceError | Underlying storage failure | Notify, keep in-memory state |

## Future Extension Points
- Add `version` or `last_updated` for conflict resolution if sync engine introduced.
- Add search/filter operations (e.g., ListTeachersByPrefix) once needed.
- Add batch operations for import flows.

## Mapping Examples (Deferred)
- REST: CreateTeacher → POST /teachers, etc. (Not committed yet.)
- Replicache: CreateTeacher → mutation name `createTeacher` payload above.
- GraphQL: CreateTeacher → mutation `createTeacher(full_name: String!): Teacher`.

Transport mapping will be defined when an integration path is selected.