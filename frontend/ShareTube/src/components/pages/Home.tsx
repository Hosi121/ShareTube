import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';


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

const SearchInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
});

const PageBackground = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <PageBackground>
      <Container maxWidth="sm">
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}>
              ShareTube
            </Typography>
            <form onSubmit={handleSearch} style={{ width: '100%' }}>
              <SearchContainer elevation={3}>
                <SearchInput
                  fullWidth
                  placeholder="動画を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton type="submit" aria-label="search" sx={{ color: 'primary.main' }}>
                  <SearchIcon />
                </IconButton>
              </SearchContainer>
            </form>
            <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
            </Typography>
          </Box>
        </Fade>
      </Container>
    </PageBackground>
  );
};

export default Home;