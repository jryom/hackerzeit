import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeLegibility;
  line-height: 1.5;
}

  .quote {
  color: ${({ theme }) => theme.colors.midGray};
  font-style: italic;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.nearWhite};
  }
}

a:not([class]) {
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
}

pre {
  white-space: pre-wrap;
  word-break: keep-all;
}

input,
button,
textarea,
select {
  font: inherit;
}`;
