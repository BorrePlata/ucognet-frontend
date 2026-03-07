import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BiotechIcon from '@mui/icons-material/Biotech';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { colors } from '../theme';

const domains = [
  {
    icon: <BiotechIcon sx={{ fontSize: 28 }} />,
    title: 'Fusion plasma control',
    desc: 'Bio-inspired cognitive modules manage catastrophic plasma instabilities with 19% higher crisis survival than PPO baselines.',
    status: 'Active research',
    statusColor: '#10b981',
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 28 }} />,
    title: 'Autonomous agents',
    desc: 'Task-aware routing, evidence-first execution, and gated self-improvement for production AI agents.',
    status: 'Core platform',
    statusColor: colors.accent,
  },
  {
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 28 }} />,
    title: 'Robotics & control',
    desc: 'Metacognitive planning for embodied systems operating under real-world constraints and budget limits.',
    status: 'Planned',
    statusColor: colors.textSecondary,
  },
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 28 }} />,
    title: 'Critical infrastructure',
    desc: 'Cognitive architectures for high-stakes environments where failure modes cascade and traditional controllers fall short.',
    status: 'Planned',
    statusColor: colors.textSecondary,
  },
];

export default function ApplicationsPreview() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" sx={{ mb: 1.5, textAlign: { md: 'center' } }}>
            Where UCogNet applies
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 520, mx: { md: 'auto' }, textAlign: { md: 'center' } }}>
            A general cognitive platform, validated first in fusion plasma control and autonomous AI agents.
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {domains.map((d, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ height: '100%' }}
              >
                <Box sx={{
                  p: 3, height: '100%', borderRadius: '16px',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  display: 'flex', flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: colors.borderHover, transform: 'translateY(-3px)', boxShadow: colors.glow },
                }}>
                  <Box sx={{
                    width: 48, height: 48, borderRadius: '12px',
                    background: `${d.statusColor}10`,
                    border: `1px solid ${d.statusColor}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: d.statusColor, mb: 2,
                  }}>
                    {d.icon}
                  </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1, lineHeight: 1.3 }}>
                    {d.title}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7, flex: 1, mb: 2 }}>
                    {d.desc}
                  </Typography>
                  <Typography variant="caption" sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.5,
                    color: d.statusColor, fontWeight: 600, fontSize: '0.7rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    <Box sx={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: d.statusColor,
                      boxShadow: d.statusColor === '#10b981' || d.statusColor === colors.accent ?
                        `0 0 6px ${d.statusColor}` : 'none',
                    }} />
                    {d.status}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Quote / vision statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box sx={{
            mt: 6, p: { xs: 3, md: 4 }, borderRadius: '18px', textAlign: 'center',
            background: `linear-gradient(135deg, ${colors.surface}, rgba(139,92,246,0.03))`,
            border: `1px solid ${colors.border}`,
            position: 'relative', overflow: 'hidden',
          }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
              background: `linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)`,
            }} />
            <Typography variant="body1" sx={{
              fontStyle: 'italic', color: colors.textPrimary,
              fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 580, mx: 'auto', mb: 2,
            }}>
              &ldquo;When the world is on fire, you need a mind that dances with chaos.&rdquo;
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.82rem' }}>
              &mdash; UCogNet Research Center, by Brainstream &bull; February 2026
            </Typography>
          </Box>
        </motion.div>

        {/* Navigation */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={RouterLink} to="/how-it-works" variant="contained" sx={{ px: 3 }}>
            How it works
          </Button>
          <Button component={RouterLink} to="/contact" variant="outlined" sx={{ px: 3 }}>
            Talk to us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
