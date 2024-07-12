import React from 'react';
import { Container, Grid, Paper, Box, Typography, Avatar, Button, Divider } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import VideoPlayer from '../molecules/VideoPlayer';
import CommentSection from '../organisms/CommentSection';
import { Video } from '../../types/video';
import { VideoComment } from '../../types/comment';
import { User } from '../../types/user';

interface VideoPlayerTemplateProps {
  video: Video;
  comments: VideoComment[];
  videoOwner: User | null;
  currentUser: User | null;
  onAddComment: (comment: string) => void;
  onLikeVideo: () => void;
}

const VideoPlayerTemplate: React.FC<VideoPlayerTemplateProps> = ({
  video,
  comments,
  videoOwner,
  currentUser,
  onAddComment,
  onLikeVideo,
}) => (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <VideoPlayer videoUrl={video.video_url} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box mb={2}>
          <Typography variant="h5" gutterBottom>
            {video.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="textSecondary">
                {`${video.likes} likes • ${new Date(video.created_at).toLocaleDateString()}`}
              </Typography>
            </Box>
            <Box>
              <Button startIcon={<ThumbUpAltIcon />} onClick={onLikeVideo}>
                Like
              </Button>
              <Button startIcon={<ShareIcon />}>
                Share
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box my={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={videoOwner?.avatar_url} />
            <Box ml={2}>
              <Typography variant="subtitle1">{videoOwner?.username}</Typography>
              <Typography variant="body2" color="textSecondary">
                Subscribers count
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1">{video.description}</Typography>
        </Box>
        <Divider />
        <CommentSection 
          comments={comments} 
          onAddComment={onAddComment} 
          currentUser={currentUser}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          関連動画
        </Typography>
        {/* 関連動画のリストをマップして表示 */}
      </Grid>
    </Grid>
  </Container>
);

export default VideoPlayerTemplate;