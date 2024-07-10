import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonProps extends IconButtonProps {}

const SearchButton: React.FC<SearchButtonProps> = (props) => {
  return (
    <IconButton type="submit" aria-label="search" {...props}>
      <SearchIcon />
    </IconButton>
  );
};

export default SearchButton;