# Teacher Management - Web Client

A local-first React application for managing teacher records, built with TypeScript, Vite, and IndexedDB for offline persistence.

## Features

- ✅ **Local-First Architecture**: Data persists in IndexedDB with in-memory fallback
- ✅ **React 19**: Modern React with latest features and performance improvements  
- ✅ **TypeScript**: Full type safety and excellent developer experience
- ✅ **Accessibility**: WCAG 2.1 AA compliant with automated testing
- ✅ **Testing**: Comprehensive unit, integration, and E2E test coverage
- ✅ **Teacher CRUD**: Complete create, read, update, and delete operations for teacher records

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd dasein-monorepo/web-client

# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

### Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Run unit and integration tests in watch mode
npm test

# Run unit tests once
npm run test:unit

# Run E2E tests (headless)
npm run e2e

# Run E2E tests in UI mode
npm run e2e:ui

# Check code quality
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Check code formatting
npm run format:check

# Auto-format code
npm run format
```

### Using the Application

1. **Add a Teacher**: Enter a teacher's full name and click "Add Teacher"
2. **View Teachers**: All teachers are displayed in alphabetical order
3. **Edit a Teacher**: Click "Edit" next to a teacher's name, modify it, and click "Save"
4. **Delete a Teacher**: Click "Delete" next to a teacher's name and confirm
5. **Persistence**: All changes are automatically saved to IndexedDB and persist across browser sessions

### Testing Guide

#### Unit & Integration Tests

Unit and integration tests use **Vitest** and **@testing-library/react** for fast, reliable testing:

```bash
# Watch mode (recommended during development)
npm test

# Single run
npm run test:unit

# With coverage
npm run test:unit -- --coverage
```

**Test Structure:**
- `src/features/teacher/**/__tests__/` - Component and service tests
- `test/teacher/unit/` - Integration tests for persistence layer

#### End-to-End Tests

E2E tests use **Playwright** to verify complete user workflows:

```bash
# Run all E2E tests (headless)
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Run specific test file
npx playwright test test/teacher/e2e/create-teacher.spec.ts

# Debug tests
npx playwright test --debug
```

**Test Coverage:**
- Create teacher flow with validation
- Edit teacher flow with persistence verification
- Delete teacher with confirmation dialog
- View list with alphabetical sorting
- Accessibility compliance (WCAG 2.1 AA)

#### Accessibility Testing

All components include automated accessibility testing using **axe-core**:

```bash
# Run accessibility-specific tests
npm test -- accessibility

# View accessibility violations in E2E tests
npm run e2e -- --grep @a11y
```

**Accessibility Features:**
- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

#### Test Reports

After running E2E tests, view detailed reports:

```bash
# Generate and open HTML report
npx playwright show-report
```

### Project Structure

```
src/
├── features/teacher/          # Teacher domain logic
│   ├── model/                 # Data models and validation
│   ├── storage/              # Storage abstractions and adapters
│   ├── services/             # Business logic and operations  
│   └── ui/                   # React components and hooks
├── lib/                      # Shared utilities
├── test/                     # Testing utilities
└── App.tsx                   # Application root
```

### Storage Architecture

The application uses a **transport-agnostic storage layer** that supports:

- **IndexedDB**: Primary storage for offline persistence
- **Memory**: Fallback for environments without IndexedDB
- **Future Extensions**: Ready for sync engines like Replicache

### Testing Strategy

- **Unit Tests**: Vitest + @testing-library/react
- **E2E Tests**: Playwright with accessibility testing
- **Accessibility**: Automated axe-core testing for WCAG 2.1 AA compliance

## Development Status

This application is being built following **test-first methodology** and **accessibility-first design**.

### Phase 1: Setup ✅ Completed
- [x] Project scaffolding with React 19 + TypeScript + Vite
- [x] Testing infrastructure (Vitest, Playwright, accessibility)
- [x] Code quality tools (ESLint, Prettier)

### Phase 2: Foundation ✅ Completed  
- [x] Storage abstraction layer with IndexedDB + memory adapters
- [x] Utility libraries (logging, UUID generation, sorting)
- [x] Accessibility testing helpers

### Phase 3: Teacher CRUD ✅ Completed
- [x] Teacher model validation and operations
- [x] React components for teacher management  
- [x] Complete user story implementation (create, edit, delete, view)
- [x] Alphabetical sorting with case-insensitive ordering
- [x] Local persistence with IndexedDB
- [x] Comprehensive test coverage (unit, integration, E2E, accessibility)

### Phase 4: Design System ✅ Completed
- [x] **Design Tokens**: Colors, spacing, typography, shadows, radii, breakpoints
- [x] **UI Components**: Button, Input, Heading, Link, Card
- [x] **Layout System**: AppLayout, Header, Footer, NavContainer, MainContainer, Grid
- [x] **Theming**: Light/dark mode with localStorage persistence
- [x] **Accessibility**: WCAG 2.1 AA compliance (123 automated tests)
- [x] **Responsive Design**: Mobile-first (768px–1920px)
- [x] **Testing**: Unit, integration, accessibility, contrast, E2E tests

See the [Design System Guide](#design-system) below for usage details.

For detailed development information, see the [quickstart guide](../../specs/001-teacher-crud/quickstart.md).

## Design System

A comprehensive design system built with Tailwind CSS v4, providing consistent UI components, design tokens, and layout primitives.

### Key Features

- 🎨 **Design Tokens**: Consistent Braun-inspired color palette, spacing scale, typography
- 🧩 **Reusable Components**: Button, Input, Heading, Link, Card with variants
- 📐 **Layout Primitives**: Responsive header, navigation, main, footer
- ♿ **WCAG 2.1 AA**: Comprehensive accessibility testing (123 tests)
- 🌓 **Theming**: Light/dark mode with auto-persistence
- 📱 **Responsive**: Desktop (1920px) → Tablet (768px) with navigation condensation
- ⚡ **Performance**: ~30KB CSS gzipped, zero runtime CSS-in-JS

### Quick Reference

```tsx
import { Button, Input, Heading, Card } from '@/design-system/components';
import { AppLayout, Grid } from '@/design-system/layout';
import { useTheme } from '@/design-system/hooks';

