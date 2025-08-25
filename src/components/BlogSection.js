import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const BlogCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '30px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '12px',
});

const BlogImageContainer = styled(Box)({
  position: 'relative',
  height: '200px',
  overflow: 'hidden',
});

const SlideshowImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.5s ease',
  borderRadius: '12px 12px 0 0',
});

const SlideshowButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

const BlogContent = styled(CardContent)({
  padding: '20px',
});

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    // Cargar las entradas del blog
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/assets/blogPosts.json`);
        if (!response.ok) {
          throw new Error('Error al cargar las entradas del blog');
        }
        const data = await response.json();
        setBlogPosts(data);
        setCurrentImageIndex(
          data.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {})
        ); // Inicializa los índices de las imágenes para cada entrada
      } catch (error) {
        console.error('Error al cargar las entradas del blog:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleNextImage = (index) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [index]:
        (prevIndex[index] + 1) % blogPosts[index].sliderImages.length,
    }));
  };

  const handlePrevImage = (index) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [index]:
        (prevIndex[index] - 1 + blogPosts[index].sliderImages.length) %
        blogPosts[index].sliderImages.length,
    }));
  };

  return (
    <Box padding="40px 0">
      <Typography variant="h5" gutterBottom>
        Últimas Entradas del Blog
      </Typography>
      <Typography variant="body1" paragraph>
        Explora nuestros artículos más recientes sobre inteligencia artificial y sostenibilidad.
      </Typography>

      {blogPosts.length > 0 ? (
        blogPosts.map((post, index) => (
          <BlogCard key={post.id}>
            <BlogImageContainer>
              {post.sliderImages && post.sliderImages.length > 1 ? (
                <>
                  <SlideshowImage
                    src={post.sliderImages[currentImageIndex[index]]}
                    alt={post.title}
                  />
                  <SlideshowButton
                    onClick={() => handlePrevImage(index)}
                    style={{ left: '10px' }}
                  >
                    <ArrowBack />
                  </SlideshowButton>
                  <SlideshowButton
                    onClick={() => handleNextImage(index)}
                    style={{ right: '10px' }}
                  >
                    <ArrowForward />
                  </SlideshowButton>
                </>
              ) : (
                <SlideshowImage
                  src={post.sliderImages?.[0] || '/assets/images/default.jpg'}
                  alt={post.title}
                />
              )}
            </BlogImageContainer>
            <BlogContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" paragraph>
                {post.description}
              </Typography>
              <Button
                variant="text"
                color="primary"
                href={`/blog/${post.slug}`}
              >
                Leer más
              </Button>
            </BlogContent>
          </BlogCard>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No hay entradas de blog disponibles en este momento.
        </Typography>
      )}
    </Box>
  );
}
