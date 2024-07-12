import React from "react";
import { Box } from "@mui/material";
import Typography from "../atoms/typography";
import { Video } from "../../types/video";

interface VideoDetailsProps {
  video: Video;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ video }) => (
  <Box>
    <Typography variant="h4">{video.title}</Typography>
    <Typography variant="body1">{video.description}</Typography>
    <Typography variant="caption">Likes: {video.likes}</Typography>
    <Typography variant="caption">Created at: {video.created_at}</Typography>
  </Box>
);

export default VideoDetails;
