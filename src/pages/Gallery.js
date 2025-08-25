import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import BubbleGallery from '../components/BubbleGallery';
import NewsletterSection from '../components/NewsletterSection';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const images = [
  { src: '/assets/images/gallery1.jpg', caption: 'Imagen 1' },
  { src: '/assets/images/gallery2.jpg', caption: 'Imagen 2' },
  { src: '/assets/images/gallery3.jpg', caption: 'Imagen 3' },
  { src: '/assets/images/gallery4.jpg', caption: 'Imagen 4' },
  { src: '/assets/images/gallery5.jpg', caption: 'Imagen 5' },
  { src: '/assets/images/gallery6.jpg', caption: 'Imagen 6' },
  { src: '/assets/images/gallery7.jpg', caption: 'Imagen 7' },
  { src: '/assets/images/gallery8.jpg', caption: 'Imagen 8' },
  { src: '/assets/images/gallery9.jpg', caption: 'Imagen 9' },
  { src: '/assets/images/gallery10.jpg', caption: 'Imagen 10' },
];

export default function GalleryPage() {
  return (
    <Container>
      {/* Título y Descripción */}
      <Box textAlign="center" my={5}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Galería Dinámica de Burbujas
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontWeight: 400, lineHeight: 1.8 }}>
          Explora nuestra colección visual que destaca los mejores momentos y proyectos. Cada burbuja cuenta una historia única.
        </Typography>
      </Box>

      {/* Galería */}
      <Box my={5}>
        <BubbleGallery images={images} />
      </Box>

      {/* Sección Contáctanos */}
      <Box textAlign="center" my={5}>
        <MailOutlineIcon color="primary" fontSize="large" />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, marginTop: 1 }}>
          ¿Interesado en colaborar con nosotros?
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontWeight: 400 }}>
          Contáctanos para discutir tus ideas o proyectos. Estamos aquí para ayudarte a dar vida a tus visiones.
        </Typography>
        <Button variant="contained" color="primary" startIcon={<MailOutlineIcon />}>
          Contáctanos
        </Button>
      </Box>

      {/* Sección Newsletter */}
      <NewsletterSection />
    </Container>
  );
}
