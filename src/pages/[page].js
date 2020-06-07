import Head from 'next/head';
import styled from 'styled-components';
import useSWR, { useSWRPages } from 'swr';

import { InfiniteScroll, ItemSubtitle, ItemTitle } from '@/components';
import { PAGES } from '@/constants';
import { Box } from '@/primitives';

const Li = styled(Box).attrs({ as: 'li' })`
  counter-increment: story;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    white-space: nowrap;
    &::before {
      content: '.' counter(story);
      direction: rtl;
      display: inline-block;
      line-height: 1.4;
      margin-right: 0.75em;
      text-align: right;
      vertical-align: top;
      width: 1em;
    }
  }
`;

const Ol = styled.ol`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: var(--dimmedForeground);
  margin: 0;
  list-style: none;
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
          <Li
            key={story.id}
            borderBottom={['1px solid var(--background)', 'none']}
            css={`
              &:first-child {
                padding-top: 0;
              }
              &:last-child {
                border: none;
                margin: 0;
                padding-bottom: 0;
              }
            `}
            mb={[0, 5]}
            py={[2, 0]}
          >
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
