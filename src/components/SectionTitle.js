// src/components/SectionTitle.js
import React from 'react';
import { Typography, Box } from '@mui/material';

export default function SectionTitle({ title, subtitle }) {
  return (
    <Box my={4} textAlign="center">
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
