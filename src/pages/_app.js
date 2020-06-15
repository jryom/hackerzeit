/* eslint-disable react/prop-types */
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

import {
  InnerContainer,
  LoadingBar,
  Navigation,
  OuterContainer,
} from '@/components';
import { useDarkMode, useLocalStorage } from '@/hooks';
import theme, { GlobalStyle } from '@/styles';

function App({ Component, pageProps }) {
  const {
    query: { page },
  } = useRouter();

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const [isDarkMode, setDarkMode] = useDarkMode();
  const [isSerif, setSerif] = useLocalStorage('isSerif');
  const [isNavigating, setNavigating] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setNavigating(true);
  });

  Router.events.on('routeChangeComplete', () => setNavigating(false));
  Router.events.on('routeChangeError', () => setNavigating(false));

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle isDarkMode={isDarkMode} serif={isSerif} />
        <LoadingBar isNavigating={isNavigating} />
        <OuterContainer>
          <Navigation
            isDarkMode={isDarkMode}
            isSerif={isSerif}
            setDarkMode={setDarkMode}
            setSerif={setSerif}
          />
          <InnerContainer>
            <Component key={page} page={page} {...pageProps} />
          </InnerContainer>
        </OuterContainer>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
