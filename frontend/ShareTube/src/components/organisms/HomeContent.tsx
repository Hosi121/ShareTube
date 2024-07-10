import React, { useState } from "react";
import SearchContainer from "../molecules/SearchBar";
import SearchInput from "../atoms/SearchInput";
import Button from "../atoms/Button";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <SearchContainer
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
    />
  );
};

export default SearchBox;
