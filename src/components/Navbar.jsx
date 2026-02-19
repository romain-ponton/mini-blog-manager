import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton
} from "@mui/material";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

export default function Navbar({ toggleTheme, mode }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = (path) => ({
    position: "relative",
    color: "white",
    fontWeight: 500,
    textTransform: "none",
    mx: 1,
    px: 2,
    borderRadius: 2,
    backgroundColor: "transparent",
    transition: "all 0.3s ease",

    // Hover custom (plus de bleu MUI)
    "&:hover": {
      backgroundColor: isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.2)",
    },

    // Soulignement animé
    "&::after": {
      content: '""',
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 6,
      height: 2,
      backgroundColor: "white",
      transform: location.pathname === path ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.3s ease",
    },

    "&:hover::after": {
      transform: "scaleX(1)",
    },
  });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          background: isDark
            ? "linear-gradient(90deg, #8b0000, #400000)"
            : `linear-gradient(90deg, ${theme.palette.primary.main}, #42a5f5)`,

          boxShadow: isDark
            ? "0 4px 25px rgba(139,0,0,0.6)"
            : "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* LOGO */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                flexGrow: 1,
                letterSpacing: 0.5,
                transition: "0.3s",
                "&:hover": {
                  opacity: 0.85,
                },
              }}
            >
              Mini Blog Manager
            </Typography>

            {/* THEME TOGGLE */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "white",
                mr: 2,
                transition: "0.3s",
                "&:hover": {
                  transform: "rotate(20deg)",
                },
              }}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            {/* LINKS */}
            {isAuthenticated ? (
              <>
                <Button
                  disableRipple
                  variant="text"
                  color="inherit"
                  component={Link}
                  to="/blog"
                  sx={linkStyle("/blog")}
                >
                  Blog
                </Button>

                <Button
                  disableRipple
                  variant="text"
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={linkStyle("/profile")}
                >
                  {user?.name}
                </Button>

                <Button
                  disableRipple
                  variant="text"
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    ...linkStyle("/logout"),
                    border: "1px solid rgba(255,255,255,0.4)",
                  }}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                disableRipple
                variant="text"
                color="inherit"
                component={Link}
                to="/login"
                sx={linkStyle("/login")}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer */}
      <Toolbar />
    </>
  );
}
