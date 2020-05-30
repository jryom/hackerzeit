import css from '@styled-system/css';
import styled from 'styled-components';

import { Box, Text } from '@/primitives';

const ButtonContainer = styled(Box)`
  ${css({
    backgroundColor: 'lightGray',
  })}

  @media (prefers-color-scheme: dark) {
    ${css({
      backgroundColor: 'midGray',
    })}
  }

  ${({ visibility }) => `visibility: ${visibility}`}
`;

const LoadButton = React.forwardRef(({ onClick, visible }, ref) => {
  return (
    <ButtonContainer
      ref={ref}
      as="button"
      border="none"
      display="block"
      marginBottom={[3, 4]}
      marginTop={[4, 5]}
      mx="auto"
      onClick={onClick}
      px={3}
      py={2}
      visibility={visible ? 'initial' : 'hidden'}
    >
      <Text size="s">Load more</Text>
    </ButtonContainer>
  );
});

LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default LoadButton;
