import styled, { css } from 'styled-components';
import {
  color,
  layout,
  position,
  space,
  typography,
  variant,
} from 'styled-system';

const fontSizeVariants = () =>
  variant({
    prop: 'size',
    variants: {
      l: {
        fontSize: [3, 4],
        lineHeight: [1, 2],
      },
      m: {
        fontSize: [1, 2],
        lineHeight: [1, 2],
      },
      s: {
        fontSize: [0, 1],
        lineHeight: [1, 2],
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

const userSelectNoneCss = css`
  user-select: none;
`;

const noWrapCss = css`
  white-space: nowrap;
`;

export default styled('span')`
  ${fontSizeVariants}
  color: ${({ theme, ...props }) =>
    theme.colors[props.lightVariant] || theme.colors.black};
  font-family: ${({ serif, theme }) =>
    serif ? theme.fontFamilies.serif : theme.fontFamilies.sans};
  opacity: 0.9;
  transition-property: color .3s;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme, ...props }) =>
      theme.colors[props.darkVariant] || theme.colors.lightGray};
  }

  ${({ bold }) => (bold ? 'font-weight: 600' : '')};
  ${({ italic }) => (italic ? 'font-style: italic' : null)};
  ${({ hoverUnderline }) => (hoverUnderline ? hoverUnderlineCss : '')}
  ${({ userSelectNone }) => (userSelectNone ? userSelectNoneCss : '')}
  ${({ pointer }) => (pointer ? pointerCss : '')}
  ${({ noWrap }) => (noWrap ? noWrapCss : '')}
  ${color}
  ${position}
  ${space}
  ${typography}
  ${layout}
`;
