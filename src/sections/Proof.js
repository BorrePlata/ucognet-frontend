import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClickableImage from '../components/ImageLightbox';
import { colors } from '../theme';

const reproducibility = [
  'Frozen runs (hashes, seeds, budgets)',
  'Per-item JSONL logs',
  'Artifacts indexed + replay',
  'Cost tracked (time / tokens)',
];

export default function Proof() {
  return (
    <Box id="proof" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" sx={{ mb: 1.5 }}>Proof and rigor</Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 500 }}>
            Audit-ready engineering. Every run is reproducible by design.
          </Typography>
        </motion.div>

        {/* Two columns: Engineering rigor + Safety guardrails */}
        <Grid container spacing={3}>
          {/* Left — engineering rigor */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                borderRadius: '18px', overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: colors.borderHover, boxShadow: colors.glow },
              }}>
                <Box sx={{ p: 3, borderBottom: `1px solid ${colors.border}` }}>
                  <Box sx={{
                    display: 'inline-block', px: 1.5, py: 0.4, borderRadius: '6px',
                    background: 'rgba(0,180,216,0.06)', border: `1px solid ${colors.border}`,
                    mb: 1.5,
                  }}>
                    <Typography variant="caption" sx={{
                      color: colors.accent, fontSize: '0.68rem',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      Engineering
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 0.5, color: colors.textPrimary }}>
                    Engineering rigor
                  </Typography>
                  <Typography variant="body2">
                    Extensive automated tests across modules; reproducibility by design.
                  </Typography>
                </Box>
                <ClickableImage
                  src="/benchmarks/ucognet_01_test_coverage.png"
                  alt="Test coverage across all modules"
                  caption="Test coverage — 807 automated tests across 10 modules"
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Right — safety guardrails */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Box sx={{
                borderRadius: '18px', overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: colors.borderHover, boxShadow: colors.glow },
              }}>
                <Box sx={{ p: 3, borderBottom: `1px solid ${colors.border}` }}>
                  <Box sx={{
                    display: 'inline-block', px: 1.5, py: 0.4, borderRadius: '6px',
                    background: 'rgba(224,122,47,0.06)', border: `1px solid ${colors.borderWarm}`,
                    mb: 1.5,
                  }}>
                    <Typography variant="caption" sx={{
                      color: colors.accentWarm, fontSize: '0.68rem',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      Safety
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 0.5, color: colors.textPrimary }}>
                    Safety guardrails
                  </Typography>
                  <Typography variant="body2">
                    Anti-reward-hacking mechanisms: shaping cap, evidence auditing, anomaly detection.
                  </Typography>
                </Box>
                <ClickableImage
                  src="/benchmarks/ucognet_12_shaping_guardrails.png"
                  alt="Shaping cap and anomaly detection guardrails"
                  caption="Safety guardrails — shaping caps, reward auditing, cost anomaly flags"
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Reproducibility contract */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Box sx={{
            mt: 5, p: { xs: 3, md: 4 }, borderRadius: '18px',
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Accent line */}
            <Box sx={{
              position: 'absolute', top: 0, left: '5%', right: '5%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.3), transparent)',
            }} />

            <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600, color: colors.textPrimary }}>
              Reproducibility contract
            </Typography>
            <Grid container spacing={2.5}>
              {reproducibility.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      p: 1.5, borderRadius: '10px',
                      background: 'rgba(0,180,216,0.02)',
                      border: `1px solid transparent`,
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: colors.border },
                    }}>
                      <CheckCircleOutlineIcon sx={{ color: colors.accent, fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: colors.textPrimary, fontWeight: 500, fontSize: '0.88rem' }}>
                        {item}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
