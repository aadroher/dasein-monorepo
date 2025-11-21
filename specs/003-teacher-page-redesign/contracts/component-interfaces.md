# Component Interface Contracts

**Created**: 2025-11-21  
**Feature**: [spec.md](../spec.md)  
**Plan**: [plan.md](../plan.md)

## Overview

This document defines the interface contracts (props, callbacks, events) for all components in the teacher page redesign. These contracts are transport-agnostic and define the logical operations and data shapes each component expects.

---

## Design System Components

### CommonLayout

**Purpose**: Application-wide layout wrapper providing consistent header with branding

**Interface**:
```typescript
interface CommonLayoutProps {
  /** Page content to render within the layout */
  children: React.ReactNode;
}
```

**Contract**:
- **Input**: ReactNode children (any valid React content)
- **Output**: Rendered layout with header + children in content area
- **Side Effects**: None
- **Invariants**: 
  - Header always displays logo and "Dasein" text
  - Logo is always positioned at top-left
  - Children always render below header

**Usage Example**:
```tsx
<CommonLayout>
  <div>Your page content here</div>
</CommonLayout>
```

---

### PageHeader

**Purpose**: Standardized page-level heading component

**Interface**:
```typescript
interface PageHeaderProps {
  /** Page title text */
  title: string;
}
```

**Contract**:
- **Input**: String title
- **Output**: Rendered h2 element with consistent styling
- **Side Effects**: None
- **Invariants**:
  - Always renders as h2 (not h1)
  - Font size smaller than main app header
  - Title is never empty (validation responsibility of caller)

**Usage Example**:
```tsx
<PageHeader title="Teachers" />
```

---

### IconButton

**Purpose**: Accessible icon-only button with semantic label

**Interface**:
```typescript
interface IconButtonProps {
  /** Heroicon component to render */
  icon: React.ComponentType<{
    className?: string;
    'aria-hidden'?: boolean;
  }>;
  
  /** Accessible label for screen readers (required) */
  label: string;
  
  /** Click handler */
  onClick: () => void;
  
  /** Visual variant for styling */
  variant?: 'primary' | 'danger';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Disabled state */
  disabled?: boolean;
}
```

**Contract**:
- **Input**: Icon component, accessible label, click handler, optional variant/classes
- **Output**: Button element with icon, proper ARIA attributes
- **Side Effects**: Executes onClick when activated
- **Invariants**:
  - Icon has `aria-hidden="true"`
  - Button has `aria-label` matching `label` prop
  - Button is keyboard accessible (tab, enter, space)
  - `type="button"` prevents form submission
  - When disabled, onClick is not executed

**Accessibility**:
- WCAG 2.1 AA compliant
- Label must include context (e.g., "Edit John Doe", not just "Edit")
- Minimum touch target: 44×44px (mobile)
- Color contrast ratio ≥ 4.5:1

**Usage Example**:
```tsx
<IconButton
  icon={PencilIcon}
  label="Edit Alice Johnson"
  onClick={handleEdit}
  variant="primary"
/>
```

---

### AppLogo

**Purpose**: Application branding component (logo + name)

**Interface**:
```typescript
// No props - self-contained component
```

**Contract**:
- **Input**: None
- **Output**: Logo SVG + "Dasein" text with screen reader context
- **Side Effects**: None
- **Invariants**:
  - Logo SVG has `aria-hidden="true"`
  - Visible text "Dasein" always present
  - Screen-reader-only text provides full context

**Accessibility**:
- Logo decorative (aria-hidden)
- Visible text label "Dasein"
- SR-only span: "Dasein - Educational Schedule Management"

**Usage Example**:
```tsx
<AppLogo />
```

---

## Feature Components (Teacher Management)

### TeacherPage

**Purpose**: Container for teacher management functionality

**Interface**:
```typescript
interface TeacherPageProps {
  /** Storage adapter for teacher operations */
  storage: TeacherStoragePort;
}
```

**Contract**:
- **Input**: Storage port implementation
- **Output**: Rendered create form + teacher list
- **Side Effects**: 
  - Fetches teachers from storage on mount
  - Subscribes to storage changes
- **Invariants**:
  - Storage must be initialized before mounting
  - Component handles loading/error states
  - Refreshes list after create/edit/delete

**Error Handling**:
- Storage initialization failure → error message displayed
- Load failure → error message with retry option

**Usage Example**:
```tsx
<TeacherPage storage={indexedDBAdapter} />
```

---

### TeacherList

**Purpose**: Display teachers in table format with actions

**Interface**:
```typescript
interface TeacherListProps {
  /** Storage adapter for edit/delete operations */
  storage: TeacherStoragePort;
}
```

