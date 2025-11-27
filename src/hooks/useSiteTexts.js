import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchSiteTexts } from '../services/contentService.js';
import { defaultTexts } from '../data/contentDefaults.js';

const mapKeys = (source, keys) =>
  keys.reduce((acc, key) => {
    acc[key] = source?.[key] ?? defaultTexts[key] ?? '';
    return acc;
  }, {});

export function useSiteTexts(keys = []) {
  const keySignature = useMemo(() => JSON.stringify(keys ?? []), [keys]);
  const normalizedKeys = useMemo(() => {
    try {
      const parsed = JSON.parse(keySignature);
      return Array.isArray(parsed) ? [...new Set(parsed)] : [];
    } catch {
      return [];
    }
  }, [keySignature]);
  const [texts, setTexts] = useState(() => mapKeys(defaultTexts, normalizedKeys));
  const [isLoading, setIsLoading] = useState(Boolean(normalizedKeys.length));
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!normalizedKeys.length) return;
    setIsLoading(true);
    setError(null);

    const { data, error: loadError } = await fetchSiteTexts();
    if (loadError) {
      setError(loadError.message);
    }
    setTexts(mapKeys(data, normalizedKeys));
    setIsLoading(false);
  }, [normalizedKeys]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { texts, isLoading, error, refresh };
}

