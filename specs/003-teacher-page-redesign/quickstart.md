# Quickstart: Teacher Management Page Redesign

**Created**: 2025-11-21  
**Feature**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)

## Overview

This guide helps developers get started implementing and testing the teacher management page redesign. Follow these steps to set up your environment, understand the architecture, and run tests.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository cloned
- Basic familiarity with React, TypeScript, and Tailwind CSS

---

## Quick Setup

### 1. Install Dependencies

Navigate to the web-client directory and install the new dependency:

```bash
cd /path/to/dasein-monorepo/web-client
npm install @heroicons/react
```

**What this adds**: Heroicons React components for icon-based buttons

### 2. Verify Existing Setup

Ensure existing dependencies are installed:

```bash
npm install
```

**Key dependencies** (already in package.json):
- `react@^19.0.0` - UI framework
- `tailwindcss@^4.1.17` - Styling
- `vitest@^1.5.0` - Unit/integration testing
- `@playwright/test@^1.48.0` - E2E testing
- `jest-axe@^8.0.0` - Accessibility testing

### 3. Start Development Server

```bash
npm run dev
```

**Expected output**: Vite dev server at `http://localhost:5173`

### 4. Verify Current Teacher Management Page

1. Open `http://localhost:5173` in browser
2. Confirm current design:
   - "Teacher Management" heading
   - Card-based teacher list
   - Text buttons ("Edit", "Delete")

---

## Architecture Overview

### Component Hierarchy

```
App.tsx
  └─> CommonLayout (NEW)
        ├─> AppLogo (NEW)
        └─> PageHeader (NEW)
              └─> TeacherPage (NEW)
                    ├─> TeacherCreateForm (MODIFIED)
                    └─> TeacherList (MODIFIED)
                          └─> TeacherListItem (NEW)
                                ├─> IconButton (edit) (NEW)
                                └─> IconButton (delete) (NEW)
```

### Directory Structure

```
web-client/src/
├── design-system/          # Reusable UI components
│   ├── layout/
│   │   ├── common-layout.tsx      (NEW)
│   │   ├── page-header.tsx        (NEW)
│   │   └── app-layout.tsx         (EXISTING)
│   ├── components/
│   │   └── icon-button.tsx        (NEW)
│   └── assets/
│       └── dasein_logo.svg        (EXISTING)
│
└── features/teacher/       # Teacher domain logic
    ├── ui/
    │   ├── teacher-page.tsx           (NEW)
    │   ├── teacher-list.tsx           (MODIFIED)
    │   ├── teacher-list-item.tsx      (NEW)
    │   ├── teacher-create-form.tsx    (MODIFIED)
    │   ├── teacher-edit-form.tsx      (MODIFIED)
    │   └── teacher-delete-button.tsx  (MODIFIED)
    ├── model/
    │   └── teacher.ts                 (UNCHANGED)
    └── storage/
        └── storage-port.ts            (UNCHANGED)
```

---

## Development Workflow (Test-First)

### Step 1: Write Tests FIRST

Before implementing any component, write tests that **fail**:

#### Example: CommonLayout Component

```bash
# Create test file FIRST
touch web-client/src/design-system/layout/__tests__/common-layout.test.tsx
```

**Test content** (write this first):
```tsx
import { render, screen } from '@testing-library/react';
import { CommonLayout } from '../common-layout';

describe('CommonLayout', () => {
  it('renders logo and application name', () => {
    render(
      <CommonLayout>
        <div>Test content</div>
      </CommonLayout>
    );
    
    expect(screen.getByText('Dasein')).toBeInTheDocument();
    // Logo presence test (depends on implementation)
  });

  it('renders children in content area', () => {
    render(
      <CommonLayout>
        <div data-testid="test-content">Test content</div>
      </CommonLayout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});
```

