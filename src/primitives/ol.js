import css from '@styled-system/css';
import styled from 'styled-components';
import { space, typography } from 'styled-system';

export default styled.ol`
  font-family: ${({ theme }) => theme.fontFamilies.serif};
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;

  ${space};
  ${typography};
  ${css({
    fontSize: [2, 3],
  })}
`;
