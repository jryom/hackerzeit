/* eslint-disable react/prop-types */
import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

function App({ Component, pageProps }) {
  return <Component {...pageProps} firebase={firebase} />;
}

export default App;
