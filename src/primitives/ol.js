import css from '@styled-system/css';
import styled from 'styled-components';

export default styled.ol`
  font-family: ${({ theme }) => theme.fontFamilies.serif};
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  list-style: none;

  ${css({
    fontSize: [2, 3],
  })}
`;