**Run test** (should FAIL - component doesn't exist yet):
```bash
npm test -- common-layout.test.tsx
```

### Step 2: Implement Component

Only after test fails, implement the component:

```tsx
// web-client/src/design-system/layout/common-layout.tsx
import React from 'react';
import { AppLogo } from './app-logo';

interface CommonLayoutProps {
  children: React.ReactNode;
}

export function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <AppLogo />
      </header>
      <main className="flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
```

### Step 3: Run Tests (should PASS)

```bash
npm test -- common-layout.test.tsx
```

**Expected**: ✅ All tests pass

### Step 4: Accessibility Tests

Add accessibility test:

```tsx
// web-client/src/design-system/layout/__tests__/common-layout-a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CommonLayout } from '../common-layout';

expect.extend(toHaveNoViolations);

describe('CommonLayout Accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <CommonLayout>
        <div>Content</div>
      </CommonLayout>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Run**:
```bash
npm test -- common-layout-a11y.test.tsx
```

---

## Testing Guide

### Unit Tests (Vitest + Testing Library)

**Run all unit tests**:
```bash
npm test
```

**Run specific test file**:
```bash
npm test -- teacher-list.test.tsx
```

**Run in watch mode**:
```bash
npm run test:watch
```

**Coverage report**:
```bash
npm test -- --coverage
```

### Accessibility Tests (jest-axe)

All `*-a11y.test.tsx` files run axe checks:

```bash
npm test -- a11y
```

**What to check**:
- No axe violations
- Proper ARIA labels
- Keyboard navigation
- Screen reader compatibility

### E2E Tests (Playwright)

**Run E2E tests**:
```bash
npm run e2e
```

**Run in headed mode** (see browser):
```bash
npx playwright test --headed
```

**Update tests for new UI**:

Old selector (card-based):
```tsx
await page.locator('.teacher-card').filter({ hasText: 'Alice' });
```

New selector (table-based):
```tsx
await page.locator('table tbody tr').filter({ hasText: 'Alice' });
await page.getByRole('button', { name: 'Edit Alice Johnson' });
```

### Test Coverage Requirements

- **Unit tests**: All new components
- **Accessibility tests**: All interactive components
- **E2E tests**: Update existing teacher CRUD flows

---

## Common Tasks

### Task 1: Create New Design System Component

1. Write test first: `src/design-system/components/__tests__/icon-button.test.tsx`
2. Implement component: `src/design-system/components/icon-button.tsx`
3. Add accessibility test: `icon-button-a11y.test.tsx`
4. Export from index: `src/design-system/index.ts`

### Task 2: Modify Existing Teacher Component

1. Read current component implementation
2. Update tests to reflect new behavior (should fail)
3. Modify component
4. Run tests (should pass)
5. Update E2E tests if selectors changed

### Task 3: Add Icon to Button

```tsx
import { PencilIcon } from '@heroicons/react/24/outline';

<IconButton
  icon={PencilIcon}
  label="Edit Alice Johnson"
  onClick={handleEdit}
  variant="primary"
/>
```

**Icon variants**:
- `@heroicons/react/24/outline` - Outlined icons (default)
- `@heroicons/react/24/solid` - Filled icons

### Task 4: Update Tailwind Spacing

Current (tight spacing):
```tsx
<div className="space-y-2">
  <input />
  <button />
</div>
```

New (improved spacing):
```tsx
<form className="space-y-6">          {/* 24px between sections */}
  <div className="space-y-2">         {/* 8px label-to-input */}
    <label>Name</label>
    <input />
  </div>
  <div className="flex gap-3">        {/* 12px between buttons */}
    <button>Submit</button>
    <button>Cancel</button>
  </div>
</form>
```

---

## Debugging Tips

### Issue: Component Not Rendering

**Check**:
1. Component exported from file?
2. Import path correct?
3. Props passed correctly?
4. React DevTools shows component in tree?

### Issue: Tests Failing

**Check**:
1. Did you run tests BEFORE implementing? (Should fail initially)
2. Are selectors correct? (Text content, roles, labels)
3. Is component wrapped in necessary providers? (e.g., ThemeProvider)
4. Are async operations awaited?

### Issue: Accessibility Violations

**Common fixes**:
- Add `aria-label` to icon buttons
- Add `aria-hidden="true"` to decorative icons
- Ensure form inputs have associated labels
- Check color contrast with DevTools

### Issue: Icons Not Showing

**Check**:
1. `@heroicons/react` installed?
2. Import path correct? (`@heroicons/react/24/outline`)
3. Icon component has `className` prop for sizing?
4. Vite dev server restarted after install?

---

## Code Style Guidelines

### TypeScript

- Use strict mode (already enabled)
- Define interface for all component props
- Avoid `any` type
- Use functional components (not class components)

### React

- Functional components with hooks
- Use `React.FC` or explicit function syntax
- Destructure props in function signature
- One component per file

### Tailwind CSS

- Use utility classes, avoid custom CSS
- Follow spacing scale: 2, 3, 4, 6, 8, 12, 16...
- Use semantic class names for complex patterns
- Keep className strings readable (one line per section if long)

### File Naming

- Components: `kebab-case.tsx` (e.g., `teacher-list.tsx`)
- Tests: `*.test.tsx` for unit, `*.e2e.ts` for E2E
- Accessibility tests: `*-a11y.test.tsx`

---

## Validation Checklist

Before submitting implementation:

- [ ] All new tests written BEFORE implementation
- [ ] All tests pass (`npm test`)
- [ ] No accessibility violations (`npm test -- a11y`)
- [ ] E2E tests updated and passing (`npm run e2e`)
- [ ] Code follows style guidelines
- [ ] No TypeScript errors (`npm run build`)
- [ ] Manual testing in browser completed
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader tested (VoiceOver on Mac, NVDA on Windows)

---

## Reference Documentation

### Internal Docs
- [Feature Spec](./spec.md) - Requirements and user stories
- [Implementation Plan](./plan.md) - Technical approach
- [Research](./research.md) - Technology decisions
- [Data Model](./data-model.md) - Component structure
- [Contracts](./contracts/component-interfaces.md) - Component interfaces

### External Resources
- [Heroicons](https://heroicons.com/) - Icon library
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling
- [React Testing Library](https://testing-library.com/react) - Testing
- [Playwright Docs](https://playwright.dev/) - E2E testing
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/) - Accessibility patterns

---

## Getting Help

### Quick Reference Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build

# Testing
npm test                       # Run all tests
npm run test:watch            # Watch mode
npm run e2e                   # E2E tests
npm test -- --coverage        # Coverage report

# Linting
npm run lint                  # Check for errors
npm run lint:fix              # Auto-fix errors
npm run format                # Format code
```

### Troubleshooting

1. **Clear cache**: `rm -rf node_modules/.vite && npm run dev`
2. **Reinstall deps**: `rm -rf node_modules && npm install`
3. **Check TypeScript**: `npx tsc --noEmit`
4. **Playwright debug**: `npx playwright test --debug`

---

## Next Steps

After setup:

1. Review [spec.md](./spec.md) for requirements
2. Review [contracts](./contracts/component-interfaces.md) for component interfaces
3. Start with Phase 1 Priority (P1) user story: Teacher list layout
4. Follow test-first workflow for each component
5. Validate accessibility continuously

**Ready to start coding!** 🚀
