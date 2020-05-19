import { Box } from '@/primitives';

const LoadButton = ({ loadMore }) => {
  return (
    <Box as="button" onClick={loadMore}>
      Load more comments
    </Box>
  );
};

LoadButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default LoadButton;
