# Data Model: Teacher Management Page Redesign

**Created**: 2025-11-21  
**Feature**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)

## Overview

This feature is a UI redesign that does **not modify** the underlying data models or storage layer. The existing `Teacher` entity and storage mechanisms remain unchanged. This document describes the UI component structure and visual data representation.

---

## Existing Data Model (Unchanged)

### Teacher Entity

**Source**: `web-client/src/features/teacher/model/teacher.ts`

```typescript
interface Teacher {
  id: string;
  fullName: string;
  createdAt: Date;
}
```

**Validation Rules** (unchanged):
- `fullName`: Required, non-empty string, trimmed, whitespace-only names invalid
- `id`: UUID v4 generated client-side
- `createdAt`: Timestamp of creation

**Storage**: IndexedDB (primary) with in-memory fallback, managed by `TeacherStoragePort`

---

## Component Structure

This section describes the visual components and their data requirements.

### 1. CommonLayout Component

**Location**: `web-client/src/design-system/layout/common-layout.tsx` (NEW)

**Purpose**: Reusable application shell with header, logo, and content area

**Visual Structure**:
```
┌─────────────────────────────────────┐
│ [Logo] Dasein                       │  ← Header (fixed)
├─────────────────────────────────────┤
│                                     │
│  {children}                         │  ← Content area
│                                     │
└─────────────────────────────────────┘
```

**Data Requirements**:
- Logo SVG asset: `design-system/assets/dasein_logo.svg`
- Application name: "Dasein" (hardcoded, accessible via screen reader)
- Children: React nodes (page content)

**Props**:
```typescript
interface CommonLayoutProps {
  children: React.ReactNode;
}
```

---

### 2. PageHeader Component

**Location**: `web-client/src/design-system/layout/page-header.tsx` (NEW)

**Purpose**: Page-level heading with consistent typography

**Visual Structure**:
```
Teachers                              ← h2, smaller than previous h1
```

**Data Requirements**:
- Title text (string)

**Props**:
```typescript
interface PageHeaderProps {
  title: string;
}
```

---

### 3. TeacherPage Component

**Location**: `web-client/src/features/teacher/ui/teacher-page.tsx` (NEW)

**Purpose**: Container for teacher management functionality (extracted from App.tsx)

**Visual Structure**:
```
┌─────────────────────────────────────┐
│ [Create Teacher Form]               │
├─────────────────────────────────────┤
│ [Teacher List]                      │
│  - Teacher 1  [Edit] [Delete]       │
│  - Teacher 2  [Edit] [Delete]       │
│  - Teacher 3  [Edit] [Delete]       │
└─────────────────────────────────────┘
```

**Data Requirements**:
- `TeacherStoragePort` instance
- Manages teacher list state via `useTeachers` hook

**Props**:
```typescript
interface TeacherPageProps {
  storage: TeacherStoragePort;
}
```

---

### 4. TeacherList Component (Modified)

**Location**: `web-client/src/features/teacher/ui/teacher-list.tsx` (EXISTING - MODIFY)

**Purpose**: Display teachers in table/list format with inline actions

**Current Structure**: Card-based layout with actions below name

**New Structure**: Table layout with actions on same row

**Visual Structure**:
```
┌────────────────────┬──────────────┐
│ Teacher Name       │ Actions      │  ← Header row
├────────────────────┼──────────────┤
│ Alice Johnson      │ [✏️] [🗑️]    │  ← Data rows
│ Bob Smith          │ [✏️] [🗑️]    │
│ Carol Williams     │ [✏️] [🗑️]    │
└────────────────────┴──────────────┘
```

**Data Requirements**:
- Array of `Teacher` objects
- Sorted alphabetically by `fullName`
- `TeacherStoragePort` for edit/delete operations

**Props** (existing, unchanged):
```typescript
interface TeacherListProps {
  storage: TeacherStoragePort;
}
```

**Internal State**:
- Teachers array (from storage)
- Edit mode (which teacher is being edited, if any)

---

### 5. TeacherListItem Component

**Location**: `web-client/src/features/teacher/ui/teacher-list-item.tsx` (NEW)

**Purpose**: Render single teacher row with inline actions

**Visual Structure**:
```
│ John Doe           │ [✏️] [🗑️]    │
```

**Data Requirements**:
- Single `Teacher` object
- Edit handler callback
- Delete handler callback

**Props**:
```typescript
interface TeacherListItemProps {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
  isEditing: boolean;
}
```

---

### 6. IconButton Component

**Location**: `web-client/src/design-system/components/icon-button.tsx` (NEW)

**Purpose**: Accessible icon-only button wrapper

**Visual Structure**:
```
[✏️]  or  [🗑️]
```
(Actual icons from Heroicons, not emoji)

**Data Requirements**:
- Icon component (from @heroicons/react)
- Accessible label (for screen readers)
- Click handler
- Variant (primary/danger for styling)

**Props**:
```typescript
interface IconButtonProps {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'danger';
  className?: string;
}
```

**Accessibility Attributes**:
- `aria-label`: Contextual label (e.g., "Edit Alice Johnson", "Delete Alice Johnson")
- `aria-hidden="true"` on icon itself
- `type="button"` to prevent form submission

---

### 7. TeacherCreateForm Component (Modified)

**Location**: `web-client/src/features/teacher/ui/teacher-create-form.tsx` (EXISTING - MODIFY)

**Purpose**: Form for creating new teachers

