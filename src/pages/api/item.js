import 'firebase/database';

import { fetchSnapshot, getValue } from '@/utils';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const item = await fetchSnapshot(id).then(getValue);

  res.setHeader(
    'Cache-Control',
    'public, max-age=300, s-maxage=1, stale-while-revalidate=10800'
  );
  res.status(200).json(item);
};
