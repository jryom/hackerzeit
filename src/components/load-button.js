import { Box, Text } from '@/primitives';

const LoadButton = ({ loadMore }) => {
  return (
    <Box
      as="button"
      bg="lightGray"
      border="none"
      display="block"
      mx="auto"
      onClick={loadMore}
      px={3}
      py={2}
    >
      <Text size="xs">Load more</Text>
    </Box>
  );
};

LoadButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default LoadButton;
