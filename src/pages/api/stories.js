import 'firebase/database';

import firebase from 'firebase/app';

import { PAGE_LENGTH } from '@/constants';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

export default async (req, res) => {
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

  const totalPages = Math.ceil(ids.length / PAGE_LENGTH) - 1;
  const offset = (page || 0) * PAGE_LENGTH;

  const promiseArray = ids
    .slice(offset, offset + PAGE_LENGTH)
    .map((id) => firebase.database().ref(`/v0/item/${id}`).once('value'));

  const stories = (
    await Promise.all(promiseArray).then((snapshotArray) =>
      snapshotArray.map((dataSnapshot) => dataSnapshot.val())
    )
  ).sort((a, b) => b.score - a.score);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=300');
  res.end(
    JSON.stringify({
      page: offset / PAGE_LENGTH,
      stories,
      nextPage: totalPages > page ? Number(page) + 1 : null,
    })
  );
};
