import { Link, Text } from '@/components';
import { captureDomain } from '@/utils';

const ListItem = ({ data, number }) => (
  <article>
    <div>
      <Link href={data.url}>
        <Text as="span" size="m">
          {`${number}. ${data.title}`}
        </Text>
        <Text as="span" size="xs">
          {` (${captureDomain(data.url)})`}
        </Text>
      </Link>
    </div>
    <Text as="span" size="s">
      Score:
      {`${data.score} `}
    </Text>
    {`${data.by} `}
    <Text as="span" size="s">
      Comments:
      {` ${data.kids?.length || 0}`}
    </Text>
  </article>
);

ListItem.propTypes = {
  data: PropTypes.shape({
    by: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    kids: PropTypes.array,
    url: PropTypes.string,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

export default ListItem;
