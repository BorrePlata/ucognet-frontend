import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slideAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const SlideshowContainer = styled(Box)(({ isDesktop }) => ({
  position: 'relative',
  width: '100%',
  height: isDesktop ? '80vh' : '50vh',
  overflow: 'hidden',
}));

const SlideWrapper = styled(Box)({
  display: 'flex',
  height: '100%',
  transition: 'transform 0.5s ease-in-out',
});

const Slide = styled(Box)({
  minWidth: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

const SlideImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const OverlayText = styled(Box)({
  position: 'absolute',
  bottom: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#fff',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '10px 20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
});

const NavigationButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  color: '#ffffff',
});

const SlideshowWide = ({ images = [], texts = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Cambia cada 5 segundos
      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex]);

  return (
    <SlideshowContainer
      isDesktop={isDesktop}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideWrapper
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Slide key={index}>
            <SlideImage src={image} alt={`slide-${index}`} />
            {texts[index] && (
              <OverlayText>
                <Typography variant="h4" style={{ fontWeight: 700 }}>
                  {texts[index].line1}
                </Typography>
                <Typography variant="body1">{texts[index].line2}</Typography>
              </OverlayText>
            )}
          </Slide>
        ))}
      </SlideWrapper>

      <NavigationButton
        style={{ left: '20px' }}
        onClick={() => {
          setIsPaused(true);
          prevSlide();
        }}
      >
        <ArrowBackIosIcon />
      </NavigationButton>

      <NavigationButton
        style={{ right: '20px' }}
        onClick={() => {
          setIsPaused(true);
          nextSlide();
        }}
      >
        <ArrowForwardIosIcon />
      </NavigationButton>
    </SlideshowContainer>
  );
};

export default SlideshowWide;
