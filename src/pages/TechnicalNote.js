import React from 'react';
import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { colors } from '../theme';

const guarantees = [
  { title: 'Frozen runs', desc: 'Every evaluation run is sealed with SHA-256 hashes, fixed random seeds, and declared token/time budgets. Nothing changes post-hoc.' },
  { title: 'Per-item evidence logs', desc: 'Each benchmark item produces a JSONL record with task ID, prompt hash, raw output, extracted answer, and scoring trace. Fully auditable.' },
  { title: 'Artifact indexing + replay', desc: 'All generated artifacts (tool code, sandbox outputs, intermediate reasoning) are indexed and replayable from the same frozen state.' },
  { title: 'Cost tracking', desc: 'Wall-clock time, token counts (prompt + completion), and inference cost are tracked per item. Budget overruns trigger automatic rollback.' },
];

const abGates = [
  { label: 'Improvement threshold', value: 'Candidate must exceed baseline by a statistically significant margin (bootstrap CI)' },
  { label: 'Cost cap', value: 'New mutation cannot exceed 1.2x the cost of current best policy' },
  { label: 'Safety anomaly detection', value: 'Reward spikes > 3\u03C3 from rolling mean trigger automatic audit' },
  { label: 'Gradual rollout', value: 'Mutations deploy to 10% \u2192 30% \u2192 100% traffic with gates at each stage' },
  { label: 'Rollback', value: 'If any gate fails, system reverts to previous policy within one evaluation cycle' },
];

export default function TechnicalNote() {
  return (
    <PageTransition>
    <SEO
      title="Technical Note — Reproducibility Guarantees"
      description="UCogNet's reproducibility guarantees: frozen runs with SHA-256 hashes, per-item evidence logs, artifact indexing, cost tracking, and full auditability."
      path="/technical-note"
    />
    <Box sx={{ pt: 12, pb: 10 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back */}
          <Button component={Link} to="/" startIcon={<ArrowBackIcon />}
            sx={{ mb: 4, color: colors.textSecondary, '&:hover': { color: colors.textPrimary } }}>
            Back to overview
          </Button>

          <Typography variant="h1" sx={{ mb: 2 }}>
            Technical Note
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 600, fontSize: '1.1rem' }}>
            Reproducibility contracts, evidence guarantees, budgets, and gated evolution.
            This document describes the interface and guarantees — not internal routing details.
          </Typography>

          {/* ── Section 1: Reproducibility ── */}
          <Typography variant="h2" sx={{ mb: 3, mt: 2 }}>
            Reproducibility contracts
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            Every UCogNet evaluation run operates under a strict reproducibility contract.
            The system is designed so that any result can be independently verified
            by replaying the frozen state with the same seeds and budgets.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {guarantees.map((g, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper sx={{
                  p: 3, height: '100%',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{ color: colors.accent, fontSize: 18 }} />
                    <Typography variant="h5" component="h3" sx={{ color: colors.textPrimary }}>{g.title}</Typography>
                  </Box>
                  <Typography variant="body2">{g.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* ── Section 2: Evidence architecture ── */}
          <Typography variant="h2" sx={{ mb: 3 }}>
            Evidence architecture
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            UCogNet does not produce bare answers. Every response carries structured evidence:
          </Typography>

          <Box sx={{
            p: 3, mb: 3, borderRadius: '12px',
            background: colors.surface, border: `1px solid ${colors.border}`,
            fontFamily: 'monospace', fontSize: '0.85rem', color: colors.textSecondary,
            lineHeight: 2, overflowX: 'auto',
          }}>
            <Box>{`{`}</Box>
            <Box sx={{ pl: 3 }}>{`"task_id": "arc-agi-2-item-042",`}</Box>
            <Box sx={{ pl: 3 }}>{`"mode_selected": "puzzle_short",`}</Box>
            <Box sx={{ pl: 3 }}>{`"confidence": 0.72,`}</Box>
            <Box sx={{ pl: 3 }}>{`"claims": [`}</Box>
            <Box sx={{ pl: 6 }}>{`{ "claim": "pattern repeats on axis-1", "evidence_type": "grid_analysis" }`}</Box>
            <Box sx={{ pl: 3 }}>{`],`}</Box>
            <Box sx={{ pl: 3 }}>{`"provenance": { "model": "qwen2.5-7b", "quant": "Q4_K_M", "tokens": 1240 },`}</Box>
            <Box sx={{ pl: 3 }}>{`"replay_hash": "sha256:a3f8c1..."}`}</Box>
            <Box>{`}`}</Box>
          </Box>

          <Typography variant="body1" sx={{ mb: 6 }}>
            Claims are explicit, provenance is machine-readable, and every output can be replayed.
            This is the foundation of audit-ready AI.
          </Typography>

          {/* ── Section 3: Budget system ── */}
          <Typography variant="h2" sx={{ mb: 3 }}>
            Budget system
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Every task execution operates under declared budgets:
          </Typography>

          <Box component="ul" sx={{
            pl: 3, mb: 6,
            '& li': { mb: 1.5, color: colors.textSecondary, fontSize: '0.95rem', lineHeight: 1.7 },
            '& strong': { color: colors.textPrimary },
          }}>
            <li><strong>Token budget:</strong> Maximum prompt + completion tokens per item. Enforced at the adapter level.</li>
            <li><strong>Time budget:</strong> Wall-clock seconds. Sandbox execution is killed after timeout.</li>
            <li><strong>Cost budget:</strong> Aggregate $/run cap. Prevents runaway inference on paid APIs.</li>
            <li><strong>Tool budget:</strong> Maximum number of tool calls per task. Prevents infinite loops.</li>
          </Box>

          {/* ── Section 4: Gated evolution ── */}
          <Typography variant="h2" sx={{ mb: 3 }}>
            Gated evolution with A/B gates
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            UCogNet evolves its policies through controlled mutations. Every candidate policy
            must pass through a series of gates before replacing the current best:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
            {abGates.map((g, i) => (
              <Box key={i} sx={{
                p: 2.5, borderRadius: '12px',
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderLeft: `3px solid ${i === 2 ? colors.accentWarm : colors.accent}`,
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 0.5 }}>
                  {g.label}
                </Typography>
                <Typography variant="body2">{g.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* ── Section 5: What we don't disclose ── */}
          <Typography variant="h2" sx={{ mb: 3 }}>
            Scope of this document
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            This technical note describes <strong>interfaces and guarantees</strong>, not internal implementation.
            Specifically, we do not disclose:
          </Typography>

          <Box component="ul" sx={{
            pl: 3, mb: 6,
            '& li': { mb: 1, color: colors.textSecondary, fontSize: '0.95rem' },
          }}>
            <li>Internal routing logic or routing model weights</li>
            <li>Reward function coefficients or shaping details</li>
            <li>Specific mutation operators or search strategies</li>
            <li>Benchmark-specific prompt engineering</li>
          </Box>

          <Typography variant="body1" sx={{ mb: 6 }}>
            These are available under NDA for qualified partners and investors.
            Contact <Box component="a" href="mailto:orion@brainstream.pro"
              sx={{ color: colors.accent, '&:hover': { textDecoration: 'underline' } }}>
              orion@brainstream.pro
            </Box> for access.
          </Typography>

          {/* Back */}
          <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ mr: 2 }}>
            Back to overview
          </Button>
          <Button variant="contained" href="mailto:orion@brainstream.pro?subject=Technical%20deep-dive%20request">
            Request full access
          </Button>
        </motion.div>
      </Container>
    </Box>
    </PageTransition>
  );
}
