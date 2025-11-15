# Tasks: Common Layout & Generic Design System

**Input**: Design documents from `/specs/002-layout-design-system/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)
**Optional Docs (not present yet)**: research.md, quickstart.md, manual-testing.md, architecture.md (will be created in Polish phase)

## Format
`- [ ] T### [P?] [US#?] Description with file path`
1. Checkbox always present.
2. Task IDs sequential (T001+).
3. `[P]` only if task can run in parallel (different files, no unmet dependency).
4. `[US#]` only for user story phases (not Setup, Foundational, Polish).
5. Every task ends with explicit file path (existing or to create).

---
## Phase 1: Setup (Project & Tooling)
**Purpose**: Establish directory skeleton and styling tooling required before token & component implementation.

- [ ] T001 Create initial research scaffold file specs/002-layout-design-system/research.md
- [ ] T002 Create design-system directory structure web-client/src/design-system/{tokens,theme,layout,components,hooks,accessibility}
- [ ] T003 Install Tailwind CSS dependencies (tailwindcss, postcss, autoprefixer) in web-client/package.json
- [ ] T004 [P] Add Tailwind config file web-client/tailwind.config.js
- [ ] T005 [P] Add PostCSS config file web-client/postcss.config.js
- [ ] T006 [P] Create base CSS entry with Tailwind directives web-client/src/index.css
- [ ] T007 Integrate CSS import into index.html (link) or main entry web-client/index.html

---
## Phase 2: Foundational (Design Tokens & Theme Infrastructure)
**Purpose**: Provide token layer & Tailwind theme so all user stories can rely on consistent primitives. BLOCKS all user stories.
**Exit Criteria**: Tokens exported, Tailwind theme extended, unit & contrast tests pass.

- [ ] T008 [P] Create color tokens map web-client/src/design-system/tokens/colors.ts
- [ ] T009 [P] Create spacing tokens map web-client/src/design-system/tokens/spacing.ts
- [ ] T010 [P] Create typography scale tokens web-client/src/design-system/tokens/typography.ts
- [ ] T011 [P] Create radii tokens map web-client/src/design-system/tokens/radii.ts
- [ ] T012 [P] Create shadows tokens map web-client/src/design-system/tokens/shadows.ts
- [ ] T013 [P] Create breakpoints tokens map web-client/src/design-system/tokens/breakpoints.ts
- [ ] T014 Aggregate token exports index web-client/src/design-system/tokens/index.ts
- [ ] T015 Extend Tailwind theme with tokens web-client/tailwind.config.js
- [ ] T016 Define theme CSS variables (light base) web-client/src/design-system/theme/variables.css
- [ ] T017 Create dark theme override variables web-client/src/design-system/theme/dark.css
- [ ] T018 Unit tests: token integrity web-client/test/design-system/unit/tokens-integrity.test.ts
- [ ] T019 Unit tests: contrast ratio validation web-client/test/design-system/unit/tokens-contrast.test.ts

---
## Phase 3: User Story 1 - Visual Consistency Across All Pages (Priority: P1) 🎯 MVP
**Goal**: Deliver consistent typography, colors, spacing & core UI components so all pages share unified appearance.
**Independent Test**: Navigate existing pages (teacher feature) and verify identical styling for headings, body text, buttons, inputs, links, cards + spacing scale adherence.

### Implementation & Tests (US1)
- [ ] T020 [P] [US1] Implement Button component (variants) web-client/src/design-system/components/button.tsx
- [ ] T021 [P] [US1] Implement Input component web-client/src/design-system/components/input.tsx
- [ ] T022 [P] [US1] Implement Heading component web-client/src/design-system/components/heading.tsx
- [ ] T023 [P] [US1] Implement Link component web-client/src/design-system/components/link.tsx
- [ ] T024 [P] [US1] Implement Card component web-client/src/design-system/components/card.tsx
- [ ] T025 [US1] Create components barrel export web-client/src/design-system/components/index.ts
- [ ] T026 [P] [US1] Unit/a11y test Button web-client/test/design-system/unit/button.test.tsx
- [ ] T027 [P] [US1] Unit/a11y test Input web-client/test/design-system/unit/input.test.tsx
- [ ] T028 [P] [US1] Unit/a11y test Heading web-client/test/design-system/unit/heading.test.tsx
- [ ] T029 [P] [US1] Unit/a11y test Link web-client/test/design-system/unit/link.test.tsx
- [ ] T030 [P] [US1] Unit/a11y test Card web-client/test/design-system/unit/card.test.tsx
- [ ] T031 [US1] Implement theming hook useTheme web-client/src/design-system/hooks/useTheme.ts
- [ ] T032 [US1] Implement ThemeProvider web-client/src/design-system/theme/ThemeProvider.tsx
- [ ] T033 [P] [US1] Implement dark theme token overrides module web-client/src/design-system/theme/dark.ts
- [ ] T034 [P] [US1] Add theme persistence utility (localStorage) web-client/src/design-system/theme/persist.ts
- [ ] T035 [US1] Integrate ThemeProvider at root web-client/src/App.tsx
- [ ] T036 [P] [US1] Retrofit teacher create form to use Button/Input web-client/src/features/teacher/ui/teacher-create-form.tsx
- [ ] T037 [P] [US1] Retrofit teacher edit form to use Button/Input web-client/src/features/teacher/ui/teacher-edit-form.tsx
- [ ] T038 [US1] Retrofit teacher list to use Card/Heading/Link web-client/src/features/teacher/ui/teacher-list.tsx
- [ ] T039 [US1] Visual consistency audit checklist section (initial draft) specs/002-layout-design-system/manual-testing.md

