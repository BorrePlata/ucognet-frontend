import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ShieldIcon from '@mui/icons-material/Shield';
import GppGoodIcon from '@mui/icons-material/GppGood';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';
import ClickableImage from '../components/ImageLightbox';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { colors } from '../theme';

const pillars = [
  {
    icon: <GppGoodIcon sx={{ fontSize: 28 }} />,
    title: 'Gated evolution',
    desc: 'Every policy mutation must pass A/B statistical gates with bootstrap confidence intervals before deployment. Mutations deploy gradually: 10% → 30% → 100% traffic.',
    color: colors.accent,
  },
  {
    icon: <WarningAmberIcon sx={{ fontSize: 28 }} />,
    title: 'Anomaly detection',
    desc: 'Reward spikes greater than 3σ from rolling mean trigger automatic audit and halt. Prevents reward hacking and distribution shift exploitation.',
    color: colors.accentWarm,
  },
  {
    icon: <LockIcon sx={{ fontSize: 28 }} />,
    title: 'Cost caps & budgets',
    desc: 'Every execution operates under token, time, cost, and tool call budgets. Overruns trigger immediate rollback — no runaway inference.',
    color: colors.accent,
  },
  {
    icon: <BlockIcon sx={{ fontSize: 28 }} />,
    title: 'Sandboxed execution',
    desc: 'All tool calls execute in isolated sandboxes with strict permissions. No ambient authority — tools declare required capabilities upfront.',
    color: colors.accentSoft,
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 28 }} />,
    title: 'Evidence auditing',
    desc: 'Every response carries structured claims with provenance. Outputs without evidence are flagged and cannot be trusted by downstream consumers.',
    color: colors.accent,
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 28 }} />,
    title: 'Automatic rollback',
    desc: 'If any gate fails at any deployment stage, the system reverts to the previous policy within one evaluation cycle. No human intervention required.',
    color: colors.accentWarm,
  },
];

const gates = [
  { label: 'Improvement threshold', detail: 'Candidate must exceed baseline by a statistically significant margin (bootstrap CI).' },
  { label: 'Cost constraint', detail: 'New mutation cannot exceed 1.2× the cost of current best policy.' },
  { label: 'Safety anomaly check', detail: 'Reward spikes > 3σ from rolling mean trigger automatic audit and halt.' },
  { label: 'Gradual rollout', detail: '10% → 30% → 100% traffic with gates at each stage.' },
  { label: 'Rollback guarantee', detail: 'If any gate fails, system reverts to previous policy within one evaluation cycle.' },
];

