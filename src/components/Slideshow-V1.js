import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const lightReflection = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
`;

const CarouselContainer = styled(Box)(({ isDesktop }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: isDesktop ? '100%' : '100%',
  height: isDesktop ? '70vh' : '80vh',
  overflow: 'hidden',
  margin: isDesktop ? '0 auto' : '0',
}));

const CarouselItem = styled(Box)(({ position, isCenter, isDesktop }) => {
  const scale = isCenter ? 1 : 0.8;
  const opacity = isCenter ? 0.95 : 0.5;
  const offset = isDesktop ? 400 * position : 200 * position;

  return {
    position: 'absolute',
    top: isDesktop ? '10%' : '15%',
    width: isDesktop ? '800px' : '300px',
    height: isDesktop ? '350px' : '450px',
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    transform: `translateX(${offset}px) scale(${scale})`,
    opacity: opacity,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: isCenter ? '0px 10px 20px rgba(0, 0, 0, 0.5)' : '0px 4px 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: isCenter ? 'rgba(255, 255, 255, 0.02)' : '#1E2149',
    backdropFilter: isCenter ? 'blur(10px)' : 'none',
    border: isCenter ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
    zIndex: isCenter ? 1 : 0,
  };
});

const SlideImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const OverlayBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Capa negra translúcida
  zIndex: 1,
});

const OverlayText = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#ffffff',
  textAlign: 'center',
  width: '90%',
  zIndex: 2, // Sobre la capa negra
});

const LightOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '50%',
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
  animation: `${lightReflection} 3s ease-in-out infinite`,
});

const NavigationButton = styled(IconButton)({
  color: '#FFFFFF',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
});

const Slideshow = ({ images = [], texts = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width:768px)');

  // Para pausar el cambio automático
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getPosition = (index) => {
    const offset = index - currentIndex;
    if (offset === -1 || offset === 1) return offset;
    if (offset === -2 || offset === 2) return offset * 1.2;
    if (index === currentIndex) return 0;
    return offset > 2 ? offset - images.length : offset + images.length;
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Cambia de diapositiva cada 3 segundos

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta o isPaused cambia
    }
  }, [isPaused, currentIndex]); // Dependencias

  return (
    <CarouselContainer isDesktop={isDesktop}>
      <NavigationButton
        style={{ left: '20px' }}
        onClick={() => {
          setIsPaused(true); // Pausa al usar botones
          prevSlide();
        }}
      >
        <ArrowBackIosIcon />
      </NavigationButton>

      {images.map((image, index) => {
        const isCenter = index === currentIndex;
        const position = getPosition(index);

        return (
          <CarouselItem key={index} position={position} isCenter={isCenter} isDesktop={isDesktop}>
            {isCenter && <LightOverlay />}
            <SlideImage src={image} alt={`slide-${index}`} />
            {texts[index] && (
              <>
                <OverlayBackground />
                <OverlayText>
                  <Typography variant="h4" style={{ fontWeight: 700 }}>
                    {texts[index].line1}
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 400 }}>
                    {texts[index].line2}
                  </Typography>
                </OverlayText>
              </>
            )}
          </CarouselItem>
        );
      })}

      <NavigationButton
        style={{ right: '20px' }}
        onClick={() => {
          setIsPaused(true); // Pausa al usar botones
          nextSlide();
        }}
      >
        <ArrowForwardIosIcon />
      </NavigationButton>
    </CarouselContainer>
  );
};

export default Slideshow;
