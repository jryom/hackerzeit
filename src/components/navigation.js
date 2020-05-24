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
      {PAGES.map((page) => (
        <Li key={page}>
          <Link as={`/${page}`} href="/[page]" marginRight={2}>
            <Text>{page}</Text>
          </Link>
        </Li>
      ))}
    </Ol>
  </Box>
);
