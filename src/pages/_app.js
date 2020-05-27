/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

import { InnerContainer, Navigation, OuterContainer } from '@/components';
import theme, { GlobalStyle } from '@/styles';

function App({ Component, pageProps }) {
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
            <Component {...pageProps} />
          </InnerContainer>
        </OuterContainer>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
