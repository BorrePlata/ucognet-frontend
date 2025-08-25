import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import NewsletterSection from '../components/NewsletterSection';
import ContactForm from '../components/ContactForm';
import FullWidthBanner from '../components/FullWidthBanner';
import Slideshow from '../components/Slideshow';
import {
  AccessTime as AccessTimeIcon,
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  Person as PersonIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';

// Configuración de imágenes y textos para el Slideshow
import chatbot1 from '../assets/images/chatbot1.jpg';
import chatbot2 from '../assets/images/chatbot2.jpg';
import chatbot3 from '../assets/images/chatbot3.jpg';

const images = [chatbot1, chatbot2, chatbot3];
const texts = [
  { line1: 'Chatbots Innovadores', line2: 'Automatización avanzada para tu empresa' },
  { line1: 'Disponibilidad 24/7', line2: 'Atiende a tus clientes sin interrupciones' },
  { line1: 'WhatsApp y más', line2: 'Integra en las plataformas que tus clientes usan' },
];

// Datos de beneficios
const benefits = [
  {
    icon: AccessTimeIcon,
    title: 'Disponibilidad 24/7',
    description: 'Ofrece atención al cliente en todo momento, sin interrupciones.',
  },
  {
    icon: AutoAwesomeMotionIcon,
    title: 'Automatización de Procesos',
    description: 'Responde preguntas frecuentes, toma pedidos, gestiona citas y más, sin necesidad de intervención humana.',
  },
  {
    icon: PersonIcon,
    title: 'Personalización Avanzada',
    description: 'Los chatbots están diseñados para adaptarse a la voz y estilo de tu marca, proporcionando respuestas personalizadas.',
  },
  {
    icon: WhatsAppIcon,
    title: 'Especialización en WhatsApp Bots',
    description: 'Te ayudamos a automatizar una de las plataformas más utilizadas por tus clientes.',
  },
];

export default function ChatBots() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        {/* Slideshow Principal */}
        <Slideshow images={images} texts={texts} />

        {/* Banner Principal */}
        <FullWidthBanner text="Potencia tu negocio con un chatbot personalizado" />

        {/* Título y Descripción */}
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle title="Chatbots Inteligentes" subtitle="Mejora la atención al cliente con IA" />
          <Typography variant="body1" paragraph>
            Los chatbots inteligentes permiten a tu negocio ofrecer un servicio de atención al cliente constante, 
            automatizado y adaptado a las necesidades de tus usuarios. Descubre cómo un chatbot personalizado puede 
            mejorar la experiencia de tus clientes y optimizar tus procesos.
          </Typography>
        </Box>

        {/* Beneficios de Chatbots */}
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom>
            Beneficios de nuestros Chatbots
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {benefits.map((benefit, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <ServiceCard
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Formulario de Contacto */}
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle
            title="Contáctanos para saber más"
            subtitle="Estamos aquí para ayudarte a implementar tu chatbot"
          />
          <ContactForm />
        </Box>

        {/* Sección de Newsletter */}
        <Box sx={{ marginTop: '40px' }}>
          <NewsletterSection />
        </Box>
      </Container>

      {/* Espacio Adicional */}
      <Box sx={{ height: '100px' }} />
    </Box>
  );
}
