import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Chip,
  Stack,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";
import BadgeIcon from "@mui/icons-material/Badge";

import { useAuth } from "../contexts/AuthContext.jsx";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function formatDate(timestamp) {
  if (!timestamp) return "Non disponible";
  return new Date(timestamp * 1000).toLocaleString();
}

export default function ProfilePage() {
  const { user, token } = useAuth();
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const decoded = token ? decodeToken(token) : null;
  const expirationDate = decoded?.exp ? decoded.exp * 1000 : null;
  const isExpired = expirationDate ? Date.now() > expirationDate : false;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            mb: 4,
            color: "white",

            background: isDark
              ? "linear-gradient(135deg, #8b0000, #400000)"
              : "linear-gradient(135deg, #1976d2, #42a5f5)",

            boxShadow: isDark
              ? "0 10px 40px rgba(139,0,0,0.5)"
              : "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mr: 3,
                bgcolor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)",
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>

            <Box>
              <Typography variant="h4" fontWeight="bold">
                {user?.name}
              </Typography>

              <Stack direction="row" spacing={2} mt={2}>
                <Chip
                  icon={<VerifiedIcon />}
                  label="Compte vérifié"
                  sx={{
                    bgcolor: "white",
                    color: isDark ? "#8b0000" : "#1976d2",
                    fontWeight: "bold",
                  }}
                />

                <Chip
                  label={isExpired ? "Session expirée" : "Session active"}
                  color={isExpired ? "error" : "success"}
                />
              </Stack>
            </Box>
          </Box>
        </Paper>

        {/* CARDS */}
        <Grid container spacing={4}>

          {/* INFOS */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                height: "100%",
                backgroundColor: isDark ? "#111111" : "#ffffff",
                border: isDark ? "1px solid #8b0000" : "none",
                boxShadow: isDark
                  ? "0 6px 25px rgba(139,0,0,0.4)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Informations personnelles
                </Typography>

                <Stack spacing={2}>
                  <Chip
                    icon={<BadgeIcon />}
                    label={`ID utilisateur : ${decoded?.sub || user?.id}`}
                  />

                  <Chip
                    icon={<EmailIcon />}
                    label={`Email : ${user?.email}`}
                  />

                  {decoded?.role && (
                    <Chip
                      icon={<SecurityIcon />}
                      label={`Rôle : ${decoded.role}`}
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* SESSION */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                height: "100%",
                backgroundColor: isDark ? "#111111" : "#ffffff",
                border: isDark ? "1px solid #8b0000" : "none",
                boxShadow: isDark
                  ? "0 6px 25px rgba(139,0,0,0.4)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Session & Sécurité
                </Typography>

                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Expiration du token
                    </Typography>
                    <Typography fontWeight="bold">
                      {formatDate(decoded?.exp)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Statut de la session
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={isExpired ? 0 : 100}
                      color={isExpired ? "error" : "primary"}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.1)"
                          : undefined,
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
