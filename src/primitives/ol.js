import css from '@styled-system/css';
import styled from 'styled-components';

export default styled.ol`
  font-family: ${({ theme }) => theme.fonts.systemSerif};
  color: var(--dimmedForeground);
  margin: 0;
  list-style: none;

  ${css({
    fontSize: [2, 3],
  })}
`;
