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
    <Box mt={[3, 4]}>
      <Box mb={[1, 2]}>
        <Text
          _color="dimmedForeground"
          bold
          display="inline-block"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          pointer
          userSelectNone
          variant="s"
          width="1.6em"
        >
          {collapsed ? '[+]' : '[-]'}
        </Text>
        <Text _color="dimmedForeground" userSelectNone variant="s">
          {comment.by}
        </Text>
        <Text _color="dimmedForeground" ml="0.4em" userSelectNone variant="s">
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
                margin-top: 0.6em;
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
