import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "./heroEditorialCarousel.css";

export default function HeroEditorialCarousel({ posts }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!posts || posts.length < 3) return null;

  return (
    <Swiper
      modules={[Autoplay]}
      loop
      centeredSlides
      spaceBetween={40}
      autoplay={{ delay: 4000 }}
      breakpoints={{
        0: { slidesPerView: 1.1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
      style={{
        width: "100%",
        padding: "60px 0",
      }}
    >
      {posts.slice(0, 6).map((post) => (
        <SwiperSlide key={post.id}>
          <Box
            onClick={() => navigate(`/blog/${post.id}`)}
            sx={{
              cursor: "pointer",
              height: "70vh",
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",

              border: isDark ? "1px solid #8b0000" : "none",

              boxShadow: isDark
                ? "0 10px 40px rgba(139,0,0,0.4)"
                : "0 10px 30px rgba(0,0,0,0.25)",

              transition: "all 0.4s ease",

              "&:hover .carousel-image": {
                transform: "scale(1.08)",
              },

              "&:hover": {
                boxShadow: isDark
                  ? "0 15px 60px rgba(139,0,0,0.6)"
                  : "0 15px 40px rgba(0,0,0,0.35)",
              },
            }}
          >
            {/* IMAGE */}
            <Box
              component="img"
              src={`https://picsum.photos/seed/${post.id}/1200/900`}
              alt={post.title}
              className="carousel-image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                position: "absolute",
                inset: 0,
              }}
            />

            {/* OVERLAY */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
                display: "flex",
                alignItems: "flex-end",
                p: 4,
                color: "#fff",
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {post.title}
                </Typography>

                <Box mt={2} display="flex" gap={1}>
                  <Chip
                    label="Article"
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
