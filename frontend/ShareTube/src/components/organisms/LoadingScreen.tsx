import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.default",
        color: "#3f51b5",
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
};

export default LoadingScreen;
