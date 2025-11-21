# Manual Testing Checklist: Layout & Design System

**Feature**: 002-layout-design-system  
**Date**: 2025-11-17  
**Status**: Initial Draft

## Overview

This document provides manual testing procedures to validate the design system implementation and ensure success criteria are met.

---

## Phase 3 / User Story 1: Visual Consistency Audit

### Typography Consistency

- [ ] **H1 Headings**: Verify all H1 elements use `text-4xl font-bold` classes
- [ ] **H2 Headings**: Verify all H2 elements use `text-3xl font-bold` classes
- [ ] **Body Text**: Verify standard text uses consistent `text-text-primary` color
- [ ] **Font Family**: Verify all text uses the same font family from design tokens

### Color Usage Consistency

- [ ] **Primary Actions**: All primary buttons use `bg-primary-500` with consistent hover/focus states
- [ ] **Secondary Actions**: All secondary buttons use `bg-secondary-500` with consistent styling
- [ ] **Tertiary Actions**: All tertiary buttons use transparent background with primary border
- [ ] **Background Colors**: All cards/surfaces use `bg-surface` token
- [ ] **Text Colors**: All body text uses `text-text-primary` token
- [ ] **Error States**: Error messages consistently use `text-error-500`

### Spacing Consistency

- [ ] **Form Fields**: Consistent spacing between input fields using design tokens
- [ ] **Card Padding**: All cards use `px-6 py-4` consistent padding
- [ ] **Button Padding**: Buttons use size-appropriate padding (small/medium/large)
- [ ] **List Items**: Teacher list items have consistent spacing
- [ ] **Section Gaps**: Sections maintain consistent vertical spacing

### Interactive Element Consistency

- [ ] **Button Variants**: Primary, secondary, tertiary buttons render with correct styles
- [ ] **Button Sizes**: Small, medium, large button sizes apply correctly
- [ ] **Input Fields**: All input fields use consistent styling
- [ ] **Error Display**: Error messages appear below inputs with red text
- [ ] **Helper Text**: Helper text appears with muted color when no error

### Focus States

- [ ] **Button Focus**: All buttons show visible focus ring on keyboard focus
- [ ] **Input Focus**: All inputs show blue focus ring on focus
- [ ] **Link Focus**: All links show focus ring with offset
- [ ] **Focus Visibility**: Focus indicators meet WCAG visibility requirements

### Component Integration

- [ ] **Teacher Create Form**: Uses Button and Input components from design system
- [ ] **Teacher Edit Form**: Uses Button and Input components from design system
- [ ] **Teacher List**: Uses Card, Heading, and Button components
- [ ] **Delete Button**: Uses tertiary Button variant
- [ ] **Edit Button**: Uses secondary Button variant

### Theme Support

- [ ] **Light Theme**: Application defaults to light theme on first load
- [ ] **Dark Theme Toggle**: Theme can be switched to dark mode
- [ ] **Theme Persistence**: Theme preference persists across page reloads
- [ ] **System Preference**: Respects system color scheme preference when no stored preference
- [ ] **Dark Mode Contrast**: Text remains readable in dark mode

### Cross-Page Consistency Check

Navigate through all application pages and verify:

- [ ] **Typography**: Headings, body text use identical styles across pages
- [ ] **Colors**: Primary/secondary/tertiary colors used consistently
- [ ] **Spacing**: Margins, padding follow same scale everywhere
- [ ] **Buttons**: Button styles identical regardless of page location
- [ ] **Forms**: Input fields styled identically across all forms

### Edge Cases

- [ ] **Long Text**: Teacher names with 50+ characters don't break layout
- [ ] **Empty States**: Empty teacher list displays with consistent styling
- [ ] **Loading States**: Loading messages use consistent typography
- [ ] **Error Messages**: Error displays maintain consistent styling
- [ ] **Disabled States**: Disabled buttons/inputs show clear disabled appearance

---

## Success Criteria Validation

### SC-007: Design Consistency Score

