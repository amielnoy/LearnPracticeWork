import { useCallback, useEffect, useState } from 'react';
import {
  AdminError,
  fetchCustomers,
  fetchRecommendations,
  forgetAdminToken,
  readAdminToken,
  rememberAdminToken,
  type AdminFailure,
  type Customer,
} from '../lib/adminApi';

/** The admin screen's state: who is listed, and what has been asked about whom. */
export interface AdminCustomers {
  token: string;
  connect: (token: string) => void;
  disconnect: () => void;
  customers: Customer[];
  loading: boolean;
  error: AdminFailure | null;
  /** Recommendation text by customer id, for the ones that have been asked about. */
  recommendations: Record<string, string>;
  /** The customer currently being asked about, if any. */
  asking: string | null;
  askedFailed: Record<string, AdminFailure>;
  recommend: (customerId: string) => Promise<void>;
}

function failureOf(error: unknown): AdminFailure {
  return error instanceof AdminError ? error.reason : 'failed';
}

export function useAdminCustomers(lang: string): AdminCustomers {
  const [token, setToken] = useState(() => readAdminToken());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AdminFailure | null>(null);
  const [recommendations, setRecommendations] = useState<Record<string, string>>({});
  const [askedFailed, setAskedFailed] = useState<Record<string, AdminFailure>>({});
  const [asking, setAsking] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setCustomers([]);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    fetchCustomers(token)
      .then(list => {
        if (active) setCustomers(list);
      })
      .catch((e: unknown) => {
        if (active) setError(failureOf(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token]);

  const connect = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    rememberAdminToken(trimmed);
    setToken(trimmed);
  }, []);

  const disconnect = useCallback(() => {
    forgetAdminToken();
    setToken('');
    setRecommendations({});
    setAskedFailed({});
    setError(null);
  }, []);

  const recommend = useCallback(
    async (customerId: string) => {
      if (!token) return;
      setAsking(customerId);
      setAskedFailed(previous => {
        const { [customerId]: _dropped, ...rest } = previous;
        return rest;
      });
      try {
        const result = await fetchRecommendations(token, customerId, lang);
        setRecommendations(previous => ({ ...previous, [customerId]: result.text }));
      } catch (e: unknown) {
        setAskedFailed(previous => ({ ...previous, [customerId]: failureOf(e) }));
      } finally {
        setAsking(null);
      }
    },
    [token, lang],
  );

  return {
    token,
    connect,
    disconnect,
    customers,
    loading,
    error,
    recommendations,
    asking,
    askedFailed,
    recommend,
  };
}
