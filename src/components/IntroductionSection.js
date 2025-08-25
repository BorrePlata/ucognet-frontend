// src/components/IntroductionSection.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../theme';

const Section = styled(Box)({
  padding: '40px 0',
  backgroundColor: colors.background,
  color: colors.textPrimary,
  textAlign: 'center',
});

const Highlight = styled('span')({
  fontWeight: 700, // Resalta palabras clave
  color: colors.secondary,
});

const ListItem = styled('li')({
  fontSize: '1.1rem',
  lineHeight: '1.8',
  fontWeight: 500,
  color: colors.textSecondary,
  marginBottom: '10px',
  '&::marker': {
    color: colors.primary, // Color de los puntos de la lista
    fontSize: '1.2rem',
  },
});

export default function IntroductionSection() {
  return (
    <Section>
      <Typography variant="h4" gutterBottom>
        <Highlight>EfficientAI</Highlight>: Soluciones de IA para <Highlight>Empresas</Highlight> y <Highlight>Autónomos</Highlight>
      </Typography>
      <Typography variant="body1" paragraph>
        En <Highlight>EfficientAI</Highlight>, ayudamos a <strong>pymes</strong> y <strong>autónomos</strong> a optimizar sus operaciones mediante soluciones avanzadas de 
        <Highlight> inteligencia artificial</Highlight>, enfocadas en <strong>automatizar tareas repetitivas</strong> y mejorar la <strong>productividad</strong>. 
        Con más de <strong>10 años de experiencia</strong>, ofrecemos <Highlight>soluciones personalizadas</Highlight> para sectores como:
      </Typography>
      <Box component="ul" sx={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <ListItem>
          <Highlight>Retail</Highlight>: Automatización de inventarios y mejora de la <strong>experiencia del cliente</strong>.
        </ListItem>
        <ListItem>
          <Highlight>Finanzas</Highlight>: Gestión de <strong>riesgos</strong> y atención al cliente inteligente.
        </ListItem>
        <ListItem>
          <Highlight>Salud</Highlight>: Gestión de pacientes y <strong>diagnóstico asistido</strong>.
        </ListItem>
        <ListItem>
          <Highlight>Logística y Transportes</Highlight>: Gestión de <strong>flotas</strong>, control de trayectos, optimización de rutas.
        </ListItem>
        <ListItem>
          <Highlight>E-commerce</Highlight>: Análisis de comportamiento de compra y atención <strong>automatizada</strong>.
        </ListItem>
      </Box>
    </Section>
  );
}
