import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '@/types';

interface UseFetchOptions {
  retryCount?: number;
  retryDelay?: number;
  timeout?: number;
}

export function useFetch<T>(
  url: string, 
  options: UseFetchOptions = {}
): ApiResponse<T> & { retry: () => void } {
  const { retryCount = 3, retryDelay = 1000, timeout = 10000 } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (attempt: number = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      const isAbortError = err instanceof Error && err.name?.includes('AbortError');
      
      if (attempt < retryCount && !isAbortError) {
        setTimeout(() => {
          fetchData(attempt + 1);
        }, retryDelay * Math.pow(2, attempt));
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [url, retryCount, retryDelay, timeout]);

  const retry = useCallback(() => {
    fetchData(0);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry };
}
