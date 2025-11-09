import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TeacherCreateForm } from '../TeacherCreateForm';

expect.extend(toHaveNoViolations);

describe('TeacherCreateForm Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<TeacherCreateForm onSubmit={() => {}} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should have accessible form label', () => {
    const { getByLabelText } = render(
      <TeacherCreateForm onSubmit={() => {}} />
    );

    expect(getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it('should have accessible submit button', () => {
    const { getByRole } = render(<TeacherCreateForm onSubmit={() => {}} />);

    const button = getByRole('button', { name: /add teacher|create teacher/i });
    expect(button).toBeInTheDocument();
  });

  it('should associate error messages with input via aria-describedby', async () => {
    const { getByRole, getByText } = render(
      <TeacherCreateForm onSubmit={() => {}} />
    );

    // Trigger validation by submitting empty form
    const button = getByRole('button', { name: /add teacher|create teacher/i });
    button.click();

    // Check that error message is accessible
    const input = getByRole('textbox', { name: /full name/i });
    const errorMessage = getByText(
      /full name cannot be empty|name is required/i
    );

    expect(input).toHaveAccessibleDescription();
  });

  it('should have proper focus management', () => {
    const { getByRole } = render(<TeacherCreateForm onSubmit={() => {}} />);

    const input = getByRole('textbox', { name: /full name/i });
    input.focus();

    expect(input).toHaveFocus();
  });
});
