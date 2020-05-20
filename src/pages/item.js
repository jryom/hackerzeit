import { useRouter } from 'next/router';
import useSWR, { useSWRPages } from 'swr';

import {
  ItemSubtitle,
  ItemTitle,
  LoadButton,
  LoadingIndicator,
  RecursiveComments,
} from '@/components';
import { Box } from '@/primitives';
import { fetch } from '@/utils';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/item?id=${id}`, fetch);

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    `item-${id}`,

    ({ offset, withSWR }) => {
      const { data: comment } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/comments?id=${id}&page=${offset || 0}`, fetch)
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

      {!isLoadingMore && (
        <LoadButton isReachingEnd={isReachingEnd} loadMore={loadMore} />
      )}
    </>
  ) : null;
};

export default Item;
