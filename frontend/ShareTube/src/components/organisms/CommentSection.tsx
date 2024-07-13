import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { VideoComment } from '../../types/comment';
import { User } from '../../types/user';

interface CommentSectionProps {
  comments: VideoComment[];
  currentUser: User | null;
  onAddComment: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, currentUser, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        {comments.length} Comments
      </Typography>
      {currentUser ? (
        <Box component="form" onSubmit={handleSubmit} display="flex" mb={3}>
          <Avatar src={currentUser.avatar_url} />
          <Box ml={2} flexGrow={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a public comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Comment
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>Please log in to comment.</Typography>
      )}
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={comment.user.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography component="span" variant="body2" color="textPrimary">
                  {comment.user.username}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {comment.comment}
                  </Typography>
                  <Typography component="span" variant="caption" color="textSecondary">
                    {` - ${new Date(comment.timestamp).toLocaleString()}`}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentSection;