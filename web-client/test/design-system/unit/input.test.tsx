import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../../../src/design-system/components/input';
import { assertA11y } from '../../../src/test/a11y/assertA11y';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input field', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with label when provided', () => {
      render(<Input label="Email Address" />);
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<Input helperText="Enter your email" />);
      expect(screen.getByText('Enter your email')).toBeInTheDocument();
    });

    it('renders error message when provided', () => {
      render(<Input error="Email is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
    });

    it('prioritizes error over helper text', () => {
      render(<Input error="Error message" helperText="Helper text" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Error message');
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies base classes', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('w-full', 'px-3', 'py-2', 'rounded-md');
    });

    it('applies normal state classes when no error', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-border');
    });

    it('applies error state classes when error exists', () => {
      render(<Input error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-error');
    });

    it('applies custom className', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Label Association', () => {
    it('associates label with input via htmlFor/id', () => {
      render(<Input label="Username" id="username-input" />);
      const label = screen.getByText('Username');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'username-input');
      expect(input).toHaveAttribute('id', 'username-input');
    });

    it('generates unique id when not provided', () => {
      render(<Input label="Auto ID" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id');
      expect(input.id).toMatch(/^input-/);
    });
  });

  describe('ARIA Attributes', () => {
    it('sets aria-invalid to true when error exists', () => {
      render(<Input error="Error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });

    it('sets aria-invalid to false when no error', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'false'
      );
    });

    it('associates error message via aria-describedby', () => {
      render(<Input error="Error message" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });

    it('associates helper text via aria-describedby when no error', () => {
      render(<Input helperText="Helper" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styles', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks with label', async () => {
      const { container } = render(<Input label="Name" />);
      await assertA11y(container);
    });

    it('passes accessibility checks with error', async () => {
      const { container } = render(
        <Input label="Email" error="Invalid email" />
      );
      await assertA11y(container);
    });

    it('passes accessibility checks with helper text', async () => {
      const { container } = render(
        <Input label="Password" helperText="8+ characters" />
      );
      await assertA11y(container);
    });

    it('passes accessibility checks when disabled', async () => {
      const { container } = render(<Input label="Disabled" disabled />);
      await assertA11y(container);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards standard input props', () => {
      render(<Input type="email" placeholder="user@example.com" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'user@example.com');
    });

    it('forwards value and onChange', () => {
      const handleChange = vi.fn();
      render(<Input value="test" onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test');
    });
  });
});
