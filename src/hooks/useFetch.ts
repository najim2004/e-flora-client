import { useState, useCallback, useRef } from "react";

interface FetchOptions extends RequestInit {
  skipBaseUrl?: boolean;
}

/**
 * <T> is required to enforce strong type safety. This hook is for manual fetch only.
 * Usage:
 *   const { data, error, loading, fetchData, refetch } = useFetch<Garden>('/api/v1', initialGardenData);
 *   fetchData('/some-url');
 */
export function useFetch<T>(initialData: T | null = null) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const lastRequest = useRef<{ url: string; options?: FetchOptions } | null>(null);

  const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

  const fetchData = useCallback(
    async (url: string, options?: FetchOptions): Promise<T> => {
      setLoading(true);
      setError(null);
      lastRequest.current = { url, options }; // Store the last request

      let fullUrl: URL;
      if (options?.skipBaseUrl) {
        fullUrl = new URL(url);
      } else {
        fullUrl = new URL(url, defaultBaseUrl);
      }

      try {
        const res = await fetch(fullUrl, {
          credentials: "include",
          ...options,
        });
        if (!res.ok) {
          const errorData = await res
            .json()
            .catch(() => ({ message: res.statusText }));
          throw new Error(errorData.message || "Request failed");
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
    },
    [defaultBaseUrl]
  );

  const refetch = useCallback(async (): Promise<T | undefined> => {
    if (lastRequest.current) {
      return fetchData(lastRequest.current.url, lastRequest.current.options);
    }
    return undefined;
  }, [fetchData]);

  return { data, error, loading, fetchData, refetch } as const;
}
