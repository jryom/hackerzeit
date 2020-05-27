import 'firebase/database';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com/',
  });
}

const fetchSnapshot = (id) =>
  firebase.database().ref(`/v0/item/${id}`).once('value');

const getValues = (snapshotArr) =>
  snapshotArr.map((snapshot) => snapshot.val());

const recursiveFetchKids = async (
  ids,
  offset = 0,
  limit = Number.MAX_VALUE
) => {
  if (!ids) return [];

  if (ids.length && limit) {
    const kidSnapshots = await Promise.all(
      ids.slice(offset, offset + limit).map(fetchSnapshot)
    );

    return Promise.all(
      getValues(kidSnapshots)
        .map((item) => {
          if (item.deleted) return null;
          return recursiveFetchKids(item.kids).then((kids) => {
            return { ...item, kids };
          });
        })
        .filter((i) => i)
    );
  }

  return [];
};

export default async (req, res) => {
  const {
    query: { id, page },
  } = req;

  const item = await fetchSnapshot(id).then((snapshot) => snapshot.val());
  const kids = await recursiveFetchKids(item?.kids, Number(page), 1);
  const nextPage = +page < item?.kids?.length ? +page + 1 : null;

  res.statusCode = 200;
  res.end(JSON.stringify({ nextPage, kids }));
};
