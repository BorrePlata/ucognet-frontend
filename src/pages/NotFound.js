import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h3" color="error" gutterBottom>
        404 - Página No Encontrada
      </Typography>
      <Typography variant="body1" paragraph>
        Lo sentimos, no pudimos encontrar la página que buscas.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
      >
        Volver al Inicio
      </Button>
    </Box>
  );
}
