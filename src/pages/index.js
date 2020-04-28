import useSWR, { useSWRPages } from 'swr';

import {
  InfiniteScroll,
  ItemSubtitle,
  ItemTitle,
  LoadingIndicator,
} from '@/components';
import { Box, Ol } from '@/primitives';
import { fetch } from '@/utils';

const Index = () => {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'best',

    ({ offset, withSWR }) => {
      const { data } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/stories?name=beststories&page=${offset || 0}`, fetch)
      );

      if (!data)
        return (
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
          >
            <LoadingIndicator my={[3, 4]} />
          </Box>
        );

      return data.stories.map((story) => {
        return (
          <Box key={story.id} as="li" mb={[3, 4]} pl={[1, 2]}>
            <ItemTitle data={story} />
            <ItemSubtitle data={story} />
          </Box>
        );
      });
    },

    ({ data }) => data?.nextPage,

    []
  );

  return (
    <Ol>
      <InfiniteScroll
        canLoadMore={!isReachingEnd}
        handler={loadMore}
        isLoading={isLoadingMore}
      >
        {pages}
      </InfiniteScroll>
    </Ol>
  );
};

export default Index;
