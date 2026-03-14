import { useState } from 'react';

/**
 * Like useState but persists the value in localStorage.
 * @param {string} key - localStorage key
 * @param {any} initialValue - default value if key doesn't exist
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // Silently fail on storage errors (e.g. private browsing quota)
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
