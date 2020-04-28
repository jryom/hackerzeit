import 'firebase/database';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  const item = await firebase
    .database()
    .ref(`/v0/item/${id}`)
    .once('value')
    .then((snapshot) => snapshot.val());

  res.statusCode = 200;
  res.end(JSON.stringify(item));
};
