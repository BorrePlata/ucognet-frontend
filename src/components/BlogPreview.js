import React from "react";
import { Box, Typography, Button, Card, CardContent, Container } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Slideshow from "./Slideshow"; // Importar el componente de Slideshow

// Contenedor principal de la tarjeta
const BlogCard = styled(Card)({
  borderRadius: "15px",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  margin: "50px 0", // Espaciado superior e inferior
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.5)",
  },
});

// Contenedor para imágenes o slideshow
const ImageContainer = styled(Box)({
  position: "relative",
  height: "300px",
  overflow: "hidden",
  backgroundColor: "#000", // Fondo negro como fallback
});

// Contenedor para el contenido textual
const BlogContent = styled(CardContent)({
  textAlign: "center",
  padding: "30px 20px",
});

// Botón estilizado
const ReadMoreButton = styled(Button)({
  marginTop: "20px",
  color: "#FFFFFF",
  backgroundColor: "#007BFF",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

export default function BlogPreview({ post }) {
  return (
    <Container>
      <BlogCard>
        {/* Imagen o slideshow */}
        <ImageContainer>
          {post.sliderImages && post.sliderImages.length > 1 ? (
            <Slideshow
              images={post.sliderImages}
              texts={[{ line1: post.title, line2: post.description }]}
              autoPlay={true}
              interval={4000}
            />
          ) : (
            <img
              src={post.previewImage || "/assets/images/default.jpg"}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </ImageContainer>

        {/* Contenido textual */}
        <BlogContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            {post.title}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 400, lineHeight: 1.8 }}>
            {post.description}
          </Typography>
          <ReadMoreButton
            component={Link}
            to={`/blog/${post.slug}`}
            variant="contained"
          >
            Leer más
          </ReadMoreButton>
        </BlogContent>
      </BlogCard>
    </Container>
  );
}
