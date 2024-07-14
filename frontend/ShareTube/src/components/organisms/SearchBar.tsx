import React from "react";
import { Paper, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    borderColor: "rgba(223,225,229,0)",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  paddingLeft: theme.spacing(2),
  "& input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  size?: "small" | "medium";
}

export const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
  size = "medium",
}) => (
  <form onSubmit={onSubmit} style={{ width: "100%" }}>
    <SearchContainer elevation={0}>
      <StyledInputBase
        placeholder="動画を検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputProps={{ "aria-label": "動画を検索" }}
        size={size}
      />
      <IconButton type="submit" aria-label="search" sx={{ p: "8px" }}>
        <SearchIcon />
      </IconButton>
    </SearchContainer>
  </form>
);

export default SearchForm;
