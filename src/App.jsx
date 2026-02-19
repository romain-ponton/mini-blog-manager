import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import Navbar from "./components/Navbar.jsx";
import { Box } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App({ toggleTheme, mode, themeTransition }) {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} mode={mode} />

        {themeTransition && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              backgroundColor: "background.default",
              opacity: 0.6,
              pointerEvents: "none",
              transition: "opacity 200ms ease",
            }}
          />
        )}

        <Box component="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <PostDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
