// src/components/templates/ImageGallery.js
import React from 'react';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import { shadows, animations } from '../../theme';

const ImageBox = styled(Box)({
  overflow: 'hidden',
  borderRadius: '15px',
  boxShadow: shadows.light,
  transition: `transform ${animations.transitionSpeed}, box-shadow ${animations.transitionSpeed}`,
  '&:hover': {
    transform: animations.hoverScale,
    boxShadow: shadows.hover,
  },
  '& img': {
    width: '100%',
    borderRadius: 'inherit',
  },
});

export default function ImageGallery({ images }) {
  return (
    <Grid container spacing={2}>
      {images.map((url, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ImageBox>
            <img src={url} alt={`Gallery ${index + 1}`} />
          </ImageBox>
        </Grid>
      ))}
    </Grid>
  );
}
