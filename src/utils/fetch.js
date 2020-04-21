import fetch from 'unfetch';

export default async function (...args) {
  const res = await fetch(...args);
  return res.json();
}
