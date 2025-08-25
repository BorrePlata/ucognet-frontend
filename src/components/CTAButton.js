// src/components/CTAButton.js
import React from 'react';
import { Button } from '@mui/material';

export default function CTAButton({ label, onClick, startIcon, color = 'primary' }) {
  return (
    <Button variant="contained" color={color} onClick={onClick} startIcon={startIcon} fullWidth>
      {label}
    </Button>
  );
}
