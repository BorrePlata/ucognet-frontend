// src/components/ServicesSection.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material'; // Agregar Box a las importaciones
import ServiceCard from './ServiceCard';
import InsightsIcon from '@mui/icons-material/Insights';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';

export default function ServicesSection() {
  const services = [
    {
      title: 'Consultoría en Inteligencia Artificial',
      description: 'Analizamos tus procesos y diseñamos estrategias personalizadas que integran IA para maximizar la eficiencia de tu negocio.',
      icon: InsightsIcon,
      link: '/consultoria',
    },
    {
      title: 'Mentorías 1 a 1',
      description: 'Te guiamos a través de 3 sesiones para identificar y aplicar las mejores herramientas de IA adaptadas a las necesidades de tu negocio.',
      icon: PersonIcon,
      link: '/mentorias',
    },
    {
      title: 'Desarrollo de Aplicaciones IA',
      description: 'Creamos soluciones a medida que automatizan procesos y se integran con tus sistemas para mejorar la productividad.',
      icon: CodeIcon,
      link: '/aplicaciones',
    },
    {
      title: 'Formación y Capacitación en IA',
      description: 'Capacita a tu equipo en las últimas herramientas de IA con programas personalizados, disponibles en modalidad presencial o en línea.',
      icon: SchoolIcon,
      link: '/formacion',
    },
    {
      title: 'Implementación de Chatbots Inteligentes',
      description: 'Mejora tu atención al cliente con chatbots disponibles 24/7, adaptados a tu marca y sector.',
      icon: ChatIcon,
      link: '/chatbots',
    },
  ];

  return (
    <Box padding="40px 0">
      <Typography variant="h5" gutterBottom>Nuestras Soluciones y Servicios</Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
