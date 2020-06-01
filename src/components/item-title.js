import { Link, Text } from '@/primitives';
import { captureDomain } from '@/utils';

const ItemTitle = ({ data }) => (
  <div>
    <Link href={data.url || `/item?id=${data.id}`}>
      <Text size="l">{`${data.title}`}</Text>
      {data.url && (
        <Text
          darkVariant="gray"
          hoverUnderline
          lightVariant="gray"
          serif
          size="s"
        >
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
