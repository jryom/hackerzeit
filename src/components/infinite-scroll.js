import { useEffect, useRef, useState } from 'react';

import { LoadButton } from '@/components';
import { getIntersectionObserver } from '@/utils';

// eslint-disable-next-line react/prop-types
export default ({ isLoading, isReachingEnd, loadMore }) => {
  const lastChildRef = useRef();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const ref = lastChildRef.current;

    if (isActive && !isReachingEnd && !isLoading) {
      getIntersectionObserver(loadMore).observe(ref);
    }

    return () => {
      getIntersectionObserver().disconnect();
    };
  }, [isActive, loadMore, isReachingEnd, isLoading]);

  return (
    <LoadButton
      ref={lastChildRef}
      loadMore={loadMore}
      onClick={() => {
        setActive(true);
        loadMore();
      }}
      visible={isActive ? false : !isLoading}
    />
  );
};
