import 'firebase/database';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

export default async (req, res) => {
  const pageLength = 30;
  const {
    query: { page, name },
    method,
  } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${method} Not Allowed`);
  }
  const ids = await firebase
    .database()
    .ref(`/v0/${name}`)
    .once('value')
    .then((snapshot) => snapshot.val());

  const offset = (page || 0) * pageLength;

  const promiseArray = ids
    .slice(offset, offset + pageLength)
    .map((id) => firebase.database().ref(`/v0/item/${id}`).once('value'));

  const stories = (
    await Promise.all(promiseArray).then((snapshotArray) =>
      snapshotArray.map((dataSnapshot) => dataSnapshot.val())
    )
  ).sort((a, b) => b.score - a.score);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=300');
  res.end(JSON.stringify({ page: offset / pageLength, stories }));
};