**Checkpoint**: All pages render with unified component set & consistent tokens (visual audit passes).

---
## Phase 4: User Story 2 - Common Page Layout Structure (Priority: P2)
**Goal**: Establish predictable structural layout (Header, Nav, Main, Footer, SkipLink) across pages for navigation familiarity.
**Independent Test**: Switch between pages verifying identical placement & presence of layout landmarks and max-width container.

### Implementation & Tests (US2)
- [ ] T040 [P] [US2] Implement Header component web-client/src/design-system/layout/header.tsx
- [ ] T041 [P] [US2] Implement NavContainer component web-client/src/design-system/layout/nav-container.tsx
- [ ] T042 [P] [US2] Implement MainContainer component web-client/src/design-system/layout/main-container.tsx
- [ ] T043 [P] [US2] Implement Footer component web-client/src/design-system/layout/footer.tsx
- [ ] T044 [US2] Implement AppLayout composition web-client/src/design-system/layout/app-layout.tsx
- [ ] T045 [P] [US2] Implement SkipLink component web-client/src/design-system/accessibility/skip-link.tsx
- [ ] T046 [US2] Integration test layout rendering web-client/test/design-system/integration/layout-render.test.tsx
- [ ] T047 [P] [US2] Axe test for layout landmarks web-client/test/design-system/a11y/layout-a11y.test.tsx
- [ ] T048 [US2] Integrate AppLayout at application root web-client/src/App.tsx

**Checkpoint**: Layout landmarks & structure consistent across all pages.

---
## Phase 5: User Story 3 - Adaptive Layout for Desktop and Tablet (Priority: P3)
**Goal**: Ensure responsive behavior (768px–1920px) with readable widths & adaptive navigation.
**Independent Test**: Resize from 1440px → 780px confirming container width adjustments, grid stacking, nav condensation (keyboard accessible).

### Implementation & Tests (US3)
- [ ] T049 [US3] Add responsive breakpoint classes to MainContainer web-client/src/design-system/layout/main-container.tsx
- [ ] T050 [P] [US3] Implement grid system utilities web-client/src/design-system/layout/grid.tsx
- [ ] T051 [P] [US3] Implement responsive navigation condensation component web-client/src/design-system/layout/nav-responsive.tsx
- [ ] T052 [US3] Integration test resizing behavior web-client/test/design-system/integration/responsive-layout.test.tsx
- [ ] T053 [P] [US3] E2E test navigation condensation at tablet width web-client/test/design-system/integration/nav-condense.test.tsx

**Checkpoint**: Layout adapts across breakpoints with no horizontal scroll and nav remains accessible.

---
## Phase 6: User Story 4 - Accessibility Standards Compliance (Priority: P3)
**Goal**: Achieve WCAG 2.1 AA (focus indicators, semantic structure, labels, contrast, keyboard navigation).
**Independent Test**: Keyboard-only navigation & automated axe runs show zero violations; contrast tests all pass.

### Implementation & Tests (US4)
- [ ] T054 [P] [US4] Implement global focus ring CSS web-client/src/design-system/accessibility/focus-ring.css
- [ ] T055 [P] [US4] Keyboard navigation test for SkipLink web-client/test/design-system/a11y/skip-link.test.tsx
- [ ] T056 [P] [US4] Heading hierarchy audit test web-client/test/design-system/a11y/heading-hierarchy.test.tsx
- [ ] T057 [US4] Ensure labeled form inputs (associate labels) web-client/src/features/teacher/ui/teacher-create-form.tsx
- [ ] T058 [US4] Global axe sweep for components web-client/test/design-system/a11y/components-a11y.test.tsx
- [ ] T059 [P] [US4] Contrast regression test using tokens web-client/test/design-system/unit/contrast-regression.test.ts

**Checkpoint**: Zero accessibility violations & all contrast + keyboard tests pass.

---
## Phase 7: Polish & Cross-Cutting Concerns
**Purpose**: Documentation, performance validation, cleanup, final audits.

