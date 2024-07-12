import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { VideoComment } from "../../types/comment";

interface CommentListProps {
  comments: VideoComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <List>
    {comments.map((comment) => (
      <ListItem key={comment.id}>
        <ListItemText
          primary={comment.comment}
          secondary={`User ID: ${comment.user_id} - Created at: ${comment.timestamp}`}
        />
      </ListItem>
    ))}
  </List>
);

export default CommentList;
