import { useRouter } from 'next/router';
import useSWR from 'swr';

import { ItemSubtitle, ItemTitle, LoadingIndicator } from '@/components';
import { Box } from '@/primitives';
import { fetch } from '@/utils';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/item?id=${id}`, fetch);

  if (!data) return <LoadingIndicator />;

  return (
    <Box>
      <ItemTitle data={data} />
      <ItemSubtitle data={data} />
    </Box>
  );
};

export default Item;
