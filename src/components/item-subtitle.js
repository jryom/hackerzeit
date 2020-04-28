import { Box, Link, Text } from '@/primitives';
import { relativeTime } from '@/utils';

const ItemSubtitle = ({ data }) => (
  <Box opacity="0.6">
    <Text as="span" size="s">
      {`${data.score} points by`}
    </Text>
    <Text as="span" hoverUnderline size="s">
      {` ${data.by}`}
    </Text>
    <Text as="span" size="s">
      {` | ${relativeTime(data.time)} | `}
    </Text>
    <Link href={`/item?id=${data.id}`}>
      <Text as="span" hoverUnderline size="s">
        {`${data.kids?.length || 0} comments`}
      </Text>
    </Link>
  </Box>
);

ItemSubtitle.propTypes = {
  data: PropTypes.shape({
    by: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    kids: PropTypes.array,
  }).isRequired,
};

export default ItemSubtitle;
