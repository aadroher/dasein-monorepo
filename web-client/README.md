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

For detailed development information, see the [quickstart guide](../../specs/001-teacher-crud/quickstart.md).

## Architecture Decisions

- **Local-First**: Data lives in the browser for immediate availability
- **Transport-Agnostic**: Storage layer designed for future sync capabilities
- **Test-Driven**: All features developed with comprehensive test coverage
- **Accessible**: WCAG 2.1 AA compliance built-in from the start

---

Part of the [Dasein Monorepo](../) - exploring local-first application patterns.