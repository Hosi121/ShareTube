import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Comment } from "../../types/video";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <List>
    {comments.map((comment) => (
      <ListItem key={comment.id}>
        <ListItemText
          primary={comment.content}
          secondary={`User ID: ${comment.user_id} - Created at: ${comment.created_at}`}
        />
      </ListItem>
    ))}
  </List>
);

export default CommentList;