// Components
<Button variant="primary" size="medium">Click Me</Button>
<Input id="name" label="Name" value={name} onChange={setName} />
<Heading level={2}>Section Title</Heading>
<Card>Content here</Card>

// Layout
<AppLayout header={<Header>...</Header>} nav={<Nav>...</Nav>}>
  <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
    <Card>Item 1</Card>
    <Card>Item 2</Card>
  </Grid>
</AppLayout>

// Theming
const { theme, toggleTheme } = useTheme();
<Button onClick={toggleTheme}>Toggle Theme</Button>
```

### Design Tokens

Use via Tailwind classes or direct import:

```tsx
// Tailwind classes (preferred)
<div className="bg-primary-500 text-white p-4 rounded-md">
  Primary colored box
</div>

// Direct import (for custom logic)
import { colors, spacing } from '@/design-system/tokens';
const primaryColor = colors.primary[500]; // "#9E5E36"
```

**Available Classes**:
- **Colors**: `bg-primary-*`, `text-primary-*` (50-900), semantic colors (success, warning, error, info)
- **Spacing**: `p-*`, `m-*`, `gap-*` (0-20 scale)
- **Typography**: `text-xs` to `text-4xl`, `font-normal` to `font-bold`
- **Effects**: `shadow-sm/md/lg`, `rounded-sm/md/lg/xl`

### Accessibility Features

- ✅ **Keyboard Navigation**: Full Tab/Enter/Space support
- ✅ **Focus Indicators**: 2px visible focus rings (WCAG compliant)
- ✅ **Screen Readers**: Semantic HTML + ARIA labels
- ✅ **Color Contrast**: Automated validation (WCAG AA 4.5:1)
- ✅ **Heading Hierarchy**: Automated level checking
- ✅ **Form Labels**: All inputs properly associated

### Testing

```bash
# All design system tests (123 tests)
npm test -- test/design-system

# Accessibility tests (78 tests)
npm test -- test/design-system/a11y

# Contrast validation
npm test -- contrast-regression.test.ts

# Measure CSS bundle size
npm run build
node scripts/measure-css-size.mjs
```

### Documentation

- **Quickstart Guide**: `specs/002-layout-design-system/quickstart.md`
- **Component Reference**: `src/design-system/README.md`
- **Architecture Decisions**: `specs/002-layout-design-system/architecture.md`
- **Design Tokens Research**: `specs/002-layout-design-system/research.md`

### Component Variants

**Button**: `variant` (primary/secondary/tertiary), `size` (small/medium/large)  
**Input**: Type-safe props, error states, helper text, required field support  
**Heading**: Levels 1-6 with automatic semantic HTML (h1-h6)  
**Link**: Internal/external with automatic security attributes  
**Card**: Simple container with consistent padding and styling

### Responsive Breakpoints

```typescript
sm: 640px   // Small tablets
md: 768px   // Tablets (nav condenses here)
lg: 1024px  // Laptops  
xl: 1280px  // Desktops
2xl: 1440px // Large desktops
```

### Theme Switching

```tsx
import { useTheme } from '@/design-system/hooks';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>{theme} mode</Button>;
}
```

Preference automatically saved to localStorage.

---

For detailed development information, see the [quickstart guide](../../specs/001-teacher-crud/quickstart.md).

## Architecture Decisions

- **Local-First**: Data lives in the browser for immediate availability
- **Transport-Agnostic**: Storage layer designed for future sync capabilities
- **Test-Driven**: All features developed with comprehensive test coverage
- **Accessible**: WCAG 2.1 AA compliance built-in from the start

---

Part of the [Dasein Monorepo](../) - exploring local-first application patterns.