import { useRouter } from 'next/router';
import useSWR, { useSWRPages } from 'swr';

import {
  InfiniteScroll,
  ItemSubtitle,
  ItemTitle,
  LoadingIndicator,
  RecursiveComments,
} from '@/components';
import { Box } from '@/primitives';

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

      return comment.kids.map((kid) => <RecursiveComments comment={kid} />);
    },

    ({ data: comment }) => comment.nextPage,

    [id]
  );

  return data ? (
    <>
      <Box marginBottom={[3, 4]}>
        <ItemTitle data={data} />
        <ItemSubtitle data={data} />
        {pages}
      </Box>

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
          <LoadingIndicator />
        </Box>
      )}
    </>
  ) : null;
};

export default Item;
