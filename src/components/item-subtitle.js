import { Box, Link, Text } from '@/primitives';
import { relativeTime } from '@/utils';

const ItemSubtitle = ({ data }) => (
  <Box marginY={[1, 2]} opacity="0.6">
    <Text variant="s">{`${data.score} points by `}</Text>
    <Text hoverUnderline pointer variant="s">
      {`${data.by}`}
    </Text>
    <Text variant="s">{` ${relativeTime(data.time)}`}</Text>
    {typeof data.descendants !== 'undefined' && (
      <>
        <Text variant="s">{` | `}</Text>
        <Link href={`/item?id=${data.id}`}>
          <Text hoverUnderline noWrap variant="s">
            {`${data.descendants} comments`}
          </Text>
        </Link>
      </>
    )}
  </Box>
);

ItemSubtitle.propTypes = {
  data: PropTypes.shape({
    by: PropTypes.string.isRequired,
    descendants: PropTypes.number,
    id: PropTypes.number.isRequired,
    kids: PropTypes.array,
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemSubtitle;
