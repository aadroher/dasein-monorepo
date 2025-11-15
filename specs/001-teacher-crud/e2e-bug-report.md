# E2E Test Failures - Bug Report

**Date**: 2025-11-14  
**Branch**: 001-teacher-crud  
**Status**: ✅ RESOLVED - All 99 E2E tests passing  
**Initial State**: 69 failed, 30 passed  
**Final State**: 99 passed (100%)

## Resolution Summary

All E2E test failures have been successfully resolved through systematic fixes:
- ✅ Fixed list display by using `getByRole()` for implicit ARIA roles  
- ✅ Added confirmation dialog handling to all delete operations
- ✅ Fixed strict mode violations with exact button name matching
- ✅ Scoped edit form selectors to specific list items
- ✅ Changed validation tests to check disabled state vs clicking
- ✅ Fixed text extraction to target `.teacher-name` elements
- ✅ Added proper waits for IndexedDB persistence

**Test Results**:  
- Unit/Integration: 100/100 passing ✅  
- E2E Tests: 99/99 passing ✅  
- Total: 199/199 passing ✅

---

## Original Bug Report

This section documents the initial failures discovered during Phase 7 validation.

## Executive Summary

The E2E test suite revealed critical implementation gaps that prevented proper end-to-end testing. While unit tests passed (100/100), the actual UI had structural issues causing strict mode violations, selector ambiguity, and testing approach problems.

**Impact**: Feature cannot be considered complete until E2E tests pass, as they validate actual user workflows.

## Root Cause Analysis

### 1. Selector Ambiguity (Strict Mode Violations)

**Problem**: Multiple elements match test selectors, causing "strict mode violation" errors.

**Affected Tests**: 40+ tests across delete and edit flows

**Root Causes**:
- Both create form AND inline edit forms render simultaneously
- Teacher names appear in button aria-labels, causing false matches
- Generic role selectors (e.g., `/edit/i`, `/delete|remove/i`) match unintended buttons

**Examples**:
```
Error: strict mode violation: getByRole('button', { name: /delete|remove/i }) 
resolved to 2 elements:
1) Edit button with aria-label="Edit Teacher To Delete"  
2) Delete button with aria-label="Delete Teacher To Delete"
```

Both buttons contain "Teacher To Delete" in their labels, and the regex matches both.

### 2. Disabled Button Testing

**Problem**: Tests attempt to click disabled submit buttons to verify validation.

**Affected Tests**: 6 tests (create validation for empty/whitespace names)

**Root Cause**: 
- Submit button has `disabled={!fullName.trim()}` logic
- Playwright refuses to click disabled buttons (correct behavior)
- Tests expect to click button first, THEN see validation message

**Current Behavior**:
```tsx
<button disabled={isCreating || !fullName.trim()}>
  Add Teacher
</button>
```

**Test Expectation**:
```ts
await page.getByRole('textbox').fill(''); // Sets to empty
await page.getByRole('button', { name: /add teacher/i }).click(); // FAILS - button is disabled
await expect(page.getByText(/required/i)).toBeVisible(); // Never reached
```

### 3. Missing List Elements

**Problem**: Teacher names not found in list; alphabetical ordering checks fail.

**Affected Tests**: 10+ tests checking list display and ordering

**Root Cause**: 
- List items may not be rendering teacher names in expected format
- Selector `.teacher-name` or list item text content doesn't include full names
- Alphabetical sorting not working correctly

**Example Error**:
```
Error: expect(received).toBeLessThan(expected)
Expected: < -1
Received:   -1
```

This indicates `findIndex()` returned -1, meaning the name wasn't found.

### 4. Empty State Message Not Matching

**Problem**: Empty state text doesn't match test regex.

**Affected Tests**: 3 tests verifying empty state after deletion

**Current Implementation**:
```tsx
<p>No teachers yet. Add your first teacher above!</p>
```

**Test Expectation**:
```ts
await expect(page.getByText(/no teachers|no teachers yet|empty/i)).toBeVisible();
```

**Issue**: The regex should match, but element may not be visible due to other issues.

## Detailed Failure Categories

### Category A: Delete Button Strict Mode (24 tests)
**Browsers**: Chromium, Firefox, WebKit  
**Tests**: All delete-teacher.spec.ts tests except confirmation dialog tests

**Fix Required**:
- Use more specific selectors scoped to list item
- Change aria-label strategy OR use exact button text matching
- Consider using `.first()` or `.nth()` with proper scoping

**Recommended Fix**:
```ts
// Instead of:
await teacherRow.getByRole('button', { name: /delete|remove/i }).click();

// Use exact match scoped to the row:
await teacherRow.getByRole('button', { name: `Delete ${teacherName}`, exact: true }).click();
```

### Category B: Edit Input Strict Mode (18 tests)
**Browsers**: Chromium, Firefox, WebKit  
**Tests**: All edit-teacher.spec.ts tests

