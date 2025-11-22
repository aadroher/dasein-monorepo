# Research: Teacher Management Page Redesign

**Created**: 2025-11-21  
**Feature**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)

## Purpose

Research technical approaches for implementing the teacher management page redesign, focusing on Heroicons integration, accessible icon button patterns, React component composition, and layout best practices.

## Research Questions

### 1. Heroicons Integration with React

**Decision**: Use `@heroicons/react` npm package (v2.x)

**Rationale**:
- Official React package from Heroicons team (Tailwind Labs)
- Provides both outline and solid icon variants as React components
- Tree-shakeable - only imports icons actually used
- TypeScript support out of the box
- No additional build configuration needed with Vite
- Zero runtime dependencies (icons are just SVG components)

**Implementation approach**:
```tsx
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Usage
<PencilIcon className="h-5 w-5" aria-hidden="true" />
```

**Alternatives considered**:
- **Heroicons CDN/SVG sprites**: Rejected - requires additional HTTP requests, no tree-shaking
- **Copy SVG files manually**: Rejected - harder to maintain, no type safety
- **react-icons**: Rejected - bundles multiple icon sets, larger bundle size

**Package to install**: `@heroicons/react@^2.0.0`

---

### 2. Accessible Icon Button Pattern

**Decision**: Create wrapper component combining button semantics with icon presentation

**Rationale**:
- Icon-only buttons need text alternative for screen readers
- `aria-label` provides accessible name while hiding visual text
- `aria-hidden="true"` on icon prevents double-announcement
- Consistent pattern across all icon buttons
- Centralizes accessibility implementation

**Implementation pattern**:
```tsx
interface IconButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'danger';
}

function IconButton({ icon: Icon, label, onClick, variant }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={/* variant styles */}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
```

**Alternatives considered**:
- **Visible text + icon**: Rejected - spec requires icon-only for space efficiency
- **Title attribute**: Rejected - not accessible to keyboard-only users
- **Tooltip component**: Deferred - adds complexity, aria-label sufficient for MVP

**WCAG Compliance**: 
- 1.1.1 Non-text Content (Level A): ✅ aria-label provides text alternative
- 2.1.1 Keyboard (Level A): ✅ Button element natively keyboard accessible
- 4.1.2 Name, Role, Value (Level A): ✅ Button role and accessible name provided

---

### 3. List vs Table Layout for Teachers

**Decision**: Use semantic HTML table with responsive considerations

**Rationale**:
- Teachers with actions = tabular data (entity + operations)
- Screen readers benefit from table semantics (th, td, scope)
- Easier to implement consistent column alignment
- Better than div-based "faux table" for accessibility
- Can be made responsive with CSS (e.g., card view on mobile if needed later)

**Implementation approach**:
```tsx
<table className="min-w-full divide-y">
  <thead>
    <tr>
      <th scope="col">Teacher Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {teachers.map(teacher => (
      <tr key={teacher.id}>
        <td>{teacher.fullName}</td>
        <td>
          <div className="flex gap-2">
            <IconButton icon={PencilIcon} label={`Edit ${teacher.fullName}`} ... />
            <IconButton icon={TrashIcon} label={`Delete ${teacher.fullName}`} ... />
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

**Alternatives considered**:
- **Unordered list (ul/li)**: Rejected - loses semantic relationship between name and actions
- **Definition list (dl/dt/dd)**: Rejected - not appropriate for multiple entities
- **Div-based grid**: Rejected - harder to maintain accessibility, more CSS complexity

**Accessibility notes**:
- Include visually-hidden column headers if design doesn't show them
- Consider `aria-label` on action cell for context: "Actions for [teacher name]"
- Maintain focus management when deleting rows

---

### 4. React Component Composition Strategy

**Decision**: Extract teachermanagement into separate page component, create reusable common layout

**Rationale**:
- Separation of concerns: layout (design-system) vs domain logic (features)
- Common layout becomes reusable for future pages
- Teacher page component can be independently tested
- Easier to modify page-specific layout without affecting global structure
- Follows React composition over inheritance principle

**Component hierarchy**:
```
<CommonLayout>             // design-system/layout/
  <PageHeader title="Teachers" />
  <TeacherPage>            // features/teacher/ui/
    <TeacherCreateForm />
    <TeacherList />
  </TeacherPage>
