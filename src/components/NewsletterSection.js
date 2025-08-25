// src/components/NewsletterSection.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function NewsletterSection() {
  return (
    <Box textAlign="center" padding="40px 0">
      <Typography variant="h5" gutterBottom>Suscríbete a nuestro Newsletter</Typography>
      <Typography variant="body1">
        Mantente al día con las últimas tendencias y novedades en inteligencia artificial y automatización.
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
        <Box component="form" display="flex" alignItems="center">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            style={{
              padding: '10px',
              borderRadius: '4px 0 0 4px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
          />
          <Button variant="contained" color="secondary" style={{ borderRadius: '0 4px 4px 0' }}>
            Suscribirse
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
