# Implementation Plan: Common Layout & Generic Design System

**Branch**: `002-layout-design-system` | **Date**: 2025-11-15 | **Spec**: `specs/002-layout-design-system/spec.md`
**Input**: Specification defining layout framework, design tokens, core UI components, light/dark theme, accessibility, and tablet+desktop adaptive scope.

## Summary
Establish a reusable, accessible design system and common application layout (header, navigation, content container, footer) with defined design tokens (color, typography, spacing, radius, shadows, breakpoints), core UI components (buttons, inputs, headings, links, cards), and light/dark theme support. Retrofit existing pages to adopt the system, ensuring consistency, accessibility (WCAG 2.1 AA), and measurable improvements in development velocity and UI uniformity. Scope explicitly excludes smartphone (<768px width) optimization.

## Technical Context (Informational Only)
**Language**: TypeScript | **UI Library**: React | **Build Tool**: Vite | **Testing**: Vitest (unit), React Testing Library (components), Playwright (layout + integration), axe-core (accessibility checks), visual diff optional (future)  
**Target Viewports**: Tablet ≥768px, Desktop ≥1024px (adaptive only)  
**Styling Approach**: Tailwind CSS (utility-first) with custom theme extensions (design tokens surfaced via `tailwind.config.js`), supplemented by minimal CSS variables for runtime theme (light/dark) overrides.  
**Performance Considerations**: Minimize CSS payload, avoid unnecessary runtime style recalculation; maintain <10% page load increase.  
**Accessibility Goals**: WCAG 2.1 AA contrast, keyboard navigability, semantic landmark structure.

## Constitution / Principles Alignment
| Principle                  | Alignment | Notes                                                              |
| -------------------------- | --------- | ------------------------------------------------------------------ |
| Local-first (II)           | ✅         | Pure frontend enhancement; no backend addition                     |
| Accessibility (VI)         | ✅         | Dedicated phase for a11y audit + tokens enforce contrast           |
| Separation of Concerns (X) | ✅         | Segregate tokens, layout, components, theming layers               |
| Vendor Neutrality (VIII)   | ⚠️ Partial | Tailwind adopted for velocity; tokens remain portable & documented |
| Technology Agnostic (IX)   | ✅         | Abstract tokens usable outside React later                         |
| Test-first (V)             | ✅         | Unit + a11y tests precede component integration                    |
| Desktop Focus (Assumption) | ✅         | Explicit scope documented in spec assumptions                      |

Gate Outcome: Proceed – no conflicts with existing architectural direction.

## Project Structure Additions
```
web-client/
  src/
    design-system/
      tokens/           # central token definitions (export maps & CSS vars)
      theme/            # light/dark theme switching logic
      layout/           # layout components (Header, NavContainer, MainContainer, Footer)
      components/       # UI atoms/molecules (Button, Input, Heading, Link, Card)
      hooks/            # useTheme, usePrefersColorScheme, etc.
      accessibility/    # focus ring mgmt, skip link component
    features/
      teacher/          # existing feature retrofitted to DS components
  test/
    design-system/
      unit/             # token utilities, theming logic
      a11y/             # axe assertions for components
      integration/      # layout rendering + theme switch
```

Documentation Artifacts (Feature Directory):
```
specs/002-layout-design-system/
  plan.md          # this file
  research.md      # Phase 0 output (token sources, references, rationale)
  quickstart.md    # Phase 7 output (how to use components & tokens)
  manual-testing.md# Phase 8 output (a11y + theme + layout checklist)
  architecture.md  # Decisions (styling approach, theming strategy)
```

## Complexity Tracking
Design system introduces structural abstraction plus Tailwind dependency. Mitigation: keep initial component set minimal (5 core UI components) and avoid premature abstraction (no advanced grid/components). Tailwind config kept lean (purge/content paths tuned) to minimize CSS size. Future complexity (advanced components, mobile adaptations) deferred.

## Phases Overview
| Phase                        | Goal                                                            | Exit Criteria                                                         |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| 0 Research                   | Gather palette inspirations, spacing scale, contrast validation | `research.md` created with token rationale & references               |
| 1 Tokens Foundation          | Implement design tokens & Tailwind theme extension + CSS vars   | All tokens defined, Tailwind config updated, unit tests for scale     |
| 2 Layout Framework           | Create structural layout components + landmarks                 | Header/Main/Footer & skip link render with tests                      |
| 3 Core Components            | Implement Button, Input, Heading, Link, Card                    | Components pass a11y + unit tests for variants                        |
| 4 Theming                    | Light/dark theme switch (manual + system preference)            | Theme toggles persist (assumption: localStorage) & contrast validated |
| 5 Accessibility Enhancements | Focus styles, skip nav, semantic checks                         | Axe suite passes for all components/layout                            |
| 6 Retrofit Existing Pages    | Replace ad-hoc styles with DS components                        | Teacher feature uses DS components fully; no regressions              |
| 7 Documentation              | Quickstart + architecture decisions                             | quickstart.md + architecture.md authored & reviewed                   |
| 8 Validation & Performance   | Audit success criteria & manual checklist                       | All SC-001..SC-008 validated; manual-testing.md completed             |

