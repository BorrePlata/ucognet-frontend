import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SecurityIcon from '@mui/icons-material/Security';
import { colors } from '../theme';

const cards = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
    problem: 'Agents are hard to trust',
    solution: 'Evidence-first execution with claims, provenance and replay.',
    accent: colors.accent,
  },
  {
    icon: <AltRouteIcon sx={{ fontSize: 28 }} />,
    problem: 'One-size-fits-all scaffolds degrade performance',
    solution: 'Task-aware routing selects minimal vs agentic modes.',
    accent: colors.accentSoft,
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 28 }} />,
    problem: 'Self-improvement can go off the rails',
    solution: 'Gated evolution with A/B thresholds, cost caps and rollback.',
    accent: colors.accentWarm,
  },
];

export default function Problems() {
  return (
    <Box id="problems" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" sx={{ mb: 1.5, textAlign: { md: 'center' } }}>
            What UCogNet solves
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 480, mx: { md: 'auto' }, textAlign: { md: 'center' } }}>
            Three core problems in production AI systems.
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {cards.map((c, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ height: '100%' }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible' }}>
                  {/* Top accent bar */}
                  <Box sx={{
                    position: 'absolute', top: -1, left: '15%', right: '15%', height: '2px',
                    background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
                    borderRadius: '0 0 4px 4px',
                  }} />

                  <CardContent sx={{ p: 3.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Icon */}
                    <Box sx={{
                      width: 48, height: 48, borderRadius: '12px',
                      background: `${c.accent}10`,
                      border: `1px solid ${c.accent}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: c.accent, mb: 2.5,
                    }}>
                      {c.icon}
                    </Box>

                    {/* Problem */}
                    <Typography variant="caption" sx={{
                      color: colors.accentWarm, fontSize: '0.68rem',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                      mb: 0.8, display: 'block',
                    }}>
                      Problem
                    </Typography>
                    <Typography variant="h5" sx={{
                      color: colors.textPrimary, lineHeight: 1.4,
                      mb: 2.5, pb: 2.5,
                      borderBottom: `1px solid ${colors.border}`,
                    }}>
                      {c.problem}
                    </Typography>

                    {/* Solution */}
                    <Typography variant="caption" sx={{
                      color: colors.accent, fontSize: '0.68rem',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                      mb: 0.8, display: 'block',
                    }}>
                      UCogNet approach
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                      {c.solution}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
