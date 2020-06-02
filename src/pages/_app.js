/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

import { InnerContainer, Navigation, OuterContainer } from '@/components';
import theme, { GlobalStyle } from '@/styles';

function App({ Component, pageProps }) {
  const {
    query: { page },
  } = useRouter();

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <OuterContainer>
          <Navigation />
          <InnerContainer>
            <Component key={page} page={page} {...pageProps} />
          </InnerContainer>
        </OuterContainer>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
