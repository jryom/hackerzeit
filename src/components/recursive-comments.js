import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Box, Text } from '@/primitives';
import { parseComment, relativeTime } from '@/utils';

const RecursiveComments = ({ comment }) => {
  const [collapsed, setCollapsed] = useState(false);
  const swipeHandlers = useSwipeable({
    onSwiped: () => setCollapsed(!collapsed),
  });

  return (
    <Box mt={[2, 3]}>
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
        size="xs"
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
      {!collapsed && (
        <>
          <Text
            {...swipeHandlers}
            as="div"
            css={`
              overflow-wrap: break-word;
              hyphens: auto;

              & > * {
                margin-top: 0.3em;
              }
            `}
            lineHeight="1.4"
            size="s"
          >
            {parseComment(comment.text)}
          </Text>
          <Box
            borderLeft={1}
            borderLeftColor="lightGray"
            borderLeftStyle="solid"
            pl={[2, 3]}
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
          </Box>
        </>
      )}
    </Box>
  );
};

RecursiveComments.propTypes = {
  comment: PropTypes.shape({
    by: PropTypes.string,
    kids: PropTypes.array,
    text: PropTypes.string,
    time: PropTypes.number,
  }).isRequired,
};

export default RecursiveComments;
