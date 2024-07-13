import { useState } from "react";

export default function useSessionStorage<T>(
  key: string,
  initialValue: T
): { value: T; setValue: (value: T) => void; removeValue: () => void } {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
  };
}
