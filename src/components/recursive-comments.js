/* eslint-disable react/prop-types */
import { Box, Text } from '@/primitives';

const RecursiveComments = ({ comment }) => (
  <Box borderLeft="1px solid lightGray" mt={2} pl={1}>
    <Text as="span" mt={3} size="xs">
      {comment.by}
    </Text>
    <Text as="p" size="xs">
      {comment.text}
    </Text>
    <Box ml={3}>
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
  </Box>
);

export default RecursiveComments;
