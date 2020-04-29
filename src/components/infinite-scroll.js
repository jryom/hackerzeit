import { useEffect, useRef } from 'react';

import { getIntersectionObserver } from '@/utils';

// eslint-disable-next-line react/prop-types
export default ({ isLoading, canLoadMore, handler }) => {
  const lastChildRef = useRef();

  useEffect(() => {
    const ref = lastChildRef.current;

    if (canLoadMore && !isLoading) {
      getIntersectionObserver(handler).observe(ref);
    }

    return () => {
      getIntersectionObserver().disconnect();
    };
  }, [handler, canLoadMore, isLoading]);

  return <div ref={lastChildRef} />;
};
