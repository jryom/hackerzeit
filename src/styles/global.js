import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    ${({ theme, isDarkMode }) =>
      Object.keys(theme.colors[isDarkMode ? 'dark' : 'light']).map(
        (colorKey) =>
          `--${colorKey}:${
            theme.colors[isDarkMode ? 'dark' : 'light'][colorKey]
          };`
      )}

    --fontFamily: ${({ theme, serif }) =>
      serif ? theme.fonts.serif : theme.fonts.sans};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

ul[class],
  ol[class] {
    padding: 0;
  }

body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

body {
  -webkit-text-size-adjust: 100%;
  background-color: var(--background);
  line-height: 1;
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeLegibility;
}

.quote {
  color: var(--dimmedForeground);
  font-style: italic;
}

pre {
  background-color: var(--background);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 90%;
  margin: 0.5em 0;
  padding: 0.5em 0;
}

a:not([class]) {
  color: var(--accent);
  font-weight: 500;
}

pre {
  white-space: pre-wrap;
  word-break: keep-all;
}

button {
  background: unset;
  border: none;
  font: inherit;
}

svg {
  transition: fill 0.2s;
}`;
