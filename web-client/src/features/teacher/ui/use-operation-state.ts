import { useState, useCallback } from 'react';
import { ValidationError } from '../model/teacher';

export interface OperationState {
  error: string | null;
  isLoading: boolean;
}

export interface UseOperationStateReturn {
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
  handleError: (err: unknown, defaultMessage: string) => void;
}

/**
 * Custom hook for managing common operation state (loading and error).
 *
 * Provides:
 * - Error state management
 * - Loading state management
 * - Standardized error handling for ValidationError and generic errors
 * - Reset functionality
 *
 * @returns Operation state and handlers
 */
export function useOperationState(): UseOperationStateReturn {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  const handleError = useCallback((err: unknown, defaultMessage: string) => {
    if (err instanceof ValidationError) {
      setError(err.message);
    } else {
      setError(defaultMessage);
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isLoading,
    setError,
    setIsLoading,
    reset,
    handleError,
  };
}
