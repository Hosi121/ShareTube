import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./SearchBar";
import { User } from "../../types/user"; // User型をインポート
import VideoUploadButton from "../molecules/videoUploadButton";
import LoginButton from "../molecules/LoginButton";

const LogoLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

interface NavigationProps {
  currentUser: User | null;
}

const Navigation: React.FC<NavigationProps> = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleShareTubeButtonClick = () => {
    navigate("/home");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ShareTube
      </Typography>
      <List>
        <ListItem button onClick={handleShareTubeButtonClick}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <VideoUploadButton sx={{ height: "36px" }} />
        </ListItem>
        {currentUser ? (
          <ListItem button component={Link} to={`/user/${currentUser.username}`}>
            <ListItemText primary="My Profile" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoLink to="/">
            <Typography
              color="#3f51b5"
              variant="h4"
              noWrap
              fontWeight="bold"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              ShareTube
            </Typography>
          </LogoLink>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              maxWidth: 600,
              width: "100%",
              margin: "0 auto",
              padding: "4px 0", // 上下のパディングを追加
            }}
          >
            <SearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={handleSearch}
              size="medium"
              width="600px"
              height="45px"
            />
          </Box>
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <VideoUploadButton sx={{ height: "36px" }} />
              {currentUser ? (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/user/${currentUser.username}`} // ここで動的にリンクを生成
                  startIcon={
                    <Avatar
                      src={currentUser.avatar_url}
                      sx={{ width: 24, height: 24 }}
                    >
                      {currentUser.username.charAt(0)}
                    </Avatar>
                  }
                >
                  {currentUser.username}
                </Button>
              ) : (
                <LoginButton sx={{ height: "36px" }} />
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navigation;