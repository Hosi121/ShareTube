import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import Upload from "./components/pages/Upload";
import TestVideoPlay from "./components/pages/TestVideoPlay";
import { MainLayout } from "./components/molecules/MainLayout";
import LoadingScreen from "./components/organisms/LoadingScreen";
import SplashScreen from "./components/organisms/SplashScreen";
import SearchResults from "./components/pages/SearchResult";
import MainMenu from "./components/pages/MainMenu";
import EduHome from "./components/pages/EduHome";
import EduHeader from "./components/organisms/EduHeader";
import CreateClass from "./components/pages/CreateClassPage";
import ClassAnalytics from "./components/pages/AnalyticsPage";
import Header from "./components/organisms/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.status === 'loading');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000); // 3秒のスプラッシュスクリーンを表示
  }, []);

  const handleLoadingComplete = () => {
    setShowSplash(false); // スプラッシュスクリーンの表示を終了
  };

  if (showSplash) {
    return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/mainmenu" />} />
      <Route path="/mainmenu" element={<MainMenu />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
      <Route
        path="/eduhome/*"
        element={
          <>
            <EduHeader currentUser={currentUser} />
            <Routes>
              <Route path="/" element={<EduHome />} />
              <Route path="createclass" element={<CreateClass />} />
              <Route
                path="class/:classId/analytics"
                element={<ClassAnalytics />}
              />
            </Routes>
          </>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <Header currentUser={currentUser} />
            <Routes>
              <Route path="/user/:username" element={<Profile />} />
              <Route path="/play/:videoId" element={<TestVideoPlay />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/"
                element={
                  <MainLayout currentUser={currentUser}>
                    <Outlet />
                  </MainLayout>
                }
              ></Route>
            </Routes>
          </>
        }
      />
    </Routes>
  );
};

export default App;