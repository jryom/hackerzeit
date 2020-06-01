import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@font-face {
  font-family: 'SourceSansProRegular';
  src: url('/fonts/source-sans-pro-regular.woff2') format('woff2'),
  url('/fonts/source-sans-pro-regular.ttf') format('ttf');
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
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeLegibility;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.colors.nearWhite};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.black};
  }
}

  .quote {
  color: ${({ theme }) => theme.colors.midGray};
  font-style: italic;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.gray};
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
