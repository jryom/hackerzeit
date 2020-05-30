import css from '@styled-system/css';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PAGES } from '@/constants';
import { Box, Link, Text } from '@/primitives';

const Li = styled.li`
  display: inline;
  opacity: 0.8;
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
    left: -5%;
    position: absolute;
    width: 110%;

    @media (prefers-color-scheme: dark) {
      background: ${({ theme }) => theme.colors.nearWhite};
    }
  }
`;
const Ol = styled.ol`
  list-style: none;
  ${css({
    margin: [0, 1],
  })}
`;

export default () => {
  const { asPath } = useRouter();

  return (
    <Box bg="accent" maxWidth={8} mx="auto" px={3} py={3}>
      <Ol>
        {Object.keys(PAGES).map((key) => (
          <Li key={PAGES[key]} active={asPath.includes(key.toLowerCase())}>
            <Link as={`/${key.toLowerCase()}`} href="/[page]">
              <Text fontWeight="500" opacity="1" size="s">
                {PAGES[key]}
              </Text>
            </Link>
          </Li>
        ))}
      </Ol>
    </Box>
  );
};
