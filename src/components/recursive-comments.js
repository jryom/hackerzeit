import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

import { useLocalStorage } from '@/hooks';
import { Box, Text } from '@/primitives';
import { parseComment, relativeTime } from '@/utils';

const BorderedCommentBox = styled(Box)`
  border-left-color: var(--extraDimmedForeground);
`;

const RecursiveComments = ({ comment }) => {
  const [collapsed, setCollapsed] = useLocalStorage(comment?.id, false);
  const swipeHandlers = useSwipeable({
    onSwiped: ({ absX, absY }) => absX > absY * 1.5 && setCollapsed(!collapsed),
  });

  return (
    <Box>
      <Box mb={[1, 2]} mt={[4, 4]}>
        <Text
          _color="dimmedForeground"
          bold
          display="inline-block"
          fontFamily="mono"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          pointer
          pr="0.5em"
          userSelectNone
          variant="s"
        >
          {collapsed ? '+' : '-'}
        </Text>
        <Text _color="dimmedForeground" bold userSelectNone variant="s">
          {comment.by}
        </Text>
        <Text _color="dimmedForeground" italic userSelectNone variant="s">
          {` ${relativeTime(comment.time)}`}
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
                margin-top: 0.25em;
              }
            `}
            variant="m"
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
