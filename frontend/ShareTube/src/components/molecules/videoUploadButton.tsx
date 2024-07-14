import React from 'react';
import { Button } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate } from 'react-router-dom';

const VideoUploadButton = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<VideoLibraryIcon />}
      sx={{ mt: 2, borderRadius: 28, py: 1 }}
      onClick={handleUploadClick}
    >
      新しい動画をアップロード
    </Button>
  );
};

export default VideoUploadButton;