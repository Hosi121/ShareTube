import React from 'react';
import { List, Typography, Divider, Box, Button } from '@mui/material';
import VideoItem from '../molecules/VideoItem';
import { Video } from '../../types/video';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

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
      <Button variant="contained" color="primary" startIcon={<VideoLibraryIcon />} sx={{ mt: 2, borderRadius: 28, py: 1 }}>
        新しい動画をアップロード
      </Button>
    </Box>
  );
};

export default VideoList;