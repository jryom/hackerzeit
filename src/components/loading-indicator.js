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
  background-color: var(--dimmedForeground);
  display: inline-block;
  height: 8px;
  margin: 0 4px;
  position: relative;
  width: 8px;

  ${css({
    marginY: [2, 4],
  })}

  &:nth-of-type(2) {
    animation-delay: 0.1s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.2s;
  }
`;

export default () => (
  <Box>
    <Dot />
    <Dot />
    <Dot />
  </Box>
);
