// src/components/InfoCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2.5), // Utiliza el espaciado del tema
  textAlign: 'center',
  boxShadow: theme.shadows[5], // Asegúrate de que este índice exista en theme.shadows
}));

const IconContainer = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1.25),
}));

export default function InfoCard({ icon: Icon, title, description }) {
  console.log('Icon component:', Icon);
  console.log('Type of Icon:', typeof Icon); // Debe registrar 'function'

  return (
    <StyledCard>
      <CardContent>
        <IconContainer>
          <Icon /> {/* Renderiza el ícono como componente */}
        </IconContainer>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </StyledCard>
  );
}
