export default (timeStamp) => {
  const unixTime = Math.floor(Date.now() / 1000);
  const seconds = unixTime - timeStamp;

  const times = [
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  return times
    .find((el) => seconds > el[0])
    .reduce((acc, cur, idx) => {
      if (idx === 0) {
        return Math.floor(seconds / cur);
      }
      return `${acc} ${cur}${acc > 1 ? 's' : ''} ago`;
    }, null);
};
