import { useState, useCallback } from "react";

/**
 * <T> is required to enforce strong type safety. This hook is for manual fetch only.
 * Usage:
 *   const { data, error, loading, fetchData } = useFetch<Garden>();
 *   fetchData('/some-url');
 */
export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (url: string, options?: RequestInit): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        credentials: "include",
        ...options,
      });
      if (!res.ok) {
        throw new Error(res.statusText || 'Request failed');
      }
      const json = (await res.json()) as T;
      setData(json);
      return json;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData } as const;
}
