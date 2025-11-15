import { useState, useCallback } from 'react';

export interface UseFormValidationReturn {
  fullName: string;
  setFullName: (name: string) => void;
  reset: () => void;
}

/**
 * Custom hook for managing common form field state for teacher forms.
 *
 * Provides:
 * - Full name field state
 * - Field setter
 * - Form reset functionality
 *
 * @param initialValue - Initial value for the full name field
 * @returns Form field state and handlers
 */
export function useFormValidation(initialValue = ''): UseFormValidationReturn {
  const [fullName, setFullName] = useState(initialValue);

  const reset = useCallback(() => {
    setFullName(initialValue);
  }, [initialValue]);

  return {
    fullName,
    setFullName,
    reset,
  };
}
