import { Box, Link, Text } from '@/primitives';
import { captureDomain, relativeTime } from '@/utils';

const ListItem = ({ data, number }) => (
  <Box as="section" mb={[2, 3]}>
    <div>
      <Link href={data.url}>
        <Text as="span" size="m">
          {`${number}. ${data.title}`}
        </Text>
        <Text as="span" ml="1" opacity="0.6" size="xs">
          {`(${captureDomain(data.url)})`}
        </Text>
      </Link>
    </div>
    <Box opacity="0.6">
      <Text as="span" size="s">
        {`${relativeTime(data.time)} by ${data.by}.`}
      </Text>
      <Text as="span" size="s">
        {` Score: ${data.score}. `}
      </Text>
      <Text as="span" size="s">
        {`Comments:  ${data.kids?.length || 0}`}
      </Text>
    </Box>
  </Box>
);

ListItem.propTypes = {
  data: PropTypes.shape({
    by: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    kids: PropTypes.array,
    url: PropTypes.string,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

export default ListItem;
