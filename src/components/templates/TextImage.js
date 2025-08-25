// src/components/templates/TextImage.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { colors, shadows } from '../../theme';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  background: colors.surface,
  boxShadow: shadows.light,
  borderRadius: '15px',
  '@media (max-width: 768px)': { flexDirection: 'column' },
});

const ImageContainer = styled(Box)({
  flex: 1,
  padding: '10px',
  img: { width: '100%', borderRadius: '15px' },
});

const TextContainer = styled(Box)({
  flex: 1,
  padding: '10px',
});

export default function TextImage({ title, text, imageUrl }) {
  return (
    <Container>
      <TextContainer>
        <Typography variant="h2" gutterBottom>{title}</Typography>
        <Typography variant="body1">{text}</Typography>
      </TextContainer>
      <ImageContainer>
        <img src={imageUrl} alt={title} />
      </ImageContainer>
    </Container>
  );
}
