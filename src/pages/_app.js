/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';

import { InnerContainer, OuterContainer } from '@/components';
import theme, { GlobalStyle } from '@/styles';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <OuterContainer>
        <InnerContainer>
          <Component {...pageProps} />
        </InnerContainer>
      </OuterContainer>
    </ThemeProvider>
  );
}

export default App;
