import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ClickableImage from '../components/ImageLightbox';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { colors } from '../theme';

const charts = [
  {
    src: '/benchmarks/fig01_module_radar.png',
    alt: 'Module Capability Radar',
    label: 'Module capability radar',
    caption: 'Radar chart — per-module performance profile across evaluation dimensions',
  },
  {
    src: '/benchmarks/ucognet_11_architecture_pyramid.png',
    alt: 'Architecture Pyramid',
    label: 'Architecture pyramid',
    caption: 'UCogNet Architecture — 10-module cognitive pyramid with metacognitive routing',
  },
  {
    src: '/benchmarks/ucognet_03_confidence_signals.png',
    alt: 'Confidence Signals',
    label: 'Confidence signals',
    caption: 'Confidence signal distribution — metacognitive self-assessment calibration',
  },
  {
    src: '/benchmarks/ucognet_09_rollout_pipeline.png',
    alt: 'Rollout Pipeline',
    label: 'Rollout pipeline',
    caption: 'Gated rollout pipeline — A/B evolution with gradual deployment stages',
  },
  {
    src: '/benchmarks/ucognet_05_reward_composition.png',
    alt: 'Reward Composition',
    label: 'Reward composition',
    caption: 'Composite reward breakdown — correctness, evidence, cost, safety components',
  },
  {
    src: '/benchmarks/fig06_energy_trajectories.png',
    alt: 'Energy Trajectories',
    label: 'Energy trajectories',
    caption: 'Energy landscape — optimization trajectories across training campaigns',
  },
  {
    src: '/benchmarks/ucognet_04_routing_heatmap.png',
    alt: 'Routing Heatmap',
    label: 'Routing heatmap',
    caption: 'Routing heatmap — task-aware mode selection across benchmarks',
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
    src: '/benchmarks/ucognet_01_test_coverage.png',
    alt: 'Test Coverage',
    label: 'Test coverage',
    caption: 'Test coverage — 807 automated tests across 10 modules',
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
    caption: 'Capability boundaries — honest assessment of what UCogNet can and cannot do',
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
  {
    src: '/benchmarks/ucognet_12_shaping_guardrails.png',
    alt: 'Shaping Guardrails',
    label: 'Shaping guardrails',
    caption: 'Safety guardrails — shaping caps, reward auditing, anomaly flags',
  },
  {
    src: '/benchmarks/fig05_ablation_study.png',
    alt: 'Ablation Study',
    label: 'Ablation study',
    caption: 'Ablation study — component-level contribution analysis',
  },
  {
    src: '/benchmarks/ucognet_14_integration_flow.png',
    alt: 'Integration Flow',
    label: 'Integration flow',
    caption: 'System integration flow — metacognitive loop and data pathways',
  },
  {
    src: '/benchmarks/ucognet_07_evidence_asymmetry.png',
    alt: 'Evidence Asymmetry',
    label: 'Evidence asymmetry',
    caption: 'Evidence asymmetry — detection of systematic bias in evidence collection',
  },
];

export default function ResearchPage() {
  return (
    <PageTransition>
      <SEO
        title="Research — Benchmark Results & Visualizations"
        description="Internal diagnostics, evaluation charts, and benchmark results from UCogNet. BCI decoding on BNCI2014001 and parametric physics control across 5 OOD campaigns."
        path="/research"
      />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" sx={{ mb: 1.5 }}>Research visualizations</Typography>
            <Typography variant="body1" sx={{ mb: 2, maxWidth: 580, fontSize: '1.08rem' }}>
              Internal diagnostics and evaluation charts from UCogNet&apos;s development.
              Click any chart to view at full resolution.
            </Typography>
            <Box sx={{ display: 'flex', mb: 5 }}>
              <Typography variant="caption" sx={{
                px: 1.5, py: 0.5, borderRadius: '8px',
                background: 'rgba(0,180,216,0.04)', border: `1px solid ${colors.border}`,
                color: colors.textSecondary, fontSize: '0.72rem', fontWeight: 500,
              }}>
                {charts.length} charts &middot; click to expand
              </Typography>
            </Box>
          </motion.div>

          {/* Masonry layout using CSS columns */}
          <Box sx={{
            columnCount: { xs: 1, sm: 2, md: 3 },
            columnGap: '20px',
            '& > *': { breakInside: 'avoid', mb: '20px' },
          }}>
            {charts.map((chart, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.4 }}
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
                  <Box sx={{
                    px: 2, py: 1.5,
                    borderTop: `1px solid ${colors.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <Typography variant="body2" sx={{
                      fontSize: '0.78rem', fontWeight: 500, color: colors.textPrimary,
                    }}>
                      {chart.label}
                    </Typography>
                    <Typography variant="caption" sx={{
                      fontSize: '0.62rem', fontWeight: 600, color: colors.accent, opacity: 0.7,
                    }}>
                      &#x1F50D;
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
}
