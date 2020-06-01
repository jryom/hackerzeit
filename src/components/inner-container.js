import css from '@styled-system/css';
import styled from 'styled-components';

export default styled('main')`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100vh;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }

  ${css({
    maxWidth: 8,
    paddingX: [3, 6],
    paddingY: [3, 5],
  })}
`;
