import css from '@styled-system/css';
import styled, { keyframes } from 'styled-components';

const snake = keyframes`
  0% {
    transform: scale3d(0,1,1);
  }

  100% {
    transform: scale3d(0.85,1,1);
  }
`;

const Bar = styled.div`
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-name: ${({ isNavigating }) => (isNavigating ? snake : null)};
  animation-timing-function: cubic-bezier(0, 1, 0, 1);
  background: var(--foreground);
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: left;
  width: 100%;

  ${({ isNavigating }) => (isNavigating ? 'opacity: 1' : 'opacity: 0')};
  ${({ isNavigating }) =>
    isNavigating ? 'transition: unset' : 'transition: opacity .3s'};

  ${css({
    height: ['2px', '4px'],
  })}
`;

const Container = styled.div`
  height: 20px;
  left: 50%;
  overflow: hidden;
  position: fixed;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1;

  ${css({
    maxWidth: 8,
  })}
`;

const LoadingBar = ({ isNavigating }) => (
  <Container>
    <Bar isNavigating={isNavigating} />
  </Container>
);

LoadingBar.defaultProps = {
  isNavigating: false,
};

LoadingBar.propTypes = {
  isNavigating: PropTypes.bool,
};

export default LoadingBar;
