import styled from 'styled-components';
import { variant } from 'styled-system';

const avenir = '"avenir next", avenir, sans-serif';
const athelas = 'athelas, georgia, serif';

const fontVariants = (props) => variant({
  prop: 'size',
  variants: {
    xl: {
      fontSize: [2, 3],
      fontWeight: props.bold ? 2 : 0,
      lineHeight: [2, 2],
    },
    l: {
      fontSize: [2, 3],
      fontWeight: props.bold ? 2 : 0,
      lineHeight: ['2rem', '2.625rem'],
    },
    m: {
      fontSize: [2, 3],
      fontWeight: props.bold ? 2 : 0,
      lineHeight: ['1.625rem', '2rem'],
    },
    s: {
      fontSize: [1, 2],
      fontWeight: props.bold ? 1 : 0,
      lineHeight: ['1.875rem', '2.125rem'],
    },
  },
});

export default styled('span')`
  ${fontVariants}
  color: ${({ theme }) => theme.colors.darkGrey};
  font-family: ${({ serif }) => (serif ? athelas : avenir)};
  transition-property: color .3s;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.lightGrey};
  }
`;
