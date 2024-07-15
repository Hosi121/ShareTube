import React from "react";
import { Paper, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

interface SearchContainerProps {
  width?: string;
  height?: string;
}

const SearchContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height",
})<SearchContainerProps>(({ theme, width, height }) => ({
  display: "flex",
  alignItems: "center",
  width: width || "100%",
  height: height || "auto",
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    borderColor: "rgba(223,225,229,0)",
  },
}));

interface StyledInputBaseProps {
  inputSize?: "small" | "medium" | "large";
}

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "inputSize",
})<StyledInputBaseProps>(({ theme, inputSize }) => ({
  flex: 1,
  paddingLeft: theme.spacing(
    inputSize === "small" ? 1 : inputSize === "medium" ? 2 : 3
  ),
  "& input": {
    padding: theme.spacing(
      inputSize === "small" ? 0.5 : inputSize === "medium" ? 1 : 1.5,
      inputSize === "small" ? 0.5 : inputSize === "medium" ? 1 : 1.5,
      inputSize === "small" ? 0.5 : inputSize === "medium" ? 1 : 1.5,
      0
    ),
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize:
      inputSize === "small"
        ? "0.875rem"
        : inputSize === "medium"
          ? "1rem"
          : "1.25rem",
  },
}));

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  size?: "small" | "medium" | "large";
  width?: string | number;
  height?: string | number;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
  size = "medium",
  width,
  height,
}) => (
  <form onSubmit={onSubmit} style={{ width: width || "100%" }}>
    <SearchContainer
      elevation={0}
      width={width?.toString()}
      height={height?.toString()}
    >
      <StyledInputBase
        placeholder="動画を検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputProps={{ "aria-label": "動画を検索" }}
        inputSize={size}
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{
          p: size === "small" ? "4px" : size === "medium" ? "8px" : "12px",
          height: "100%",
        }}
      >
        <SearchIcon fontSize={size} />
      </IconButton>
    </SearchContainer>
  </form>
);

export default SearchForm;
