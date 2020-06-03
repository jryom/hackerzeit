/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

import { InnerContainer, Navigation, OuterContainer } from '@/components';
import { useDarkMode, useLocalStorage } from '@/hooks';
import theme, { GlobalStyle } from '@/styles';

function App({ Component, pageProps }) {
  const {
    query: { page },
  } = useRouter();

  const [isDarkMode, setDarkMode] = useDarkMode();
  const [isSerif, setSerif] = useLocalStorage('isSerif');

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