Manual audit methodology:
1. List all instances of buttons, inputs, headings, cards across the application
2. Verify each uses design system components (not custom/inline styles)
3. Calculate: (DS component instances / Total instances) × 100

**Target**: ≥90% consistency score

**Results**: _To be completed during final audit_

---

## Evidence Collection

Record screenshots or observations for:

1. Teacher create form using design system components
2. Teacher edit form using design system components  
3. Teacher list with Card components
4. Light theme appearance
5. Dark theme appearance
6. Focus states on all interactive elements
7. Error states in forms
8. Disabled button states

---

## Testing Environment

- **Browser**: Chrome/Firefox/Safari (latest)
- **Viewport**: Desktop (1440px), Tablet (800px)
- **Theme**: Both light and dark modes

---

## Issues Found

Record any inconsistencies discovered during testing:

| Component         | Issue                                 | Severity | Status  |
| ----------------- | ------------------------------------- | -------- | ------- |
| _Example: Button_ | _Focus ring not visible in dark mode_ | _High_   | _Fixed_ |

---

## Sign-off

- [ ] All visual consistency checks passed
- [ ] Design system components used throughout teacher feature
- [ ] Theme switching works correctly
- [ ] Focus states meet accessibility requirements
- [ ] No visual regressions detected

**Tester**: _______________  
**Date**: _______________  
**Notes**: _______________

---

## Phase 4 / User Story 2: Layout Structure Verification

### Semantic Landmark Elements

- [ ] **Header Landmark**: `<header>` element present at page top
- [ ] **Navigation Landmark**: `<nav>` element with aria-label="Main navigation"
- [ ] **Main Landmark**: `<main>` element wraps main content
- [ ] **Footer Landmark**: `<footer>` element present at page bottom
- [ ] **Main ID**: Main element has id="main-content" for skip link target

### Layout Consistency Across Pages

Navigate to each page and verify identical structure:

- [ ] **Teacher List Page**: Header, Nav, Main, Footer all present
- [ ] **Teacher Create Page**: Same layout structure as list page
- [ ] **Teacher Edit Page**: Same layout structure as other pages
- [ ] **AppLayout Component**: Used consistently as page wrapper

### SkipLink Functionality

- [ ] **Visibility on Focus**: SkipLink appears when focused (Tab from top)
- [ ] **Link Text**: Reads "Skip to main content"
- [ ] **Target Accuracy**: Clicking/Enter moves focus to main content
- [ ] **Keyboard Accessible**: Can be activated with Tab + Enter/Space

### Max-Width Container

- [ ] **Content Width**: Main content container has max-width (1280px/7xl)
- [ ] **Centering**: Content centered on wide screens (> 1440px)
- [ ] **No Overflow**: No horizontal scroll at any supported width
- [ ] **Padding**: Content has consistent horizontal padding

### Layout Integration Test

- [ ] **Visual Hierarchy**: Header → Nav → Main → Footer order clear
- [ ] **Spacing Between**: Sections have consistent vertical spacing
- [ ] **Background Colors**: Header, main, footer use correct surface colors
- [ ] **Content Alignment**: All content properly aligned within containers

---

## Phase 5 / User Story 3: Responsive Behavior Testing

### Breakpoint Testing (Desktop → Tablet)

Test at each breakpoint by resizing browser:

**2xl (1440px+)**:
- [ ] Max-width container centered with generous padding
- [ ] Navigation fully expanded horizontally
- [ ] Content readable with ample whitespace

**xl (1280px)**:
- [ ] Container at max-width, content well-spaced
- [ ] Navigation still horizontal
- [ ] Grid layouts maintain multiple columns

**lg (1024px)**:
- [ ] Container width adjusts responsively
- [ ] Navigation remains horizontal
- [ ] Grid may reduce to 2 columns

