import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../organisms/SearchBar';

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SearchForm
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSubmit={handleSearch}
      isCompact={false}
    />
  );
};

export default SearchBox;