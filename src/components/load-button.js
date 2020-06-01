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
      marginTop={[5, 6]}
      mx="auto"
      onClick={onClick}
      px={[4, 5]}
      py={[3, 4]}
      visibility={visible ? 'initial' : 'hidden'}
    >
      <Text variant="s">Load more</Text>
    </ButtonContainer>
  );
});

LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default LoadButton;
