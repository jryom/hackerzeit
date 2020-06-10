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

const Item = ({ initialData }) => {
  const router = useRouter();
  const { id } = router.query;

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

  return initialData ? (
    <>
      <Head>
        <title>
          {`Hacker Zeit${initialData?.title ? `: ${initialData.title}` : ''}`}
        </title>
      </Head>

      <Box borderBottom="1px solid var(--extraDimmedForeground)" pb={[3, 4]}>
        <ItemTitle as="h1" data={initialData} />
        <ItemSubtitle data={initialData} />

        {!!initialData.text && (
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
            {parseComment(initialData.text)}
          </Text>
        )}
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

export async function getServerSideProps(context) {
  const initialData = await fetch(
    `${context.req.protocol || 'http'}://${
      context.req.headers.host
    }/api/item?id=${context.query.id}&page=0`
  ).then((res) => res.json());
  return { props: { initialData } };
}

Item.propTypes = {
  initialData: PropTypes.shape({
    text: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default Item;
