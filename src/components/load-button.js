import { Box, Text } from '@/primitives';

const LoadButton = React.forwardRef(({ onClick, visible }, ref) => {
  return (
    <Box
      ref={ref}
      as="button"
      bg="lightGray"
      border="none"
      display="block"
      mx="auto"
      onClick={onClick}
      px={3}
      py={2}
      visibility={visible ? 'initial' : 'hidden'}
    >
      <Text size="xs">Load more</Text>
    </Box>
  );
});

LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

LoadButton.defaultProps = {
  visible: true,
};

export default LoadButton;
