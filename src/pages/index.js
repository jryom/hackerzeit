import useSWR, { useSWRPages } from 'swr';

import { Link, Text } from '@/components';
import { fetch } from '@/utils';

const Index = () => {
  const {
    pages, isLoadingMore, isReachingEnd, loadMore,
  } = useSWRPages(
    'top',
    ({ offset, withSWR }) => {
      const { data: stories } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(
          `/api/stories?name=beststories&page=${offset || 0}`,
          fetch,
        ),
      );
      if (!stories) {
        return <Text>Loading</Text>;
      }

      return stories.map((story, idx) => (
        <article key={story.id}>
          <div>
            <Link href={story.url}>
              <Text as="span" size="m">
                {`${idx + 1}. ${story.title}`}
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

    ({ data }) => (data?.length ? data[data.length - 1].id + 1 : null),

    [],
  );

  return <>{pages}</>;
};

export default Index;
