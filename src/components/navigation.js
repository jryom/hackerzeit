import css from '@styled-system/css';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PAGES } from '@/constants';
import { Box, Link, Text } from '@/primitives';

const Li = styled.li`
  display: inline;
  position: relative;

  ${css({
    marginRight: 3,
  })}

  &:after {
    background: ${({ theme }) => theme.colors.darkGray};
    bottom: -1px;
    content: '';
    display: ${({ active }) => (active ? 'block' : 'none')};
    height: 2px;
    left: 0;
    position: absolute;
    width: 100%;

    @media (prefers-color-scheme: dark) {
      background: ${({ theme }) => theme.colors.nearWhite};
    }
  }
`;
const Ol = styled.ol`
  list-style: none;
`;

export default () => {
  const { asPath } = useRouter();

  return (
    <Box bg="accent" maxWidth={8} mx="auto" px={3} py={3}>
      <Ol>
        {Object.keys(PAGES).map((key) => (
          <Li key={PAGES[key]} active={asPath.includes(key.toLowerCase())}>
            <Link as={`/${key.toLowerCase()}`} href="/[page]">
              <Text size="s">{PAGES[key]}</Text>
            </Link>
          </Li>
        ))}
      </Ol>
    </Box>
  );
};
