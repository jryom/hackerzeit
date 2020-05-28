import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR, { useSWRPages } from 'swr';

import {
  InfiniteScroll,
  ItemSubtitle,
  ItemTitle,
  LoadingIndicator,
} from '@/components';
import { Box, Ol } from '@/primitives';

const Li = styled(Box).attrs({ as: 'li' })`
  counter-increment: story;
  white-space: nowrap;
  width: calc(100% - 1.8em);

  &::before {
    content: counter(story) '.';
    display: inline-block;
    vertical-align: top;
    width: 1.8em;
  }
`;

const Index = () => {
  const {
    query: { page },
  } = useRouter();

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    page,

    ({ offset, withSWR }) => {
      if (!page) return null;

      const { data } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/stories?name=${page}&page=${offset || 0}`)
      );

      if (!data) return null;

      return data.stories.map((story) => {
        return (
          <Li key={story.id} mb={[3, 4]}>
            <Box
              css={`
                display: inline-block;
                white-space: initial;
              `}
            >
              <ItemTitle data={story} />
              <ItemSubtitle data={story} />
            </Box>
          </Li>
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
        isLoadingMore={isLoadingMore}
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