## Detailed Phase Breakdown
### Phase 0: Research
- Define color palette (primary, neutral, semantic states) referencing accessibility contrast.
- Choose typography scale (modular scale: e.g., 1.25 ratio). Document font stack assumptions.
- Choose spacing progression (already spec: 4,8,16,24,32,48,64). Validate mathematical consistency.
- Identify breakpoints (tablet ≥768px, desktop ≥1024px). Justify exclusion of mobile.
- Output: `research.md` capturing decisions, alternatives, rejection reasons.

### Phase 1: Tokens Foundation
- Implement token source file exporting JS/TS maps for colors, spacing, radii, shadows.
- Extend `tailwind.config.js` theme (colors, spacing scale, font sizes, radii, boxShadow, breakpoints) to mirror tokens.
- Generate CSS variables (e.g., `--ds-color-primary`) only where runtime switching is required (theme colors); prefer Tailwind utilities for static styling.
- Unit tests: verify token keys present, spacing is ascending, contrast ratios for text colors (calculated test).
- File(s): `design-system/tokens/*`, `tailwind.config.js` update.

### Phase 2: Layout Framework
- Components: `AppLayout` (composition), `Header`, `NavBar`/`NavContainer`, `MainContainer`, `Footer`, `SkipLink`.
- Ensure semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Include max-width container (e.g., 1200px) and responsive padding adjustments at ≥1024px.
- Tests: Rendering snapshot, axe checks, skip link keyboard navigation test.

### Phase 3: Core Components
- Button: variants (primary, secondary, tertiary) using Tailwind utility composition; focus-visible rings.
- Input/Textarea: consistent label structure & error state presentation using Tailwind form utilities (extend config if needed).
- Heading: size mapping (H1–H6) enforcing typographic scale via semantic elements + Tailwind font/size classes.
- Link: base + hover/focus style; underline semantics using Tailwind `underline`, `hover:underline`, `focus-visible:outline` utilities.
- Card: container with padding, elevation (shadow token), optional header using Tailwind spacing & shadow classes.
- Tests: Each component accessibility (role, label), variant coverage, focus ring presence (Tailwind focus-visible classes).

### Phase 4: Theming
- Provide `useTheme` hook, `ThemeProvider`, and system preference detection (prefers-color-scheme).
- Persist user override (localStorage key assumption documented).
- Implement dark theme via root `class="dark"` with Tailwind dark mode configuration; supplement with CSS variables for any non-color dynamic values.
- Tests: theme toggle updates DOM class & variables; contrast compliance maintained.

### Phase 5: Accessibility Enhancements
- Global focus ring style (always visible on keyboard nav).
- Skip navigation link functioning (first tab target; jumps to main).
- Heading hierarchy test (no skipped levels in demo layout).
- Axe automated test suite for each component + layout.

### Phase 6: Retrofit Existing Pages
- Replace teacher feature UI components with DS versions (forms, buttons, list container).
- Remove duplicated styling logic in feature folders.
- Verify no behavior regression (reuse existing tests; they should remain green).
- Add visual audit (manual) for consistency.

### Phase 7: Documentation
- `quickstart.md`: How to consume tokens, import components, theme switching.
- `architecture.md`: Decisions on styling approach (CSS variables vs CSS-in-JS), theming strategy, accessibility patterns.
- Update root README to add short section linking to design system quickstart.

### Phase 8: Validation & Performance
- Manual checklist in `manual-testing.md`: Theme toggle, focus navigation, skip link, contrast, resizing between 780px and 1400px.
- Measure initial page load CSS size before/after system introduction.
- Confirm SC metrics: development velocity (proxy via component usage vs custom code lines removed).
- Final gate: all success criteria recorded with evidence.

## MVP Definition
MVP = Phases 1–3 (Tokens + Layout + Core Components) enabling immediate reuse in new screens with consistent look & feel (single light theme initially acceptable if dark theme moves to Phase 4). This delivers SC-001 (consistency) and begins velocity improvements.