- [ ] T060 [P] Create architecture decisions document specs/002-layout-design-system/architecture.md
- [ ] T061 [P] Create developer quickstart guide specs/002-layout-design-system/quickstart.md
- [ ] T062 Create success criteria & manual test checklist specs/002-layout-design-system/manual-testing.md
- [ ] T063 [P] Add CSS size measurement script web-client/scripts/measure-css-size.mjs
- [ ] T064 Refactor/remove legacy inline styles teacher feature web-client/src/features/teacher/ui/*.tsx
- [ ] T065 [P] Update web-client README with design system section web-client/README.md
- [ ] T066 Final evidence capture & audit recording specs/002-layout-design-system/manual-testing.md
- [ ] T067 [P] Create design system barrel index web-client/src/design-system/index.ts
- [ ] T068 [P] Update research decisions with security review specs/002-layout-design-system/research.md

---
## Dependencies & Execution Order
### Phase Dependencies
- Setup (Phase 1) → Foundational (Phase 2) → User Stories (Phases 3–6) → Polish (Phase 7)
- Foundational must complete before any User Story tasks begin.

### User Story Dependencies
- US1 (P1) depends only on Foundational; prerequisite for consistent component retrofitting.
- US2 (P2) can start after Foundational; independent from US1 but integrates components for layout.
- US3 (P3) can start after US2 MainContainer exists; grid utilities parallel to nav-responsive.
- US4 (P3) can start after US1 (components) + US2 (landmarks) to test accessibility fully; parallel to US3.

### Within Story Ordering
1. Tests (if present) may start in parallel once target files stubbed.
2. Component/layout implementation before retrofitting existing feature.
3. Theming after tokens but within US1 to keep MVP consistent.

---
## Parallel Execution Examples
### US1 Parallel Batch
`Button.tsx`, `Input.tsx`, `Heading.tsx`, `Link.tsx`, `Card.tsx` developed concurrently (T020–T024) while tests (T026–T030) stubbed.

### US2 Parallel Batch
Layout primitives (Header, NavContainer, MainContainer, Footer, SkipLink) T040–T045 in parallel; tests T046–T047 run after initial render.

### US3 Parallel Batch
Grid system (T050) and nav-responsive (T051) in parallel; tests (T052–T053) after components implemented.

### US4 Parallel Batch
Focus ring CSS (T054), skip link & heading tests (T055–T056), contrast regression (T059) all in parallel; axe sweep (T058) after components stable.

---
## Implementation Strategy
1. MVP = Phases 1–3 (tokens + core components + visual consistency) deliver immediate uniform UI.
2. Incrementally add layout (US2), responsiveness (US3), accessibility (US4).
3. Polish phase documents decisions and validates success criteria.
4. Strict independence: Each user story yields testable increment (visual consistency, layout, responsiveness, accessibility).

---
## MVP Scope Recommendation
Deliver through T039 (end of US1) to unlock consistent component usage for new features; defer layout & responsive/accessibility refinements to subsequent increments.

---
## Format Validation
All tasks follow: `- [ ] T### [P?] [US#?] Description file path` with explicit paths & correct labeling conventions.

---
## Task Counts
- Total Tasks: 68
- Setup: 7
- Foundational: 12
- US1: 20
- US2: 9
- US3: 5
- US4: 6
- Polish: 9

## Parallel Opportunities Summary
- High parallelism in tokens (T008–T013), components (T020–T024, T026–T030), layout primitives (T040–T045), responsiveness (T050–T051), accessibility enhancements (T054–T056, T059), docs & polish tasks (T060–T068).

## Independent Test Criteria Per Story
- US1: Visual audit across pages (styles match spec for typography, colors, spacing, components).
- US2: Structural landmark consistency (Header/Nav/Main/Footer identical placement) & axe pass.
- US3: Responsive resizing from 1440px→780px without overflow; navigation condensation accessible.
- US4: Zero axe violations, focus ring visible, labels programmatic association, contrast thresholds satisfied.

---
## Success Criteria Mapping Reference (For Audit)
- SC-001 ↔ T036–T038, T039, T048
- SC-002 ↔ T019, T059
- SC-003 ↔ T049–T053
- SC-004 ↔ T054–T055–T056–T058
- SC-005 ↔ T063 (measurement) + baseline comparison
- SC-006 ↔ Component reuse evidence (audit in T066)
- SC-007 ↔ Visual consistency audit T039 & T066
- SC-008 ↔ Axe tests T026–T030, T046–T047, T052–T053, T055–T056, T058
- SC-009 ↔ Tailwind purge config T015 + measurement T063

---
## Notes
- Tasks marked [P] are safe for concurrent execution.
- User story phases can proceed once Foundational complete; US3 & US4 parallel after US2 landmarks & US1 components.
- All paths absolute relative to repository root context.
