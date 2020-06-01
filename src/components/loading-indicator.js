import css from '@styled-system/css';
import styled, { keyframes } from 'styled-components';

import { Box } from '@/primitives';

const wave = keyframes`
  0% {
    opacity: 1;
  }

  70%{
    opacity: 0.2;
  }

  100% {
    opacity: 0.2;
  }
`;

const Dot = styled.div`
  animation-direction: alternate;
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  animation-name: ${wave};
  background-color: ${({ theme }) => theme.colors.gray};
  display: inline-block;
  height: 8px;
  margin: 0 4px;
  position: relative;
  width: 8px;

  ${css({
    marginTop: [4, 5],
  })}

  &:nth-of-type(2) {
    animation-delay: 0.1s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.2s;
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.midGray};
  }
`;

export default () => (
  <Box marginTop={[5, 6]} marginX="auto" px={[4, 5]}>
    <Dot />
    <Dot />
    <Dot />
  </Box>
);
