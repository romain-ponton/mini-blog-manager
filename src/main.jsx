import React, { useMemo, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Root() {
  const [themeTransition, setThemeTransition] = useState(false);

  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);
  
const toggleTheme = useCallback(() => {
  setThemeTransition(true);

  setTimeout(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    setThemeTransition(false);
  }, 200);
}, []);


 const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "light" ? "#0057b8" : "#8b0000",
        },
        ...(mode === "dark" && {
          background: {
            default: "#000000",
            paper: "#111111", 
          },
          text: {
            primary: "#ffffff",
            secondary: "#cccccc",
          },
        }),
      },

      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === "dark" ? "#111111" : undefined,
              color: mode === "dark" ? "#ffffff" : undefined,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === "dark" ? "#111111" : undefined,
              color: mode === "dark" ? "#ffffff" : undefined,
            },
          },
        },
      },

      shape: {
        borderRadius: 14,
      },
    }),
  [mode]
);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     <App toggleTheme={toggleTheme} mode={mode} themeTransition={themeTransition} />

    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
