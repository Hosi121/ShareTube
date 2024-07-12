import React, { useState } from 'react';
import SearchContainer from '../molecules/SearchContainer';
import SearchInput from '../molecules/SearchInput';
import Button from '../atoms/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} style={{ width: '100%' }}>
      <SearchContainer elevation={3}>
        <SearchInput
          fullWidth
          placeholder="動画を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" aria-label="search" sx={{ color: 'primary.main' }}>
          <SearchIcon />
        </Button>
      </SearchContainer>
    </form>
  );
};

export default SearchBox;