export default function SafetyPage() {
  return (
    <PageTransition>
      <SEO
        title="Safety — 6 Pillars for Gated AI Evolution"
        description="How UCogNet enforces safe self-improvement: A/B gated evolution, cognitive budgets, shaping guardrails, evidence architecture, capability boundaries, and reproducibility."
        path="/safety"
      />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          {/* Hero banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{
              p: { xs: 4, md: 6 }, borderRadius: '24px',
              background: `linear-gradient(135deg, rgba(224,122,47,0.06) 0%, rgba(0,180,216,0.04) 100%)`,
              border: `1px solid ${colors.borderWarm}`,
              mb: 8, position: 'relative', overflow: 'hidden',
            }}>
              <Box sx={{
                position: 'absolute', top: 0, left: '5%', right: '5%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${colors.accentWarm}60, transparent)`,
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: '14px',
                  background: `${colors.accentWarm}15`,
                  border: `1px solid ${colors.borderWarm}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: colors.accentWarm,
                }}>
                  <ShieldIcon sx={{ fontSize: 30 }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{
                    color: colors.accentWarm, fontWeight: 700, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    Core principle
                  </Typography>
                  <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
                    Safety &amp; guardrails
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ maxWidth: 680, fontSize: '1.1rem', lineHeight: 1.8 }}>
                UCogNet&apos;s self-improvement is not unconstrained. Every mutation, every execution, and every deployment
                is bounded by statistical gates, budget limits, anomaly detection, and automatic rollback.
                This page documents the safety architecture in detail.
              </Typography>
            </Box>
          </motion.div>

          {/* Six pillars grid */}
          <Typography variant="h2" sx={{ mb: 1.5 }}>Safety pillars</Typography>
          <Typography variant="body1" sx={{ mb: 5, maxWidth: 520 }}>
            Six interlocking mechanisms that prevent uncontrolled self-improvement.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 10 }}>
            {pillars.map((p, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ height: '100%' }}
                >
                  <Box sx={{
                    p: 3.5, height: '100%', borderRadius: '16px',
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: `${p.color}40`, boxShadow: `0 4px 30px ${p.color}10` },
                  }}>
                    <Box sx={{
                      width: 48, height: 48, borderRadius: '12px',
                      background: `${p.color}10`,
                      border: `1px solid ${p.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: p.color, mb: 2.5,
                    }}>
                      {p.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1.5, lineHeight: 1.3 }}>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Guardrails visualization */}
          <Grid container spacing={4} sx={{ mb: 10 }} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Box sx={{
                  borderRadius: '18px', overflow: 'hidden',
                  border: `1px solid ${colors.border}`,
                  background: colors.surface, height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <Box sx={{ p: 3, borderBottom: `1px solid ${colors.border}` }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      Shaping guardrails
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Anti-reward-hacking mechanisms at the reward layer.
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <ClickableImage
                      src="/benchmarks/ucognet_12_shaping_guardrails.png"
                      alt="Shaping cap and anomaly detection"
                      caption="Safety guardrails — shaping caps, reward auditing, anomaly flags"
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Box sx={{
                  borderRadius: '18px', overflow: 'hidden',
                  border: `1px solid ${colors.border}`,
                  background: colors.surface, height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <Box sx={{ p: 3, borderBottom: `1px solid ${colors.border}` }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                      Capability boundaries
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      What the system can and cannot do — honestly mapped.
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <ClickableImage
                      src="/benchmarks/ucognet_15_capability_boundaries.png"
                      alt="Capability boundaries honesty map"
                      caption="Capability boundaries — honest assessment of system limits"
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* A/B gates */}
          <Typography variant="h2" sx={{ mb: 1.5 }}>A/B gate protocol</Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 520 }}>
            Every candidate policy must clear every gate in sequence. One failure triggers full rollback.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 8 }}>
            {gates.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Box sx={{
                  p: 3, borderRadius: '14px',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderLeft: `3px solid ${i === 2 ? colors.accentWarm : colors.accent}`,
                  display: 'flex', gap: 2.5, alignItems: 'flex-start',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: colors.borderHover },
                }}>
                  <Box sx={{
                    minWidth: 36, height: 36, borderRadius: '10px',
                    background: `rgba(0,180,216,${0.04 + i * 0.015})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Typography variant="caption" sx={{
                      color: colors.accent, fontWeight: 700, fontSize: '0.75rem',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 0.3 }}>
                      {g.label}
                    </Typography>
                    <Typography variant="body2">{g.detail}</Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Additional charts */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                borderRadius: '16px', overflow: 'hidden',
                border: `1px solid ${colors.border}`, background: colors.surface,
              }}>
                <ClickableImage
                  src="/benchmarks/ucognet_07_evidence_asymmetry.png"
                  alt="Evidence asymmetry analysis"
                  caption="Evidence asymmetry — detection of systematic bias in evidence collection"
                />
                <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${colors.border}` }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Evidence asymmetry</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                borderRadius: '16px', overflow: 'hidden',
                border: `1px solid ${colors.border}`, background: colors.surface,
              }}>
                <ClickableImage
                  src="/benchmarks/ucognet_05_reward_composition.png"
                  alt="Reward composition breakdown"
                  caption="Composite reward — correctness, evidence, cost, safety components"
                />
                <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${colors.border}` }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Reward composition</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* CTA */}
          <Box sx={{
            p: 4, borderRadius: '18px', textAlign: 'center',
            background: colors.surface, border: `1px solid ${colors.border}`,
          }}>
            <Typography variant="h3" sx={{ mb: 2, color: colors.textPrimary }}>
              Want to audit our safety architecture?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, maxWidth: 480, mx: 'auto' }}>
              Full safety documentation is available under NDA for qualified partners and investors.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button component={RouterLink} to="/technical-note" variant="outlined">
                Read the technical note
              </Button>
              <Button component={RouterLink} to="/contact" variant="contained">
                Request access
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
}
