import { Link, Text } from '@/primitives';
import { captureDomain } from '@/utils';

const ItemTitle = ({ data }) => (
  <div>
    <Link href={data.url || `/item?id=${data.id}`}>
      <Text opacity="0.8" variant="l">{`${data.title}`}</Text>
      {data.url && (
        <Text
          _color="dimmedForeground"
          family="serif"
          hoverUnderline
          variant="s"
        >
          {` (${captureDomain(data.url)})`}
        </Text>
      )}
    </Link>
  </div>
);

ItemTitle.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default ItemTitle;
