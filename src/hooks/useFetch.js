import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../data/apiClient';

/**
 * Generic data-fetching hook with loading, error, and refetch support.
 * @param {string} path - API path e.g. '/api/challenges'
 * @param {any} [fallback=[]] - Value returned while loading or on error
 */
const useFetch = (path, fallback = []) => {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!path) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_BASE_URL + path);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      setData(fallback);
    } finally {
      setLoading(false);
    }
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
