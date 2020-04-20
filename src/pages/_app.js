/* eslint-disable react/prop-types */
import firebase from 'firebase/app';
import { ThemeProvider } from 'styled-components';

import { InnerContainer, OuterContainer } from '@/components';
import theme, { GlobalStyle } from '@/styles';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <OuterContainer>
        <InnerContainer>
          <Component {...pageProps} firebase={firebase} />
        </InnerContainer>
      </OuterContainer>
    </ThemeProvider>
  );
}

export default App;
