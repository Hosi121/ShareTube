import React from "react";
import { Button, ButtonProps } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useNavigate } from "react-router-dom";

interface VideoUploadButtonProps extends ButtonProps {
  isCompact?: boolean;
}

const VideoUploadButton: React.FC<VideoUploadButtonProps> = ({
  isCompact,
  sx,
  ...props
}) => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<VideoLibraryIcon />}
      sx={{
        borderRadius: 28,
        py: 1,
        ...(isCompact && {
          minWidth: "auto",
          px: 1,
        }),
        ...sx,
      }}
      onClick={handleUploadClick}
      {...props}
    >
      {isCompact ? <VideoLibraryIcon /> : "動画をアップロード"}
    </Button>
  );
};

export default VideoUploadButton;
