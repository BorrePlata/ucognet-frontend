import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Tabs, Tab, Button } from '@mui/material';
import { motion } from 'framer-motion';
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
  { rank: 1, name: 'FNO Surrogate',     ref: '[1]', score: '0.7187', spectral: '0.922', ours: false, tag: null },
  { rank: 2, name: 'UCogNet Legacy',     ref: '',    score: '0.7253', spectral: '0.927', ours: true,  tag: null },
  { rank: 3, name: 'NeuOp-Transformer',  ref: '[3]', score: '0.7293', spectral: '0.835', ours: false, tag: '2026' },
  { rank: 4, name: 'FI-Conv',            ref: '[2]', score: '0.7347', spectral: '0.867', ours: false, tag: '2026' },
  { rank: 5, name: 'UCogNet Enhanced',    ref: '',    score: '0.7435', spectral: '0.844', ours: true,  tag: null },
  { rank: 6, name: 'UCogNet Ω',          ref: '',    score: '0.7490', spectral: '0.819', ours: true,  tag: '2026' },
  { rank: 7, name: 'PID',                ref: '',    score: '0.7585', spectral: '0.822', ours: false, tag: null },
  { rank: 8, name: 'MPC',                ref: '',    score: '0.7645', spectral: '0.789', ours: false, tag: null },
];

const multiSeedRows = [
  { name: 'UCogNet Enhanced',  mean: '0.7219', std: '0.014', wins: '3/6', best: true },
  { name: 'NeuOp-Transformer', mean: '0.7285', std: '0.005', wins: '0/6', best: false },
  { name: 'UCogNet Legacy',    mean: '0.7311', std: '0.021', wins: '2/6', best: false },
  { name: 'UCogNet Ω',         mean: '0.7400', std: '0.015', wins: '1/6', best: false },
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
  { id: '[1]', text: 'Li et al., "Fourier Neural Operator for Parametric PDEs," ICLR 2021.' },
  { id: '[2]', text: 'Chen et al., "Frame-Independent Convolution for Turbulence," arXiv:2602.04287, 2026.' },
  { id: '[3]', text: 'van de Wetering & Zhu, "Neural Operator Transformers for Modified HW," arXiv:2603.05730, 2026.' },
  { id: '[4]', text: 'Hasegawa & Wakatani, "Plasma Edge Turbulence," Phys. Rev. Lett. 50:682, 1983.' },
  { id: '[5]', text: 'Camargo et al., "Resistive drift-wave turbulence," Phys. Plasmas 2:48, 1995.' },
  { id: '[6]', text: 'Ashourvan, "GKFieldFlow — Gyrokinetic Field Regression," arXiv:2601.02614, 2026.' },
];

/* ══════════════════════════════════════════════════════════
   BCI NEURAL DECODING — BNCI2014001
   9 subjects  ·  cross-session  ·  Motor Imagery
   ══════════════════════════════════════════════════════════ */

const bciRows = [
  { name: 'CSP + LDA', acc2: '74.6 %', acc4: '58.1 %', pass4: '8/9', ours: false },
  { name: 'CSP + SVM', acc2: '71.5 %', acc4: '55.5 %', pass4: '8/9', ours: false },
  { name: 'UCogNet',   acc2: '73.7 %', acc4: '52.7 %', pass4: '9/9', ours: true },
];

