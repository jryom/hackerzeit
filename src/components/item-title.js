import { Link, Text } from '@/primitives';
import { captureDomain } from '@/utils';

const ItemTitle = ({ data, as }) => (
  <div>
    <Link href={data.url || `/item?id=${data.id}`}>
      <Text
        as={as}
        display="inline"
        fontWeight="400"
        variant="l"
      >
        {`${data.title} `}
      </Text>
      {data.url && (
        <Text _color="dimmedForeground" hoverUnderline serif variant="s">
          {`(${captureDomain(data.url)})`}
        </Text>
      )}
    </Link>
  </div>
);

ItemTitle.defaultProps = {
  as: 'h2',
};

ItemTitle.propTypes = {
  as: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default ItemTitle;
