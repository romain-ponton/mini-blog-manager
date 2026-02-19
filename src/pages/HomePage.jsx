import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  CircularProgress
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import HeroEditorialCarousel from "../components/HeroEditorialCarousel";
import { postsAPI } from "../services/api";

export default function HomePage() {
  const navigate = useNavigate();
const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await postsAPI.getAll({ limit: 6 });
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const items = [
    {
      title: "Blog",
      icon: <ArticleIcon sx={{ fontSize: 30 }} />,
      path: "/blog",
    },
    {
      title: "Profil",
      icon: <PersonIcon sx={{ fontSize: 30 }} />,
      path: "/profile",
    },
    {
      title: "Connexion",
      icon: <LoginIcon sx={{ fontSize: 30 }} />,
      path: "/login",
    },
  ];

if (loading) {
  return (
    <Box sx={{ p: 6 }}>
      <Grid container spacing={3}>
        {Array.from(new Array(3)).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton
              variant="rounded"
              height={120}
              animation="wave"
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={8}>
        <Skeleton variant="rounded" height={400} animation="wave" />
      </Box>
    </Box>
  );
}



 return (
  <Box sx={{  backgroundColor: theme.palette.background.default, py: 6, width: "100%" }}>
    <Container maxWidth="xl">

      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          letterSpacing={-1}
        >
          Mini Blog Manager
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          Authentification, CRUD et interface moderne
        </Typography>
      </Box>

      {/* ACTION CARDS */}
      <Grid container spacing={3} justifyContent="center">
        {items.map((item, index) => (
          <Grid
      key={item.path}
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
    >
            <Card
  sx={{
    height: 120,
    borderRadius: 4,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 25px rgba(139,0,0,0.4)"
        : "0 4px 20px rgba(0,0,0,0.05)",

    transition: "0.3s",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 8px 35px rgba(139,0,0,0.6)"
          : "0 8px 25px rgba(0,0,0,0.08)",
    },
  }}
>

              <CardActionArea
                onClick={() => navigate(item.path)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {item.icon}
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mt={1}
                >
                  {item.title}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CAROUSEL EN BAS */}
      {posts.length > 2 && (
        <Box mt={8}>
          <HeroEditorialCarousel posts={posts} />
        </Box>
      )}

    </Container>
  </Box>
);

}
