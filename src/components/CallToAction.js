import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CallToAction({ title, subtitle, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  return (
    <Box sx={{
      py: 12,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow bg */}
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
            {title || 'Ready to see the results firsthand?'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, maxWidth: 550, mx: 'auto', fontSize: '1.15rem' }}>
            {subtitle || 'Schedule a technical deep-dive with our research team or download our full benchmark report.'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to={primaryTo || '/contact'}
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              {primaryLabel || 'Schedule a Demo'}
            </Button>
            <Button
              component={Link}
              to={secondaryTo || '/benchmarks'}
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              {secondaryLabel || 'View Full Results'}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
