import 'firebase/database';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

export const fetchSnapshot = (id) =>
  firebase.database().ref(`/v0/item/${id}`).once('value');

export const getValue = (snapshot) => snapshot.val();

export const getValues = (snapshotArr) => snapshotArr.map(getValue);
