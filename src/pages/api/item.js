import 'firebase/database';

import { fetchSnapshot, getValue } from '@/utils';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const item = await fetchSnapshot(id).then(getValue);

  res.statusCode = 200;
  res.end(JSON.stringify(item));
};
