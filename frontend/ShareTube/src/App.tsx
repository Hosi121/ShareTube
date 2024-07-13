import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import { getCurrentUser } from "./services/authService";
import { User } from "./types/user";
import Upload from "./components/pages/Upload";
import VideoPlay from "./components/pages/VideoPlay";
import { MainLayout } from "./components/layout/MainLayout";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route
            element={
              <MainLayout currentUser={currentUser}>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/user" element={<Profile />} />
            <Route path="/play/:videoId" element={<VideoPlay />} />
          </Route>
          <Route
            path="/"
            element={
              currentUser ? <div>Home Page</div> : <Navigate to="/Home" />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
