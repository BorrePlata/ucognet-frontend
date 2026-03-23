import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ClickableImage from '../components/ImageLightbox';
import { colors } from '../theme';

const proofChips = [
  { num: '10', text: 'modules' },
  { num: '807', text: 'tests' },
  { text: 'Runs are frozen and replayable' },
];

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 10, md: 0 },
        pb: { xs: 6, md: 0 },
      }}
    >
      {/* Animated grid background */}
      <div className="hero-grid-bg" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Copy */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Lab badge */}
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                mb: 3, px: 1.5, py: 0.6,
                borderRadius: '20px',
                border: `1px solid ${colors.border}`,
                background: 'rgba(0,180,216,0.03)',
              }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: colors.accent,
                  boxShadow: `0 0 8px ${colors.accent}`,
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <Typography variant="caption" sx={{
                  fontSize: '0.75rem', fontWeight: 600,
                  color: colors.textSecondary, letterSpacing: '0.04em',
                }}>
                  RESEARCH PREVIEW
                </Typography>
              </Box>

              <Typography variant="h1" sx={{ mb: 3 }}>
                Metacognitive AI systems that{' '}
                <Box component="span" sx={{ color: colors.accent }}>
                  improve safely.
                </Box>
              </Typography>

              <Typography variant="body1" sx={{
                mb: 4, maxWidth: 520,
                fontSize: { xs: '1rem', md: '1.12rem' },
                lineHeight: 1.85,
              }}>
                <strong>UCogNet</strong> (Universal Cognition Network) is a modular cognitive platform that routes tasks
                to the right solving mode, executes with verifiable evidence, and evolves via gated experiments
                under strict budgets.
              </Typography>

              {/* Proof chips */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4.5 }}>
                {proofChips.map((c, i) => (
                  <motion.span
                    className="proof-chip"
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {c.num && <span className="num">{c.num}</span>}
                    {c.text}
                  </motion.span>
                ))}
              </Box>

              {/* CTAs */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  href="/ucognet-one-pager.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ px: 3.5 }}
                >
                  Download one-pager
                </Button>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/contact"
                  sx={{ px: 3.5 }}
                >
                  Contact us
                </Button>
              </Box>

              {/* Powered by Brainstream */}
              <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="caption" sx={{
                  fontSize: '0.72rem', fontWeight: 500,
                  color: colors.textSecondary, letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  Powered by
                </Typography>
                <Box
                  component="img"
                  src="/logo-brainstream-blanco.png"
                  alt="Brainstream"
                  sx={{
                    height: 38, width: 'auto', display: 'block',
                    opacity: 0.85,
                    transition: 'opacity 0.3s ease',
                    '&:hover': { opacity: 1 },
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Visual — architecture pyramid */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                boxShadow: `${colors.glowStrong}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                background: colors.surface,
                position: 'relative',
              }}>
                {/* Top accent line */}
                <Box sx={{
                  position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.4), transparent)',
                }} />

                <ClickableImage
                  src="/benchmarks/ucognet_11_architecture_pyramid.png"
                  alt="UCogNet Architecture Pyramid"
                  caption="UCogNet Architecture — 10y modular pyramid with metacognitive routing"
                  priority
                />

                {/* Bottom label */}
                <Box sx={{
                  px: 3, py: 2,
                  borderTop: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.78rem', fontWeight: 500 }}>
                    Route &rarr; Execute &rarr; Reward &rarr; Evolve
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.accent, fontSize: '0.7rem', fontWeight: 600 }}>
                    CLICK TO EXPAND
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom section divider */}
      <hr className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </Box>
  );
}
