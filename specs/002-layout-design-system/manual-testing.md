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
