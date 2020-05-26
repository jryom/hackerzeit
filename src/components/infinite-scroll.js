import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { LoadButton } from '@/components';
import { getIntersectionObserver } from '@/utils';

// eslint-disable-next-line react/prop-types
export default ({ isLoadingMore, isReachingEnd, loadMore }) => {
  const lastChildRef = useRef();
  const [isActive, setActive] = useState(false);

  Router.events.on('routeChangeStart', () => isActive && setActive(false));

  useEffect(() => {
    const ref = lastChildRef.current;

    if (isActive && !isReachingEnd && !isLoadingMore) {
      getIntersectionObserver(loadMore).observe(ref);
    }

    return () => {
      getIntersectionObserver().disconnect();
    };
  }, [isActive, loadMore, isReachingEnd, isLoadingMore]);

  return (
    <LoadButton
      ref={lastChildRef}
      loadMore={loadMore}
      onClick={() => {
        setActive(true);
        loadMore();
      }}
      visible={isActive ? false : !isLoadingMore}
    />
  );
};
