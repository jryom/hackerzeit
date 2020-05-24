/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';

import { InnerContainer, Navigation, OuterContainer } from '@/components';
import theme, { GlobalStyle } from '@/styles';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <OuterContainer>
        <Navigation />
        <InnerContainer>
          <Component {...pageProps} />
        </InnerContainer>
      </OuterContainer>
    </ThemeProvider>
  );
}

export default App;
