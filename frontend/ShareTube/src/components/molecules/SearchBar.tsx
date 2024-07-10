import React from 'react';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchInput from '../atoms/SearchInput';
import SearchButton from '../atoms/SearchButton';

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: 600,
  borderRadius: 30,
  boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
  },
}));

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: (event: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} style={{ width: '100%' }}>
      <SearchContainer elevation={3}>
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SearchButton sx={{ color: 'primary.main' }} />
      </SearchContainer>
    </form>
  );
};

export default SearchBar;