import css from '@styled-system/css';
import styled from 'styled-components';

export default styled('main')`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
  min-height: 100vh;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.midGray};
  }

  ${css({
    paddingX: [4, 6],
    paddingY: [3, 4],
  })}
`;
