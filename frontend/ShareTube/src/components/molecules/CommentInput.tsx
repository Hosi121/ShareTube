import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import Button from "../atoms/Button";

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        送信
      </Button>
    </Box>
  );
};

export default CommentInput;
