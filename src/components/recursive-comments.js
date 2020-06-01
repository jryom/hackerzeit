import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

import { useLocalStorage } from '@/hooks';
import { Box, Text } from '@/primitives';
import { parseComment, relativeTime } from '@/utils';

const BorderedCommentBox = styled(Box)`
  border-left-color: ${({ theme }) => theme.colors.lightGray};
  @media (prefers-color-scheme: dark) {
    border-left-color: ${({ theme }) => theme.colors.midGray}77;
  }
`;

const RecursiveComments = ({ comment }) => {
  const [collapsed, setCollapsed] = useLocalStorage(comment?.id, false);
  const swipeHandlers = useSwipeable({
    onSwiped: ({ absX, absY }) => absX > absY && setCollapsed(!collapsed),
  });

  return (
    <Box mt={[3, 4]}>
      <Box mb={[1, 2]}>
        <Text
          bold
          darkVariant="midGray"
          display="inline-block"
          lightVariant="gray"
          mono
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          pointer
          size="s"
          userSelectNone
          width="1.8em"
        >
          {collapsed ? '[+] ' : '[—] '}
        </Text>
        <Text darkVariant="gray" lightVariant="midGray" size="s" userSelectNone>
          {comment.by}
        </Text>
        <Text
          darkVariant="midGray"
          italic
          lightVariant="gray"
          ml="0.4em"
          size="s"
          userSelectNone
        >
          {relativeTime(comment.time)}
        </Text>
      </Box>
      {!collapsed && (
        <>
          <Text
            {...swipeHandlers}
            as="div"
            css={`
              overflow-wrap: break-word;
              hyphens: auto;

              & > * {
                margin-top: 0.4em;
              }
            `}
            size="m"
          >
            {parseComment(comment.text)}
          </Text>
          <BorderedCommentBox
            borderLeft={1}
            borderLeftStyle="solid"
            pl={[2, 3, 4]}
          >
            {comment.kids.length
              ? comment.kids.map((childComment) => {
                  return (
                    !childComment.deleted && (
                      <RecursiveComments
                        key={childComment.id}
                        comment={childComment}
                      />
                    )
                  );
                })
              : null}
          </BorderedCommentBox>
        </>
      )}
    </Box>
  );
};

RecursiveComments.propTypes = {
  comment: PropTypes.shape({
    by: PropTypes.string,
    id: PropTypes.number,
    kids: PropTypes.array,
    text: PropTypes.string,
    time: PropTypes.number,
  }).isRequired,
};

export default RecursiveComments;
