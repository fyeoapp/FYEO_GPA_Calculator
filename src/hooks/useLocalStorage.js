import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Get the initial value from Local Storage, or use the fallback
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return initialValue;
  });

  // 2. Whenever the value changes, automatically update Local Storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}