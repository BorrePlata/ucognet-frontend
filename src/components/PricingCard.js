// src/components/PricingCard.js
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../theme';

const PricingContainer = styled(Paper)(({ discount }) => ({
  padding: '2rem',
  borderRadius: '15px',
  backgroundColor: colors.surface,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  position: 'relative',
  borderTop: discount ? '4px solid orange' : 'none',
}));

const DiscountBadge = styled(Box)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'orange',
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '5px',
  fontWeight: 'bold',
});

const PriceText = styled(Typography)({
  fontSize: '2.5rem',           // Aumentamos el tamaño del precio
  fontWeight: 700,               // Mayor peso para destacar
  color: '#ffffff',              // Color blanco para contraste
  backgroundColor: '#1E88E5',    // Fondo azul vibrante
  padding: '0.5rem 1rem',        // Espacio alrededor del precio
  borderRadius: '10px',          // Bordes redondeados
  display: 'inline-block',       // Ajuste de bloque en línea
  marginBottom: '1rem',
});

const FeatureList = styled(Box)({
  marginTop: '1rem',
  textAlign: 'left',
  color: colors.textSecondary,
});

const PurchaseButton = styled(Button)({
  marginTop: '1.5rem',
  padding: '0.5rem 1.5rem',
  backgroundColor: colors.secondary,
  color: '#fff',
  borderRadius: '30px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: colors.primary,
  },
});

export default function PricingCard({ title, price, unitPrice, units, features, discount }) {
  return (
    <PricingContainer discount={discount}>
      {discount && <DiscountBadge>{discount}% Off</DiscountBadge>}
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <PriceText>${price}</PriceText>  {/* Aplicamos el nuevo estilo de precio */}
      <Typography variant="subtitle2" color="textSecondary">{unitPrice} per unit</Typography>
      <Typography variant="h6" color="textPrimary">{units} units per month</Typography>
      <FeatureList>
        {features.map((feature, index) => (
          <Typography variant="body2" key={index}>&#x2714; {feature}</Typography>
        ))}
      </FeatureList>
      <PurchaseButton>Purchase Now</PurchaseButton>
    </PricingContainer>
  );
}