**Fix Required**:
- Give edit form input a unique aria-label different from create form
- Scope selector to within the list item being edited
- Consider hiding/removing create form when editing

**Recommended Fix**:
```ts
// Instead of:
await page.getByRole('textbox', { name: /full name|edit.*name/i }).clear();

// Use scoped selector within the editing row:
const editRow = page.locator('li').filter({ has: page.getByRole('button', { name: /save|update/i }) });
await editRow.getByRole('textbox').clear();
```

### Category C: Disabled Button Clicks (6 tests)
**Browsers**: Chromium, Firefox, WebKit  
**Tests**: Validation error tests in create-teacher.spec.ts

**Fix Required**:
- Remove `disabled={!fullName.trim()}` logic OR
- Change test approach to NOT click button, just check for validation message
- Add inline validation that shows errors without submit

**Recommended Fix Option 1 (Change UI)**:
```tsx
// Allow clicking but show validation error
<button 
  type="submit" 
  disabled={isCreating}
  aria-label={isCreating ? 'Creating teacher...' : 'Add teacher'}
>
  {isCreating ? 'Adding...' : 'Add Teacher'}
</button>

// Let form submit handler validate:
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!fullName.trim()) {
    setError('Full name is required');
    return;
  }
  // ... rest of logic
};
```

**Recommended Fix Option 2 (Change Tests)**:
```ts
// Don't click button, just verify disabled state and add blur validation
await page.getByRole('textbox').fill('');
await page.getByRole('textbox').blur(); // Trigger validation
await expect(page.getByText(/required/i)).toBeVisible();
await expect(page.getByRole('button', { name: /add teacher/i })).toBeDisabled();
```

### Category D: List Display Issues (10 tests)
**Browsers**: Chromium, Firefox, WebKit  
**Tests**: view-list.spec.ts ordering and display tests

**Fix Required**:
- Verify teacher names are actually rendered in list items
- Check CSS display properties (might be hidden)
- Verify `.teacher-name` class is present and visible
- Debug alphabetical sorting implementation

**Debugging Steps**:
1. Check actual HTML output in failing test screenshots
2. Verify `sortTeachers()` function is being called
3. Confirm list renders with proper structure

### Category E: Semantic Structure (2 tests)
**Status**: FIXED (test updated to use `getByRole('list')`)

**Previous Issue**: Tests looked for explicit `role="list"` but `<ul>` has implicit role

## Proposed Fix Strategy

### Phase 1: Quick Wins (Low Risk)
1. ✅ Fix semantic structure test (DONE)
2. Update empty state message test to be more flexible
3. Add `.first()` to unambiguous delete button selectors

### Phase 2: Selector Improvements (Medium Risk)
4. Update delete button selectors to use exact name matching
5. Scope edit input selectors to the editing row
6. Update edit button selectors to use exact matching

### Phase 3: Architectural Changes (Higher Risk)
7. Fix disabled button validation flow (choose UI or test approach)
8. Debug and fix list display issues
9. Verify alphabetical sorting implementation
10. Consider hiding create form when editing inline

### Phase 4: Comprehensive Testing
11. Run full E2E suite after each fix category
12. Verify no regressions in unit tests
13. Manual testing of all flows

## Priority Fixes

### P0 - Critical (Blocking)
- [ ] Fix list display issues (teacher names not showing)
- [ ] Fix alphabetical sorting (findIndex returning -1)
- [ ] Fix disabled button validation approach

### P1 - High (Major functionality)
- [ ] Fix delete button selector ambiguity
- [ ] Fix edit input selector ambiguity
- [ ] Fix edit button selector ambiguity

### P2 - Medium (Polish)
- [ ] Improve empty state message consistency
- [ ] Add better scoping to all selectors
- [ ] Consider UI improvements to reduce ambiguity

## Estimated Effort

**Total Effort**: 4-6 hours
- Analysis & Planning: 1 hour (DONE)
- Selector Fixes: 2-3 hours
- Architectural Fixes: 1-2 hours
- Testing & Verification: 1 hour

## Risks

1. **Breaking Changes**: Fixing selectors may require UI changes that affect unit tests
2. **Validation Flow**: Changing disabled button logic affects UX
3. **Test Brittleness**: Over-specific selectors may break with future UI changes

## Recommendations

1. **Start with List Display**: Fix the core issue of teacher names not appearing
2. **Then Fix Selectors**: Use exact matching and proper scoping
3. **Finally Address Validation**: Decide on UX approach for form validation
4. **Add Visual Regression**: Consider screenshot comparison for future changes

## Success Criteria

- All 99 E2E tests passing across Chromium, Firefox, and WebKit
- No strict mode violations
- No timeout errors
- Manual testing confirms all user workflows work as expected

## Next Steps

1. Review and approve this plan
2. Create subtasks for each fix category
3. Implement fixes in priority order
4. Run E2E suite after each category
5. Update tasks.md with new fix tasks (Phase 6.5)
