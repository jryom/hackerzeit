import { useRouter } from 'next/router';
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
  const {
    query: { page },
  } = useRouter();

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    page,

    ({ offset, withSWR }) => {
      const { data } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/stories?name=${page}&page=${offset || 0}`, fetch)
      );

      if (!data) return null;

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

    [page]
  );

  return (
    <>
      <Ol>{pages}</Ol>
      <InfiniteScroll
        isLoading={isLoadingMore}
        isReachingEnd={isReachingEnd}
        loadMore={loadMore}
      />
      {isLoadingMore && (
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
        >
          <LoadingIndicator my={[3, 4]} />
        </Box>
      )}
    </>
  );
};

export default Index;
