import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', padding: '50px 0 100px' }}>
      <Container>
        {/* Título */}
        <Box textAlign="center" my={5}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Políticas de Privacidad
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 400, lineHeight: 1.8 }}>
            En EfficientAI nos tomamos muy en serio la privacidad de tus datos. A continuación, te explicamos cómo
            recopilamos, usamos y protegemos tu información personal de acuerdo con el Reglamento General de Protección
            de Datos (GDPR).
          </Typography>
        </Box>

        {/* Sección 1: Información que recopilamos */}
        <Box my={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            1. Información que Recopilamos
          </Typography>
          <Typography variant="body1" paragraph>
            Podemos recopilar las siguientes categorías de datos personales:
          </Typography>
          <ul>
            <li>Datos de contacto: Nombre, correo electrónico, número de teléfono y empresa.</li>
            <li>Datos del mensaje: Cualquier información que proporciones en el formulario de contacto.</li>
            <li>Datos técnicos: Dirección IP, tipo de navegador, sistema operativo y otros datos relacionados con el uso del sitio web.</li>
          </ul>
        </Box>

        {/* Sección 2: Uso de la Información */}
        <Box my={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            2. Uso de la Información
          </Typography>
          <Typography variant="body1" paragraph>
            Utilizamos tus datos personales para:
          </Typography>
          <ul>
            <li>Comunicarnos contigo sobre tus consultas y solicitudes.</li>
            <li>Proporcionarte información relevante sobre nuestros productos y servicios.</li>
            <li>Mejorar nuestro sitio web y personalizar la experiencia del usuario.</li>
            <li>Cumplir con requisitos legales y normativos.</li>
          </ul>
        </Box>

        {/* Sección 3: Tus Derechos */}
        <Box my={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            3. Tus Derechos
          </Typography>
          <Typography variant="body1" paragraph>
            Según el Reglamento General de Protección de Datos (GDPR), tienes derecho a:
          </Typography>
          <ul>
            <li>Acceder, corregir o eliminar tus datos personales.</li>
            <li>Retirar tu consentimiento en cualquier momento.</li>
            <li>Solicitar la limitación del tratamiento de tus datos.</li>
            <li>Recibir tus datos en un formato estructurado (portabilidad de datos).</li>
            <li>Presentar una queja ante la autoridad de protección de datos de tu país.</li>
          </ul>
        </Box>

        {/* Sección 4: Contacto */}
        <Box my={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            4. Contacto
          </Typography>
          <Typography variant="body1" paragraph>
            Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tu información, puedes
            contactarnos a través de:
          </Typography>
          <ul>
            <li><strong>Correo electrónico:</strong> contacto@efficientai.es</li>
            <li><strong>Teléfono:</strong> +34 123 456 789</li>
            <li><strong>Dirección postal:</strong> Calle Principal, 123</li>
          </ul>
        </Box>

        {/* Espacio adicional */}
        <Box sx={{ height: '100px' }} />
      </Container>
    </Box>
  );
}
