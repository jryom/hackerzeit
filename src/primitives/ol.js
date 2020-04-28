import css from '@styled-system/css';
import styled from 'styled-components';
import { typography } from 'styled-system';

export default styled.ol`
  font-family: ${({ theme }) => theme.fontFamilies.serif};
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 1em;

  ${typography};
  ${css({
    fontSize: [2, 3],
  })}
`;
