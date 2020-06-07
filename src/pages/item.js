import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR, { useSWRPages } from 'swr';

import {
  InfiniteScroll,
  ItemSubtitle,
  ItemTitle,
  RecursiveComments,
} from '@/components';
import { Box, Text } from '@/primitives';
import { parseComment } from '@/utils';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/item?id=${id}`);

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    `item-${id}`,

    ({ offset, withSWR }) => {
      const { data: comment } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/comments?id=${id}&page=${offset || 0}`)
      );

      if (!comment?.kids.length) {
        return null;
      }

      return comment.kids.map((kid) => (
        <RecursiveComments key={kid.id} comment={kid} />
      ));
    },

    ({ data: comment }) => comment.nextPage,

    [id]
  );

  return data ? (
    <>
      <Head>
        <title>{`Hacker Zeit${data?.title ? `: ${data.title}` : ''}`}</title>
      </Head>

      <Box borderBottom="2px solid var(--extraDimmedForeground)" pb={[3, 4]}>
        <ItemTitle as="h1" data={data} />
        <ItemSubtitle data={data} />
        <Text
          as="div"
          css={`
            overflow-wrap: break-word;
            hyphens: auto;

            & > * {
              margin-top: 0.5em;
            }
          `}
          mt={[2, 3]}
          variant="m"
        >
          {parseComment(data.text)}
        </Text>
      </Box>
      {pages}

      <InfiniteScroll
        isLoadingMore={isLoadingMore}
        isReachingEnd={isReachingEnd}
        loadMore={loadMore}
      />
    </>
  ) : null;
};

export default Item;
