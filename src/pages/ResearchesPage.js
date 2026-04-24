import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { colors } from '../theme';

/* ─── Color palette ─── */
const palette = {
  bci: '#10b981',
  physics: '#8b5cf6',
  highlight: '#06b6d4',
  warn: '#f59e0b',
  ucognet: '#10b981',
};

/* ══════════════════════════════════════════════════════════
   PLASMA TURBULENCE CONTROL — Benchmark V3
   Hasegawa-Wakatani 2D  ·  128×128  ·  April 2026
   ══════════════════════════════════════════════════════════ */

const benchmarkRows = [
  { rank: 1, name: 'FNO Surrogate',     ref: '[Li\'21]',   score: '0.7187', spectral: '0.922', ours: false, tag: null,   surrogate: true  },
  { rank: 2, name: 'UCogNet Legacy',     ref: '',           score: '0.7253', spectral: '0.927', ours: true,  tag: null,   surrogate: false },
  { rank: 3, name: 'NeuOp-Transformer',  ref: '[vdW\'26]',  score: '0.7293', spectral: '0.835', ours: false, tag: '2026', surrogate: true  },
  { rank: 4, name: 'FI-Conv',            ref: '[Chen\'26]', score: '0.7347', spectral: '0.867', ours: false, tag: '2026', surrogate: true  },
  { rank: 5, name: 'UCogNet Enhanced',    ref: '',           score: '0.7435', spectral: '0.844', ours: true,  tag: null,   surrogate: false },
  { rank: 6, name: 'UCogNet Ω',          ref: '',           score: '0.7490', spectral: '0.819', ours: true,  tag: '2026', surrogate: false },
  { rank: 7, name: 'PID',                ref: '',           score: '0.7585', spectral: '0.822', ours: false, tag: null,   surrogate: false },
  { rank: 8, name: 'MPC',                ref: '',           score: '0.7645', spectral: '0.789', ours: false, tag: null,   surrogate: false },
];

const multiSeedRows = [
  { name: 'UCogNet Enhanced',  mean: '0.7219', ci: '0.015', wins: '3/6', best: true  },
  { name: 'NeuOp-Transformer‡', mean: '0.7285', ci: '0.005', wins: '0/6', best: false },
  { name: 'UCogNet Legacy',    mean: '0.7311', ci: '0.022', wins: '2/6', best: false },
  { name: 'UCogNet Ω',         mean: '0.7400', ci: '0.016', wins: '1/6', best: false },
];

const hwParams = [
  { label: 'Grid',      value: '128 × 128' },
  { label: 'Domain',    value: 'L = 40' },
  { label: 'Adiabatic', value: 'α = 0.1' },
  { label: 'Gradient',  value: 'κ = 0.5' },
  { label: 'Viscosity', value: 'ν = 0.005' },
  { label: 'Diffusion', value: 'D = 0.005' },
  { label: 'Timestep',  value: 'dt = 0.005' },
  { label: 'Steps',     value: '1 000 + 200 warmup' },
];

const metricWeights = [
  { name: 'Energy stability',    weight: '20 %', icon: '⚡' },
  { name: 'Flux reduction',      weight: '20 %', icon: '🌊' },
  { name: 'Enstrophy control',   weight: '15 %', icon: '🌀' },
  { name: 'Spectral fidelity',   weight: '15 %', icon: '📊' },
  { name: 'Zonal flow fraction', weight: '10 %', icon: '🔄' },
  { name: 'Correlation time',    weight: '10 %', icon: '⏱️' },
  { name: 'Confinement',         weight: '10 %', icon: '🔒' },
];

const plasmaRefs = [
  { id: '[Li\'21]',   text: 'Li et al., "Fourier Neural Operator for Parametric PDEs," ICLR 2021.' },
  { id: '[Chen\'26]', text: 'Chen et al., "Frame-Independent Convolution for Turbulence," arXiv:2602.04287, 2026. (surrogate approx.)' },
  { id: '[vdW\'26]',  text: 'van de Wetering & Zhu, "Neural Operator Transformers for Modified HW," arXiv:2603.05730, 2026. (surrogate approx.)' },
  { id: '[HW83]',     text: 'Hasegawa & Wakatani, "Plasma Edge Turbulence," Phys. Rev. Lett. 50:682, 1983.' },
  { id: '[Ca95]',     text: 'Camargo et al., "Resistive drift-wave turbulence," Phys. Plasmas 2:48, 1995.' },
  { id: '[Ash26]',    text: 'Ashourvan, "GKFieldFlow — Gyrokinetic Field Regression," arXiv:2601.02614, 2026.' },
  { id: '[‡ note]',  text: 'Neural operator baselines (FNO, FI-Conv, NeuOp-Transformer) are analytical surrogate implementations matching the architectural families of the cited papers — not trained model checkpoints. Results cannot be directly compared to numbers in the cited papers without replication of their training.' },
];

