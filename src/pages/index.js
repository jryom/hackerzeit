import 'firebase/database';

import firebase from 'firebase/app';
import useSWR from 'swr';

import { Link, Text } from '@/components';

const fetcher = (page) => {
  const topRef = firebase.database().ref('/v0/topstories');
  const offset = page * 30;
  console.log(offset);
  return topRef
    .startAt(offset)
    .once('value')
    .then((snapshot) => {
      const ids = snapshot.val();
      const promiseArray = ids.map((id) => firebase.database().ref(`/v0/item/${id}`).once('value'));
      return Promise.all(promiseArray);
    })
    .then((snapshotArray) => snapshotArray.map((dataSnapshot) => dataSnapshot.val()));
};

const Index = () => {
  const { data, error } = useSWR(0, fetcher);

  if (error) console.error(error);

  return (
    <>
      {data?.map((story, idx) => (
        <article key={story.id}>
          <div>
            <Link href={story.url}>
              <Text as="span" size="m">{`${idx + 1}. ${story.title}`}</Text>
            </Link>
          </div>
          <Text as="span" size="s">
            Score:
            {`${story.score} `}
          </Text>
          {`${story.by} `}
          <Text as="span" size="s">
            Comments:
            {` ${story.kids?.length || 0}`}
          </Text>
        </article>
      ))}
    </>
  );
};

export default Index;
