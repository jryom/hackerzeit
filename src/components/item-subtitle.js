import { Box, Link, Text } from '@/primitives';
import { relativeTime } from '@/utils';

const ItemSubtitle = ({ data }) => (
  <Box marginTop={[1, 2]}>
    <Text _color="dimmedForeground" variant="s">
      {`${data.score} points by `}
    </Text>
    <Text _color="dimmedForeground" hoverUnderline pointer variant="s">
      {`${data.by}`}
    </Text>
    <Text _color="dimmedForeground" variant="s">
      {` ${relativeTime(data.time)}`}
    </Text>
    {typeof data.descendants !== 'undefined' && (
      <>
        <Text _color="dimmedForeground" variant="s">{` | `}</Text>
        <Link href={`/item?id=${data.id}`}>
          <Text _color="dimmedForeground" hoverUnderline noWrap variant="s">
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
