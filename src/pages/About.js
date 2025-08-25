import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import Slideshow from '../components/Slideshow';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';
import TeamSection from '../components/TeamSection';
import InfoCard from '../components/InfoCard';

// Importación de íconos
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Importación de imágenes
import about1 from '../assets/images/about1.jpg';
import about2 from '../assets/images/about2.jpg';
import about3 from '../assets/images/about3.jpg';
import eduPons from '../assets/images/edu-pons.jpg';
import samuelPlata from '../assets/images/samuel-plata.jpg';
import estebanProgramador from '../assets/images/esteban.jpg';
import eshmaPlata from '../assets/images/eshma.jpg';

// Configuración de imágenes y textos para el Slideshow
const images = [about1, about2, about3];
const texts = [
  { line1: 'Innovación y Eficiencia', line2: 'Soluciones de IA para empresas' },
  { line1: 'Equipo Multidisciplinario', line2: 'Con experiencia y dedicación' },
  { line1: 'Tu Socio Tecnológico', line2: 'Transformación digital asegurada' },
];

// Configuración de miembros del equipo
const teamMembers = [
  { name: 'Edu Pons', role: 'Especialista en IA Generativa', image: eduPons },
  { name: 'Samuel Plata', role: 'Desarrollador de Inteligencia Artificial', image: samuelPlata },
  { name: 'Esteban', role: 'Especialista en programación', image: estebanProgramador },
  { name: 'Eshma Plata', role: 'Experta en Marketing y Programación', image: eshmaPlata },
];

// Configuración de servicios o ventajas
const services = [
  {
    icon: SchoolIcon,
    title: 'Formaciones Personalizadas',
    description: 'Diseñadas específicamente para los objetivos y necesidades de tu empresa.',
  },
  {
    icon: GroupIcon,
    title: 'Equipo Experto',
    description: 'Combinamos experiencia en IA y marketing para ofrecerte soluciones que generan un impacto significativo en tu empresa.',
  },
  {
    icon: AccessTimeIcon,
    title: 'Disponibilidad 24/7',
    description: 'Nos adaptamos a tu ritmo, brindando soporte y servicios en el momento que lo necesites.',
  },
  {
    icon: VerifiedUserIcon,
    title: 'Certificación y Seguimiento',
    description: 'Certificamos a tu equipo tras la formación y brindamos seguimiento para garantizar su éxito.',
  },
];

export default function About() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        {/* Slideshow - Presentación visual */}
        <Slideshow images={images} texts={texts} />

        {/* Historia de EfficientAI */}
        <Box textAlign="center" sx={{ padding: '40px 20px' }}>
          <Typography variant="h4" gutterBottom>Sobre EfficientAI</Typography>
          <Typography variant="body1" paragraph>
            En <strong>EfficientAI</strong>, no solo cruzamos fronteras geográficas, sino también las de la innovación tecnológica.
            Nacimos de una pasión compartida por revolucionar la eficiencia empresarial. <strong>Edu Pons</strong>, desde España, aporta su experiencia
            en inteligencia artificial generativa y estrategia comercial. <strong>Samuel Plata</strong>, desde México, contribuye con su especialización
            en marketing y programación. En septiembre de 2024, unimos fuerzas para fundar EfficientAI, transformando la manera en que las empresas gestionan su tiempo y recursos.
          </Typography>
        </Box>

        {/* Nuestra Visión */}
        <Box
          textAlign="center"
          sx={{
            padding: '40px 20px',
            bgcolor: '#1976d2',
            color: 'white',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h5" gutterBottom>Nuestra Visión</Typography>
          <Typography variant="body1" paragraph>
            En <strong>EfficientAI</strong>, creemos en un futuro donde la inteligencia artificial no solo optimice procesos, sino que también impulse la creatividad y la
            innovación humana. Nuestra misión es empoderar a las empresas para que adopten tecnologías avanzadas de manera accesible, ética y eficiente.
          </Typography>
        </Box>

        {/* Sección de Servicios o Ventajas */}
        <Box textAlign="center" sx={{ padding: '40px 20px' }}>
          <Typography variant="h5" gutterBottom>Nuestros Servicios</Typography>
          <Grid container spacing={3} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <InfoCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sección del Equipo */}
        <Box textAlign="center" sx={{ padding: '40px 20px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>Conoce a Nuestro Equipo</Typography>
          <TeamSection members={teamMembers} />
        </Box>

        {/* Sección de Contacto */}
        <Box textAlign="center" sx={{ padding: '40px 20px' }}>
          <Typography variant="h5" gutterBottom>Contáctanos</Typography>
          <Typography variant="body1" paragraph>
            Estamos aquí para ayudarte. Completa el formulario de contacto y nuestro equipo se pondrá en contacto contigo lo antes posible.
          </Typography>
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
