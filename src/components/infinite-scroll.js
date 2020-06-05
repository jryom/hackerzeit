import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { LoadButton, LoadingIndicator } from '@/components';
import { Box } from '@/primitives';
import { getIntersectionObserver } from '@/utils';

const InfiniteScroll = ({ isLoadingMore, isReachingEnd, loadMore }) => {
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

  if (isReachingEnd) return null;

  return (
    <Box
      alignItems="center"
      display="flex"
      height={[2, 3]}
      justifyContent="center"
    >
      {isLoadingMore ? (
        <LoadingIndicator />
      ) : (
        <LoadButton
          ref={lastChildRef}
          loadMore={loadMore}
          onClick={() => {
            setActive(true);
            loadMore();
          }}
          visible={!isActive}
        />
      )}
    </Box>
  );
};

InfiniteScroll.propTypes = {
  isLoadingMore: PropTypes.bool.isRequired,
  isReachingEnd: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default InfiniteScroll;
