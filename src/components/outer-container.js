import styled from 'styled-components';

export default styled('div')`
  background-color: ${({ theme }) => theme.colors.nearWhite};
  min-height: 100vh;
  transition: background-color 0.5s;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
`;
