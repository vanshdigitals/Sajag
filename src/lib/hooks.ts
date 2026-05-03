import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook for debouncing values.
 * 
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * A custom hook for managing loading states gracefully.
 * 
 * @param initial The initial loading state
 * @returns [isLoading, startLoading, stopLoading]
 */
export function useLoadingState(initial: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(initial);
  
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  
  return { isLoading, startLoading, stopLoading };
}
