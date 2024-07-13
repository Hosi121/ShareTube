import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '../atoms/TextField';

interface TagInputProps {
  currentTag: string;
  onTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
}

const TagInput: React.FC<TagInputProps> = ({ currentTag, onTagInputChange, onAddTag }) => {
  return (
    <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="タグを追加"
        value={currentTag}
        onChange={onTagInputChange}
        size="small"
        sx={{ flexGrow: 1, mr: 1 }}
      />
      <IconButton onClick={onAddTag} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default TagInput;