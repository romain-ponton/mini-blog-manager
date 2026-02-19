import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Alert } from "@mui/material";
import { postsAPI } from "../services/api";
import Loader from "../components/Loader";
import PostForm from "../components/PostForm";
import { Box, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


export default function PostDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [post, setPost] = useState(location.state?.post || null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(!location.state?.post);
  const [error, setError] = useState(null);

useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);

      let currentPost = post;

      if (!location.state?.post) {
        const postRes = await postsAPI.getById(id);
        currentPost = postRes.data;
        setPost(currentPost);
      }

      const commentsRes = await postsAPI.getComments(id);
      setComments(commentsRes.data.comments);

    } catch (err) {
      console.error(err);
      setError("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  load();
}, [id]);




  const handleUpdate = async (data) => {
    try {
      const res = await postsAPI.update(id, data);
      setPost(res.data);
      alert("Article modifié (simulation API)");
    } catch {
      alert("Modification impossible");
    }
  };
const handleDelete = async (id) => {
  try {
    await postsAPI.remove(id);
    navigate("/blog");
  } catch {
    alert("Suppression impossible");
  }
};

  if (loading) return <Loader />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Alert severity="warning">Article introuvable</Alert>;

return (
  <Box
    sx={{
      backgroundColor: theme.palette.background.default,
      minHeight: "100vh",
      py: 6,
    }}
  >
    <Container maxWidth="md">

      {/* IMAGE HERO */}
      <Box
        sx={{
          width: "100%",
          height: 350,
          borderRadius: 4,
          overflow: "hidden",
          mb: 4,
          position: "relative",
          border:
            theme.palette.mode === "dark"
              ? "1px solid #8b0000"
              : "none",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 40px rgba(139,0,0,0.4)"
              : "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <Box
          component="img"
          src={`https://picsum.photos/seed/${post.id}/1200/800`}
          alt={post.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
          }}
        />
      </Box>

      {/* TITLE */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 2,
          letterSpacing: -0.5,
          color:
            theme.palette.mode === "dark"
              ? "#ffffff"
              : "text.primary",
        }}
      >
        {post.title}
      </Typography>

      {/* BODY */}
      <Typography
        sx={{
          mt: 2,
          color:
            theme.palette.mode === "dark"
              ? "#cccccc"
              : "text.primary",
        }}
      >
        {post.body}
      </Typography>

      <Typography variant="h6" sx={{ mt: 5 }}>
        Modifier l'article
      </Typography>

      <PostForm
        initialData={post}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/blog")}
        onDelete={handleDelete}
      />

      {comments.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 5 }}>
            Commentaires
          </Typography>

          {comments.map((c) => (
            <Box
              key={c.id}
              sx={{
                mt: 2,
                p: 3,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid #8b0000"
                    : "none",
              }}
            >
              <Typography variant="body2">
                {c.body}
              </Typography>
            </Box>
          ))}
        </>
      )}
    </Container>
  </Box>
);


}
