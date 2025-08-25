import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import Slideshow from '../components/Slideshow';
import NewsletterSection from '../components/NewsletterSection';

// Importación de imágenes
import blog1 from '../assets/images/blog1.jpg';
import blog2 from '../assets/images/blog2.jpg';
import blog3 from '../assets/images/blog3.jpg';

// Datos del Slideshow
const images = [blog1, blog2, blog3];
const texts = [
  { line1: 'Explora nuestras ideas', line2: 'Noticias sobre IA y más' },
  { line1: 'Innovación continua', line2: 'Tecnología en movimiento' },
  { line1: 'Conecta con el futuro', line2: 'Soluciones y consejos prácticos' },
];

// Estilo de la sección
const Section = styled(Box)({
  padding: '40px 0',
  textAlign: 'center',
});

const Title = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 700,
  textAlign: 'center',
});

// Diseño de las tarjetas de vidrio
const GlassCard = styled(Box)({
  backdropFilter: 'blur(15px)',
  background: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  borderRadius: '20px',
  overflow: 'hidden',
  padding: '20px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
  },
  position: 'relative',
});

const BlogContent = styled(Typography)({
  color: '#FFFFFF',
  fontSize: '16px',
});

// Estilo del ícono de flecha
const ArrowIcon = styled(ArrowForwardIcon)({
  position: 'absolute',
  bottom: '15px',
  right: '15px',
  color: '#FFFFFF',
  fontSize: '24px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
  },
});

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/assets/blogPosts.json');
        if (!response.ok) {
          throw new Error('Error al cargar las entradas del blog');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        {/* Slideshow */}
        <Slideshow images={images} texts={texts} />

        {/* Título de la Página */}
        <Section>
          <Title variant="h4">Bienvenidos a Nuestro Blog</Title>
          <Typography variant="body1" paragraph>
            Descubre las últimas tendencias en inteligencia artificial, innovación y desarrollo tecnológico.
          </Typography>
        </Section>

        {/* Listado de Entradas del Blog */}
        {loading ? (
          <Box display="flex" justifyContent="center" marginTop="20px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box marginTop="20px">
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {blogPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <GlassCard>
                    <img
                      src={post.previewImage}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        marginBottom: '15px',
                      }}
                    />
                    <Typography variant="h6" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                      {post.title}
                    </Typography>
                    <BlogContent>{post.description}</BlogContent>
                    {/* Flecha indicadora */}
                    <ArrowIcon />
                  </GlassCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Sección Newsletter */}
        <Box sx={{ marginTop: '40px' }}>
          <NewsletterSection />
        </Box>
      </Container>
    </Box>
  );
}
