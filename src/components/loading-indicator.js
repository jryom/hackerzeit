import styled, { keyframes } from 'styled-components';
import { space } from 'styled-system';

const pulsate = keyframes`
  from {
    background: rgba(0,0,0,0.45);
  }

  to {
    background: rgba(0,0,0,0.1);
  }
`;

export default styled.div`
  animation: ${pulsate} 0.3s 0.1s infinite alternate;
  background: rgba(0, 0, 0, 0.45);
  height: 8px;
  margin: 0 auto;
  position: relative;
  width: 8px;

  &:after,
  &:before {
    background: rgba(0, 0, 0, 0.45);
    content: '';
    display: block;
    height: 8px;
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
  }

  &:before {
    animation: ${pulsate} 0.3s infinite alternate;
    transform: translateX(-166%);
  }

  &:after {
    animation: ${pulsate} 0.4s 0.2s infinite alternate;
    transform: translateX(166%);
  }

  ${space}
`;
