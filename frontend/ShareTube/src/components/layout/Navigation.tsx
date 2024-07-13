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
import SearchForm from "../organisms/SearchBar";
import { User } from "../../types/user"; // User型をインポート

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ShareTube
      </Typography>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/upload">
          <ListItemText primary="Upload" />
        </ListItem>
        {currentUser ? (
          <ListItem button component={Link} to="/user">
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
        <Toolbar>
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
              margin: "0 auto",
            }}
          >
            <SearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={handleSearch}
              isCompact={isMobile}
            />
          </Box>
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" component={Link} to="/upload">
                動画をアップロード
              </Button>
              {currentUser ? (
                <Button
                  color="inherit"
                  component={Link}
                  to="/user"
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
                <Button color="inherit" component={Link} to="/login">
                  ログイン
                </Button>
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
