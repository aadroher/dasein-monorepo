# Manual Testing Checklist: Teacher CRUD

**Feature**: Teacher CRUD Operations  
**Test Date**: _____________  
**Tester**: _____________  
**Browser**: _____________  
**OS**: _____________

## Test Environment Setup

- [ ] Navigate to `web-client/` directory
- [ ] Run `npm install` (if not already done)
- [ ] Run `npm run dev`
- [ ] Open browser to `http://localhost:5173` (or displayed URL)
- [ ] Open browser DevTools Console (check for errors)

## User Story 1: Create Teacher

### US1.1: Valid Teacher Creation
- [ ] Enter valid teacher name (e.g., "John Smith")
- [ ] Click "Add Teacher" button
- [ ] **Verify**: Name appears in the teacher list
- [ ] **Verify**: Form is cleared after submission
- [ ] **Verify**: No error messages displayed

### US1.2: Validation - Empty Name
- [ ] Leave name field empty
- [ ] Click "Add Teacher" button
- [ ] **Verify**: Error message displayed (validation error)
- [ ] **Verify**: Teacher is NOT added to list

### US1.3: Validation - Whitespace Only
- [ ] Enter only spaces in name field (e.g., "   ")
- [ ] Click "Add Teacher" button
- [ ] **Verify**: Error message displayed
- [ ] **Verify**: Teacher is NOT added to list

### US1.4: Long Name Handling
- [ ] Enter a name with 100+ characters
- [ ] Click "Add Teacher" button
- [ ] **Verify**: Teacher is added successfully
- [ ] **Verify**: Name displays properly (may be truncated in UI)

### US1.5: Special Characters
- [ ] Enter name with special characters (e.g., "María José O'Brien-Smith")
- [ ] Click "Add Teacher" button
- [ ] **Verify**: Teacher is added with correct name
- [ ] **Verify**: Special characters display correctly

### US1.6: Persistence Test
- [ ] Add a new teacher
- [ ] Refresh the browser page
- [ ] **Verify**: Teacher still appears in the list
- [ ] **Verify**: All previously added teachers remain

## User Story 2: Edit Teacher

### US2.1: Edit Teacher Name
- [ ] Click "Edit" button next to an existing teacher
- [ ] **Verify**: Edit form appears with current name pre-filled
- [ ] Change the name (e.g., "John Smith" → "Jane Smith")
- [ ] Click "Save" button
- [ ] **Verify**: Name updates in the list
- [ ] **Verify**: Edit form closes/hides

### US2.2: Cancel Edit
- [ ] Click "Edit" button next to a teacher
- [ ] Modify the name
- [ ] Click "Cancel" button
- [ ] **Verify**: Name remains unchanged in the list
- [ ] **Verify**: Edit form closes/hides

### US2.3: Edit Validation - Empty Name
- [ ] Click "Edit" on a teacher
- [ ] Clear the name field completely
- [ ] Click "Save"
- [ ] **Verify**: Error message displayed
- [ ] **Verify**: Name is NOT updated

### US2.4: Edit Persistence
- [ ] Edit a teacher's name
- [ ] Refresh the browser page
- [ ] **Verify**: Updated name persists after reload

## User Story 3: Delete Teacher

### US3.1: Delete Teacher
- [ ] Click "Delete" button next to a teacher
- [ ] **Verify**: Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] **Verify**: Teacher is removed from the list

### US3.2: Cancel Delete
- [ ] Click "Delete" button next to a teacher
- [ ] **Verify**: Confirmation dialog appears
- [ ] Click "Cancel"
- [ ] **Verify**: Teacher remains in the list

### US3.3: Delete Persistence
- [ ] Delete a teacher
- [ ] Refresh the browser page
- [ ] **Verify**: Deleted teacher does NOT reappear

### US3.4: Delete All Teachers
- [ ] Delete all teachers one by one
- [ ] **Verify**: Empty state message appears (if implemented)
- [ ] **Verify**: No errors in console

