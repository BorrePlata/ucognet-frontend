// src/components/FullWidthBanner.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const BannerContainer = styled(Box)({
  width: '100%',
  padding: '20px 0',
  backgroundColor: '#1E88E5',
  color: 'white',
  textAlign: 'center',
});

export default function FullWidthBanner({ text }) {
  return (
    <BannerContainer>
      <Typography variant="h6">{text}</Typography>
    </BannerContainer>
  );
}
