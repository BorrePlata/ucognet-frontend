import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { styled } from '@mui/system';

const CookieBanner = styled(Box)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#1C2159', // Usa colores de tu tema
  color: '#FFFFFF',
  padding: '20px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.5)',
});

const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
});

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <CookieBanner>
      <Typography variant="body1">
        Usamos cookies para mejorar la experiencia de usuario y analizar nuestro tráfico. Para más información, consulta nuestra{' '}
        <Link href="/politica-cookies" color="secondary" underline="hover">
          Política de Cookies
        </Link>.
      </Typography>
      <ButtonGroup>
        <Button variant="contained" color="secondary" onClick={handleAccept}>
          Aceptar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReject}>
          Rechazar
        </Button>
      </ButtonGroup>
    </CookieBanner>
  );
}
