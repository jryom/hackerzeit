import styled from 'styled-components';
import {
  color,
  layout,
  position,
  space,
  typography,
  variant,
} from 'styled-system';

const hoverUnderlineCss = `
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled('span')`
  color: ${({ _color }) => (_color ? `var(--${_color})` : 'var(--foreground)')};
  line-height: 1.25em;
  opacity: 0.9;
  transition: color 0.2s;

  ${variant({
    prop: 'family',
    variants: {
      serif: {
        fontFamily: 'systemSerif',
      },
      sans: {
        fontFamily: 'sans',
      },
      theme: {
        fontFamily: 'var(--fontFamily)',
      },
    },
  })}
  ${variant({
    prop: 'variant',
    variants: {
      l: {
        fontSize: [3, 4],
        fontWeight: [360, 340],
      },
      m: {
        fontSize: [1, 2],
      },
      s: {
        fontSize: [0, 1],
      },
    },
  })}
  ${({ bold }) => (bold ? 'font-weight: 600' : '')}
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

Text.defaultProps = {
  variant: 'm',
  family: 'theme',
};

export default Text;
