import React from "react";
import { List, Container, Typography } from "@mui/material";
import VideoItem from "../molecules/VideoItem";
import { Video } from "../../types/video";

interface VideoListProps {
  className: string;
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ className, videos }) => {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ my: 4 }}
        fontWeight="bold"
      >
        {className}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }} fontWeight="bold">
        授業動画一覧
      </Typography>
      <List>
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </List>
    </Container>
  );
};

export default VideoList;
