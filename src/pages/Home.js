import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IntroductionSection from '../components/IntroductionSection';
import ServicesSection from '../components/ServicesSection';
import BlogSection from '../components/BlogSection';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';
import Slideshow from '../components/Slideshow';

// Importar imágenes desde `src/assets/images`
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';

export default function Home() {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);

  // Función para redirigir a la página "Estamos trabajando"
  const redirectToUnderConstruction = () => {
    navigate('/under-construction');
  };

  useEffect(() => {
    // Cargar datos del blog desde el archivo JSON
    fetch(`${process.env.PUBLIC_URL}/assets/blogPosts.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar las entradas del blog');
        }
        return response.json();
      })
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error('Error al cargar las entradas del blog:', error));
  }, []);

  // Imágenes y textos del Slideshow principal (estáticos)
  const images = [image1, image2, image3];
  const texts = [
    { line1: "Bienvenido a nuestro sitio", line2: "Descubre lo que ofrecemos" },
    { line1: "Soluciones avanzadas", line2: "Impulsa tu negocio con IA" },
    { line1: "Explora nuestros servicios", line2: "y visita nuestro blog" }
  ];

  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      {/* Slideshow - Presentación de imágenes de bienvenida */}
      <Slideshow images={images} texts={texts} autoPlay={true} interval={3000} />
      <Container>

        {/* Sección de Introducción */}
        <IntroductionSection onRedirect={redirectToUnderConstruction} />

        {/* Sección de Servicios */}
        <ServicesSection onRedirect={redirectToUnderConstruction} />

        {/* Sección de Blog con datos dinámicos */}
        <BlogSection blogPosts={blogPosts} />

        {/* Formulario de Contacto */}
        <ContactForm />

        {/* Sección de Newsletter */}
        <NewsletterSection />
      </Container>

      {/* Espacio Adicional */}
      <Box sx={{ height: '100px' }} />
    </Box>
  );
}

