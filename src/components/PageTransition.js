// src/compontents/PageTransition.js
import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'relative' }}
    >
      {/* Fondo de partículas */}
      <Particles
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
            },
          },
          particles: {
            color: { value: '#ffffff' },
            links: { enable: true, color: '#ffffff', distance: 150 },
            move: { enable: true, speed: 1 },
            number: { value: 50 },
            size: { value: 2 },
          },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      {children}
    </motion.div>
  );
}
