import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Estilos consistentes con otras páginas
const Container = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 20px',
  color: '#FFFFFF',
});

const SectionContainer = styled(Box)({
  marginBottom: '40px',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
});

const SectionImage = styled('img')({
  width: '100%',
  borderRadius: '10px',
  marginTop: '20px',
});

const ImageGallery = styled(Grid)({
  marginTop: '20px',
  gap: '10px',
});

const QuoteBox = styled(Box)({
  fontStyle: 'italic',
  fontSize: '1.2rem',
  color: '#FFD700',
  padding: '10px 20px',
  marginTop: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderLeft: '5px solid #FFD700',
});

const RelatedArticle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '10px',
  textDecoration: 'none',
  color: '#FFFFFF',
  '& img': {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  '&:hover': {
    color: '#FFD700',
  },
});

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/assets/blogPosts.json`);
        if (!response.ok) {
          throw new Error('Error al cargar las entradas del blog');
        }
        const data = await response.json();

        const selectedBlog = data.find((item) => item.slug === slug);

        if (!selectedBlog) {
          throw new Error('Artículo no encontrado');
        }

        setBlog(selectedBlog);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" padding="20px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" padding="20px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Por {blog.author} - {new Date(blog.date).toLocaleDateString()}
      </Typography>
      {blog.content?.header?.backgroundImage && (
        <img
          src={blog.content.header.backgroundImage}
          alt={blog.title}
          style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
        />
      )}
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        {blog.content?.header?.heading}
      </Typography>
      <Typography variant="body1" paragraph>
        {blog.content?.header?.subheading}
      </Typography>

      {/* Renderizar secciones */}
      {blog.content?.sections?.map((section, index) => (
        <SectionContainer key={index}>
          <Typography variant="h5" gutterBottom>
            {section.heading}
          </Typography>
          <Typography variant="body1" paragraph>
            {section.text}
          </Typography>
          {section.image && <SectionImage src={section.image} alt={section.heading} />}
          {section.imageGallery && (
            <ImageGallery container spacing={2}>
              {section.imageGallery.map((img, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <SectionImage src={img} alt={`Gallery ${idx}`} />
                </Grid>
              ))}
            </ImageGallery>
          )}
          {section.quote && <QuoteBox>{section.quote}</QuoteBox>}
        </SectionContainer>
      ))}

      {/* Call to Action */}
      {blog.content?.sections?.some((sec) => sec.callToAction) && (
        <Box textAlign="center" marginTop="40px">
          <Button
            variant="contained"
            color="primary"
            href={blog.content.sections.find((sec) => sec.callToAction)?.callToAction.link}
          >
            {blog.content.sections.find((sec) => sec.callToAction)?.callToAction.text}
          </Button>
        </Box>
      )}

      <Divider style={{ margin: '40px 0', backgroundColor: '#FFD700' }} />

      {/* Artículos relacionados */}
      {blog.content?.footer?.relatedArticles?.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Artículos relacionados
          </Typography>
          {blog.content.footer.relatedArticles.map((article, idx) => (
            <RelatedArticle key={idx} component={Link} to={`/blog/${article.slug}`}>
              <img src={article.image} alt={article.title} />
              <Typography>{article.title}</Typography>
            </RelatedArticle>
          ))}
        </Box>
      )}
    </Container>
  );
}