**md (768px)** - Critical condensation point:
- [ ] **Navigation Condensation**: Navigation changes to condensed/mobile format
- [ ] **Container Padding**: Padding reduces appropriately
- [ ] **Grid Stacking**: Multi-column grids stack to fewer columns
- [ ] **Readable Content**: Text line length remains comfortable

**sm (640px)**:
- [ ] Single-column layouts where appropriate
- [ ] Navigation fully condensed
- [ ] Touch-friendly button sizes

### No Horizontal Scroll Test

At each breakpoint:
- [ ] **1920px**: No horizontal scroll
- [ ] **1440px**: No horizontal scroll
- [ ] **1280px**: No horizontal scroll
- [ ] **1024px**: No horizontal scroll
- [ ] **768px**: No horizontal scroll
- [ ] **640px**: No horizontal scroll

### Grid System Responsiveness

Test Card grids in teacher list:

- [ ] **Desktop (lg+)**: 3-column grid
- [ ] **Tablet (md)**: 2-column grid
- [ ] **Mobile (sm)**: 1-column stack

### Responsive Navigation Verification

- [ ] **Desktop (≥768px)**: Full horizontal navigation visible
- [ ] **Tablet (<768px)**: Navigation condensed (hamburger or compact format)
- [ ] **Keyboard Navigation**: Condensed nav accessible via keyboard (Tab, Enter)
- [ ] **Focus Management**: Focus trapped within expanded condensed nav

### Content Readability

At all breakpoints:
- [ ] **Line Length**: Text lines don't exceed ~75 characters
- [ ] **Font Sizes**: Text remains readable (no microscopic fonts)
- [ ] **Button Sizes**: Buttons large enough for touch at small sizes
- [ ] **Input Fields**: Form inputs appropriately sized

---

## Phase 6 / User Story 4: Accessibility Compliance

### Keyboard Navigation

**Navigate entire application using only keyboard**:

- [ ] **Tab Order**: Logical tab order through all interactive elements
- [ ] **SkipLink**: First Tab focuses SkipLink (visible)
- [ ] **Form Navigation**: Tab through all form fields sequentially
- [ ] **Button Activation**: Enter/Space activates all buttons
- [ ] **Link Activation**: Enter activates all links
- [ ] **No Keyboard Traps**: Can tab out of all components
- [ ] **Modal Focus**: If modals exist, focus trapped appropriately

### Focus Indicators

