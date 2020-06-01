import styled from 'styled-components';
import {
  color,
  layout,
  position,
  space,
  typography,
  variant,
} from 'styled-system';

const fontVariants = () =>
  variant({
    prop: 'variant',
    variants: {
      l: {
        fontSize: [3, 4],
        lineHeight: '1.25em',
        fontWeight: [360, 340],
      },
      m: {
        fontSize: [1, 2],
        lineHeight: '1.25em',
      },
      s: {
        fontSize: [0, 1],
        lineHeight: '1.25em',
      },
    },
  });

const hoverUnderlineCss = `
  &:hover {
    text-decoration: underline;
  }
`;

export default styled('span')`
  ${fontVariants}

  color: ${({ theme, ...props }) =>
    theme.colors[props.lightVariant] || theme.colors.darkGray};
  font-family: ${({ serif, theme }) =>
    serif ? theme.fontFamilies.serif : theme.fontFamilies.sans};
  opacity: 0.85;
  transition-property: color .3s;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme, ...props }) =>
      theme.colors[props.darkVariant] || theme.colors.lightGray};
  }

  ${({ bold }) => (bold ? 'font-weight: 600' : '')};
  ${({ italic }) => (italic ? 'font-style: italic' : null)};
  ${({ hoverUnderline }) => (hoverUnderline ? hoverUnderlineCss : '')}
  ${({ userSelectNone }) => (userSelectNone ? 'user-select: none;' : '')}
  ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
  ${({ noWrap }) => (noWrap ? 'white-space: nowrap;' : '')}
  ${color}
  ${position}
  ${space}
  ${typography}
  ${layout}
`;
