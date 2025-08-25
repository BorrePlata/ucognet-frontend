// Ruta: /src/pagina/BlogContainer.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogPreview from "../componente/BlogPreview";
import { CircularProgress, Typography, Box, Grid } from "@mui/material";

export default function BlogContainer() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch("/assets/blogPosts.json");
        if (!response.ok) {
          throw new Error("Error al cargar las entradas del blog");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return (
    <Box padding="40px">
      <Typography variant="h4" align="center" gutterBottom>
        Últimas Entradas del Blog
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" padding="20px">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box display="flex" justifyContent="center" padding="20px">
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Box>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Link to={`/blog/${blog.slug}`} style={{ textDecoration: "none" }}>
                <BlogPreview post={blog} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