## User Story 4: View Teachers List

### US4.1: Alphabetical Ordering
- [ ] Add multiple teachers with names in random order:
  - [ ] "Zoe Anderson"
  - [ ] "Alice Brown"
  - [ ] "Maria Garcia"
  - [ ] "Bob Chen"
- [ ] **Verify**: Teachers appear in alphabetical order:
  - Alice Brown
  - Bob Chen
  - Maria Garcia
  - Zoe Anderson

### US4.2: Case-Insensitive Sorting
- [ ] Add teachers with mixed case:
  - [ ] "alice baker"
  - [ ] "XAVIER JONES"
  - [ ] "Maria Lopez"
- [ ] **Verify**: All names sorted alphabetically regardless of case

### US4.3: Empty List State
- [ ] Delete all teachers
- [ ] **Verify**: Appropriate empty state message or UI
- [ ] **Verify**: No error messages

### US4.4: Large List Performance
- [ ] Add 20+ teachers (can be similar names)
- [ ] **Verify**: List renders within 3 seconds
- [ ] **Verify**: Scrolling is smooth
- [ ] **Verify**: All CRUD operations remain responsive

## Accessibility Testing

### A11y.1: Keyboard Navigation
- [ ] Use Tab key to navigate through all interactive elements
- [ ] **Verify**: Focus indicator visible on all elements
- [ ] **Verify**: Can submit form with Enter key
- [ ] **Verify**: Can activate buttons with Space/Enter

### A11y.2: Screen Reader (Optional)
- [ ] Enable screen reader (VoiceOver, NVDA, or JAWS)
- [ ] Navigate through the teacher list
- [ ] **Verify**: Each teacher name is announced
- [ ] **Verify**: Buttons have descriptive labels
- [ ] **Verify**: Form fields have labels

### A11y.3: Form Labels
- [ ] **Verify**: All form inputs have visible labels
- [ ] **Verify**: Error messages are associated with inputs
- [ ] **Verify**: Required fields are indicated

## Cross-Browser Testing

### Browser: Chrome
- [ ] Run all user stories (US1-US4)
- [ ] **Notes**: _______________________________

### Browser: Firefox
- [ ] Run all user stories (US1-US4)
- [ ] **Notes**: _______________________________

### Browser: Safari (macOS)
- [ ] Run all user stories (US1-US4)
- [ ] **Notes**: _______________________________

### Browser: Edge
- [ ] Run all user stories (US1-US4)
- [ ] **Notes**: _______________________________

## Responsive Design (Optional)

### Mobile View (< 768px)
- [ ] Resize browser to mobile width
- [ ] **Verify**: Layout adapts appropriately
- [ ] **Verify**: All buttons remain clickable
- [ ] **Verify**: Form is usable

### Tablet View (768px - 1024px)
- [ ] Resize browser to tablet width
- [ ] **Verify**: Layout looks good
- [ ] **Verify**: All functionality works

## Error Handling

### Network Simulation (Advanced)
- [ ] Open DevTools → Network tab
- [ ] Throttle to "Offline" mode
- [ ] Attempt CRUD operations
- [ ] **Verify**: Operations still work (local-first)
- [ ] **Verify**: No network-related errors

### Storage Failure (Advanced)
- [ ] Open DevTools → Application → Storage
- [ ] Clear IndexedDB data
- [ ] Refresh page
- [ ] **Verify**: App initializes (may use in-memory fallback)
- [ ] Add a teacher
- [ ] **Verify**: Teacher appears in list

## Known Issues / Notes

_Record any bugs, unexpected behavior, or observations here:_

---

## Test Summary

**Total Test Cases**: _____  
**Passed**: _____  
**Failed**: _____  
**Blocked/Skipped**: _____

**Overall Result**: ☐ PASS  ☐ FAIL  

**Tester Signature**: ________________________  
**Date**: ________________________
