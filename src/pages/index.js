import useSWR, { useSWRPages } from 'swr';

import { InfiniteScroll, Link, Text } from '@/components';
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
        <article key={story.id}>
          <div>
            <Link href={story.url}>
              <Text as="span" size="m">
                {`${index + 1 + data.page * PAGE_LENGTH}. ${story.title}`}
              </Text>
            </Link>
          </div>
          <Text as="span" size="s">
            Score:
            {`${story.score} `}
          </Text>
          {`${story.by} `}
          <Text as="span" size="s">
            Comments:
            {` ${story.kids?.length || 0}`}
          </Text>
        </article>
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
