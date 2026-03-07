import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '../theme';

const milestones = [
  {
    date: 'Feb 2026',
    title: 'Module 6 — Self-evolution engine integrated',
    desc: 'Gated mutations with gradual rollout and rollback.',
    active: true,
  },
  {
    date: 'Jan 2026',
    title: 'Phase 1 — Full internal benchmark suite',
    desc: '807 tests active across 10 modules. Frozen-run reproducibility verified.',
    active: false,
  },
  {
    date: 'Dec 2025',
    title: 'Routing v1 — Adaptive mode selector',
    desc: 'Task-aware dispatcher with budget-conscious mode routing.',
    active: false,
  },
];

export default function Updates() {
  return (
    <Box id="updates" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" sx={{ mb: 1.5 }}>Updates</Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 480 }}>
            Key milestones in the development of UCogNet.
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
          {/* Vertical timeline line */}
          <Box sx={{
            position: 'absolute', left: { xs: 8, md: 12 }, top: 4, bottom: 4,
            width: '1px',
            background: `linear-gradient(180deg, ${colors.accent}40, ${colors.border})`,
          }} />

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Box sx={{
                position: 'relative', mb: i < milestones.length - 1 ? 5 : 0,
              }}>
                {/* Dot */}
                <Box sx={{
                  position: 'absolute',
                  left: { xs: -24, md: -28 },
                  top: 6,
                  width: 10, height: 10, borderRadius: '50%',
                  background: m.active ? colors.accent : colors.border,
                  boxShadow: m.active ? `0 0 12px ${colors.accent}80` : 'none',
                  border: m.active ? `2px solid ${colors.accent}40` : `2px solid ${colors.border}`,
                }} />

                {/* Content */}
                <Box sx={{
                  p: 3, borderRadius: '14px',
                  background: colors.surface,
                  border: `1px solid ${m.active ? colors.borderHover : colors.border}`,
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: colors.borderHover },
                }}>
                  <Typography variant="caption" sx={{
                    color: m.active ? colors.accent : colors.textSecondary,
                    fontWeight: 700, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {m.date}
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{
                    mt: 0.5, mb: 0.8, fontWeight: 600,
                    color: colors.textPrimary, fontSize: '1rem',
                  }}>
                    {m.title}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    {m.desc}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