## Incremental Milestones
1. M1: Research finalized (Phase 0) – decisions stable.
2. M2: Tokens foundation (Phase 1) – CSS variables live.
3. M3: Layout skeleton (Phase 2) – structural consistency available.
4. M4: Core components (Phase 3) – UI primitives ready.
5. M5: Theming (Phase 4) – light/dark support delivered.
6. M6: A11y enhancements (Phase 5) – WCAG compliance solidified.
7. M7: Retrofit (Phase 6) – existing pages consistent.
8. M8: Documentation (Phase 7) – developer onboarding improved.
9. M9: Validation (Phase 8) – success criteria verified.

## Parallelization Opportunities
| Area             | Parallelizable Items                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Tokens vs Layout | Layout components can begin once token color + spacing decisions fixed (after Phase 1 start) |
| Core Components  | Button, Input, Card can be developed concurrently (shared base variables)                    |
| Theming          | Dark theme token mapping parallel to late Phase 3 once base tokens stable                    |
| A11y             | Skip link & focus ring can start alongside component variant testing                         |
| Retrofit         | Begins after at least layout + buttons + inputs stable (Phase 2/3 complete)                  |
| Documentation    | Draft quickstart can start after Phase 3 then finalized after theming                        |

## Risks & Mitigations
| Risk                                      | Impact                  | Mitigation                                                                         |
| ----------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| Over-engineering token abstraction        | Slows delivery          | Limit tokens to spec-defined set; defer advanced categories                        |
| Tailwind build size bloat                 | Performance degradation | Configure purge/content paths; measure gzipped size vs SC-009 target               |
| Theming increases CSS size                | Performance degradation | Limit dark theme differences to color tokens; reuse spacing/typography             |
| Accessibility regressions during retrofit | User impact             | Re-run existing teacher feature a11y tests post-refactor                           |
| Inconsistent adoption                     | Fragmented UI           | Enforce lint rule or manual audit for forbidden legacy styles in retrofitted areas |

## Out of Scope / Deferrals
- Smartphone (<768px) specific layout optimizations.
- Advanced component library (modals, dropdowns, tables, tabs, tooltips).
- Dynamic user-customizable theme editor.
- Visual regression testing (possible future addition).
- Internationalization adjustments (typography unaffected; deferred).

## Acceptance Gate (Final)
All phases complete when:
- Tokens & components used across 100% of existing pages (retrofit complete).
- Axe + keyboard navigation pass for layout + components.
- Light/dark theme persists and can be toggled manually; system preference respected.
- SC-005 (page load increase <10%) measured and recorded.
- Documentation published (quickstart + architecture + manual testing checklist).
- No remaining legacy inline styles performing roles covered by design system.

## Success Criteria Mapping
| SC                                  | Plan Mapping                                                |
| ----------------------------------- | ----------------------------------------------------------- |
| SC-001 Consistent layout/components | Phases 2 + 6 audits                                         |
| SC-002 Contrast compliance          | Phases 1 (contrast tests), 5 (axe)                          |
| SC-003 Adaptive widths 768–1920px   | Phases 2 + 8 manual resize checklist                        |
| SC-004 Keyboard accessibility       | Phases 5 + 8 tests                                          |
| SC-005 Load time impact <10%        | Phase 8 performance measurement                             |
| SC-009 Tailwind CSS ≤35KB gzipped   | Phase 8 build size audit (post purge)                       |
| SC-006 Dev time ↓30%                | Phase 6 lines-of-code reduction + component adoption report |
| SC-007 Design consistency ≥90%      | Phase 8 audit sampling components usage                     |
| SC-008 Zero a11y violations         | Phase 5 axe tests + Phase 8 regression run                  |

## Testing Strategy
| Layer       | Test Type          | Focus                                                        |
| ----------- | ------------------ | ------------------------------------------------------------ |
| Tokens      | Unit               | Integrity, contrast ratios                                   |
| Layout      | Integration + axe  | Landmarks, skip link, focus order                            |
| Components  | Unit + a11y        | Variant rendering, disabled states, focus rings              |
| Theme       | Unit + integration | Variable switching, persistence, system preference detection |
| Retrofit    | Existing E2E suite | No behavioral regressions                                    |
| Final Audit | Manual + automated | Cross-phase success criteria verification                    |

## Documentation Plan
- `research.md`: Token + rationale (Phase 0).
- `architecture.md`: Styling/theming/accessibility decisions (Phase 7).
- `quickstart.md`: Import patterns, theme toggle usage (Phase 7).
- `manual-testing.md`: Checklist verifying SC outcomes (Phase 8).

## Completion Definition
Feature considered complete when Acceptance Gate items satisfied and success criteria mapping table evidenced with measurements/test outputs.

## Next Steps
Proceed to formal task breakdown (`/speckit.tasks` equivalent) enumerating granular task IDs, parallelization markings, and file path references.
