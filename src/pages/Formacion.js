import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import NewsletterSection from '../components/NewsletterSection';
import ContactForm from '../components/ContactForm';
import FullWidthBanner from '../components/FullWidthBanner';
import Slideshow from '../components/Slideshow';
import {
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  Laptop as LaptopIcon,
  Book as BookIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';

// Configuración de imágenes y textos para el Slideshow
import formacion1 from '../assets/images/formacion1.jpg';
import formacion2 from '../assets/images/formacion2.jpg';
import formacion3 from '../assets/images/formacion3.jpg';

const images = [formacion1, formacion2, formacion3];
const texts = [
  { line1: 'Formación Personalizada', line2: 'Aprende cómo aplicar IA en tu negocio' },
  { line1: 'Herramientas Prácticas', line2: 'Usa las mejores herramientas de IA en proyectos reales' },
  { line1: 'Certificación Oficial', line2: 'Demuestra tus habilidades con un certificado reconocido' },
];

// Información destacada
const highlights = [
  { icon: CalendarIcon, title: 'Duración', description: '6 o 15 horas presenciales' },
  { icon: GroupIcon, title: 'Grupos Reducidos', description: 'Máximo 15 personas' },
  { icon: LaptopIcon, title: 'Formato', description: '100% práctico con ejercicios' },
  { icon: BookIcon, title: 'Material', description: 'Material completo incluido' },
  { icon: VerifiedIcon, title: 'Certificado', description: 'Certificado de participación' },
];

// Módulos del curso
const modules = [
  { title: 'Fundamentos de IA', description: 'Comprender el concepto de IA, sus tipos y aplicaciones actuales en empresas.' },
  { title: 'Introducción a ChatGPT', description: 'Conocer las funcionalidades de ChatGPT y su uso práctico.' },
  { title: 'Prompt Engineering', description: 'Aprender a construir y mejorar prompts efectivos para ChatGPT.' },
  { title: 'GPTs Personalizados', description: 'Generación de soluciones a medida creando y configurando GPTs personalizados.' },
  { title: 'Herramientas Multimedia', description: 'Uso de imágenes, audio y video en proyectos de IA.' },
  { title: 'Integración Empresarial', description: 'Mejores prácticas para aplicar la IA en el ámbito empresarial.' },
];

// Recursos incluidos
const resources = [
  { title: 'Guías Completas', description: 'Documentación detallada de cada herramienta.' },
  { title: 'Ejercicios Prácticos', description: 'Casos reales para aplicar lo aprendido.' },
  { title: 'Soporte Post-Curso', description: 'Resolución de dudas y seguimiento posterior.' },
  { title: 'Herramientas y Aplicaciones', description: 'Software y recursos utilizados en la formación.' },
];

// Preguntas frecuentes
const faqs = [
  { question: '¿Necesito conocimientos previos?', answer: 'No se requieren conocimientos técnicos previos, solo familiaridad básica con ordenadores.' },
  { question: '¿Qué debo traer al curso?', answer: 'Un ordenador portátil con conexión a internet será suficiente para seguir todas las prácticas.' },
  { question: '¿Incluye certificado?', answer: 'Sí, se entrega un certificado de participación al completar la formación.' },
  { question: '¿Hay plazas limitadas?', answer: 'Sí, los grupos son reducidos para garantizar atención personalizada.' },
  { question: '¿Puede mi empresa bonificar la formación?', answer: 'Sí, consulta nuestro apartado de subvenciones para conocer las opciones disponibles para tu empresa.' },
  { question: '¿Se realiza in-company?', answer: 'Sí, podemos impartir la formación en las instalaciones de tu empresa.' },
];

// Formulario de selección de paquetes
function PackageSelection() {
  const [selectedPackage, setSelectedPackage] = React.useState('6horas');
  const [attendees, setAttendees] = React.useState(1);

  const pricePerPerson = selectedPackage === '6horas' ? 99 : 199;
  const total = pricePerPerson * attendees;

  const handlePackageChange = (event, newPackage) => {
    if (newPackage) {
      setSelectedPackage(newPackage);
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '30px',
        borderRadius: '10px',
        background: 'linear-gradient(45deg, #0d47a1, #002171)',
        color: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <SectionTitle title="Selecciona tu Paquete" subtitle="Elige el curso que mejor se adapte a tus necesidades" />
      <ToggleButtonGroup
        value={selectedPackage}
        exclusive
        onChange={handlePackageChange}
        sx={{
          marginBottom: '20px',
          '& .MuiToggleButton-root': {
            fontWeight: 700,
            fontSize: '16px',
            padding: '12px 24px',
            color: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '8px',
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#1976d2',
              borderColor: '#fff',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
            },
          },
        }}
      >
        <ToggleButton value="6horas">Curso 6 Horas - 99€</ToggleButton>
        <ToggleButton value="15horas">Curso 15 Horas - 199€</ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="h6" sx={{ marginTop: '20px', fontSize: '18px', fontWeight: 500 }}>
        Número de asistentes:
      </Typography>
      <TextField
        type="number"
        value={attendees}
        onChange={(e) => setAttendees(Math.max(1, parseInt(e.target.value) || 1))}
        sx={{
          margin: '20px 0',
          width: '120px',
          '& input': {
            textAlign: 'center',
            fontSize: '16px',
            color: '#fff',
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              borderColor: '#f1f1f1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
          },
        }}
        inputProps={{ min: 1 }}
      />
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }}>
        Total: {total}€
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Nombre de Empresa"
          InputLabelProps={{ style: { color: '#fff' } }}
          sx={{
            marginBottom: '15px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#f1f1f1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Persona de Contacto"
          InputLabelProps={{ style: { color: '#fff' } }}
          sx={{
            marginBottom: '15px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#f1f1f1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Correo Electrónico"
          type="email"
          InputLabelProps={{ style: { color: '#fff' } }}
          sx={{
            marginBottom: '15px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#f1f1f1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Teléfono"
          type="tel"
          InputLabelProps={{ style: { color: '#fff' } }}
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#f1f1f1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Realizar Pago
        </Button>
      </form>
    </Box>
  );
}

export default function Formacion() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        <Slideshow images={images} texts={texts} />
        <FullWidthBanner text="Domina herramientas de IA con formación práctica" />
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle title="Formación Práctica en IA para Empresas" subtitle="Cursos diseñados para aplicar IA en entornos reales" />
          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 4 }}>
            {highlights.map((highlight, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <ServiceCard icon={highlight.icon} title={highlight.title} description={highlight.description} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle title="Módulos del Curso" subtitle="Contenido práctico y orientado a resultados" />
          <Grid container spacing={3} justifyContent="center">
            {modules.map((module, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <ServiceCard title={module.title} description={module.description} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle title="Recursos Incluidos" subtitle="Todo lo necesario para que aproveches al máximo la formación" />
          <Grid container spacing={3} justifyContent="center">
            {resources.map((resource, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <ServiceCard title={resource.title} description={resource.description} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <SectionTitle title="Preguntas Frecuentes" subtitle="Resolvemos tus dudas sobre la formación" />
          <Grid container spacing={3}>
            {faqs.map((faq, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <ServiceCard title={faq.question} description={faq.answer} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <PackageSelection />
        <Box sx={{ marginTop: '40px' }}>
          <NewsletterSection />
        </Box>
      </Container>
      <Box sx={{ height: '100px' }} />
    </Box>
  );
}
