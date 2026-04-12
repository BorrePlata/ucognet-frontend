import React from 'react';
import { Box, Container, Typography, Grid, Button, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import { colors } from '../theme';

/* Color palette for research domains */
const palette = {
  bci: '#10b981',
  physics: '#8b5cf6',
  highlight: '#06b6d4',
  warn: '#f59e0b',
  gold: '#eab308',
  silver: '#94a3b8',
  bronze: '#d97706',
  ucognet: '#10b981',
};

/*
 * Plasma Turbulence Control Benchmark V3 — Hasegawa-Wakatani 2D
 * 128×128 grid, α=0.1, κ=0.5, ν=D=0.005, dt=0.005, 1000 steps + 200 warmup
 * 7-dimensional composite: energy stability (20%), flux reduction (20%),
 *   enstrophy (15%), spectral fidelity (15%), zonal flow (10%),
 *   correlation time (10%), confinement (10%).  Lower = better.
 *
 * References:
 *   [1] Li et al., "Fourier Neural Operator", ICLR 2021
 *   [2] Chen et al., "FI-Conv", arXiv:2602.04287, 2026
 *   [3] van de Wetering & Zhu, "Neural Operator Transformers", arXiv:2603.05730, 2026
 */

/*
 * Single-seed reference run (seed=42, lower composite = better).
 * IMPORTANT: FNO, FI-Conv, and NeuOp-Transformer are ANALYTICAL SURROGATE
 * implementations that approximate the architectural families of those papers.
 * They are NOT trained model checkpoints from the cited works.
 * PID and MPC are real classical controllers executed on the same HW2D PDE.
 */
const benchmarkRows = [
  { rank: 1, name: 'FNO Surrogate',         ref: '[Li\'21]',   score: '0.7187', spectral: '0.922', highlight: false,    tag: null,   surrogate: true },
  { rank: 2, name: 'UCogNet Legacy',         ref: '',           score: '0.7253', spectral: '0.927', highlight: 'legacy', tag: null,   surrogate: false },
  { rank: 3, name: 'NeuOp-Transformer',      ref: '[vdW\'26]',  score: '0.7293', spectral: '0.835', highlight: false,    tag: '2026', surrogate: true },
  { rank: 4, name: 'FI-Conv',               ref: '[Chen\'26]', score: '0.7347', spectral: '0.867', highlight: false,    tag: '2026', surrogate: true },
  { rank: 5, name: 'UCogNet Enhanced',       ref: '',           score: '0.7435', spectral: '0.844', highlight: 'enhanced', tag: null, surrogate: false },
  { rank: 6, name: 'UCogNet Ω',             ref: '',           score: '0.7490', spectral: '0.819', highlight: 'omega',  tag: '2026', surrogate: false },
  { rank: 7, name: 'PID',                   ref: '',           score: '0.7585', spectral: '0.822', highlight: false,    tag: null,   surrogate: false },
  { rank: 8, name: 'MPC',                   ref: '',           score: '0.7645', spectral: '0.789', highlight: false,    tag: null,   surrogate: false },
];

/*
 * Multi-seed comparison (6 seeds: 42, 7, 123, 256, 999, 314).
 * 95% CI uses t-distribution (t*=2.571, n=6): CI = t* × (std / √6).
 * No pairwise difference is statistically significant at α=0.05.
 * NeuOp-Transformer is an analytical surrogate (see note above).
 */
const multiSeedRows = [
  { name: 'UCogNet Enhanced', mean: '0.7219', std: '0.015', wins: '3/6', highlight: true },
  { name: 'NeuOp-Transformer', mean: '0.7285', std: '0.005', wins: '0/6', highlight: false },
  { name: 'UCogNet Legacy',   mean: '0.7311', std: '0.022', wins: '2/6', highlight: false },
  { name: 'UCogNet Ω',        mean: '0.7400', std: '0.016', wins: '1/6', highlight: false },
];

/* Literature references */
const references = [
  { id: '[Li\'21]',   text: 'Li Z. et al., "Fourier Neural Operator for Parametric PDEs," ICLR 2021.' },
  { id: '[Chen\'26]', text: 'Chen et al., "Frame-Independent Convolution for Turbulence," arXiv:2602.04287, 2026. (surrogate approx.)' },
  { id: '[vdW\'26]',  text: 'van de Wetering & Zhu, "Neural Operator Transformers for Modified HW," arXiv:2603.05730, 2026. (surrogate approx.)' },
];

/* BCI — BNCI2014001 April 2026 rigorous run (8 models × 9 subj × 5 seeds = 405 evals) */
const bciRows = [
  { name: 'Riem-TS+LR (SOTA)',     acc: '76.0%', ci: '±4.1%', highlight: false },
  { name: 'UCogNet-ResV2 (ours)',  acc: '74.2%', ci: '±4.5%', highlight: true },
  { name: 'CSP+LDA',               acc: '74.2%', ci: '±4.4%', highlight: false },
  { name: 'EEGNet',                acc: '71.1%', ci: '±4.5%', highlight: false },
];

const stats = [
  { value: '8',    label: 'Controllers compared', color: palette.physics },
  { value: '6',    label: 'Validation seeds',     color: palette.warn },
  { value: '7D',   label: 'Composite metric',     color: palette.highlight },
  { value: '3',    label: 'Neural op. surrogates', color: palette.gold },
];

/* Hasegawa-Wakatani 2D simulation parameters */
const hwParams = [
  { label: 'Grid',      value: '128×128' },
  { label: 'Domain',    value: 'L = 40' },
  { label: 'Adiabatic', value: 'α = 0.1' },
  { label: 'Gradient',  value: 'κ = 0.5' },
  { label: 'Viscosity', value: 'ν = 0.005' },
  { label: 'Diffusion', value: 'D = 0.005' },
  { label: 'Timestep',  value: 'dt = 0.005' },
  { label: 'Steps',     value: '1000 + 200 warmup' },
];

/* 7D composite metric breakdown */
const metricWeights = [
  { name: 'Energy stability',    weight: '20%', icon: '⚡' },
  { name: 'Flux reduction',      weight: '20%', icon: '🌊' },
  { name: 'Enstrophy control',   weight: '15%', icon: '🌀' },
  { name: 'Spectral fidelity',   weight: '15%', icon: '📊' },
  { name: 'Zonal flow fraction', weight: '10%', icon: '🔄' },
  { name: 'Correlation time',    weight: '10%', icon: '⏱️' },
  { name: 'Confinement',         weight: '10%', icon: '🔒' },
];

export default function PlasmaResults() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      {/* Subtle research gradient background */}
      <Box sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(139,92,246,0.03) 0%, transparent 60%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: '10px',
              background: `${palette.physics}15`, border: `1px solid ${palette.physics}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ScienceIcon sx={{ color: palette.physics, fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{
                color: palette.physics, fontWeight: 700, fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Benchmark V3 &bull; Hasegawa-Wakatani 2D &bull; April 2026
              </Typography>
              <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
                Plasma turbulence control
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 680, fontSize: '1.08rem' }}>
            UCogNet evaluated against classical controllers (PID, MPC) and analytical
            surrogate implementations of neural operator architectures on drift-wave
            turbulence (Hasegawa-Wakatani 2D, 128×128). Neural operator baselines
            (FNO, FI-Conv, NeuOp-Transformer) represent the architectural families
            of published works via approximate surrogate models — not trained
            checkpoints from those papers. 7D composite score; multi-seed
            comparison uses t-distribution 95% CI (n=6). Lower composite = better.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Left — Architecture flow */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* HW2D Simulation Parameters */}
              <Box sx={{
                p: 3, borderRadius: '18px',
                background: colors.surface, border: `1px solid ${colors.border}`,
              }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 0.5 }}>
                  Hasegawa-Wakatani 2D
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.7rem', display: 'block', mb: 2 }}>
                  Drift-wave turbulence model &bull; Pseudo-spectral solver
                </Typography>
                <Grid container spacing={1}>
                  {hwParams.map((p) => (
                    <Grid item xs={6} key={p.label}>
                      <Box sx={{
                        p: 1, borderRadius: '8px',
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${colors.border}`,
                      }}>
                        <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {p.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.textPrimary, fontWeight: 600, fontSize: '0.82rem', fontFamily: 'monospace' }}>
                          {p.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* 7D Composite Metric */}
              <Box sx={{
                p: 3, borderRadius: '18px', mt: 2,
                background: colors.surface, border: `1px solid ${colors.border}`,
              }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 0.5 }}>
                  7D Composite Metric
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.7rem', display: 'block', mb: 2 }}>
                  Weighted multi-objective score &bull; Lower = better
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                  {metricWeights.map((m) => (
                    <Box key={m.name} sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      p: 1, borderRadius: '8px',
                      background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${colors.border}`,
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <Typography sx={{ fontSize: '0.85rem' }}>{m.icon}</Typography>
                        <Typography variant="body2" sx={{ color: colors.textPrimary, fontSize: '0.78rem', fontWeight: 500 }}>
                          {m.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{
                        color: palette.physics, fontWeight: 700, fontSize: '0.75rem',
                        px: 1, py: 0.3, borderRadius: '4px',
                        background: `${palette.physics}12`,
                      }}>
                        {m.weight}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right — Stats + Benchmark */}
          <Grid item xs={12} md={7}>
            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {stats.map((s, i) => (
                  <Grid item xs={6} sm={3} key={i}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Box sx={{
                        p: 2, borderRadius: '14px', textAlign: 'center',
                        background: colors.surface,
                        border: `1px solid ${s.color}25`,
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: `${s.color}50` },
                      }}>
                        <Typography sx={{
                          fontWeight: 800, fontSize: '1.6rem', color: s.color,
                          lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                        }}>
                          {s.value}
                        </Typography>
                        <Typography variant="caption" sx={{
                          color: colors.textSecondary, fontSize: '0.68rem', fontWeight: 500, mt: 0.5, display: 'block',
                        }}>
                          {s.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* V3 Benchmark table — 8 controllers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Box sx={{
                borderRadius: '16px', overflow: 'hidden',
                background: colors.surface, border: `1px solid ${colors.border}`,
              }}>
                <Box sx={{
                  px: 3, py: 2, borderBottom: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    Single-Seed Ranking
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: palette.physics, fontSize: '0.68rem', fontWeight: 600,
                      textTransform: 'uppercase',
                  }}>
                    Seed 42 &bull; single run &bull; lower = better &bull; surrogate baselines*
                  </Typography>
                </Box>
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 2.5, py: 1.3, textAlign: 'left', fontSize: '0.82rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead>
                    <tr>
                      <th style={{ width: 36 }}>#</th>
                      <th>Controller</th>
                      <th style={{ textAlign: 'right' }}>Composite v3</th>
                      <th style={{ textAlign: 'right' }}>Spectral fid.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkRows.map((r) => {
                      const isUcognet = !!r.highlight;
                      const rowColor = isUcognet ? palette.ucognet : colors.textPrimary;
                      const medal = r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `${r.rank}.`;
                      return (
                        <tr key={r.name}>
                          <td style={{ fontSize: '0.85rem', textAlign: 'center' }}>{medal}</td>
                          <td style={{
                            color: rowColor,
                            fontWeight: isUcognet ? 700 : 400,
                          }}>
                            {r.name}
                            {r.tag && (
                              <Box component="span" sx={{
                                ml: 0.8, px: 0.7, py: 0.15, borderRadius: '4px', fontSize: '0.58rem',
                                fontWeight: 700, background: `${palette.warn}20`, color: palette.warn,
                                verticalAlign: 'middle',
                              }}>
                                {r.tag}
                              </Box>
                            )}
                            {r.ref && (
                              <Box component="span" sx={{
                                ml: 0.5, fontSize: '0.65rem', color: colors.textSecondary, fontWeight: 400,
                              }}>
                                {r.ref}
                              </Box>
                            )}
                          </td>
                          <td style={{
                            textAlign: 'right', fontFamily: 'monospace',
                            color: isUcognet ? palette.ucognet : colors.textSecondary,
                            fontWeight: isUcognet ? 700 : 400,
                            background: isUcognet ? `${palette.ucognet}10` : 'transparent',
                            borderRadius: isUcognet ? '6px' : 0,
                          }}>
                            {r.score}
                          </td>
                          <td style={{
                            textAlign: 'right', fontFamily: 'monospace',
                            color: colors.textSecondary, fontSize: '0.78rem',
                          }}>
                            {r.spectral}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Box>

                <Box sx={{
                  px: 3, py: 2, borderTop: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', gap: 2,
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.78rem', flex: 1 }}>
                    <Box component="span" sx={{ color: palette.ucognet }}>●</Box>{' '}
                    UCogNet Legacy ranks <strong style={{ color: colors.textPrimary }}>2nd on this single run</strong>{' '}
                    with highest spectral fidelity (0.927). ✱ FNO, FI-Conv, NeuOp-Transformer are
                    analytical surrogate implementations — not trained models from the cited papers.
                    See multi-seed comparison below for statistical summary.
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Multi-seed robustness table */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{
                mt: 3, borderRadius: '16px', overflow: 'hidden',
                background: colors.surface, border: `1px solid ${colors.border}`,
              }}>
                <Box sx={{
                  px: 3, py: 2, borderBottom: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    Multi-Seed Robustness
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: palette.warn, fontSize: '0.68rem', fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    6 seeds &bull; 95% CI (t-dist., n=6) &bull; top 4 controllers
                  </Typography>
                </Box>
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 2.5, py: 1.3, textAlign: 'left', fontSize: '0.82rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead>
                    <tr>
                      <th>Controller</th>
                      <th style={{ textAlign: 'right' }}>Mean ± 95% CI</th>
                      <th style={{ textAlign: 'right' }}>Wins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {multiSeedRows.map((r) => (
                      <tr key={r.name}>
                        <td style={{
                          color: r.highlight ? palette.ucognet : colors.textPrimary,
                          fontWeight: r.highlight ? 700 : 400,
                        }}>
                          {r.name}
                          {r.highlight && (
                            <Box component="span" sx={{
                              ml: 0.8, px: 0.7, py: 0.15, borderRadius: '4px', fontSize: '0.58rem',
                              fontWeight: 700, background: `${palette.ucognet}20`, color: palette.ucognet,
                            }}>
                              BEST
                            </Box>
                          )}
                        </td>
                        <td style={{
                          textAlign: 'right', fontFamily: 'monospace',
                          color: r.highlight ? palette.ucognet : colors.textSecondary,
                          fontWeight: r.highlight ? 700 : 400,
                        }}>
                          {r.mean} ± {r.std}
                        </td>
                        <td style={{
                          textAlign: 'right', fontFamily: 'monospace',
                          color: r.highlight ? palette.ucognet : colors.textSecondary,
                          fontWeight: r.highlight ? 700 : 400,
                          background: r.highlight ? `${palette.ucognet}10` : 'transparent',
                          borderRadius: r.highlight ? '6px' : 0,
                        }}>
                          {r.wins}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
                <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.border}` }}>
                  <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                    <Box component="span" sx={{ color: palette.ucognet }}>●</Box>{' '}
                    UCogNet Enhanced achieves <strong style={{ color: colors.textPrimary }}>lowest observed mean composite (0.7219 ± 0.015)</strong>{' '}
                    vs NeuOp-Transformer surrogate (0.7285 ± 0.005). CIs overlap for all pairs;
                    no pairwise difference is statistically significant
                    (e.g. Enhanced vs Legacy: t=−0.779, p=0.471). Win count (3/6) is descriptive.
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* BCI benchmark table */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{
                mt: 3, borderRadius: '16px', overflow: 'hidden',
                background: colors.surface, border: `1px solid ${colors.border}`,
              }}>
                <Box sx={{
                  px: 3, py: 2, borderBottom: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    BCI Decoding — BNCI2014001
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: palette.bci, fontSize: '0.68rem', fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    9 subj &bull; 5 seeds &bull; 8 models &bull; Apr 2026
                  </Typography>
                </Box>
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 3, py: 1.5, textAlign: 'left', fontSize: '0.85rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th style={{ textAlign: 'right' }}>Bal. Acc.</th>
                      <th style={{ textAlign: 'right' }}>95% CI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bciRows.map((r) => (
                      <tr key={r.name}>
                        <td style={{
                          color: r.highlight ? palette.bci : colors.textPrimary,
                          fontWeight: r.highlight ? 700 : 400,
                        }}>
                          {r.name}
                        </td>
                        <td style={{
                          textAlign: 'right',
                          color: r.highlight ? palette.bci : colors.textSecondary,
                          fontWeight: r.highlight ? 700 : 400,
                          background: r.highlight ? `${palette.bci}10` : 'transparent',
                          borderRadius: r.highlight ? '6px' : 0,
                        }}>
                          {r.acc}
                        </td>
                        <td style={{ textAlign: 'right', color: colors.textSecondary, fontFamily: 'monospace', fontSize: '0.78rem' }}>{r.ci}</td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
                <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.border}` }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    <Box component="span" sx={{ color: palette.bci }}>&#9679;</Box>{' '}
                    Rigorous April 2026 run (405 evaluations, Wilcoxon, Bootstrap 95% CI).
                    UCogNet-ResV2 <strong style={{ color: colors.textPrimary }}>rank 3 of 8</strong>, statistically tied with CSP+LDA (p=0.97);
                    significantly outperforms CSP+SVM (p=0.006). Full cross-domain: same cognitive
                    architecture for plasma turbulence control and EEG motor imagery decoding.
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Key findings summary */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Box sx={{
                mt: 3, p: 3, borderRadius: '16px',
                background: `linear-gradient(135deg, ${palette.physics}06, ${palette.bci}04)`,
                border: `1px solid ${colors.border}`,
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1.5, fontSize: '0.9rem' }}>
                  Key findings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {[
                    { icon: '📊', color: palette.ucognet, text: 'Best multi-seed mean: UCogNet Enhanced achieves lowest composite (0.7219 ± 0.015) across 6 seeds. No pairwise difference with surrogate baselines is statistically significant (p>0.05 all pairs, n=6).' },
                    { icon: '🔬', color: palette.physics, text: 'Spectral fidelity: UCogNet Legacy achieves 0.927 — highest among all 8 controllers on seed=42, capturing turbulent energy spectra most faithfully.' },
                    { icon: 'ℹ️', color: palette.warn, text: 'Surrogate baselines: FNO, FI-Conv, NeuOp-Transformer are analytical surrogate implementations approximating those architectural families — not trained model checkpoints from the cited papers.' },
                    { icon: '🧠', color: palette.highlight, text: 'Cross-domain: same cognitive architecture addresses both plasma turbulence (HW2D) and EEG motor imagery (BNCI2014001) — no task-specific re-engineering.' },
                  ].map((f, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Typography sx={{ fontSize: '0.9rem', mt: '1px' }}>{f.icon}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                        <Box component="span" sx={{ color: f.color, fontWeight: 600 }}>{f.text.split(':')[0]}:</Box>{f.text.split(':').slice(1).join(':')}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* References */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <Box sx={{
                mt: 3, p: 2.5, borderRadius: '14px',
                background: 'rgba(255,255,255,0.01)',
                border: `1px solid ${colors.border}`,
              }}>
                <Typography variant="caption" sx={{
                  color: colors.textSecondary, fontWeight: 600, fontSize: '0.68rem',
                  textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', mb: 1,
                }}>
                  References
                </Typography>
                  {references.map((r) => (
                  <Typography key={r.id} variant="caption" sx={{
                    display: 'block', fontSize: '0.7rem', color: colors.textSecondary, lineHeight: 1.8,
                  }}>
                    <Box component="span" sx={{ color: palette.physics, fontWeight: 600 }}>{r.id}</Box> {r.text}
                  </Typography>
                ))}
                <Typography variant="caption" sx={{
                  display: 'block', mt: 1.5, pt: 1.5, borderTop: `1px solid ${colors.border}`,
                  fontSize: '0.67rem', color: colors.textSecondary, lineHeight: 1.7, fontStyle: 'italic',
                }}>
                  * Neural operator baselines use analytical surrogate implementations matching the
                  architectural families of the cited papers (same PDE, same task), not trained
                  model checkpoints. FNO, FI-Conv, and NeuOp-Transformer results cannot be directly
                  compared to numbers in the cited papers without replication of their training.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mt: 5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={RouterLink} to="/research" variant="outlined" sx={{ px: 3 }}>
              View all research charts
            </Button>
            <Button component={RouterLink} to="/safety" variant="outlined" sx={{
              px: 3, borderColor: `${colors.accentWarm}60`, color: colors.accentWarm,
              '&:hover': { borderColor: colors.accentWarm, background: `${colors.accentWarm}08` },
            }}>
              Safety architecture
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
