import firebase from 'firebase/app';

const Index = () => (
  <main>
    <h1>hej</h1>
  </main>
);

export async function getServerSideProps() {
  const topRef = firebase.database().ref('/v0/topstories');
  const stories = topRef.once('value').then(async (snapshot) => {
    const ids = snapshot.val();
    const promiseArray = ids.map((id) => firebase
      .database()
      .ref(`/v0/item/${id}`)
      .once('value', (snap) => snap.val()));

    return Promise.all(promiseArray).then((res) => res);
  });

  return { props: { stories } };
}

export default Index;
