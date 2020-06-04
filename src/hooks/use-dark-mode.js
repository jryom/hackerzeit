import { useEffect, useState } from 'react';

import { useLocalStorage } from '@/hooks';

export default () => {
  if (typeof window !== 'undefined') {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const [storedState, setStoredState] = useLocalStorage('dark-mode-enabled');
    const [prefersDarkMode, setPrefersDarkMode] = useState(media.matches);

    const conditionallySetStoredState = () => {
      if (
        typeof storedState === 'undefined' ||
        storedState === prefersDarkMode
      ) {
        return setStoredState(!prefersDarkMode);
      }
      return setStoredState(undefined);
    };

    useEffect(() => {
      const updatePrefersState = () => setPrefersDarkMode(media.matches);
      media.addListener(updatePrefersState);

      return () => media.removeListener(updatePrefersState);
    }, [media]);

    const enabled =
      typeof storedState !== 'undefined' ? storedState : prefersDarkMode;

    return [enabled, conditionallySetStoredState];
  }
  return [undefined, () => {}];
};
