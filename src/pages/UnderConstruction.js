import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderConstructionContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '80vh',
  textAlign: 'center',
  color: '#333',
  backgroundColor: '#f5f5f5',
});

const IconContainer = styled(Box)({
  fontSize: '5rem',
  color: '#ff9800',
  marginBottom: '20px',
});

const UnderConstruction = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redirige a la página principal
  };

  return (
    <UnderConstructionContainer>
      <IconContainer>
        <ConstructionIcon fontSize="inherit" />
      </IconContainer>
      <Typography variant="h4" gutterBottom>¡Estamos trabajando en ello!</Typography>
      <Typography variant="body1" paragraph>
        Esta sección se encuentra en construcción. Estamos trabajando para traerte contenido nuevo pronto.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Regresar a la página principal
      </Button>
    </UnderConstructionContainer>
  );
};

export default UnderConstruction;
