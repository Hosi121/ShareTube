import React from "react";
import { List, Typography, Divider, Box, Button } from "@mui/material";
import VideoItem from "../molecules/VideoItem";
import { Video } from "../../types/video";
import VideoUploadButton from "../molecules/videoUploadButton";

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        アップロードした動画
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </List>
      <VideoUploadButton />
    </Box>
  );
};

export default VideoList;
