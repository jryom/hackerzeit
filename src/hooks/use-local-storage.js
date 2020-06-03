// https://usehooks.com/useLocalStorage/

import { useState } from 'react';

export default (key, initialValue) => {
  if (typeof window !== 'undefined') {
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
        setStoredValue(value);
        if (typeof value === 'undefined') {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error(error);
      }
    };

    return [storedValue, setValue];
  }
  return [undefined, () => {}];
};