**Contract**:
- **Input**: Storage port implementation
- **Output**: Table of teachers with inline edit/delete actions
- **Side Effects**:
  - Reads teachers from storage
  - Writes updates/deletes to storage
  - Manages edit mode state
- **Invariants**:
  - Teachers sorted alphabetically by fullName
  - Only one teacher in edit mode at a time
  - Empty state shown when no teachers exist

**Behavior**:
- **Empty List**: Shows message "No teachers yet" in table
- **Edit Mode**: Replaces row with inline edit form
- **Delete**: Shows confirmation dialog before deletion
- **Focus Management**: Returns focus to trigger button after edit/delete

**Usage Example**:
```tsx
<TeacherList storage={storageAdapter} />
```

---

### TeacherListItem

**Purpose**: Render single teacher row with actions

**Interface**:
```typescript
interface TeacherListItemProps {
  /** Teacher data to display */
  teacher: Teacher;
  
  /** Callback when edit button clicked */
  onEdit: (teacher: Teacher) => void;
  
  /** Callback when delete button clicked */
  onDelete: (teacher: Teacher) => void;
  
  /** Whether this teacher is currently being edited */
  isEditing: boolean;
}
```

**Contract**:
- **Input**: Teacher object, action callbacks, edit state
- **Output**: Table row (<tr>) with teacher name and action buttons
- **Side Effects**: 
  - Calls onEdit when edit button clicked
  - Calls onDelete when delete button clicked
- **Invariants**:
  - If isEditing=true, show edit form instead of name
  - Icon buttons include teacher name in aria-label

**Accessibility**:
- Edit button: `aria-label="Edit {teacher.fullName}"`
- Delete button: `aria-label="Delete {teacher.fullName}"`

**Usage Example**:
```tsx
<TeacherListItem
  teacher={teacher}
  onEdit={handleEdit}
  onDelete={handleDelete}
  isEditing={editingId === teacher.id}
/>
```

---

### TeacherCreateForm

**Purpose**: Form for creating new teachers

**Interface**:
```typescript
interface TeacherCreateFormProps {
  /** Storage adapter for create operation */
  storage: TeacherStoragePort;
}
```

**Contract**:
- **Input**: Storage port implementation
- **Output**: Form with name input and submit button
- **Side Effects**:
  - Writes new teacher to storage on submit
  - Clears form after successful creation
- **Invariants**:
  - Validates fullName (non-empty, not whitespace-only)
  - Shows error message for invalid input
  - Disables submit while saving
  - Form fields have proper spacing (space-y-6, space-y-2)

**Validation Rules**:
- `fullName`: Required, trimmed, non-empty after trim
- Error message: "Teacher name is required" or "Teacher name cannot be only whitespace"

**Accessibility**:
- Label associated with input (`htmlFor`/`id`)
- Error message has `role="alert"`
- Error message referenced by `aria-describedby` on input
- Submit button disabled during submission

**Usage Example**:
```tsx
<TeacherCreateForm storage={storageAdapter} />
```

---

### TeacherEditForm

**Purpose**: Inline edit form for teacher name

**Interface**:
```typescript
interface TeacherEditFormProps {
  /** Teacher being edited */
  teacher: Teacher;
  
  /** Storage adapter for update operation */
  storage: TeacherStoragePort;
  
  /** Callback when save successful */
  onSave: () => void;
  
  /** Callback when edit cancelled */
  onCancel: () => void;
}
```

**Contract**:
- **Input**: Teacher to edit, storage port, callbacks
- **Output**: Inline form with input and save/cancel icon buttons
- **Side Effects**:
  - Writes updated teacher to storage on save
  - Calls onSave on successful update
  - Calls onCancel when cancelled or on Escape key
- **Invariants**:
  - Initial value is teacher.fullName
  - Same validation as create form
  - Escape key cancels edit
  - Enter key submits (unless invalid)

**Icon Buttons**:
- Save: CheckIcon with `aria-label="Save changes to {teacher.fullName}"`
- Cancel: XMarkIcon with `aria-label="Cancel editing {teacher.fullName}"`

**Usage Example**:
```tsx
<TeacherEditForm
  teacher={teacher}
  storage={storageAdapter}
  onSave={exitEditMode}
  onCancel={exitEditMode}
/>
```

---

### TeacherDeleteButton

**Purpose**: Delete button with confirmation dialog

**Interface**:
```typescript
interface TeacherDeleteButtonProps {
  /** Teacher to delete */
  teacher: Teacher;
  
  /** Storage adapter for delete operation */
  storage: TeacherStoragePort;
  
  /** Callback after successful deletion */
  onDelete: () => void;
}
```

**Contract**:
- **Input**: Teacher to delete, storage port, callback
- **Output**: Icon button that shows confirmation dialog
- **Side Effects**:
  - Shows native confirm() dialog on click
  - Deletes from storage if confirmed
  - Calls onDelete after successful deletion
