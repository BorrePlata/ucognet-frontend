import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../theme';

const StyledCard = styled(Card)({
  minHeight: '200px',
  backgroundColor: colors.surface,
  color: colors.textPrimary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px',
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: colors.secondary,
  },
});

export default function ServiceCard({ title, description, icon: Icon }) {
  return (
    <StyledCard>
      <CardContent>
        {Icon && <Icon />} {/* Muestra el icono solo si está presente */}
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </StyledCard>
  );
}
