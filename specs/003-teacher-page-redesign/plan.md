# Implementation Plan: Teacher Management Page Redesign

**Branch**: `003-teacher-page-redesign` | **Date**: 2025-11-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-teacher-page-redesign/spec.md`

## Summary

Redesign the teacher management page UI to improve information hierarchy, visual organization, and accessibility. This involves creating a reusable common layout component with header and branding, converting the teacher list from card-based to table/list layout with inline actions using Heroicons, and improving form spacing. The redesign focuses purely on presentation layer changes without modifying underlying data models or business logic.

## Technical Context

**Language/Version**: TypeScript (ESNext target) + React 19.0.0  
**Primary Dependencies**: React 19, Vite 5.x, Tailwind CSS 4.x, Heroicons (to be added), Vitest, Playwright  
**Storage**: IndexedDB with in-memory fallback (no changes required for this feature)  
**Testing**: Vitest (unit/integration), Playwright (E2E), jest-axe (accessibility), @testing-library/react  
**Target Platform**: Modern web browsers (desktop and mobile)  
**Project Type**: Web application (single-page, client-side)  
**Performance Goals**: 60fps UI interactions, <100ms response to user input, maintain current page load performance  
**Constraints**: WCAG 2.1 AA compliance, keyboard navigation, screen reader compatibility, local-first architecture  
**Scale/Scope**: Single feature module redesign affecting ~5-8 components, estimated 300-500 LOC changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Validation

**I. Web app (NON-NEGOTIABLE)**: ✅ PASS  
This feature is a web UI redesign. No violations.

**II. Local-first (NON-NEGOTIABLE)**: ✅ PASS  
No changes to storage layer. UI redesign maintains existing IndexedDB/memory adapter architecture.

**III. Centralized authentication**: ✅ PASS  
Not applicable to this feature. No authentication changes.

**IV. Privacy by design (NON-NEGOTIABLE)**: ✅ PASS  
No data collection or privacy implications. Pure UI presentation changes.

**V. Test-first (NON-NEGOTIABLE)**: ⚠️ REQUIRES ATTENTION  
All existing E2E tests must be updated to reflect new UI structure (list vs cards, icons vs text). New tests required for:
- Common layout component accessibility
- Icon button keyboard navigation
- Updated teacher list layout
Tests must pass before implementation is considered complete.

**VI. Accessibility (NON-NEGOTIABLE)**: ✅ PASS  
Feature specification explicitly requires WCAG 2.1 AA compliance:
- FR-007: Maintain accessibility on icon buttons (ARIA labels, roles, keyboard nav)
- SC-003: Keyboard and screen reader compatibility validation
All accessibility properties must be preserved during redesign.

**VII. Observability**: ✅ PASS  
Not applicable to this feature. UI changes don't affect observability infrastructure.

**VIII. Vendor neutrality**: ✅ PASS  
Heroicons is an open-source icon library. No vendor lock-in concerns.

**IX. Technology agnostic**: ✅ PASS  
Principles maintained. Using React/TypeScript consistent with existing stack.

**X. Separation of concerns**: ✅ PASS  
Feature creates proper component separation:
- Common layout component (reusable)
- Teacher management page component (feature-specific)
- Clear component boundaries maintained

**XI. Functional programming style**: ✅ PASS  
React components use functional style. No violations expected.

**XII. Monorepo**: ✅ PASS  
All changes within existing web-client folder in monorepo.

### Gate Summary

**Status**: ✅ PASS with attention to Test-First principle

All constitutional gates pass. Test-first principle requires updating existing E2E tests and creating new accessibility tests for modified components before implementation completion.




## Project Structure

### Documentation (this feature)

```
specs/003-teacher-page-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── component-interfaces.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
web-client/
├── src/
│   ├── design-system/
│   │   ├── layout/
│   │   │   ├── app-layout.tsx        # Existing - to be modified
│   │   │   ├── common-layout.tsx     # NEW - common header/branding wrapper
│   │   │   └── page-header.tsx       # NEW - page-level heading component
│   │   ├── components/
│   │   │   └── icon-button.tsx       # NEW - accessible icon button wrapper
│   │   └── assets/
│   │       └── dasein_logo.svg       # Existing - to be used in header
│   └── features/
│       └── teacher/
│           └── ui/
│               ├── teacher-list.tsx           # MODIFY - convert to table/list layout
│               ├── teacher-list-item.tsx      # NEW - single row component
│               ├── teacher-create-form.tsx    # MODIFY - improve spacing
│               ├── teacher-edit-form.tsx      # MODIFY - icon buttons
│               ├── teacher-delete-button.tsx  # MODIFY - icon buttons
│               └── teacher-page.tsx           # NEW - extracted page component
└── test/
    ├── design-system/
    │   └── layout/
    │       ├── common-layout.test.tsx         # NEW
    │       └── common-layout-a11y.test.tsx    # NEW
    └── teacher/
        ├── teacher-page.test.tsx              # NEW
        ├── teacher-page-a11y.test.tsx         # NEW
        └── teacher-list-layout.e2e.ts         # MODIFY existing E2E tests
