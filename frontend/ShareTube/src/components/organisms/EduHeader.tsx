import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginButton from "../molecules/LoginButton";
import AddClassButton from "../molecules/AddClassButton";
import { User } from "../../types/user";

interface HeaderProps {
  currentUser: User | null;
}

const EduHeader: React.FC<HeaderProps> = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => navigate("/")}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#3f51b5",
              }}
            >
              ShareTube for Education
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <AddClassButton />
            {!currentUser && <LoginButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default EduHeader;