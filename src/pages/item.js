import { useRouter } from 'next/router';
import useSWR from 'swr';

import { ItemSubtitle, ItemTitle, LoadingIndicator } from '@/components';
import { Box, Link } from '@/primitives';
import { fetch } from '@/utils';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/item?id=${id}`, fetch);

  if (!data) return <LoadingIndicator />;

  return (
    <Box>
      <Link href={data.url}>
        <ItemTitle data={data} />
        <ItemSubtitle data={data} />
      </Link>
    </Box>
  );
};

export default Item;
