import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import VideoPlayer from "../molecules/VideoPlayer";
import VideoDetails from "../organisms/VideoDetails";
import CommentInput from "../molecules/CommentInput";
import CommentList from "../organisms/CommentList";
import { Video, Comment } from "../../types/video";

interface VideoPlayerTemplateProps {
  video: Video;
  comments: Comment[];
  onAddComment: (comment: string) => void;
  onLikeVideo: () => void;
}

const VideoPlayerTemplate: React.FC<VideoPlayerTemplateProps> = ({
  video,
  comments,
  onAddComment,
  onLikeVideo,
}) => (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <VideoPlayer videoUrl={video.video_url} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3}>
          <VideoDetails video={video} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <CommentInput onSubmit={onAddComment} />
          <CommentList comments={comments} />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default VideoPlayerTemplate;
