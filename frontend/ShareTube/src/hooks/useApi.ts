import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export interface RequestOptions {
  method?: "get" | "post" | "put" | "delete";
  body?: any;
  params?: Record<string, any>;
}

export function useApi<T = any>(endpoint: string, options?: RequestOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetcher = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const method = (options?.method || "get").toLowerCase();
      const response = await (api as any)[method](endpoint, options?.body, { params: options?.params });
      setData(response.data as T);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(options)]);

  useEffect(() => { fetcher(); }, [fetcher]);

  return { data, loading, error, refetch: fetcher };
}

