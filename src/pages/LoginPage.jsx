import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
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
  const [submitting, setSubmitting] = useState(false);

 const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      username,
      password,
      expiresInMins: 60,
    });

    console.log("LOGIN RESPONSE:", res.data);

    const token = res.data.accessToken; // ✅ IMPORTANT

    if (!token) {
      throw new Error("Token manquant");
    }

    login(
      {
        id: res.data.id,
        name: `${res.data.firstName} ${res.data.lastName}`,
        email: res.data.email,
        role: "user",
      },
      token 
    );

    navigate("/blog");
  } catch (err) {
    console.error(err);
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
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 4,
          p: 1,
          backgroundColor: isDark ? "#111111" : "#ffffff",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
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
            sx={{ mt: 3, height: 48 }}
            onClick={handleLogin}
            disabled={submitting}
          >
            {submitting ? "Connexion..." : "Se connecter"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