const bciDetails = [
  { label: 'Dataset',    value: 'BNCI Horizon 2020 — 001-2014' },
  { label: 'Paradigm',   value: '4-class motor imagery (left hand, right hand, feet, tongue)' },
  { label: 'Subjects',   value: '9 healthy adults' },
  { label: 'Sessions',   value: '2 per subject (cross-session evaluation)' },
  { label: 'Channels',   value: '22 EEG electrodes, 250 Hz' },
  { label: 'Threshold',  value: '4-class chance = 25 %; pass ≥ 40 %' },
  { label: 'CKA',        value: 'Centered Kernel Alignment confirms distinct features per class' },
  { label: 'Reference',  value: 'Tangermann et al., "Review of the BCI Competition IV," Front. Neurosci. 2012.' },
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
                UCogNet Legacy ranks <strong style={{ color: colors.textPrimary }}>2nd overall</strong> with best
                spectral fidelity (0.927), outperforming both 2026 neural operator baselines and classical controllers.
              </Typography>
            </CardFooter>
          </Card>

          {/* Multi-seed table */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Multi-Seed Robustness" subtitle="6 seeds · paired t-test" subtitleColor={palette.warn} icon="🎲" />
            <DataTable
              headers={[
                { label: 'Controller' },
                { label: 'Mean ± Std', style: { textAlign: 'right' } },
                { label: 'Wins', style: { textAlign: 'right' } },
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
                    {r.mean} ± {r.std}
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
                UCogNet Enhanced achieves <strong style={{ color: colors.textPrimary }}>best mean (0.7219)</strong> and
                wins 3/6 seeds — most robust across stochastic initial conditions.
                Paired t-test Ω vs Legacy: t = −0.779, p = 0.471.
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
        Brain-Computer Interface (BCI) decoding translates neural signals into device commands.
        We evaluate UCogNet on the public BNCI2014001 motor imagery dataset — the most widely used
        benchmark in the BCI community, with 9 subjects performing 4-class imagined movements
        across two recording sessions.
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
            <CardHeader title="Classification Results" subtitle="Cross-session" subtitleColor={palette.bci} icon="📊" />
            <DataTable
              headers={[
                { label: 'Method' },
                { label: '2-class acc.', style: { textAlign: 'right' } },
                { label: '4-class acc.', style: { textAlign: 'right' } },
                { label: '4-class pass', style: { textAlign: 'right' } },
              ]}
              rows={bciRows.map((r) => (
                <tr key={r.name}>
                  <td style={{
                    color: r.ours ? palette.bci : colors.textPrimary,
                    fontWeight: r.ours ? 700 : 400,
                  }}>
                    {r.name}
                  </td>
                  <td style={{ textAlign: 'right', color: colors.textSecondary }}>{r.acc2}</td>
                  <td style={{ textAlign: 'right', color: colors.textSecondary }}>{r.acc4}</td>
                  <td style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    color: r.ours ? palette.bci : colors.textSecondary,
                    fontWeight: r.ours ? 700 : 400,
                    background: r.ours ? `${palette.bci}10` : 'transparent',
                    borderRadius: r.ours ? '6px' : 0,
                  }}>
                    {r.pass4}
                  </td>
                </tr>
              ))}
            />
            <CardFooter>
              <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                <Box component="span" sx={{ color: palette.bci }}>●</Box>{' '}
                UCogNet achieves <strong style={{ color: colors.textPrimary }}>9/9 subject pass</strong> in 4-class
                motor imagery — only method where every subject exceeds the 40 % threshold.
                CKA analysis confirms representationally distinct learned features per class.
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
                  { icon: '✅', text: 'Robustness: all 9 subjects pass the 4-class threshold (vs 8/9 for both CSP baselines). UCogNet handles inter-subject neural variability better.' },
                  { icon: '🔍', text: 'Feature quality: CKA (Centered Kernel Alignment) shows that UCogNet\'s learned representations are more class-separable than CSP spatial filters.' },
                  { icon: '📈', text: '2-class competitive: 73.7 % accuracy, within 1 % of CSP+LDA (74.6 %). The cognitive overhead pays off in multi-class robustness.' },
                  { icon: '🔄', text: 'Cross-session: evaluated across separate recording sessions (not within-session), testing generalization across daily neural variability.' },
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
   PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function ResearchesPage() {
  const [tab, setTab] = useState(0);

  return (
    <PageTransition>
      <SEO
        title="Researches — Plasma Turbulence & BCI Benchmarks"
        description="Detailed benchmark results for UCogNet: Hasegawa-Wakatani 2D plasma turbulence control (8 controllers, 7D composite, 6 seeds) and BCI neural decoding (BNCI2014001, 9 subjects, cross-session)."
        path="/researches"
      />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h1" sx={{ mb: 1.5 }}>Researches</Typography>
            <Typography variant="body1" sx={{ mb: 2, maxWidth: 680, fontSize: '1.08rem' }}>
              Detailed benchmark results across two scientific domains.
              Same cognitive architecture — rigorously evaluated with traceable, reproducible evidence.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{
                px: 1.5, py: 0.5, borderRadius: '8px',
                background: `${palette.physics}08`, border: `1px solid ${palette.physics}25`,
                color: palette.physics, fontSize: '0.72rem', fontWeight: 600,
              }}>
                ⚡ Plasma · 8 controllers · 6 seeds
              </Typography>
              <Typography variant="caption" sx={{
                px: 1.5, py: 0.5, borderRadius: '8px',
                background: `${palette.bci}08`, border: `1px solid ${palette.bci}25`,
                color: palette.bci, fontSize: '0.72rem', fontWeight: 600,
              }}>
                🧠 BCI · 9 subjects · cross-session
              </Typography>
            </Box>
          </motion.div>

          {/* Tabs */}
          <Box sx={{ borderBottom: `1px solid ${colors.border}`, mb: 5 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              textColor="inherit"
              TabIndicatorProps={{ sx: { background: tab === 0 ? palette.physics : palette.bci, height: 3, borderRadius: '3px 3px 0 0' } }}
            >
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography sx={{ fontSize: '1rem' }}>⚡</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'none' }}>
                      Plasma Turbulence Control
                    </Typography>
                  </Box>
                }
                sx={{ color: tab === 0 ? palette.physics : colors.textSecondary, px: 3 }}
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography sx={{ fontSize: '1rem' }}>🧠</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'none' }}>
                      BCI Neural Decoding
                    </Typography>
                  </Box>
                }
                sx={{ color: tab === 1 ? palette.bci : colors.textSecondary, px: 3 }}
              />
            </Tabs>
          </Box>

          {/* Content */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {tab === 0 ? <PlasmaSection /> : <BCISection />}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box sx={{ mt: 6, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
