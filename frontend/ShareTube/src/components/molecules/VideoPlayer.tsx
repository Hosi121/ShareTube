import React from "react";
import { Box } from "@mui/material";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => (
  <Box>
    <video controls width="100%">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Box>
);

export default VideoPlayer;
