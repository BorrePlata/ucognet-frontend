// src/pages/Template.js
import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

// Importación de componentes
import Slideshow from '../components/Slideshow';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';
import TeamSection from '../components/TeamSection';
import FullWidthBanner from '../components/FullWidthBanner';
import InfoCard from '../components/InfoCard';
import ServiceCard from '../components/ServiceCard';
import BubbleGallery from '../components/BubbleGallery';
import PricingCard from '../components/PricingCard'; // Importar el componente de paquete de servicio

// Íconos para ejemplos en las tarjetas
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PersonIcon from '@mui/icons-material/Person';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Configuración de imágenes y textos para el Slideshow
const images = [
  '/assets/images/example1.jpg',
  '/assets/images/example2.jpg',
  '/assets/images/example3.jpg',
];
const texts = [
  { line1: 'Innovación y Eficiencia', line2: 'Soluciones de IA para empresas' },
  { line1: 'Equipo Multidisciplinario', line2: 'Con experiencia y dedicación' },
  { line1: 'Tu Socio Tecnológico', line2: 'Transformación digital asegurada' },
];

// Configuración de miembros del equipo para TeamSection
const teamMembers = [
  { name: 'Edu Pons', role: 'Especialista en IA Generativa', image: '/assets/images/edu-pons.jpg' },
  { name: 'Samuel Plata', role: 'Experto en Marketing y Programación', image: '/assets/images/samuel-plata.jpg' },
];

// Configuración de imágenes para la galería de burbuja
const galleryImages = [
  { src: '/assets/images/gallery1.jpg', alt: 'Galería 1' },
  { src: '/assets/images/gallery2.jpg', alt: 'Galería 2' },
  { src: '/assets/images/gallery3.jpg', alt: 'Galería 3' },
];

// Configuración de paquetes de servicio
const packages = [
  {
    title: 'Trial Package',
    price: '8.39',
    unitPrice: '$0.0839',
    units: '100',
    features: [
      'Supports Text-to-Video, Image-to-Video, and Video Extension',
      'Supports Model V1.0 & V1.5',
      'Supports 3 concurrent sessions',
    ],
  },
  {
    title: 'Package 1 · 3 Months',
    price: '4200',
    unitPrice: '$0.14',
    units: '10000',
    features: [
      'Supports Text-to-Video, Image-to-Video, and Video Extension',
      'Supports Model V1.0 & V1.5',
      'Supports 5 concurrent sessions',
    ],
  },
  {
    title: 'Package 2 · 3 Months',
    price: '5670',
    unitPrice: '$0.126',
    units: '15000',
    features: [
      'Supports Text-to-Video, Image-to-Video, and Video Extension',
      'Supports Model V1.0 & V1.5',
      'Supports 5 concurrent sessions',
    ],
    discount: 10,
  },
  {
    title: 'Package 3 · 3 Months',
    price: '6720',
    unitPrice: '$0.112',
    units: '20000',
    features: [
      'Supports Text-to-Video, Image-to-Video, and Video Extension',
      'Supports Model V1.0 & V1.5',
      'Supports 5 concurrent sessions',
    ],
    discount: 20,
  },
];

export default function Template() {
  return (
    <Container>
      {/* Slideshow - Presentación de imágenes con texto */}
      <Slideshow images={images} texts={texts} />

      {/* Banner de ancho completo con texto destacado */}
      <FullWidthBanner text="Potencia tu negocio con soluciones personalizadas de IA" />

      {/* Sección de Información General */}
      <Box textAlign="center" padding="40px 0">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Bienvenidos a EfficientAI
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontWeight: 400, lineHeight: 1.8 }}>
          En EfficientAI, estamos comprometidos con la transformación digital de las empresas. Nuestro equipo
          multidisciplinario trabaja en el desarrollo de soluciones de inteligencia artificial que optimizan
          procesos y maximizan la eficiencia operativa.
        </Typography>
      </Box>

      {/* Sección de Cards de Información con íconos */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard
            icon={AccessTimeIcon}
            title="Disponibilidad 24/7"
            description="Ofrece atención al cliente en todo momento, sin interrupciones."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard
            icon={AutoAwesomeMotionIcon}
            title="Automatización de Procesos"
            description="Responde preguntas frecuentes, toma pedidos, gestiona citas y más, sin necesidad de intervención humana."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard
            icon={PersonIcon}
            title="Personalización Avanzada"
            description="Los chatbots están diseñados para adaptarse a la voz y estilo de tu marca."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard
            icon={WhatsAppIcon}
            title="Especialización en WhatsApp Bots"
            description="Automatizamos la plataforma más utilizada por tus clientes."
          />
        </Grid>
      </Grid>

      {/* Sección de Paquetes de Servicio */}
      <Box textAlign="center" padding="40px 0">
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Paquetes de Servicio
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <PricingCard
                title={pkg.title}
                price={pkg.price}
                unitPrice={pkg.unitPrice}
                units={pkg.units}
                features={pkg.features}
                discount={pkg.discount}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Resto de la página */}
      <TeamSection members={teamMembers} />
      <ContactForm />
      <NewsletterSection />
    </Container>
  );
}
