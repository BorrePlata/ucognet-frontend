import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Animaciones de flotación y choque
const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0) translateX(0); }
`;

const GalleryContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  padding: '40px',
  position: 'relative',
});

const Bubble = styled(Box)(({ index }) => ({
  position: 'relative',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  animation: `${floatAnimation} ${3 + (index % 5)}s ease-in-out infinite`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const OverlayText = styled(Typography)({
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#ffffff',
  fontSize: '0.8rem',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
});

const BubbleGallery = ({ images }) => {
  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <Bubble key={index} index={index}>
          <Image src={image.src} alt={`bubble-${index}`} />
          <OverlayText>{image.caption}</OverlayText>
        </Bubble>
      ))}
    </GalleryContainer>
  );
};

export default BubbleGallery;