- **Invariants**:
  - Confirmation message includes teacher name
  - No deletion if user cancels
  - Focus returns to list after deletion

**Confirmation Message**: `"Are you sure you want to delete {teacher.fullName}?"`

**Icon**: TrashIcon with `aria-label="Delete {teacher.fullName}"`

**Usage Example**:
```tsx
<TeacherDeleteButton
  teacher={teacher}
  storage={storageAdapter}
  onDelete={refreshList}
/>
```

---

## Storage Port Contract (Unchanged)

For reference, the existing storage interface that components depend on:

```typescript
interface TeacherStoragePort {
  initialize(): Promise<{ success: boolean; error?: string }>;
  create(teacher: Omit<Teacher, 'id' | 'createdAt'>): Promise<Teacher>;
  read(): Promise<Teacher[]>;
  update(teacher: Teacher): Promise<void>;
  delete(id: string): Promise<void>;
}
```

**Note**: This interface is not modified by this feature. All components continue using it as-is.

---

## Validation Contract

Shared validation logic for teacher names:

```typescript
interface NameValidation {
  /** Validate teacher name */
  validate(name: string): ValidationResult;
}

interface ValidationResult {
  /** Whether name is valid */
  valid: boolean;
  
  /** Error message if invalid */
  error?: string;
}
```

**Rules**:
1. Name cannot be empty string
2. Name cannot be whitespace-only after trim
3. Name is trimmed before storage

**Implementation** (existing, unchanged):
```typescript
function validateTeacherName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (trimmed === '') {
    return {
      valid: false,
      error: name.length === 0 
        ? 'Teacher name is required'
        : 'Teacher name cannot be only whitespace'
    };
  }
  return { valid: true };
}
```

---

## Event Flow Contracts

### Create Teacher Flow

```
User Input (name) 
  → TeacherCreateForm.onSubmit()
  → Validate name
  → storage.create({ fullName })
  → storage.read() to refresh
  → Clear form
```

**Success**: Form cleared, new teacher appears in list
**Failure**: Error message shown, form retains input

---

### Edit Teacher Flow

```
User clicks edit icon
  → TeacherList sets editingId
  → TeacherListItem renders TeacherEditForm
  → User edits name
  → TeacherEditForm.onSave()
  → Validate name
  → storage.update(teacher)
  → storage.read() to refresh
  → TeacherList clears editingId
```

**Cancel**: Escape key or cancel icon → clears editingId without save

---

### Delete Teacher Flow

```
User clicks delete icon
  → TeacherDeleteButton.onClick()
  → Show confirmation dialog
  → If confirmed:
      → storage.delete(teacher.id)
      → storage.read() to refresh
      → onDelete() callback
```

**Cancel**: User cancels dialog → no storage operation

---

## Accessibility Contracts

All components must satisfy:

1. **Keyboard Navigation**:
   - All interactive elements reachable via Tab
   - Enter/Space activate buttons
   - Escape cancels edit mode/dialogs

2. **Screen Reader Support**:
   - All buttons have accessible names (aria-label or visible text)
   - Decorative icons marked aria-hidden
   - Form inputs have associated labels
   - Error messages announced (role="alert")

3. **Focus Management**:
   - Focus trapped in edit mode (Enter saves, Escape cancels)
   - Focus returns to trigger after modal operations
   - Tab order is logical (left-to-right, top-to-bottom)

4. **Color Independence**:
   - Information not conveyed by color alone
   - Error states have icons/text, not just red color
   - Sufficient contrast ratios (4.5:1 minimum)

---

## Testing Contracts

Each component must provide:

1. **Unit Tests**:
   - Renders with required props
   - Callbacks invoked with correct arguments
   - Validation logic correct

2. **Accessibility Tests**:
   - No axe violations
   - Keyboard navigation works
   - Screen reader labels present

3. **Integration Tests**:
   - Component integrates with storage port
   - State updates reflect in UI
   - Error states handled gracefully

4. **E2E Tests** (for full flows):
   - Create → appears in list
   - Edit → updates in list
   - Delete → removes from list
   - Accessibility maintained end-to-end

---

## Summary

**Total Contracts**: 10 components  
**New Contracts**: 6 (CommonLayout, PageHeader, IconButton, AppLogo, TeacherPage, TeacherListItem)  
**Modified Contracts**: 4 (TeacherList, TeacherCreateForm, TeacherEditForm, TeacherDeleteButton)  

All contracts maintain:
- Type safety (TypeScript)
- Accessibility (WCAG 2.1 AA)
- Testability (clear inputs/outputs)
- Separation of concerns (props vs implementation)