/* ══════════════════════════════════════════════════════════
   BCI NEURAL DECODING — BNCI2014001
   Rigorous April 2026 run · 8 models · 9 subj × 5 seeds · 405 evaluations
   ════════════════════════════════════════════════════════ */

const bciRows = [
  { name: 'Riem-TS+Q',          acc: '76.2 %', ci: '±4.0 %', ours: false, kind: 'quantum'     },
  { name: 'Riem-TS+LR',         acc: '76.0 %', ci: '±4.1 %', ours: false, kind: 'classical'   },
  { name: 'Riem-MDM',           acc: '75.6 %', ci: '±4.1 %', ours: false, kind: 'classical'   },
  { name: 'UCogNet-ResV2',      acc: '74.2 %', ci: '±4.5 %', ours: true,  kind: 'cognitive'   },
  { name: 'CSP+LDA',            acc: '74.2 %', ci: '±4.4 %', ours: false, kind: 'classical'   },
  { name: 'UCogNet-Sing',       acc: '73.8 %', ci: '±4.5 %', ours: true,  kind: 'cognitive'   },
  { name: 'ShallowCNN',         acc: '73.7 %', ci: '±4.6 %', ours: false, kind: 'deep'        },
  { name: 'UCogNet-Std',        acc: '71.8 %', ci: '±4.3 %', ours: true,  kind: 'cognitive'   },
  { name: 'CSP+SVM',            acc: '71.5 %', ci: '±4.4 %', ours: false, kind: 'classical'   },
  { name: 'UCogNet-ResV2+Q',    acc: '71.3 %', ci: '±3.9 %', ours: true,  kind: 'quantum'     },
  { name: 'EEGNet',             acc: '71.1 %', ci: '±4.5 %', ours: false, kind: 'deep'        },
  { name: 'UCogNet-Std+Q',      acc: '69.4 %', ci: '±4.1 %', ours: true,  kind: 'quantum'     },
];

// Transfer-State (LOSO + EA + MMD + RSA) — Apr 2026 run
const transferRows = [
  { name: 'Riem-TS+LR',    loso: '65.7 %', loso_ea: '65.7 %', mmd_lat: '0.361', note: 'baseline' },
  { name: 'UCogNet-Sing',  loso: '60.9 %', loso_ea: '—',      mmd_lat: '0.764', note: 'own z-space (MMD_z)' },
];

const bciDetails = [
  { label: 'Dataset',    value: 'BNCI2014001 (MOABB) — cross-session motor imagery EEG' },
  { label: 'Paradigm',   value: '2-class motor imagery (left hand vs right hand)' },
  { label: 'Subjects',   value: '9 healthy adults, 5 seeds each' },
  { label: 'Protocol',   value: 'Train Session 1 → Test Session 2 (strict cross-session)' },
  { label: 'Evaluations', value: '540 cross-session + 45 LOSO = 585 total (2026-04-23 run)' },
  { label: 'Statistics', value: 'Wilcoxon paired signed-rank + Bootstrap 95% CI + Cliff’s δ' },
  { label: 'Transfer',   value: 'LOSO + Euclidean Alignment + MMD session drift + inter-model RSA' },
  { label: 'Run ID',     value: '2026-04-23T21-11-05Z__quantum_vs_classical' },
  { label: 'Reference',  value: 'Tangermann et al., “Review of BCI Competition IV,” Front. Neurosci. 2012.' },
];

