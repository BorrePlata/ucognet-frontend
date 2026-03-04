import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import ClickableImage from '../components/ImageLightbox';
import { colors } from '../theme';

const charts = [
  {
    src: '/benchmarks/fig01_module_radar.png',
    alt: 'Module Capability Radar',
    label: 'Module capability radar',
    caption: 'Radar chart — per-module performance profile across evaluation dimensions',
  },
  {
    src: '/benchmarks/ucognet_03_confidence_signals.png',
    alt: 'Confidence Signals',
    label: 'Confidence signals',
    caption: 'Confidence signal distribution — metacognitive self-assessment calibration',
  },
  {
    src: '/benchmarks/ucognet_05_reward_composition.png',
    alt: 'Reward Composition',
    label: 'Reward composition',
    caption: 'Composite reward breakdown — correctness, evidence, cost, safety',
  },
  {
    src: '/benchmarks/fig06_energy_trajectories.png',
    alt: 'Energy Trajectories',
    label: 'Energy trajectories',
    caption: 'Energy landscape — optimization trajectories across training campaigns',
  },
  {
    src: '/benchmarks/fig10_symbiosis_matrix.png',
    alt: 'Module Symbiosis Matrix',
    label: 'Module symbiosis',
    caption: 'Symbiosis matrix — inter-module cooperation and synergy patterns',
  },
  {
    src: '/benchmarks/ucognet_08_mutation_intensity.png',
    alt: 'Mutation Intensity Map',
    label: 'Mutation intensity',
    caption: 'Mutation intensity — controlled evolution heatmap across generations',
  },
  {
    src: '/benchmarks/fig09_budget_pareto.png',
    alt: 'Budget vs Performance Pareto',
    label: 'Budget-performance Pareto',
    caption: 'Pareto frontier — cost-efficiency trade-offs with budget constraints',
  },
  {
    src: '/benchmarks/ucognet_15_capability_boundaries.png',
    alt: 'Capability Boundaries',
    label: 'Capability boundaries',
    caption: 'Capability boundaries — what UCogNet can and cannot do, honestly mapped',
  },
  {
    src: '/benchmarks/ucognet_02_regime_radar.png',
    alt: 'Regime Radar',
    label: 'Regime radar',
    caption: 'Regime radar — multi-dimensional regime behavior analysis',
  },
  {
    src: '/benchmarks/fig02_campaign_heatmap.png',
    alt: 'Campaign Heatmap',
    label: 'Campaign heatmap',
    caption: 'Campaign heatmap — training campaign results across configurations',
  },
];

export default function ResearchGallery() {
  return (
    <Box id="research" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      {/* Background glow */}
      <Box sx={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '40%',
        background: 'radial-gradient(ellipse, rgba(0,180,216,0.012), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" sx={{ mb: 1.5, textAlign: { md: 'center' } }}>
            Research visualizations
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, maxWidth: 520, mx: { md: 'auto' }, textAlign: { md: 'center' } }}>
            A curated set of internal diagnostics and evaluation charts. Click any chart to view at full resolution.
          </Typography>
          <Box sx={{
            display: 'flex', justifyContent: { md: 'center' }, mb: 6,
          }}>
            <Typography variant="caption" sx={{
              px: 1.5, py: 0.5, borderRadius: '8px',
              background: 'rgba(0,180,216,0.04)', border: `1px solid ${colors.border}`,
              color: colors.textSecondary, fontSize: '0.72rem', fontWeight: 500,
            }}>
              {charts.length} charts &middot; click to expand
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={2.5}>
          {charts.map((chart, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <Box sx={{
                  borderRadius: '14px', overflow: 'hidden',
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    borderColor: colors.borderHover,
                    boxShadow: colors.glow,
                    transform: 'translateY(-2px)',
                  },
                }}>
                  <ClickableImage
                    src={chart.src}
                    alt={chart.alt}
                    caption={chart.caption}
                  />
                  {/* Label */}
                  <Box sx={{
                    px: 2, py: 1.5,
                    borderTop: `1px solid ${colors.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: '0.78rem', fontWeight: 500,
                      color: colors.textPrimary,
                    }}>
                      {chart.label}
                    </Typography>
                    <Typography variant="caption" sx={{
                      fontSize: '0.62rem', fontWeight: 600,
                      color: colors.accent, opacity: 0.7,
                    }}>
                      &#x1F50D;
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
