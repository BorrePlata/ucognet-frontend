import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const hypnoticAnimation = keyframes`
  0% { background-position: 0% 50%; transform: scale(1) rotate(0deg); }
  50% { background-position: 100% 50%; transform: scale(1.1) rotate(180deg); }
  100% { background-position: 0% 50%; transform: scale(1) rotate(360deg); }
`;

// Configuración de una "burbuja" dinámica con degradado
const DynamicBubble = styled(Box)(({ size, colors }) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  position: 'absolute',
  top: `${Math.random() * 100}vh`, // Posición vertical aleatoria
  left: `${Math.random() * 100}vw`, // Posición horizontal aleatoria
  background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
  backgroundSize: '300% 300%',
  animation: `${hypnoticAnimation} ${20 + Math.random() * 10}s ease-in-out infinite`,
  filter: 'blur(12px) saturate(1.3)',
  opacity: 0.5,
  zIndex: -1,
}));

const AnimatedBackground = ({
  bubbleCount = 5, // Número de burbujas de fondo
  colors = ['#6A0DAD', '#8A2BE2', '#B19CD9'],
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {[...Array(bubbleCount)].map((_, index) => (
        <DynamicBubble
          key={index}
          size={`${20 + Math.random() * 30}vw`} // Tamaño aleatorio entre 20vw y 50vw
          colors={colors}
        />
      ))}
    </Box>
  );
};

export default AnimatedBackground;
