import { Box, Link, Text } from '@/primitives';
import { relativeTime } from '@/utils';

const ItemSubtitle = ({ data }) => (
  <Box opacity="0.6">
    <Text size="s">{`${data.score} points by`}</Text>
    <Text hoverUnderline size="s">
      {` ${data.by}`}
    </Text>
    <Text size="s">{` | ${relativeTime(data.time)} | `}</Text>
    <Link href={`/item?id=${data.id}`}>
      <Text hoverUnderline size="s">
        {`${data.descendants} comments`}
      </Text>
    </Link>
  </Box>
);

ItemSubtitle.propTypes = {
  data: PropTypes.shape({
    by: PropTypes.string.isRequired,
    descendants: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    kids: PropTypes.array,
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemSubtitle;
