import React from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import userData from "../testData/userData.json";

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
  const user = userData;
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UserInfoCard>
            <CardContent
              sx={{ display: "flex", alignItems: "center", padding: 4 }}
            >
              <LargeAvatar alt={user.name} src={user.avatarUrl}>
                {getInitials(user.name)}
              </LargeAvatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  {user.name}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  {user.email}
                </Typography>
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SettingsIcon />}
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
              {user.videos.map((video) => (
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
                    secondary={`${video.views.toLocaleString()} 回視聴`}
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
    </Container>
  );
};

export default Profile;
