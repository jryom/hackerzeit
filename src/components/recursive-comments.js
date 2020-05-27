/* eslint-disable react/prop-types */
import { Box, Text } from '@/primitives';
import { relativeTime } from '@/utils';

const RecursiveComments = ({ comment }) => (
  <Box mt={2}>
    <Text darkVariant="gray" mt={3} size="xs">
      {comment.by}
    </Text>
    <Text darkVariant="gray" italic ml={1} size="xs">
      {relativeTime(comment.time)}
    </Text>
    <Text as="p" dangerouslySetInnerHTML={{ __html: comment.text }} size="xs" />
    <Box
      borderLeft={1}
      borderLeftColor="lightGray"
      borderLeftStyle="solid"
      pl={3}
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
  </Box>
);

export default RecursiveComments;
