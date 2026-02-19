import {
  Card,
  Typography,
  CardActionArea,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        height: 320,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        backgroundColor: isDark ? "#111111" : "#ffffff",
        border: isDark ? "1px solid #8b0000" : "none",
        boxShadow: isDark
          ? "0 4px 25px rgba(139,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: isDark
            ? "0 8px 40px rgba(139,0,0,0.6)"
            : "0 8px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() =>
          navigate(`/blog/${post.id}`, { state: { post } })
        }
      >
        {/* IMAGE */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 170,
          }}
        >
          <Box
            component="img"
            src={`https://picsum.photos/seed/${post.id}/600/400`}
            alt={post.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

         
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: isDark ? "#ffffff" : "text.primary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </Typography>
          <ChatBubbleOutlineIcon
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              fontSize: 24,
              color: "white",
              backgroundColor: isDark
                ? "#8b0000"
                : "rgba(0,0,0,0.6)",
              borderRadius: "50%",
              padding: "6px",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isDark ? "#cccccc" : "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.body}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
