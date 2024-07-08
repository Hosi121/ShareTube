import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Divider,
  IconButton,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Video } from "../types/video";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import useUserData from "../hooks/useUserData";
import EditProfileModal from "./EditProfileModal";
import SettingsModal from "./SettingsModal";

const UserInfoCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: theme.palette.common.white,
  borderRadius: 16,
  boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  marginRight: theme.spacing(4),
  border: `4px solid ${theme.palette.common.white}`,
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  fontSize: "5rem",
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: 16,
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
}));

const VideoItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
}));

const VideoAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const Profile: React.FC = () => {
  const { user, isLoading, error, updateUser } = useUserData();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>No user data available</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UserInfoCard>
            <CardContent
              sx={{ display: "flex", alignItems: "center", padding: 4 }}
            >
              <LargeAvatar alt={user.username}>
                {getInitials(user.username)}
              </LargeAvatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  {user.username}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  {user.email}
                </Typography>
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SettingsIcon />}
                    onClick={() => setSettingsModalOpen(true)}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                      fontSize: "1rem",
                      padding: "8px 16px",
                    }}
                  >
                    設定
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setEditModalOpen(true)}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                      fontSize: "1rem",
                      padding: "8px 16px",
                    }}
                  >
                    編集
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </UserInfoCard>
        </Grid>
        <Grid item xs={12}>
          <ContentPaper elevation={3}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              アップロードした動画
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {user.videos &&
                user.videos.map((video: Video) => (
                  <VideoItem key={video.id} disablePadding>
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
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {video.likes} likes •{" "}
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
                  </VideoItem>
                ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              startIcon={<VideoLibraryIcon />}
              sx={{ mt: 2, borderRadius: 28, py: 1 }}
            >
              新しい動画をアップロード
            </Button>
          </ContentPaper>
        </Grid>
      </Grid>
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onSave={updateUser}
      />
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        user={user}
        onSave={updateUser}
      />
    </Container>
  );
};

export default Profile;
