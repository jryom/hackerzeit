import css from '@styled-system/css';
import styled from 'styled-components';

import { PAGES } from '@/constants';
import { Box, Link, Text } from '@/primitives';

const Li = styled.li`
  display: inline;
  ${css({
    marginLeft: 2,
  })}
`;
const Ol = styled.ol`
  list-style: none;
`;

export default () => (
  <Box bg="accent" maxWidth={8} mx="auto" py={2}>
    <Ol>
      {Object.keys(PAGES).map((key) => (
        <Li key={PAGES[key]}>
          <Link as={`/${key.toLowerCase()}`} href="/[page]" marginRight={2}>
            <Text>{PAGES[key]}</Text>
          </Link>
        </Li>
      ))}
    </Ol>
  </Box>
);
