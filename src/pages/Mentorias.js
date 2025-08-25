import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import NewsletterSection from '../components/NewsletterSection';
import FullWidthBanner from '../components/FullWidthBanner';
import Slideshow from '../components/Slideshow';
import {
  Handshake as HandshakeIcon,
  Insights as InsightsIcon,
  RocketLaunch as RocketLaunchIcon,
} from '@mui/icons-material';

// Configuración de imágenes y textos para el Slideshow
import mentoria1 from '../assets/images/mentoria1.jpg';
import mentoria2 from '../assets/images/mentoria2.jpg';
import mentoria3 from '../assets/images/mentoria3.jpg';

const images = [mentoria1, mentoria2, mentoria3];
const texts = [
  { line1: 'Mentorías 1a1', line2: 'Impulsa tu negocio con IA' },
  { line1: 'Diagnóstico y Estrategia', line2: 'Soluciones adaptadas a tus necesidades' },
  { line1: 'Implementación Real', line2: 'Lleva tus proyectos al siguiente nivel' },
];

// Datos de las sesiones
const sessions = [
  {
    icon: HandshakeIcon,
    title: 'Sesión 1: Diagnóstico Inicial',
    description:
      'Comprendemos tus procesos actuales, identificamos desafíos y establecemos objetivos clave para la transformación con IA.',
  },
  {
    icon: InsightsIcon,
    title: 'Sesión 2: Análisis y Estrategia',
    description:
      'Exploramos áreas específicas donde la IA puede tener el mayor impacto y diseñamos una estrategia personalizada.',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Sesión 3: Plan de Acción',
    description:
      'Te presentamos soluciones prácticas de IA y un plan detallado para integrarlas eficazmente en tu negocio.',
  },
];

// Lista de beneficios
const benefits = [
  'Ahorra hasta un 70% del tiempo dedicado a tareas repetitivas.',
  'Aumenta la eficiencia y productividad de tu equipo.',
  'Reduce costos operativos mediante la automatización inteligente.',
  'Mejora la toma de decisiones con análisis basados en IA.',
  'Obtén una ventaja competitiva en tu sector.',
  'Libera tiempo para enfocarte en estrategias de crecimiento.',
];

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  padding: '1rem 3rem',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  borderRadius: '30px',
  boxShadow: theme.shadows[2],
  marginTop: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

export default function Mentorias() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px', textAlign: 'center' }}>
      <Container>
        {/* Slideshow Principal */}
        <Slideshow images={images} texts={texts} />

        {/* Banner Principal */}
        <FullWidthBanner text="Impulsa tu negocio con el poder de la Inteligencia Artificial" />

        {/* Título y Descripción */}
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle
            title="Mentoría 1a1 EfficientAI"
            subtitle="Aprovecha el poder de la IA Generativa para transformar tu negocio"
          />
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: '1.8', fontWeight: 400 }}>
            En EfficientAI, entendemos los desafíos que enfrentan las empresas y autónomos en el mundo digital actual.
            Nuestra Mentoría 1a1 está diseñada específicamente para ayudarte a automatizar tareas repetitivas, ahorrar
            tiempo valioso y enfocarte en lo que realmente importa: hacer crecer tu negocio.
          </Typography>
        </Box>

        {/* ¿A quién va dirigido? */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            ¿A quién va dirigido?
          </Typography>
          <Typography variant="body1" paragraph>
            Nuestra mentoría está especialmente diseñada para:
          </Typography>
          <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px', lineHeight: '1.8', fontWeight: 400 }}>
            <li>Pequeñas y medianas empresas que buscan optimizar sus procesos.</li>
            <li>Autónomos y freelancers que desean maximizar su productividad.</li>
            <li>Emprendedores que quieren incorporar la IA en sus modelos de negocio.</li>
            <li>Profesionales que buscan mantenerse a la vanguardia de la tecnología.</li>
          </ul>
        </Box>

        {/* ¿Qué ofrecemos? */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            ¿Qué ofrecemos?
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {sessions.map((session, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <ServiceCard
                  icon={session.icon}
                  title={session.title}
                  description={session.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Beneficios */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Beneficios de nuestra Mentoría
          </Typography>
          <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px', lineHeight: '1.8', fontWeight: 400 }}>
            {benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </Box>

        {/* Llamado a la Acción */}
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, marginBottom: '10px' }}>
            Invierte en el futuro de tu negocio
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: '1.2rem', fontWeight: 500, color: 'inherit', lineHeight: '1.8' }}
          >
            Transforma tu empresa con el poder de la IA por tan solo <strong>99€</strong> en un único pago.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 400 }}>
            Además, disfruta de un <strong>10% de descuento</strong> en futuros proyectos realizados por EfficientAI.
          </Typography>
          <CTAButton
            onClick={() =>
              window.location.href = 'https://checkout.revolut.com/pay/19747ebe-3eb2-4966-ba24-71f836810bf3'
            }
          >
            ¡Reserva tu mentoría ahora!
          </CTAButton>
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
