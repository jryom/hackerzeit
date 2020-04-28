import styled from 'styled-components';
import { color, space, typography, variant } from 'styled-system';

const fontSizeVariants = () =>
  variant({
    prop: 'size',
    variants: {
      xl: {
        fontSize: [4, 5],
      },
      l: {
        fontSize: [3, 4],
      },
      m: {
        fontSize: [2, 3],
      },
      s: {
        fontSize: [1, 2],
      },
      xs: {
        fontSize: [0, 1],
      },
    },
  });

export default styled('span')`
  ${fontSizeVariants}
  color: ${({ theme }) => theme.colors.midGray};
  font-family: ${({ serif, theme }) =>
    serif ? theme.fontFamilies.serif : theme.fontFamilies.sans};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5em;
  transition-property: color .3s;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.nearWhite};
  }

  ${color}
  ${position}
  ${space}
  ${typography}
`;
