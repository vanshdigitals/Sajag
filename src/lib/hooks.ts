import { useState, useEffect, useCallback } from 'react';

/**
 * Debounces a value, delaying updates until after the specified delay.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
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
 * Manages a boolean loading state with stable start/stop callbacks.
 *
 * @param initial - Initial loading state (default: false)
 */
export function useLoadingState(initial: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(initial);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return { isLoading, startLoading, stopLoading };
}

/**
 * Wraps an async API call with loading and error state management.
 * Returns an `execute` function that can be called to trigger the call.
 *
 * @param fetcher - Async function that performs the API call
 */
export function useApiCall<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  return { data, isLoading, error, execute };
}

/**
 * Syncs a value to localStorage, falling back to `initialValue` when
 * the key is absent or the stored value cannot be parsed.
 *
 * @param key - localStorage key
 * @param initialValue - Fallback value
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
          // Storage quota exceeded — silently skip persistence
        }
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