- [ ] **Global Focus Ring**: 2px solid outline visible on all interactive elements
- [ ] **Offset**: 2px offset from element edge for clarity
- [ ] **Color**: Primary color (#9E5E36) used for focus ring
- [ ] **Visibility**: Focus ring clearly visible against all backgrounds
- [ ] **Dark Mode**: Focus indicators visible in dark theme

### Heading Hierarchy

Validate heading structure on each page:

- [ ] **Teacher List**: h1 → h2 → h3 (no skipped levels)
- [ ] **Teacher Create**: Proper h1 at top, nested headings sequential
- [ ] **Teacher Edit**: Heading hierarchy preserved
- [ ] **No H-Tag Skipping**: Never jumps from h1 to h3, h2 to h4, etc.

### Form Labels and ARIA

- [ ] **All Inputs Labeled**: Every input has associated `<label>` with htmlFor
- [ ] **Required Fields**: aria-required or required attribute present
- [ ] **Error Messages**: aria-describedby links input to error message
- [ ] **Helper Text**: aria-describedby links input to helper text when present
- [ ] **Button Labels**: All buttons have descriptive text or aria-label

### Color Contrast Validation

**Automated**: Run contrast regression tests
- [ ] `npm test -- contrast-regression.test.ts` passes all tests

**Manual Spot-Check** (use browser DevTools or contrast checker):
- [ ] **Body Text on Background**: Primary text (#2E2E2C) on off-white (#F6F5F2) - expect >12:1
- [ ] **Primary Button**: White text on bronze (#9E5E36) - expect >4.5:1
- [ ] **Secondary Button**: White text on olive (#686E5A) - expect >4.5:1
- [ ] **Link Color**: Primary on background - expect >4.5:1
- [ ] **Error Text**: Error color on background - expect >3:1 (large text)

### Automated Accessibility Tests

Run all accessibility test suites:

```bash
npm test -- test/design-system/a11y
```

- [ ] **skip-link.test.tsx**: 13/13 passing
- [ ] **heading-hierarchy.test.tsx**: 18/18 passing
- [ ] **components-a11y.test.tsx**: 47/47 passing
- [ ] **layout-a11y.test.tsx**: All passing

### Screen Reader Testing (Optional)

Use VoiceOver (Mac), NVDA (Windows), or JAWS:

- [ ] **Page Title**: Page title announced
- [ ] **Landmarks**: Header, nav, main, footer announced with roles
- [ ] **SkipLink**: "Skip to main content" link announced and functional
- [ ] **Form Labels**: Input labels read before field
- [ ] **Button Labels**: Button purposes clear
- [ ] **Error Announcements**: Form errors announced when present

### 200% Zoom Validation (FR-020)

**WCAG Success Criterion 1.4.4** requires text to remain readable at 200% zoom without horizontal scrolling.

Test at each supported viewport width:

**Desktop (1440px)**:
- [ ] Zoom browser to 200% (Ctrl/Cmd + or browser settings)
- [ ] **No Horizontal Scroll**: Page remains usable without left-right scrolling
- [ ] **Text Readable**: All text remains legible (no truncation or overlap)
- [ ] **Layout Intact**: Buttons, inputs, cards do not break or overlap
- [ ] **Navigation Accessible**: Navigation remains functional and usable

**Tablet (800px)**:
- [ ] Zoom browser to 200%
- [ ] **No Horizontal Scroll**: Content stays within viewport width
- [ ] **Text Readable**: Line length remains comfortable
- [ ] **Interactive Elements**: Buttons/inputs remain clickable without overlap

**Testing Notes**:
- Use browser zoom (Ctrl/Cmd + or View → Zoom In), not OS-level scaling
- Test in Chrome, Firefox, and Safari for cross-browser validation
- Common issues: Fixed-width containers, absolute positioning, non-fluid layouts
- Expected behavior: Content reflows, text wraps, no overflow

**Result**: ☐ Pass (readable at 200% all viewports) ☐ Fail (horizontal scroll or broken layout)

---

## Success Criteria - Final Validation

### SC-001: Design Consistency (Target: ≥90%)

**Method**: Count design system component usage vs. total component instances

**Count**:
- [ ] Total buttons in application: ___
- [ ] Buttons using DS Button component: ___
- [ ] Total inputs in application: ___
- [ ] Inputs using DS Input component: ___
- [ ] Total headings in application: ___
- [ ] Headings using DS Heading component: ___

**Calculation**: (DS instances / Total instances) × 100 = ____%

**Result**: ☐ Pass (≥90%) ☐ Fail (<90%)

---

### SC-002: WCAG AA Contrast (Target: All combinations pass)

**Automated Tests**:
- [ ] `contrast-regression.test.ts`: All critical combinations pass
- [ ] Known limitations documented in test file

**Manual Spot-Checks**:
- [ ] Primary text on background: ☐ Pass
- [ ] Button text on primary color: ☐ Pass
- [ ] Link text on background: ☐ Pass

**Result**: ☐ Pass ☐ Fail

**Notes**: Warning color (2.68:1) intentionally limited to decorative use only.

---

### SC-003: Responsive Layout (Target: 768px–1920px, no overflow)

**Breakpoint Tests**:
- [ ] 1920px: No horizontal scroll, readable
- [ ] 1440px: No horizontal scroll, readable
- [ ] 1280px: No horizontal scroll, readable
- [ ] 1024px: No horizontal scroll, readable
- [ ] 768px: No horizontal scroll, navigation condensed, readable
- [ ] 640px: No horizontal scroll, readable

**Grid Responsiveness**:
- [ ] Cards stack appropriately at md breakpoint

**Result**: ☐ Pass (all sizes tested) ☐ Fail (overflow found)

---

### SC-004: Accessibility Compliance (Target: Zero automated violations)

**Automated Tests**:
- [ ] 123/123 accessibility tests passing
- [ ] `jest-axe` violations: 0

**Keyboard Navigation**:
- [ ] Can navigate entire app with keyboard only
- [ ] SkipLink functional
- [ ] Focus indicators visible

**Heading Hierarchy**:
- [ ] No skipped levels on any page

**Form Labels**:
- [ ] All inputs properly labeled

**Result**: ☐ Pass (zero violations) ☐ Fail (violations found)

---

### SC-005: CSS Bundle Size (Target: <50KB gzipped)

**Measurement**:
```bash
npm run build
node scripts/measure-css-size.mjs
```

**Recorded Size**:
- Raw: _____KB
- Gzipped: _____KB

**Result**: ☐ Pass (<50KB gzipped) ☐ Fail (≥50KB gzipped)

---

### SC-006: Development Time Reduction (Target: ≥30% decrease)

**Measurement Methodology**:

This metric compares development time for implementing new pages before vs. after design system availability.

**Baseline (Pre-Design System)**:
- Estimate average time to implement a typical CRUD page (list + create + edit forms)
- Include: component creation, styling, responsiveness, accessibility considerations
- Reference: Teacher feature implementation time (if tracked)
- Estimated baseline: ~4-6 hours for complete CRUD feature with styling

**Post-Design System Measurement**:
- Track time to implement next feature using design system components
- Include: page structure, component usage, feature-specific logic
- Exclude: business logic unrelated to UI (same for both measurements)
- Expected: ~2.5-4 hours for equivalent feature (30-40% reduction)

**Proxy Metrics** (if time tracking unavailable):
1. **Lines of Code Reduction**:
   - Count custom CSS lines removed from teacher feature during retrofit
   - Calculate percentage reduction in styling code
   - Target: ≥30% fewer styling-related LOC

2. **Component Reuse Evidence**:
   - [ ] **Button**: Create form, Edit form, List page, Delete actions = 4+ contexts
   - [ ] **Input**: Create form, Edit form = 2+ contexts
   - [ ] **Heading**: List page, Forms, Layout = 3+ contexts
   - [ ] **Card**: Teacher list items = reused per item
   - [ ] **Link**: Navigation, List actions = 2+ contexts
   - [ ] **AppLayout**: All pages

**Calculation**:
- If time tracked: (Baseline time - New time) / Baseline time × 100 = ____%
- If LOC proxy: Lines removed / Original styling LOC × 100 = ____%

**Recorded Evidence**:
- Pre-DS implementation time: _____ hours
- Post-DS implementation time: _____ hours
- OR custom CSS lines removed: _____ lines
- OR component reuse count: _____ components used ≥2 times

**Result**: ☐ Pass (≥30% reduction) ☐ Fail (<30% reduction)

**Notes**: Development time reduction is best measured prospectively on the next feature implementation after design system completion.

---

### SC-007: Design Consistency Score (Target: ≥90%)

**Measurement Methodology**:

Audit component usage across all pages to calculate percentage of UI elements using design system components vs. custom/ad-hoc styling.

**Component Instance Counting**:

Systematically review each page and count instances of each UI element type:

1. **Buttons** (all clickable actions):
   - Using DS Button component: _____
   - Custom/inline styled: _____
   - Total button instances: _____

2. **Text Inputs** (form fields):
   - Using DS Input component: _____
   - Custom/inline styled: _____
   - Total input instances: _____

3. **Headings** (h1-h6):
   - Using DS Heading component: _____
   - Custom/inline styled: _____
   - Total heading instances: _____

4. **Links** (navigation, actions):
   - Using DS Link component: _____
   - Custom/inline styled: _____
   - Total link instances: _____

5. **Cards** (content containers):
   - Using DS Card component: _____
   - Custom/inline styled: _____
   - Total card instances: _____

6. **Layout Structure** (page wrappers):
   - Using AppLayout: _____
   - Custom layout: _____
   - Total pages: _____

**Consistency Score Calculation**:

Formula: (Total DS component instances / Total UI instances) × 100

- Total DS instances: _____ (sum of all "Using DS" counts)
- Total UI instances: _____ (sum of all "Total" counts)
- **Consistency Score**: _____%

**Audit Checklist** (qualitative validation):
- [ ] Typography identical across all pages
- [ ] Button styles consistent everywhere
- [ ] Input fields styled identically
- [ ] Cards use same styling
- [ ] Spacing follows token scale
- [ ] Colors from token palette only

**Cross-Page Comparison**:
- [ ] Teacher List vs. Create form: Consistent
- [ ] Teacher Create vs. Edit form: Consistent
- [ ] All pages use same layout structure

**Result**: ☐ Pass (≥90% consistency) ☐ Fail (<90% consistency)

---

### SC-008: Automated Test Coverage (Target: ≥95% component coverage)

**Test Suite Results**:
```bash
npm test -- test/design-system
```

**Coverage**:
- [ ] Unit tests: All components have unit tests
- [ ] A11y tests: All components have axe tests
- [ ] Integration tests: Layout rendering tested
- [ ] E2E tests: Navigation flows tested

**Test Count**:
- Total design system tests: 123
- Passing: ___
- Failing: ___

**Result**: ☐ Pass (all tests passing) ☐ Fail (tests failing)

---

### SC-009: Build Performance (Target: Tailwind purge enabled, bundle optimized)

**Verification**:
- [ ] `tailwind.config.js` contains `content` paths for purging
- [ ] CSS bundle size measured (see SC-005)
- [ ] No unused Tailwind utilities in production build

**Result**: ☐ Pass ☐ Fail

---

## Final Audit Summary

### Overall Results

| Success Criterion | Target            | Result | Pass/Fail |
| ----------------- | ----------------- | ------ | --------- |
| SC-001            | ≥90% consistency  |        | ☐         |
| SC-002            | All pass WCAG AA  |        | ☐         |
| SC-003            | 768-1920px no ovf |        | ☐         |
| SC-004            | 0 violations      |        | ☐         |
| SC-005            | <50KB gzip        |        | ☐         |
| SC-006            | ≥5 components     |        | ☐         |
| SC-007            | 100% consistent   |        | ☐         |
| SC-008            | ≥95% coverage     |        | ☐         |
| SC-009            | Purge enabled     |        | ☐         |

### Feature Acceptance

- [ ] All success criteria passed
- [ ] No critical issues found
- [ ] Design system ready for production use

**Sign-off**:

**QA Tester**: _______________  
**Date**: _______________

**Product Owner**: _______________  
**Date**: _______________

**Notes/Exceptions**: _______________

---

## Appendix: Test Evidence

### Screenshots

Attach or link to screenshots demonstrating:

1. Teacher list page with design system components
2. Teacher create form with styled inputs and buttons
3. Teacher edit form showing consistent styling
4. Light theme appearance
5. Dark theme appearance
6. Focus states on buttons, inputs, links
7. Error state in form validation
8. Responsive layout at 768px (tablet)
9. Responsive layout at 1440px (desktop)
10. Navigation condensation at <768px

### Video Recordings

Optional video demonstrations of:

- Full keyboard navigation workflow
- Theme switching (light ↔ dark)
- Responsive behavior (resize window)
- Form interaction with validation

### Test Reports

Attach automated test output:

```bash
npm test -- test/design-system > design-system-test-results.txt
```

---

## Document History

| Date       | Version | Changes                                              |
| ---------- | ------- | ---------------------------------------------------- |
| 2025-11-17 | 1.0     | Initial manual testing checklist (Phase 3/US1)       |
| 2025-11-17 | 2.0     | Complete checklist with all phases and SC validation |