/* ── Reusable table component ── */
function DataTable({ headers, rows, sx: tableSx }) {
  return (
    <Box component="table" sx={{
      width: '100%', borderCollapse: 'collapse',
      '& th, & td': { px: 2.5, py: 1.3, textAlign: 'left', fontSize: '0.82rem' },
      '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
      '& td': { borderTop: `1px solid ${colors.border}` },
      ...tableSx,
    }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={h.style}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Box>
  );
}

/* ── Card wrapper ── */
function Card({ children, sx }) {
  return (
    <Box sx={{
      borderRadius: '16px', overflow: 'hidden',
      background: colors.surface, border: `1px solid ${colors.border}`,
      ...sx,
    }}>
      {children}
    </Box>
  );
}

function CardHeader({ title, subtitle, subtitleColor, icon }) {
  return (
    <Box sx={{
      px: 3, py: 2, borderBottom: `1px solid ${colors.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && <Typography sx={{ fontSize: '1rem' }}>{icon}</Typography>}
        <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="caption" sx={{
          color: subtitleColor || colors.textSecondary, fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase',
        }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function CardFooter({ children }) {
  return (
    <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.border}` }}>
      {children}
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   PLASMA SECTION
   ══════════════════════════════════════════════════════════ */
function PlasmaSection() {
  return (
    <Box>
      {/* ── Intro ── */}
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 720, fontSize: '1.05rem' }}>
        Drift-wave turbulence governs cross-field particle and energy transport in tokamak edge plasmas.
        We benchmark UCogNet&apos;s cognitive controller against classical baselines (PID, MPC) and three
        2026 neural-operator surrogates on the Hasegawa-Wakatani 2D model — the standard testbed for
        resistive drift-wave dynamics.
      </Typography>

      <Grid container spacing={3}>
        {/* Left column — HW params + 7D metric */}
        <Grid item xs={12} md={5}>
          {/* HW2D Parameters */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Hasegawa-Wakatani 2D" subtitle="Pseudo-spectral solver" subtitleColor={palette.physics} icon="🔬" />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={1}>
                {hwParams.map((p) => (
                  <Grid item xs={6} key={p.label}>
                    <Box sx={{
                      p: 1, borderRadius: '8px',
                      background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`,
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
          </Card>

          {/* 7D Composite */}
          <Card>
            <CardHeader title="7D Composite Metric" subtitle="Lower = better" subtitleColor={palette.warn} icon="📐" />
            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {metricWeights.map((m) => (
                <Box key={m.name} sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  p: 1, borderRadius: '8px',
                  background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`,
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography sx={{ fontSize: '0.85rem' }}>{m.icon}</Typography>
                    <Typography variant="body2" sx={{ color: colors.textPrimary, fontSize: '0.78rem', fontWeight: 500 }}>
                      {m.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{
                    color: palette.physics, fontWeight: 700, fontSize: '0.75rem',
                    px: 1, py: 0.3, borderRadius: '4px', background: `${palette.physics}12`,
                  }}>
                    {m.weight}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Right column — tables */}
        <Grid item xs={12} md={7}>
          {/* Single-seed table */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Single-Seed Ranking" subtitle="Seed 42 · 8 controllers" subtitleColor={palette.physics} icon="🏆" />
            <DataTable
              headers={[
                { label: '#', style: { width: 36 } },
                { label: 'Controller' },
                { label: 'Composite v3', style: { textAlign: 'right' } },
                { label: 'Spectral fid.', style: { textAlign: 'right' } },
              ]}
              rows={benchmarkRows.map((r) => {
                const medal = r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `${r.rank}.`;
                return (
                  <tr key={r.name}>
                    <td style={{ textAlign: 'center', fontSize: '0.85rem' }}>{medal}</td>
                    <td style={{
                      color: r.ours ? palette.ucognet : colors.textPrimary,
                      fontWeight: r.ours ? 700 : 400,
                    }}>
                      {r.name}
                      {r.tag && (
                        <Box component="span" sx={{
                          ml: 0.8, px: 0.6, py: 0.1, borderRadius: '4px', fontSize: '0.55rem',
                          fontWeight: 700, background: `${palette.warn}20`, color: palette.warn,
                        }}>
                          {r.tag}
                        </Box>
                      )}
                      {r.ref && (
                        <Box component="span" sx={{ ml: 0.5, fontSize: '0.65rem', color: colors.textSecondary }}>
                          {r.ref}
                        </Box>
                      )}
                    </td>
                    <td style={{
                      textAlign: 'right', fontFamily: 'monospace',
                      color: r.ours ? palette.ucognet : colors.textSecondary,
                      fontWeight: r.ours ? 700 : 400,
                      background: r.ours ? `${palette.ucognet}10` : 'transparent',
                      borderRadius: r.ours ? '6px' : 0,
                    }}>
                      {r.score}
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: colors.textSecondary, fontSize: '0.78rem' }}>
                      {r.spectral}
                    </td>
                  </tr>
                );
              })}
            />
            <CardFooter>
              <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                <Box component="span" sx={{ color: palette.ucognet }}>●</Box>{' '}
                UCogNet Legacy ranks <strong style={{ color: colors.textPrimary }}>2nd on this single run (seed = 42)</strong> with highest
                spectral fidelity (0.927). ✱ FNO, FI-Conv, NeuOp-Transformer are analytical surrogate implementations
                — not trained model checkpoints from those papers. See multi-seed table for statistical summary.
              </Typography>
            </CardFooter>
          </Card>

          {/* Multi-seed table */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Multi-Seed Robustness" subtitle="6 seeds · 95% CI (t-dist., n=6)" subtitleColor={palette.warn} icon="🎲" />
            <DataTable
              headers={[
                { label: 'Controller' },
                { label: 'Mean ± 95% CI', style: { textAlign: 'right' } },
                { label: 'Wins',          style: { textAlign: 'right' } },
              ]}
              rows={multiSeedRows.map((r) => (
                <tr key={r.name}>
                  <td style={{
                    color: r.best ? palette.ucognet : colors.textPrimary,
                    fontWeight: r.best ? 700 : 400,
                  }}>
                    {r.name}
                    {r.best && (
                      <Box component="span" sx={{
                        ml: 0.8, px: 0.6, py: 0.1, borderRadius: '4px', fontSize: '0.55rem',
                        fontWeight: 700, background: `${palette.ucognet}20`, color: palette.ucognet,
                      }}>
                        BEST
                      </Box>
                    )}
                  </td>
                  <td style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    color: r.best ? palette.ucognet : colors.textSecondary,
                    fontWeight: r.best ? 700 : 400,
                  }}>
                    {r.mean} ± {r.ci}
                  </td>
                  <td style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    color: r.best ? palette.ucognet : colors.textSecondary,
                    fontWeight: r.best ? 700 : 400,
                    background: r.best ? `${palette.ucognet}10` : 'transparent',
                    borderRadius: r.best ? '6px' : 0,
                  }}>
                    {r.wins}
                  </td>
                </tr>
              ))}
            />
            <CardFooter>
              <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                <Box component="span" sx={{ color: palette.ucognet }}>●</Box>{' '}
                UCogNet Enhanced: lowest observed mean (0.7219 ± 0.015).
                CIs overlap for all pairs; no pairwise difference is statistically
                significant (e.g. Enhanced vs Legacy: t = −0.779, p = 0.471, n = 6).
                Win count (3/6) is descriptive.
              </Typography>
            </CardFooter>
          </Card>

          {/* References */}
          <Card>
            <Box sx={{ p: 2.5 }}>
              <Typography variant="caption" sx={{
                color: colors.textSecondary, fontWeight: 600, fontSize: '0.68rem',
                textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', mb: 1,
              }}>
                References
              </Typography>
              {plasmaRefs.map((r) => (
                <Typography key={r.id} variant="caption" sx={{ display: 'block', fontSize: '0.7rem', color: colors.textSecondary, lineHeight: 1.8 }}>
                  <Box component="span" sx={{ color: palette.physics, fontWeight: 600 }}>{r.id}</Box> {r.text}
                </Typography>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   BCI SECTION
   ══════════════════════════════════════════════════════════ */
function BCISection() {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 720, fontSize: '1.05rem' }}>
        Brain-Computer Interface (BCI) decoding translates EEG signals into device commands.
        We evaluate 8 decoder models on the public BNCI2014001 dataset
        (9 subjects, 5 seeds, cross-session protocol) using Wilcoxon paired tests,
        Bootstrap 95% CI, and Cliff’s delta effect sizes — 405 total evaluations.
      </Typography>

      <Grid container spacing={3}>
        {/* Left — Protocol details */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardHeader title="Experimental Protocol" subtitle="BNCI2014001" subtitleColor={palette.bci} icon="🧠" />
            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {bciDetails.map((d) => (
                <Box key={d.label} sx={{
                  p: 1.2, borderRadius: '8px',
                  background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`,
                }}>
                  <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {d.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textPrimary, fontSize: '0.8rem', fontWeight: 500, mt: 0.3 }}>
                    {d.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Right — Tables */}
        <Grid item xs={12} md={7}>
          {/* Full BCI table */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Classification Results" subtitle="8 models · 9 subj × 5 seeds · Apr 2026" subtitleColor={palette.bci} icon="📊" />
            <DataTable
              headers={[
                { label: 'Method' },
                { label: 'Bal. Accuracy', style: { textAlign: 'right' } },
                { label: '95% CI',        style: { textAlign: 'right' } },
              ]}
              rows={bciRows.map((r) => (
                <tr key={r.name}>
                  <td style={{
                    color: r.ours ? palette.bci : colors.textPrimary,
                    fontWeight: r.ours ? 700 : 400,
                  }}>
                    {r.name}
                    {r.ours && (
                      <Box component="span" sx={{
                        ml: 0.8, px: 0.6, py: 0.1, borderRadius: '4px', fontSize: '0.56rem',
                        fontWeight: 700, background: `${palette.bci}20`, color: palette.bci,
                      }}>ours</Box>
                    )}
                  </td>
                  <td style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    color: r.ours ? palette.bci : colors.textSecondary,
                    fontWeight: r.ours ? 700 : 400,
                    background: r.ours ? `${palette.bci}10` : 'transparent',
                    borderRadius: r.ours ? '6px' : 0,
                  }}>
                    {r.acc}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.78rem', color: colors.textSecondary }}>{r.ci}</td>
                </tr>
              ))}
            />
            <CardFooter>
              <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                <Box component="span" sx={{ color: palette.bci }}>●</Box>{' '}
                UCogNet-ResV2 <strong style={{ color: colors.textPrimary }}>rank 4 of 12 (74.2 ± 4.5 %)</strong>,
                statistically tied with CSP+LDA (Wilcoxon p = 0.97) and within noise of the
                Riemannian baseline (−1.8 pp, overlapping 95 % CIs).
                Quantum embeddings do not improve UCogNet variants — honest negative result
                (Riem-TS+Q: +0.15 pp p = 0.50; UCogNet-ResV2+Q: −2.9 pp p = 0.07, medium effect).
              </Typography>
            </CardFooter>
          </Card>

          {/* Transfer-State (LOSO + MMD) */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Transfer-State Analysis" subtitle="LOSO + EA + MMD session drift" subtitleColor={palette.bci} icon="🔀" />
            <DataTable
              headers={[
                { label: 'Method' },
                { label: 'LOSO',       style: { textAlign: 'right' } },
                { label: 'LOSO + EA',  style: { textAlign: 'right' } },
                { label: 'MMD drift',  style: { textAlign: 'right' } },
                { label: 'Note',       style: { textAlign: 'right' } },
              ]}
              rows={transferRows.map((r) => (
                <tr key={r.name}>
                  <td style={{ color: r.name.startsWith('UCogNet') ? palette.bci : colors.textPrimary, fontWeight: r.name.startsWith('UCogNet') ? 700 : 400 }}>
                    {r.name}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: colors.textSecondary }}>{r.loso}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: colors.textSecondary }}>{r.loso_ea}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: colors.textSecondary }}>{r.mmd_lat}</td>
                  <td style={{ textAlign: 'right', fontSize: '0.72rem', color: colors.textSecondary }}>{r.note}</td>
                </tr>
              ))}
            />
            <CardFooter>
              <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                <Box component="span" sx={{ color: palette.bci }}>●</Box>{' '}
                <strong style={{ color: colors.textPrimary }}>LOSO cross-subject:</strong> Riemannian baseline wins by 4.9 pp — the
                true cross-subject gap. <strong style={{ color: colors.textPrimary }}>MMD session drift:</strong> UCogNet-Sing
                z-space is 2.1× less stable than tangent space (MMD_z = 0.76 vs MMD_ts = 0.36) — the encoder memorises
                session-specific artefacts, identified as a concrete design target.
              </Typography>
            </CardFooter>
          </Card>

          {/* Key BCI insights */}
          <Card>
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1.5, fontSize: '0.9rem' }}>
                Key BCI insights
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {[
                  { icon: '🧐', text: 'Competitive, not dominant: UCogNet-ResV2 / Sing rank within the top 6 of 12 models, within noise (±4.5 pp) of the Riemannian baseline. Expected for a general cognitive architecture on a specialised EEG task — baseline-level feasibility confirmed.' },
                  { icon: '⚛️', text: 'Quantum embedding null result: Riem-TS+Q essentially ties Riem-TS+LR (+0.15 pp, p=0.50); UCogNet-ResV2+Q loses 2.9 pp with medium effect (p=0.07). Current quantum feature-map adds noise, not information. Reported honestly; flagged for redesign.' },
                  { icon: '🔀', text: 'Cross-subject transfer (LOSO): Riemannian-TS wins by 4.9 pp — honest generalisation gap. Euclidean Alignment gave +0.00 pp in the pooled setup (per-subject alignment flagged as the correct follow-up implementation).' },
                  { icon: '🪞', text: 'Session drift identified: MMD in UCogNet latent z-space is 2.1× higher than in Riemannian tangent space (0.76 vs 0.36) — the encoder memorises session-specific artefacts. A measurable, actionable design target.' },
                  { icon: '📊', text: 'Statistical rigour: Wilcoxon paired tests, Bootstrap 5000-resample 95 % CI, Cliff’s delta, inter-model RSA across 9 × 5 = 45 paired observations. Every comparison fully reported, including negative results.' },
                ].map((f, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem', mt: '1px' }}>{f.icon}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.6, color: colors.textSecondary }}>
                      <Box component="span" sx={{ color: palette.bci, fontWeight: 600 }}>{f.text.split(':')[0]}:</Box>
                      {f.text.split(':').slice(1).join(':')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   FLOATING NAV PILL
   Appears on scroll, fades in/out, blur backdrop
   ══════════════════════════════════════════════════════════ */
const domains = [
  { key: 0, icon: '⚡', label: 'Plasma', color: palette.physics },
  { key: 1, icon: '🧠', label: 'BCI',    color: palette.bci },
];

function FloatingNav({ tab, setTab, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1200,
          }}
        >
          <Box sx={{
            display: 'flex', gap: 0.5, p: 0.5,
            borderRadius: '20px',
            background: 'rgba(8,15,26,0.82)',
            backdropFilter: 'blur(20px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
            border: `1px solid rgba(255,255,255,0.08)`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
          }}>
            {domains.map((d) => {
              const active = tab === d.key;
              return (
                <Box
                  key={d.key}
                  component="button"
                  onClick={() => setTab(d.key)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.8,
                    px: { xs: 2, sm: 2.5 }, py: 1.2,
                    borderRadius: '16px',
                    border: 'none', cursor: 'pointer',
                    background: active
                      ? `${d.color}18`
                      : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: active ? `${d.color}22` : 'rgba(255,255,255,0.05)',
                    },
                    '&:active': { transform: 'scale(0.96)' },
                  }}
                >
                  {/* Active glow ring */}
                  {active && (
                    <motion.div
                      layoutId="nav-glow"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: 16,
                        border: `1.5px solid ${d.color}60`,
                        boxShadow: `0 0 16px ${d.color}30, inset 0 0 8px ${d.color}10`,
                      }}
                    />
                  )}
                  <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1, position: 'relative' }}>
                    {d.icon}
                  </Typography>
                  <Typography sx={{
                    fontSize: { xs: '0.78rem', sm: '0.85rem' },
                    fontWeight: active ? 700 : 500,
                    color: active ? d.color : 'rgba(255,255,255,0.55)',
                    transition: 'color 0.3s',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                  }}>
                    {d.label}
                  </Typography>
                  {/* Pulse dot */}
                  {active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: d.color,
                        boxShadow: `0 0 8px ${d.color}`,
                        position: 'relative',
                        marginLeft: 2,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Inline header switcher (always visible at top) ── */
function InlineNav({ tab, setTab }) {
  return (
    <Box sx={{
      display: 'flex', gap: 1, mb: 5, flexWrap: 'wrap',
    }}>
      {domains.map((d) => {
        const active = tab === d.key;
        return (
          <Box
            key={d.key}
            component="button"
            onClick={() => setTab(d.key)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: { xs: 2.5, sm: 3 }, py: { xs: 1.2, sm: 1.5 },
              borderRadius: '14px',
              border: `1.5px solid ${active ? d.color + '50' : colors.border}`,
              cursor: 'pointer',
              background: active ? `${d.color}10` : colors.surface,
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                borderColor: `${d.color}40`,
                background: `${d.color}08`,
                transform: 'translateY(-1px)',
              },
              '&:active': { transform: 'scale(0.97)' },
            }}
          >
            {active && (
              <motion.div
                layoutId="inline-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 14,
                  background: `${d.color}08`,
                  border: `1.5px solid ${d.color}40`,
                }}
              />
            )}
            <Typography sx={{ fontSize: '1.15rem', lineHeight: 1, position: 'relative' }}>
              {d.icon}
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Typography sx={{
                fontSize: { xs: '0.82rem', sm: '0.92rem' },
                fontWeight: active ? 700 : 500,
                color: active ? d.color : colors.textSecondary,
                transition: 'color 0.3s',
              }}>
                {d.key === 0 ? 'Plasma Turbulence Control' : 'BCI Neural Decoding'}
              </Typography>
              <Typography sx={{
                fontSize: '0.65rem', fontWeight: 500,
                color: active ? `${d.color}90` : colors.textSecondary,
                transition: 'color 0.3s', mt: 0.2,
              }}>
                {d.key === 0 ? 'HW2D · 8 controllers · 6 seeds' : 'BNCI2014001 · 8 models · 9 subj×5 seeds'}
              </Typography>
            </Box>
            {active && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: d.color, boxShadow: `0 0 10px ${d.color}`,
                  position: 'relative', flexShrink: 0,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function ResearchesPage() {
  const [tab, setTab] = useState(0);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const inlineRef = useRef(null);

  /* Show floating nav when inline nav scrolls out of view */
  const handleScroll = useCallback(() => {
    if (!inlineRef.current) return;
    const rect = inlineRef.current.getBoundingClientRect();
    setFloatingVisible(rect.bottom < 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <PageTransition>
      <SEO
        title="Researches — Plasma Turbulence & BCI Benchmarks"
        description="Detailed benchmark results for UCogNet: Hasegawa-Wakatani 2D plasma turbulence control (8 controllers, 7D composite, 6 seeds, surrogate baselines disclosed) and BCI neural decoding (BNCI2014001, 8 models, 9 subjects × 5 seeds, 405 evals, Wilcoxon + Bootstrap 95% CI)."
        path="/researches"
      />

      {/* Floating bottom nav */}
      <FloatingNav tab={tab} setTab={setTab} visible={floatingVisible} />

      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h1" sx={{ mb: 1.5 }}>Researches</Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 680, fontSize: '1.08rem' }}>
              Detailed benchmark results across two scientific domains.
              Same cognitive architecture — rigorously evaluated with traceable, reproducible evidence.
            </Typography>
          </motion.div>

          {/* Inline domain switcher */}
          <Box ref={inlineRef}>
            <InlineNav tab={tab} setTab={setTab} />
          </Box>

          {/* Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 0 ? <PlasmaSection /> : <BCISection />}
            </motion.div>
          </AnimatePresence>

          {/* Upcoming domain — Astrophysics */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box sx={{
              mt: 6, p: 3, borderRadius: '14px',
              background: `linear-gradient(135deg, ${colors.surface} 0%, rgba(224,122,47,0.05) 100%)`,
              border: `1px solid ${colors.accentWarm}30`,
              display: 'flex', flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 2,
            }}>
              <Box>
                <Typography variant="caption" sx={{
                  color: colors.accentWarm, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontSize: '0.7rem',
                }}>
                  Upcoming domain · Q2–Q3 2026
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.4, mb: 0.6, color: colors.textPrimary, fontSize: '1.1rem' }}>
                  Astrophysical anomaly detection — Cambioides as a null model
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', maxWidth: 680 }}>
                  Applying the new C₃-symmetric Thomas-attractor module to CMB patches (Planck SMICA)
                  and radio SETI spectrograms (Breakthrough Listen) — a third null model beyond
                  Gaussian noise and structured signal, with an explicit fractal scale (D_KY ≈ 2.31).
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/applications/astrophysics"
                variant="outlined"
                sx={{
                  px: 3, borderColor: `${colors.accentWarm}60`, color: colors.accentWarm,
                  whiteSpace: 'nowrap',
                  '&:hover': { borderColor: colors.accentWarm, background: `${colors.accentWarm}08` },
                }}
              >
                Read the proposal →
              </Button>
            </Box>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button component={RouterLink} to="/research" variant="outlined" sx={{ px: 3 }}>
                Research visualizations
              </Button>
              <Button component={RouterLink} to="/technical-note" variant="outlined" sx={{
                px: 3, borderColor: `${palette.physics}60`, color: palette.physics,
                '&:hover': { borderColor: palette.physics, background: `${palette.physics}08` },
              }}>
                Technical note
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
    </PageTransition>
  );
}
