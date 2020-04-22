import useSWR, { useSWRPages } from 'swr';

import { InfiniteScroll, ListItem, Text } from '@/components';
import { PAGE_LENGTH } from '@/constants';
import { fetch } from '@/utils';

const Index = () => {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'best',

    ({ offset, withSWR }) => {
      const { data } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/stories?name=beststories&page=${offset || 0}`, fetch)
      );

      if (!data) {
        return <Text>Loading</Text>;
      }

      return data.stories.map((story, index) => (
        <ListItem
          key={story.id}
          data={story}
          number={index + 1 + data.page * PAGE_LENGTH}
        />
      ));
    },

    ({ data }) => data?.nextPage,

    []
  );

  return (
    <InfiniteScroll
      canLoadMore={!isReachingEnd}
      handler={loadMore}
      isLoading={isLoadingMore}
    >
      {pages}
    </InfiniteScroll>
  );
};

export default Index;
