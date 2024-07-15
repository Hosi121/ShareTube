// pages/Home.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "../atoms/typography";
import SearchForm from "../organisms/SearchBar";

const PageBackground = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <PageBackground>
      <Container maxWidth="sm">
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ color: "primary.main", fontWeight: "bold", mb: 3 }}
            >
              ShareTube
            </Typography>
            <SearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={handleSearch}
              size="medium"
            />
            <Typography
              variant="body1"
              sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}
            ></Typography>
          </Box>
        </Fade>
      </Container>
    </PageBackground>
  );
};

export default Home;
