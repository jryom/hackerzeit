import { Link, Text } from '@/primitives';
import { captureDomain } from '@/utils';

const ItemTitle = ({ data }) => (
  <div>
    <Link href={data.url || `/item?id=${data.id}`}>
      <Text size="m">{`${data.title}`}</Text>
      {data.url && (
        <Text hoverUnderline ml="1" opacity="0.6" size="xs">
          {`(${captureDomain(data.url)})`}
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
