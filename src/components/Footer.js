import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Importa Link de react-router-dom
import { Link as MaterialLink } from '@mui/material'; // Para enlaces externos
import { styled } from '@mui/system';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from '../assets/logo.png'; // Importa el logo

// Estilos del contenedor principal del pie de página
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: '20px 0',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 1000,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Estilos para los íconos de redes sociales
const SocialIcons = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginBottom: '10px',
  '& a': {
    color: '#FFFFFF',
    fontSize: '1.5rem',
    transition: 'color 0.3s, transform 0.2s',
    '&:hover': {
      color: '#FFD700', // Efecto iluminado
      transform: 'scale(1.2)',
    },
  },
});

// Estilos para los enlaces del pie de página
const FooterLinks = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '10px',
  flexWrap: 'wrap',
  '& a': {
    color: '#B0B3F5',
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#FFFFFF',
    },
  },
});

// Estilos para la parte inferior del pie de página
const FooterBottom = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  width: '100%',
});

// Estilos para la imagen del logotipo
const LogoImage = styled('img')({
  height: '25px',
  display: 'block',
});

export default function Footer() {
  return (
    <FooterContainer>
      {/* Redes Sociales */}
      <SocialIcons>
        <MaterialLink href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </MaterialLink>
        <MaterialLink href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </MaterialLink>
        <MaterialLink href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </MaterialLink>
        <MaterialLink href="https://wa.me/34693046631" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
        </MaterialLink>
      </SocialIcons>

      {/* Sección Inferior */}
      <FooterBottom>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#B0B3F5' }}>
          © 2024 Todos los derechos reservados.
        </Typography>
        <Box display="flex" alignItems="center" gap="5px">
          <LogoImage src={logo} alt="Logo" />
        </Box>
      </FooterBottom>
    </FooterContainer>
  );
}
