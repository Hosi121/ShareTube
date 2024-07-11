import React from 'react';
import { Stack } from '@mui/material';
import CustomChip from '../atoms/CustomChip';

interface TagListProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onRemoveTag }) => {
  return (
    <Stack direction="row" flexWrap="wrap" sx={{ my: 2 }}>
      {tags.map((tag, index) => (
        <CustomChip
          key={index}
          label={tag}
          onDelete={() => onRemoveTag(tag)}
          color="primary"
          variant="outlined"
        />
      ))}
    </Stack>
  );
};

export default TagList;