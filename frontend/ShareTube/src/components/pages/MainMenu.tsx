import React from 'react';
import { Container, Box, useTheme } from '@mui/material';
import Typography from '../atoms/typography';
import MainMenuLayout from '../organisms/MainMenuLayout';

const MainMenu: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary" fontWeight={"bold"}>
          ShareTubeへようこそ
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary" fontWeight={"bold"}>
          どちらを利用しますか？
        </Typography>
        <MainMenuLayout />
      </Box>
    </Container>
  );
};

export default MainMenu;