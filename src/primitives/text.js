import styled from 'styled-components';
import { color, space, typography, variant } from 'styled-system';

const avenir = '"avenir next", avenir, sans-serif';
const athelas = 'athelas, georgia, serif';

const fontVariants = () =>
  variant({
    prop: 'size',
    variants: {
      xl: {
        fontSize: [2, 3],
        lineHeight: [1, 2],
      },
      l: {
        fontSize: [2, 3],
        lineHeight: [1, 2],
      },
      m: {
        fontSize: [2, 3],
        lineHeight: [1, 2],
      },
      s: {
        fontSize: [1, 2],
        lineHeight: [0, 1],
      },
      xs: {
        fontSize: [0, 1],
        lineHeight: [0, 1],
      },
    },
  });

export default styled('span')`
  ${fontVariants}
  color: ${({ theme }) => theme.colors.midGray};
  font-family: ${({ serif }) => (serif ? athelas : avenir)};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  transition-property: color .3s;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.nearWhite};
  }

  ${color}
  ${space}
  ${typography}
`;
