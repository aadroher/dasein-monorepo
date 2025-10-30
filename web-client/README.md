# Teacher Management - Web Client

A local-first React application for managing teacher records, built with TypeScript, Vite, and IndexedDB for offline persistence.

## Features

- ✅ **Local-First Architecture**: Data persists in IndexedDB with in-memory fallback
- ✅ **React 19**: Modern React with latest features and performance improvements  
- ✅ **TypeScript**: Full type safety and excellent developer experience
- ✅ **Accessibility**: WCAG 2.1 AA compliant with automated testing
- ✅ **Testing**: Comprehensive unit, integration, and E2E test coverage
- 🚧 **Teacher CRUD**: Create, read, update, and delete teacher records (in development)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run e2e

# Check code quality
npm run lint
npm run format:check
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

### Phase 3: Teacher CRUD 🚧 In Progress
- [ ] Teacher model validation and operations
- [ ] React components for teacher management
- [ ] Complete user story implementation

For detailed development information, see the [quickstart guide](../../specs/001-teacher-crud/quickstart.md).

## Architecture Decisions

- **Local-First**: Data lives in the browser for immediate availability
- **Transport-Agnostic**: Storage layer designed for future sync capabilities
- **Test-Driven**: All features developed with comprehensive test coverage
- **Accessible**: WCAG 2.1 AA compliance built-in from the start

---

Part of the [Dasein Monorepo](../) - exploring local-first application patterns.