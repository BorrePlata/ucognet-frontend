import React, { useState } from 'react';
import { Container, Box, Typography, Button, Modal } from '@mui/material';
import Slideshow from '../components/Slideshow';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';

// Importar imágenes del slideshow
import image1 from '../assets/images/chatbot1.jpg';
import image2 from '../assets/images/chatbot2.jpg';
import image3 from '../assets/images/chatbot3.jpg';

export default function Contact() {
  const [openModal, setOpenModal] = useState(false);

  const handleModalToggle = () => {
    setOpenModal((prev) => !prev);
  };

  // Imágenes y textos del Slideshow
  const images = [image1, image2, image3];
  const texts = [
    { line1: "Contáctanos", line2: "Estamos aquí para ayudarte" },
    { line1: "Nuestra Ubicación", line2: "Granada, España" },
    { line1: "Soluciones Innovadoras", line2: "Hablemos de tus proyectos" },
  ];

  const googleMapsUrl =
    'https://www.google.com/maps/place/Calle+Estrella+2,+18210+Peligros,+Granada,+España/';
  const staticMapUrl =
    'https://maps.googleapis.com/maps/api/staticmap?center=37.22928487224396,-3.628161159609433&zoom=15&size=600x300&markers=color:red%7Clabel:A%7C37.22928487224396,-3.628161159609433';

  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        {/* Slideshow */}
        <Slideshow images={images} texts={texts} autoPlay={true} interval={3000} />

        {/* Título y descripción */}
        <Box textAlign="center" padding="40px 0">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Contáctanos
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 400, color: '#b0b0b0' }}>
            ¿Tienes preguntas? ¡Estamos aquí para ayudarte!
          </Typography>
        </Box>

        {/* Detalles de contacto */}
        <Box textAlign="center" marginTop="20px">
          <Typography variant="body1">
            Dirección: C/ Estrella 2, 2ºB, 18210 Peligros, Granada
          </Typography>
          <Typography variant="body1">Correo: info@efficientai.es</Typography>
          <Typography variant="body1">Teléfono: +34 123 456 789</Typography>
        </Box>

        {/* Mapa */}
        <Box
          sx={{
            marginTop: '40px',
            marginBottom: '40px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}
        >
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={staticMapUrl}
              alt="Mapa de la ubicación"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </a>
          <Typography variant="caption" sx={{ display: 'block', marginTop: '10px', color: '#b0b0b0' }}>
            Haz clic en el mapa para abrir en Google Maps
          </Typography>
        </Box>

        {/* Botón para abrir el formulario de contacto */}
        <Box textAlign="center" marginTop="40px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalToggle}
            sx={{
              backgroundColor: '#5E61F4',
              color: '#FFFFFF',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#4A51C9' },
            }}
          >
            Abrir Formulario de Contacto
          </Button>
        </Box>

        {/* Modal con formulario */}
        <Modal open={openModal} onClose={handleModalToggle}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              width: { xs: '90%', sm: '60%', md: '40%' },
            }}
          >
            <ContactForm />
          </Box>
        </Modal>

        {/* Sección de Newsletter */}
        <Box sx={{ marginTop: '40px' }}>
          <NewsletterSection />
        </Box>
      </Container>
    </Box>
  );
}
