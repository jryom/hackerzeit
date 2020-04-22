import { useEffect, useRef } from 'react';

import { getIntersectionObserver } from '@/utils';

// eslint-disable-next-line react/prop-types
export default ({ children, isLoading, canLoadMore, handler }) => {
  const lastChildRef = useRef();
  useEffect(() => {
    if (!isLoading && canLoadMore && lastChildRef.current) {
      getIntersectionObserver(handler).observe(lastChildRef.current);
    }
  }, [children, canLoadMore, handler, isLoading]);

  return (
    <>
      {children}
      <div ref={lastChildRef} />
    </>
  );
};
