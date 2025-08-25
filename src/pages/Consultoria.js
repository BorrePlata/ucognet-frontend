import React from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import ServiceCard from '../components/ServiceCard';
import Slideshow from '../components/Slideshow';
import NewsletterSection from '../components/NewsletterSection';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

// Íconos para las tarjetas
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BuildIcon from '@mui/icons-material/Build';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import UpdateIcon from '@mui/icons-material/Update';

// Imágenes para el slideshow
import slide1 from '../assets/images/consultoria1.jpg';
import slide2 from '../assets/images/consultoria2.jpg';
import slide3 from '../assets/images/consultoria3.jpg';

export default function Consultoria() {
  const images = [slide1, slide2, slide3];
  const texts = [
    { line1: "Consultoría en IA", line2: "Transforma tu negocio" },
    { line1: "Optimización de Procesos", line2: "Aumenta la eficiencia con IA" },
    { line1: "Soluciones Personalizadas", line2: "Diseñadas para tu empresa" },
  ];

  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        {/* Slideshow */}
        <Slideshow images={images} texts={texts} autoPlay={true} interval={3000} />

        {/* Título y Descripción */}
        <Box textAlign="center" my={5}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Consultoría en IA: Lleva tu negocio al siguiente nivel
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 400, lineHeight: 1.8 }}>
            En EfficientAI, te ayudamos a identificar cómo la inteligencia artificial puede transformar y optimizar tu empresa.
            Creamos estrategias personalizadas que se adaptan a tus necesidades específicas para maximizar resultados.
          </Typography>
        </Box>

        {/* Proceso de Consultoría */}
        <Box textAlign="center" my={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            ¿Cómo funciona nuestra consultoría?
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <ServiceCard
                icon={AssessmentIcon}
                title="Análisis de Necesidades"
                description="Realizamos un diagnóstico detallado de tus procesos actuales."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ServiceCard
                icon={TrackChangesIcon}
                title="Estrategias Personalizadas"
                description="Creamos un plan estratégico basado en las mejores prácticas de IA."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ServiceCard
                icon={BuildIcon}
                title="Implementación y Seguimiento"
                description="Te acompañamos en todo el proceso de implementación."
              />
            </Grid>
          </Grid>
        </Box>

        {/* Beneficios de nuestra consultoría */}
        <Box textAlign="center" my={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Beneficios de nuestra consultoría
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={3}>
              <ServiceCard
                icon={PersonAddAltIcon}
                title="Soluciones a Medida"
                description="Diseñadas específicamente para las particularidades de tu empresa."
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ServiceCard
                icon={AccessTimeIcon}
                title="Mejora de la Eficiencia"
                description="Reducción de tiempos y optimización de recursos mediante IA."
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ServiceCard
                icon={ContactMailIcon}
                title="Acompañamiento Completo"
                description="Desde el análisis inicial hasta la implementación."
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ServiceCard
                icon={UpdateIcon}
                title="Actualizaciones Constantes"
                description="Nos aseguramos de que las soluciones implementadas evolucionen contigo."
              />
            </Grid>
          </Grid>
        </Box>

        {/* Sección Contáctanos */}
        <Box textAlign="center" my={5}>
          <MailOutlineIcon color="primary" fontSize="large" />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, marginTop: 1 }}>
            ¿Listo para transformar tu negocio?
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 400 }}>
            Contáctanos hoy mismo y descubre cómo nuestra consultoría puede llevar a tu empresa al siguiente nivel.
          </Typography>
          <Button variant="contained" color="primary" startIcon={<MailOutlineIcon />}>
            Contáctanos
          </Button>
        </Box>

        {/* Sección Newsletter */}
        <Box sx={{ marginTop: '40px' }}>
          <NewsletterSection />
        </Box>
      </Container>

      {/* Espacio Adicional */}
      <Box sx={{ height: '100px' }} />
    </Box>
  );
}
