import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
        expiresInMins: 60,
      });

      login(
        {
          id: res.data.id,
          name: `${res.data.firstName} ${res.data.lastName}`,
          email: res.data.email,
          role: "user",
        },
        res.data.token
      );

      navigate("/blog");
    } catch {
      setError("Identifiants incorrects");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 4,
          p: 1,

          backgroundColor: isDark ? "#111111" : "#ffffff",
          border: isDark ? "1px solid #8b0000" : "none",

          boxShadow: isDark
            ? "0 10px 40px rgba(139,0,0,0.4)"
            : "0 8px 25px rgba(0,0,0,0.08)",

          transition: "0.3s",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            sx={{
              color: isDark ? "#ffffff" : "text.primary",
            }}
          >
            Connexion
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Nom d'utilisateur"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Mot de passe"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              height: 48,
              fontWeight: "bold",
              boxShadow: isDark
                ? "0 6px 20px rgba(139,0,0,0.5)"
                : undefined,
            }}
            onClick={handleLogin}
          >
            Se connecter
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
