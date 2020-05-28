import css from '@styled-system/css';
import styled, { keyframes } from 'styled-components';

const darkPulsate = keyframes`
  from {
    background: rgba(0,0,0,0.45);
  }

  to {
    background: rgba(0,0,0,0.1);
  }
`;

const lightPulsate = keyframes`
  from {
    background: rgba(255,255,255,0.45);
  }

  to {
    background: rgba(255,255,255,0.05);
  }
`;

export default styled.div`
  animation-delay: 0.1s;
  animation-direction: alternate;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-name: ${darkPulsate};
  height: 8px;
  margin: 0 auto;
  position: relative;
  width: 8px;

  ${css({
    marginTop: [3, 4],
  })}

  &:after,
  &:before {
    animation-direction: alternate;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-name: ${darkPulsate};
    content: '';
    display: block;
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 8px;
  }

  &:before {
    transform: translateX(-166%);
  }

  &:after {
    animation-delay: 0.2s;
    transform: translateX(166%);
  }

  @media (prefers-color-scheme: dark) {
    animation-name: ${lightPulsate};

    &:after,
    &:before {
      animation-name: ${lightPulsate};
    }
  }
`;
