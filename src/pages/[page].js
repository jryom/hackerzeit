import Head from 'next/head';
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
      content: '.' counter(story);
      direction: rtl;
      display: inline-block;
      line-height: 1.5;
      margin-right: 0.75em;
      text-align: right;
      vertical-align: top;
      width: 1em;
    }
  }
`;

const Index = ({ page }) => {
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
          <Li key={story.id} mb={[3, 4]} pb={[2, 4]}>
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

Index.defaultProps = {
  page: null,
};

Index.propTypes = {
  page: PropTypes.string,
};

export default Index;
