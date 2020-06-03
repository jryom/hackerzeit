import { useEffect, useState } from 'react';

export default () => {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount;
};
