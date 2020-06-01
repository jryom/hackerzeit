// https://usehooks.com/useLocalStorage/

import { useState } from 'react';

export default (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valToStore);
      window.localStorage.setItem(key, JSON.stringify(valToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
