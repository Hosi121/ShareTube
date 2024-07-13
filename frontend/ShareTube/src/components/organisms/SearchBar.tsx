import React from "react";
import { Paper, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchInput } from "../molecules/SearchInput";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isCompact",
})<{ isCompact?: boolean }>(({ theme, isCompact }) => ({
  padding: theme.spacing(0.5, 2),
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: isCompact ? 400 : 600,
  borderRadius: 30,
  boxShadow: "0 3px 15px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 1.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
  },
}));

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  isCompact?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
  isCompact = false,
}) => (
  <form onSubmit={onSubmit} style={{ width: "100%" }}>
    <SearchContainer elevation={3} isCompact={isCompact}>
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size={isCompact ? "small" : "medium"}
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{ color: "primary.main" }}
      >
        <SearchIcon />
      </IconButton>
    </SearchContainer>
  </form>
);

export default SearchForm;
