import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Alert,
  Pagination,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Skeleton
} from "@mui/material";

import { postsAPI } from "../services/api";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import HeroEditorialCarousel from "../components/HeroEditorialCarousel";
import { useTheme } from "@mui/material/styles";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const postsPerPage = 12;
  const theme = useTheme();

 useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await postsAPI.getAll({ limit: 30 });

      const formatted = res.data.posts.map((p) => ({
        ...p,
        commentCount: p.reactions ?? 0, // ou 0 si tu veux
      }));

      setPosts(formatted);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les articles.");
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);


  const handleCreate = async (formData) => {
    try {
      const res = await postsAPI.create({
        ...formData,
        userId: 1,
      });

      const newPost = {
        id: res.data.id,
        title: res.data.title,
        body: res.data.body,
        userId: res.data.userId,
        commentCount: 0,
      };

      setPosts((prev) => [newPost, ...prev]);
      setOpen(false);
    } catch {
      alert("Erreur lors de la création");
    }
  };

  const handlePageChange = (event, value) => {
    if (value === page) return;

    setPageLoading(true);

    setTimeout(() => {
      setPage(value);
      setPageLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const start = (page - 1) * postsPerPage;
  const currentPosts = posts.slice(start, start + postsPerPage);

  // 🔹 Skeleton initial
  if (loading) {
    return (
      <Box sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <Skeleton variant="text" height={60} width={300} />

          <Grid container spacing={4} mt={2}>
            {Array.from(new Array(postsPerPage)).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rounded" height={220} animation="wave" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="xl">

        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h3" fontWeight="bold" letterSpacing={-1}>
            Latest Articles
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              px: 3,
              py: 1.2,
              fontWeight: "bold",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 6px 20px rgba(139,0,0,0.5)"
                  : undefined,
            }}
          >
            Nouvel article
          </Button>
        </Box>

        {/* CAROUSEL */}
        {posts.length > 2 && (
          <Box mb={8}>
            <HeroEditorialCarousel posts={posts} />
          </Box>
        )}

        {/* POSTS GRID */}
        {pageLoading ? (
          <Grid container spacing={4}>
            {Array.from(new Array(postsPerPage)).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rounded" height={220} animation="wave" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={4}>
            {currentPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* PAGINATION */}
        <Box mt={6} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: "bold",
              },
              "& .Mui-selected": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 15px rgba(139,0,0,0.6)"
                    : "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          />
        </Box>

        {/* DIALOG */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Créer un article</DialogTitle>
          <DialogContent>
            <PostForm
              onSubmit={handleCreate}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>

      </Container>
    </Box>
  );
}
