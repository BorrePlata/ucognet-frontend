// src/components/GyroAnimation.js
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';

const AnimationContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  overflow: 'hidden',
  perspective: '1000px', // Añade profundidad
  transformStyle: 'preserve-3d',
  transition: 'transform 0.1s ease-out', // Suaviza el movimiento
});

const AnimatedElement = styled('div')(({ x, y }) => ({
  width: '150px',
  height: '150px',
  background: 'linear-gradient(135deg, #6A0DAD 30%, #8A2BE2 90%)',
  borderRadius: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  transform: `rotateY(${x}deg) rotateX(${y}deg)`, // Aplica rotación con los datos de giroscopio
}));

export default function GyroAnimation() {
  const [orientation, setOrientation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (event) => {
      const { beta, gamma } = event; // beta: inclinación arriba-abajo, gamma: inclinación izquierda-derecha
      setOrientation({
        x: gamma / 4, // Dividir para suavizar el efecto
        y: beta / 4,
      });
    };

    // Solicitar permiso para acceder a los datos del giroscopio en iOS
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Para otros navegadores que no requieren permiso explícito
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <AnimationContainer>
      <AnimatedElement x={orientation.x} y={orientation.y} />
    </AnimationContainer>
  );
}
