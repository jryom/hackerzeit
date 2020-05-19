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
        return (
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
          >
            <LoadingIndicator my={[3, 4]} />
          </Box>
        );
      }

      return comment.kids.map((kid) => <RecursiveComments comment={kid} />);
    },

    ({ data: comment }) => comment.nextPage,

    [id]
  );

  return data ? (
    <Box>
      <ItemTitle data={data} />
      <ItemSubtitle data={data} />
      {pages}
      <LoadButton
        isLoadingMore={isLoadingMore}
        isReachingEnd={isReachingEnd}
        loadMore={loadMore}
      />
    </Box>
  ) : null;
};

export default Item;
