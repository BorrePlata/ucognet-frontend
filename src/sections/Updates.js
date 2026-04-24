import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '../theme';

const milestones = [
  {
    date: 'Apr 2026',
    title: 'Cambioides module — C₃-symmetric chaos regulator atop Singularity',
    desc: 'New cognitive layer sitting above the Singularity: a Thomas cyclically-symmetric attractor (ẋ = sin(y) − bx + cyclic permutations) that closes a dissipative feedback loop with the output. ∇·F = −3b guarantees volume contraction; verified Lyapunov spectrum λ₁ = +0.24, λ₃ = −0.79, Kaplan–Yorke D_KY ≈ 2.31. Regulates chaos between layers without destroying cyclic information topology.',
    active: true,
  },
  {
    date: 'Apr 2026',
    title: 'Quantum vs Classical BCI run — 7 models, Transfer-State metrics',
    desc: 'Full cross-session + LOSO + Euclidean Alignment + session-drift MMD (tangent + latent) + inter-model RSA on BNCI2014001. Quantum embeddings show no significant advantage (Riem-TS+Q: +0.15 pp, p=0.50; UCogNet-ResV2-Q: −2.9 pp, p=0.07, medium effect) — an honest negative result on current quantum feature mapping. UCogNet-Sing debuts at rank 4 (73.8 %).',
    active: true,
  },
  {
    date: 'Apr 2026',
    title: 'Transfer-State benchmark infrastructure — LOSO + EA + MMD + RSA',
    desc: 'Rigorous cross-subject evaluation framework added to the benchmark: Leave-One-Subject-Out with pooled training, Rodrigues et al. Euclidean Alignment, MMD session drift (tangent-space + z-space), Kaplan–Yorke fractal dimension, inter-model RSA across Spearman-ranked subject profiles. Reveals that UCogNet-Sing latent space has 2.1× higher session drift than Riemannian tangent space (MMD_z = 0.76 vs MMD_ts = 0.36) — a measurable weakness that guides future encoder design.',
    active: true,
  },
  {
    date: 'Apr 2026',
    title: 'BCI Rigorous Benchmark — 8 models, 405 evaluations',
    desc: 'Full multi-objective evaluation: 9 subjects × 5 seeds × 8 models = 360 cross-session + 45 LOSO. Riem-TS+LR tops at 76.0%; UCogNet-ResV2 ranks 3rd (74.2%, p=0.97 vs CSP+LDA). Wilcoxon paired tests, 95% CI, Cliff\'s delta effect sizes.',
    active: true,
  },
  {
    date: 'Apr 2026',
    title: 'Benchmark V3 — Plasma Turbulence Control (HW2D)',
    desc: 'Full 8-controller benchmark on Hasegawa-Wakatani 2D (128×128) with 7D composite metric, 6-seed validation, and paired t-test. UCogNet Legacy ranks 2nd overall; Enhanced wins 3/6 seeds with best multi-seed mean (0.7219). Compared against 2026 SOTA: NeuOp-Transformer, FI-Conv, FNO Surrogate.',
    active: true,
  },
  {
    date: 'Apr 2026',
    title: 'Researches page — dual-domain deep-dive',
    desc: 'New /researches section with tabbed Plasma + BCI views. Full experimental protocol, simulation parameters, metric breakdowns, and peer-reviewed references for both domains.',
    active: true,
  },
  {
    date: 'Apr 2026',
    title: 'Real-time learning pipeline',
    desc: 'Continuous learning loop: harvest → should_train → LoRA fine-tune → deploy → hot-swap model. Autonomous background learning with rollback on Ψ_stable degradation. 16/16 tests pass.',
    active: true,
  },
  {
    date: 'Mar 2026',
    title: 'BCI Benchmark — BNCI2014001 (preliminary)',
    desc: 'Initial cross-session evaluation. Superseded by Apr 2026 rigorous run (8 models, 5 seeds, Wilcoxon tests).',
    active: false,
  },
  {
    date: 'Feb 2026',
    title: 'Module 5 — Physics control across 5 OOD campaigns',
    desc: 'Cognitive controller vs PID/LQR/Zero/Random with 3 seeds. Strongest differentiation under regime shifts (Campaign C: 0.351 vs PID 0.090).',
    active: false,
  },
  {
    date: 'Feb 2026',
    title: 'Module 6 — Self-evolution engine integrated',
    desc: 'Gated mutations with gradual rollout and rollback.',
    active: false,
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
