import { useEffect, useState } from 'react';

/**
 * Fetches remote content and returns it once available, but never blocks or
 * clears the caller's own fallback: until the fetch resolves — or if it ever
 * rejects — this returns `null` and the caller keeps rendering its bundled
 * default. See `contentClient.ts` for why that fallback matters here.
 */
export function useRemoteContent<T>(fetcher: () => Promise<T>, deps: readonly unknown[]): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    fetcher()
      .then(result => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        // Swallowed on purpose: absence of remote content is not an error
        // state the UI needs to show, it just means "use the fallback".
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return data;
}
