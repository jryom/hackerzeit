import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR, { useSWRPages } from 'swr';

import {
  InfiniteScroll,
  ItemSubtitle,
  ItemTitle,
  LoadingIndicator,
} from '@/components';
import { PAGES } from '@/constants';
import { Box, Ol } from '@/primitives';

const Li = styled(Box).attrs({ as: 'li' })`
  counter-increment: story;
  white-space: nowrap;
  width: calc(100% - 1.8em);

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    &::before {
      content: counter(story) '.';
      display: inline-block;
      line-height: 1.78;
      vertical-align: top;
      width: 1.8em;
    }
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
          <Li key={story.id} mb={[3, 4]} pt={[1, 2]}>
            <Box
              css={`
                display: inline-block;
                white-space: initial;
              `}
              lineHeight={[1, 2]}
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
      <Head>
        <title>
          {`Hacker Zeit${page ? `: ${PAGES[page.toUpperCase()]}` : ''}`}
        </title>
      </Head>

      <Ol>{pages}</Ol>

      {isLoadingMore && <LoadingIndicator />}

      <InfiniteScroll
        isLoadingMore={isLoadingMore}
        isReachingEnd={isReachingEnd}
        loadMore={loadMore}
      />
    </>
  );
};

export default Index;