</CommonLayout>
```

**Alternatives considered**:
- **Single monolithic component**: Rejected - violates separation of concerns
- **Context-based layout**: Rejected - adds unnecessary complexity for simple header
- **Nested layouts**: Deferred - not needed until multiple layout types emerge

---

### 5. Form Spacing Improvements

**Decision**: Use Tailwind CSS spacing utilities with consistent scale

**Rationale**:
- Tailwind already in project (v4.x)
- Consistent spacing scale (4px base: space-2, space-4, space-6, etc.)
- Easy to adjust and maintain
- No additional dependencies
- Design tokens already defined in Tailwind config

**Recommended spacing pattern**:
```tsx
<form className="space-y-6">          {/* 24px between major sections */}
  <div className="space-y-2">         {/* 8px between label and input */}
    <label>...</label>
    <input />
    <p className="text-sm">...</p>    {/* helper text */}
  </div>
  <div className="flex gap-3">        {/* 12px between buttons */}
    <button>Submit</button>
    <button>Cancel</button>
  </div>
</form>
```

**Spacing scale**:
- Form sections: `space-y-6` (24px)
- Field groups: `space-y-2` (8px)
- Inline elements: `gap-3` (12px)

**Alternatives considered**:
- **Custom CSS margins**: Rejected - inconsistent, harder to maintain
- **CSS Grid**: Deferred - overkill for simple form layout
- **Spacer components**: Rejected - adds unnecessary abstraction

---

### 6. Logo Implementation

**Decision**: Use existing SVG with accessible wrapper component

**Rationale**:
- `dasein_logo.svg` already exists in `web-client/src/design-system/assets/`
- SVG provides scalability and small file size
- Can be styled with CSS/Tailwind
- Inline SVG for better control vs img tag

**Implementation**:
```tsx
import LogoSvg from '../assets/dasein_logo.svg?react';  // Vite SVG import

function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <LogoSvg className="h-8 w-8" aria-hidden="true" />
      <span className="text-xl font-semibold">Dasein</span>
      <span className="sr-only">Dasein - Educational Schedule Management</span>
    </div>
  );
}
```

**Accessibility**:
- Logo SVG marked `aria-hidden="true"` (decorative)
- Text "Dasein" provides visible label
- `sr-only` span adds context for screen readers

**Alternatives considered**:
- **Image tag**: Rejected - less flexibility for styling
- **Background image**: Rejected - not semantic, harder to make responsive
- **Icon font**: Rejected - SVG provides better quality and accessibility

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@heroicons/react": "^2.1.0"
  }
}
```

**Installation**: `npm install @heroicons/react`

---

## Testing Strategy

### Unit/Integration Tests (Vitest + Testing Library)
- Common layout renders with logo and title
- Icon buttons have correct aria-labels
- Table structure has proper semantics
- Form spacing meets design specs

### Accessibility Tests (jest-axe)
- No axe violations in common layout
- Icon buttons pass color contrast
- Table has proper headers and scope
- Keyboard navigation works for all interactive elements

### E2E Tests (Playwright)
- Update existing teacher CRUD tests for new selectors
- Verify list layout instead of cards
- Test icon button click handlers
- Validate responsive behavior

---

## Best Practices Applied

1. **Semantic HTML**: Use table, th, td for tabular data
2. **ARIA patterns**: aria-label for icon buttons, aria-hidden for decorative icons
3. **Keyboard accessibility**: All button elements are natively keyboard accessible
4. **Screen reader support**: Descriptive labels include context (e.g., "Edit John Doe")
5. **Focus management**: Maintain logical tab order
6. **Tailwind conventions**: Use spacing scale consistently
7. **Component composition**: Reusable layout components
8. **Tree-shaking**: Import only needed Heroicons
9. **TypeScript**: Strong typing for component props
10. **Test-first**: Write failing tests before implementation

---

## Open Questions / Future Considerations

1. **Mobile responsive strategy**: Current spec focuses on desktop. Consider responsive table→cards transformation for narrow screens.
2. **Empty state design**: Spec mentions edge case but doesn't define visual treatment.
3. **Sort/filter**: Not in spec but common for lists. Document as future enhancement.
4. **Pagination**: Not in spec. Consider if teacher list grows beyond ~50 items.
5. **Animation**: Consider subtle transitions for delete/edit actions to improve UX.

---

## References

- [Heroicons Documentation](https://heroicons.com/)
- [WAI-ARIA Authoring Practices - Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA Authoring Practices - Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [Tailwind CSS Spacing](https://tailwindcss.com/docs/customizing-spacing)
- [Vite Asset Handling](https://vitejs.dev/guide/assets.html)