**Changes**: 
- Improved spacing between form elements
- No structural changes to data handling

**Visual Structure** (spacing improved):
```
┌─────────────────────────────────────┐
│ Create New Teacher                  │  ← Section heading
│                                     │  ← space-y-6 (24px)
│ Full Name:                          │
│ [____________________]              │  ← space-y-2 (8px)
│                                     │
│ [Add Teacher]  [Clear]              │  ← gap-3 (12px between buttons)
└─────────────────────────────────────┘
```

**Data Requirements** (unchanged):
- `TeacherStoragePort` for storage operations
- Form state (fullName input value)
- Validation state (error messages)

**Props** (existing, unchanged):
```typescript
interface TeacherCreateFormProps {
  storage: TeacherStoragePort;
}
```

---

### 8. TeacherEditForm Component (Modified)

**Location**: `web-client/src/features/teacher/ui/teacher-edit-form.tsx` (EXISTING - MODIFY)

**Purpose**: Inline form for editing teacher name

**Changes**:
- Replace text buttons with icon buttons
- No data model changes

**Data Requirements** (unchanged):
- Teacher being edited
- Storage port
- Callbacks for save/cancel

**Props** (existing, may need icon variant added):
```typescript
interface TeacherEditFormProps {
  teacher: Teacher;
  storage: TeacherStoragePort;
  onSave: () => void;
  onCancel: () => void;
}
```

---

### 9. TeacherDeleteButton Component (Modified)

**Location**: `web-client/src/features/teacher/ui/teacher-delete-button.tsx` (EXISTING - MODIFY)

**Purpose**: Delete button with confirmation dialog

**Changes**:
- Convert from text button to icon button
- Maintain existing confirmation logic

**Data Requirements** (unchanged):
- Teacher to delete
- Storage port
- Success callback

**Props** (existing, unchanged):
```typescript
interface TeacherDeleteButtonProps {
  teacher: Teacher;
  storage: TeacherStoragePort;
  onDelete: () => void;
}
```

---

## Component Data Flow

```
App.tsx (existing)
  └─> CommonLayout (NEW)
        ├─> AppLogo (NEW)
        └─> PageHeader (NEW)
              └─> TeacherPage (NEW)
                    ├─> TeacherCreateForm (MODIFIED - spacing)
                    └─> TeacherList (MODIFIED - table layout)
                          └─> TeacherListItem (NEW) × N
                                ├─> IconButton (edit) (NEW)
                                └─> IconButton (delete) (NEW)
                                      └─> TeacherDeleteButton (MODIFIED - icon)
```

**State Management**:
- No state management changes
- Existing `useTeachers` hook continues to manage teacher list
- Storage layer (IndexedDB/Memory) unchanged
- Component local state for edit mode, form inputs unchanged

---

## Visual Data Representation Changes

### Before (Current)

```
Teacher Management                     ← h1, large

┌─────────────────────┐
│ Alice Johnson       │                ← Card layout
│ [Edit] [Delete]     │
└─────────────────────┘

┌─────────────────────┐
│ Bob Smith           │
│ [Edit] [Delete]     │
└─────────────────────┘
```

### After (New Design)

```
[Logo] Dasein                          ← Common header (new)

Teachers                               ← h2, smaller (new)

┌────────────────────┬──────────┐
│ Teacher Name       │ Actions  │     ← Table layout (new)
├────────────────────┼──────────┤
│ Alice Johnson      │ [✏️] [🗑️] │     ← Icons instead of text (new)
│ Bob Smith          │ [✏️] [🗑️] │
└────────────────────┴──────────┘
```

**Key Differences**:
1. Common header added (reusable across future pages)
2. Page title reduced in size and prominence
3. Card layout → table layout (horizontal alignment)
4. Actions moved from below name to same row
5. Text buttons → icon buttons (space efficient)

---

## Empty State

**Scenario**: No teachers exist

**Visual Representation**:
```
┌────────────────────┬──────────┐
│ Teacher Name       │ Actions  │
├────────────────────┼──────────┤
│ (No teachers yet)              │     ← Empty state message
└────────────────────────────────┘
```

**Implementation**: `tbody` with single `tr` spanning columns, or hidden table with message div.

---

## Accessibility Data Attributes

### Icon Buttons
- `aria-label`: Dynamic, includes teacher name for context
  - Edit: `"Edit {teacher.fullName}"`
  - Delete: `"Delete {teacher.fullName}"`
- `aria-hidden="true"`: On icon SVG elements

### Table
- `<th scope="col">`: Column headers
- Optional `<caption>`: "List of teachers" (can be visually hidden)

### Logo
- `<span className="sr-only">`: "Dasein - Educational Schedule Management"
- `aria-hidden="true"`: On logo SVG

---

## Summary

This feature modifies **presentation only**, not data:

**Unchanged**:
- Teacher entity structure
- Storage layer (IndexedDB, TeacherStoragePort)
- Business logic (CRUD operations, validation)
- State management patterns

**Changed**:
- Visual layout (cards → table)
- Component composition (extracted page, added common layout)
- Button presentation (text → icons)
- Spacing/typography (improved whitespace)

**New Components**: 6 (CommonLayout, PageHeader, AppLogo, IconButton, TeacherPage, TeacherListItem)  
**Modified Components**: 4 (TeacherList, TeacherCreateForm, TeacherEditForm, TeacherDeleteButton)
