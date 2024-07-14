import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import VideoAvatar from "../atoms/VideoAvatar";
import { Video } from "../../types/video";

interface VideoItemProps {
  video: Video;
}

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  return (
    <ListItem disablePadding>
      <ListItemAvatar>
        <VideoAvatar variant="rounded">
          <VideoLibraryIcon />
        </VideoAvatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle1" fontWeight="medium">
            {video.title}
          </Typography>
        }
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              ♡{video.likes}•{" "}
              {new Date(video.created_at).toLocaleDateString()}
            </Typography>
            <Box sx={{ mt: 1 }}>
              {video.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
          </>
        }
      />
      <IconButton edge="end" aria-label="play">
        <PlayArrowIcon />
      </IconButton>
    </ListItem>
  );
};

export default VideoItem;