```

**Structure Decision**: Web application structure (Option 2 variant). This is a pure frontend feature affecting the `web-client/` folder only. Changes focus on the design system's layout components and the teacher feature's UI components. No backend, API, or storage changes required. Follows existing pattern of separating design-system (reusable) from features (domain-specific).

---

## Phase Summary

### Phase 0: Research ✅ COMPLETE

**Deliverable**: [research.md](./research.md)

**Key Decisions**:
1. **Heroicons Integration**: Use `@heroicons/react` package (v2.x)
2. **Accessible Icon Buttons**: Wrapper component with aria-label pattern
3. **List Layout**: Semantic HTML table for better accessibility
4. **Component Composition**: Extract page, create reusable common layout
5. **Form Spacing**: Tailwind spacing utilities (space-y-6, space-y-2, gap-3)
6. **Logo Implementation**: Use existing SVG with accessible wrapper

**Dependencies Added**: `@heroicons/react@^2.1.0`

---

### Phase 1: Design & Contracts ✅ COMPLETE

**Deliverables**:
- [data-model.md](./data-model.md) - Component structure and visual data representation
- [contracts/component-interfaces.md](./contracts/component-interfaces.md) - Component props and interfaces
- [quickstart.md](./quickstart.md) - Development setup and testing guide

**Key Artifacts**:
1. **Data Model**: 
   - No changes to Teacher entity
   - Documented 10 component structures (6 new, 4 modified)
   - Defined component data flow and visual transformations

2. **Contracts**:
   - 10 component interface contracts
   - Accessibility requirements per component
   - Validation contracts for shared logic
   - Event flow specifications

3. **Quickstart**:
   - Setup instructions
   - Test-first workflow examples
   - Common tasks and debugging tips
   - Validation checklist

**Component Inventory**:
- **New**: CommonLayout, PageHeader, AppLogo, IconButton, TeacherPage, TeacherListItem
- **Modified**: TeacherList, TeacherCreateForm, TeacherEditForm, TeacherDeleteButton

---

### Phase 2: Task Breakdown (Next Step)

**Command**: `/speckit.tasks` (NOT executed by `/speckit.plan`)

**Expected Output**: `tasks.md` with:
- Detailed implementation tasks
- Test creation checklist
- Task dependencies
- Estimated effort per task

---

## Implementation Readiness

**Status**: ✅ Ready for Phase 2 (Task Breakdown) and Implementation

**Prerequisites Met**:
- [x] Constitution gates passed
- [x] Research completed (all NEEDS CLARIFICATION resolved)
- [x] Component architecture defined
- [x] Interface contracts documented
- [x] Development workflow established
- [x] Agent context updated

**Next Steps**:
1. Run `/speckit.tasks` to generate detailed task breakdown
2. Begin test-first implementation following quickstart guide
3. Install `@heroicons/react` dependency
4. Create tests before each component implementation
5. Validate accessibility continuously

**Estimated Implementation Effort**: 2-3 days for experienced React developer

**Risk Assessment**: LOW
- Well-defined scope (UI only)
- No data model changes
- Existing test infrastructure
- Clear accessibility requirements
- Research decisions documented

---

## Reference Documentation

- **Specification**: [spec.md](./spec.md)
- **Research**: [research.md](./research.md)
- **Data Model**: [data-model.md](./data-model.md)
- **Contracts**: [contracts/component-interfaces.md](./contracts/component-interfaces.md)
- **Quickstart**: [quickstart.md](./quickstart.md)
- **Requirements Checklist**: [checklists/requirements.md](./checklists/requirements.md)
