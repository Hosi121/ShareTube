import React, { useEffect } from "react";
import { Box, Typography , CircularProgress} from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SplashScreen: React.FC<{ onLoadingComplete: () => void }> = ({
  onLoadingComplete,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onLoadingComplete]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 4,
          animation: `${fadeIn} 1s ease-out`,
        }}
        color="#3f51b5"
        fontWeight="bold"
      >
        ShareTube
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          animation: `${fadeIn} 1s ease-out`,
        }}
        color="#3f51b5"
        fontWeight="bold"
      >
        静大生の動画共有サービス
      </Typography>
        <Box sx={{ mb: 4, animation: `${fadeIn} 1s ease-out`,}}>
        <CircularProgress size={60} thickness={4}/>
        </Box>
    </Box>
  );
};

export default SplashScreen;
