import css from '@styled-system/css';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PAGES } from '@/constants';
import { Box, Link, Text } from '@/primitives';

const Li = styled.li`
  display: inline;
  position: relative;

  ${css({
    marginRight: [3, 5],
  })}

  &:after {
    background-color: var(--foreground);
    bottom: -2px;
    content: '';
    display: ${({ active }) => (active ? 'block' : 'none')};
    height: 2px;
    left: 0%;
    position: absolute;
    transition: background-color 0.2s;
    width: 100%;
  }
`;
const Ol = styled.ol`
  list-style: none;
  ${css({
    margin: [2, 3],
  })}
`;

export default () => {
  const { asPath } = useRouter();

  return (
    <Box bg="accent" maxWidth={8} mx="auto" px={[2, 4]} py={[3, 4]}>
      <Ol>
        {Object.keys(PAGES).map((key) => (
          <Li key={PAGES[key]} active={asPath.includes(key.toLowerCase())}>
            <Link as={`/${key.toLowerCase()}`} href="/[page]">
              <Text opacity="1" variant="m">
                {PAGES[key]}
              </Text>
            </Link>
          </Li>
        ))}
      </Ol>
    </Box>
  );
};
