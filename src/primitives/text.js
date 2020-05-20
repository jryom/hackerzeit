import styled, { css } from 'styled-components';
import { color, position, space, typography, variant } from 'styled-system';

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

const hoverUnderlineCss = css`
  &:hover {
    text-decoration: underline;
  }
`;

const pointerCss = css`
  cursor: pointer;
`;

export default styled('span')`
  ${fontSizeVariants}
  color: ${({ theme, ...props }) =>
    theme.colors[props.darkVariant] || theme.colors.midGray};
  font-family: ${({ serif, theme }) =>
    serif ? theme.fontFamilies.serif : theme.fontFamilies.sans};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  ${({ italic }) => (italic ? 'font-style: italic' : null)};
  line-height: 1.5em;
  transition-property: color .3s;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme, ...props }) =>
      theme.colors[props.lightVariant] || theme.colors.nearWhite};
  }

  ${({ hoverUnderline }) => (hoverUnderline ? hoverUnderlineCss : '')}
  ${({ pointer }) => (pointer ? pointerCss : '')}
  ${color}
  ${position}
  ${space}
  ${typography}
`;
