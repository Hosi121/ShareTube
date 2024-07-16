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
import { getProfileByUsername } from "./services/authService";
import { User } from "./types/user";
import Upload from "./components/pages/Upload";
import VideoPlay from "./components/pages/VideoPlay";
import { MainLayout } from "./components/molecules/MainLayout";
import LoadingScreen from "./components/organisms/LoadingScreen";
import SplashScreen from "./components/organisms/SplashScreen";
import SearchResults from "./components/pages/SearchResult";
import MainMenu from "./components/pages/MainMenu";
import EduHome from "./components/pages/EduHome";
import EduHeader from "./components/organisms/EduHeader";
import CreateClass from "./components/pages/CreateClassPage";
import ClassAnalytics from "./components/pages/AnalyticsPage";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      const fetchCurrentUser = async () => {
        try {
          const user = await getProfileByUsername(username);
          setCurrentUser(user);
        } catch (error) {
          console.error("Failed to fetch current user", error);
        } finally {
          setLoading(false);
          setShowSplash(false);
        }
      };
      fetchCurrentUser();
    } else {
      setLoading(false);
      setShowSplash(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (showSplash) {
    return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (loading) {
    return <LoadingScreen />;
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
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/createclass" element={<CreateClass />} />
          <Route path="/class/:classId/analytics" element={<ClassAnalytics />} />
          <Route
            path="/eduhome"
            element={
              <>
                <EduHeader />
                <EduHome />
              </>
            }
          />
          <Route
            element={
              <MainLayout currentUser={currentUser}>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/user/:username" element={<Profile />} />
            <Route path="/play/:videoId" element={<VideoPlay />} />
            <Route path="/search" element={<SearchResults />} />
          </Route>
          <Route path="/" element={<Navigate to="/mainmenu" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
