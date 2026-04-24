import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { colors } from '../theme';

/* ══════════════════════════════════════════════════════════════════════════
   /applications/astrophysics
   Hyper-personalised landing for astrophysics / survey science audiences
   (stellar spectroscopy PhDs, CMB/SETI groups, 4MOST/Gaia ML initiatives).
   Positions UCogNet + Cambioides as scientific instruments, not a VC product.
   ══════════════════════════════════════════════════════════════════════════ */

const palette = {
  cmb:    '#9B7BD8',   // violet — microwave background
  seti:   '#00E599',   // green  — radio signal
  chaos:  '#E07A2F',   // orange — attractor
  ucognet: colors.accent,
};

const bullet = (color) => ({
  display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
  background: color, mr: 1.5, verticalAlign: 'middle',
});

function Card({ children, sx }) {
  return (
    <Box sx={{
      borderRadius: '16px', background: colors.surface,
      border: `1px solid ${colors.border}`, p: { xs: 2.5, md: 3.5 },
      ...sx,
    }}>{children}</Box>
  );
}

function Eq({ children }) {
  return (
    <Box sx={{
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: '0.95rem', color: colors.textPrimary, textAlign: 'center',
      px: 2, py: 2, my: 2,
      background: 'rgba(0,180,216,0.04)',
      borderRadius: '10px',
      border: `1px solid ${colors.border}`,
    }}>
      {children}
    </Box>
  );
}

function SectionTitle({ eyebrow, children, color = colors.accent }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" sx={{
        color, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mb: 0.8,
      }}>{eyebrow}</Typography>
      <Typography variant="h3" sx={{ color: colors.textPrimary, fontSize: '1.5rem' }}>
        {children}
      </Typography>
    </Box>
  );
}

function StatPill({ label, value, color }) {
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'baseline', gap: 1,
      px: 1.8, py: 0.8, borderRadius: '999px',
      border: `1px solid ${color}40`, background: `${color}08`,
    }}>
      <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color, fontSize: '0.95rem' }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.7rem' }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function AstrophysicsPage() {
  return (
    <PageTransition>
      <SEO
        title="Astrophysical Anomaly Detection — Cambioides + UCogNet"
        description="Cambioides: a C₃-symmetric dissipative chaos module (Thomas attractor) proposed as a null model for anomaly detection in CMB patches (Planck SMICA) and radio SETI spectrograms (Breakthrough Listen). Part of the UCogNet cognitive platform."
        path="/applications/astrophysics"
      />

      <Box sx={{ pt: { xs: 12, md: 14 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">

          {/* ───────── Hero ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{
                color: palette.chaos, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontSize: '0.72rem',
              }}>
                Applications · Astrophysics
              </Typography>
            </Box>

            <Typography variant="h1" sx={{ mb: 3, fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}>
              Deterministic chaos as a{' '}
              <Box component="span" sx={{ color: palette.chaos }}>null model</Box>{' '}
              for astrophysical anomaly detection.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: 820, mb: 4 }}>
              <strong>Cambioides</strong> is a cyclically-symmetric Thomas attractor layered
              atop the UCogNet cognitive platform. It provides a third null hypothesis —
              beyond Gaussian noise and structured signal — against which anomalies in CMB
              patches and radio SETI spectrograms can be discriminated with explicit fractal
              geometry (D<sub>KY</sub> ≈ 2.31) and strict volume contraction (∇·F = −3b).
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 5 }}>
              <StatPill label="C₃ symmetry"       value="(x,y,z)↦(y,z,x)" color={palette.chaos} />
              <StatPill label="verified λ₁"       value="+0.237"          color={palette.chaos} />
              <StatPill label="Kaplan–Yorke dim." value="≈ 2.31"          color={palette.chaos} />
              <StatPill label="dissipation"       value="∇·F = −3b"       color={palette.chaos} />
            </Box>
          </motion.div>

          {/* ───────── Problem ───────── */}
          <Grid container spacing={3} sx={{ mt: 2, mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: palette.cmb }} />
                  <Typography variant="caption" sx={{ color: palette.cmb, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    Cosmic Microwave Background
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ mb: 2, color: colors.textPrimary }}>
                  Where Gaussianity is not enough
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Planck SMICA reveals well-known large-scale anomalies — the Cold Spot,
                  the low quadrupole, the quadrupole–octopole alignment, the hemispherical
                  power asymmetry — that are statistically awkward under ΛCDM but whose
                  significance depends on the choice of null model. Gaussianity tests alone
                  often underestimate structure; CNN detectors overfit to training
                  realisations.
                </Typography>
                <Typography variant="body2">
                  A <em>deterministic-chaos</em> null — minimal, symmetric, dissipative —
                  provides a complementary reference: a signal inconsistent with <em>both</em>{' '}
                  Gaussian noise <em>and</em> Thomas-type chaos is a stronger anomaly candidate
                  than one that merely fails the former.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: palette.seti }} />
                  <Typography variant="caption" sx={{ color: palette.seti, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    Radio SETI
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ mb: 2, color: colors.textPrimary }}>
                  The RFI discrimination problem
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Breakthrough Listen surveys at Green Bank and Parkes generate terabytes of
                  filterbank spectrograms dominated by terrestrial RFI. Current candidate
                  selection (ON/OFF cadencing, drift-rate constraints) is conservative by
                  construction and discards structured but non-linear signatures.
                </Typography>
                <Typography variant="body2">
                  A C₃-symmetric chaotic null would flag signals whose embedding-space
                  geometry is simultaneously <em>too ordered for noise</em> and <em>too
                  irreducible for chaos</em> — a region of signal space where natural
                  astrophysical processes are rare.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* ───────── Method ───────── */}
          <Box sx={{ mb: 6 }}>
            <SectionTitle eyebrow="Method" color={palette.chaos}>
              The Cambioides module — minimal chaos with maximal symmetry
            </SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Card>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Cambioides implements the Thomas (1999) cyclically-symmetric flow as a
                    continuous RNN of three neurons with σ = sin(·):
                  </Typography>

                  <Eq>
                    ẋ = sin(y) − b·x<br/>
                    ẏ = sin(z) − b·y<br/>
                    ż = sin(x) − b·z
                  </Eq>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    The flow is invariant under the cyclic permutation{' '}
                    (x,y,z) ↦ (y,z,x) — the generator of C₃ — so the attractor is
                    equivariant and orbits organise into topological equivalence classes
                    under discrete rotation. Divergence is constant: ∇·F = −3b, so phase
                    volume contracts as V(t) = V₀·e<sup>−3bt</sup>, guaranteeing a compact
                    attractor for any b &gt; 0.
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    For b ≈ 0.18 the on-line Lyapunov spectrum estimator (tangent-space
                    integration with Gram–Schmidt re-orthonormalisation) recovers
                    λ<sub>1</sub> = +0.237, λ<sub>2</sub> ≈ 0, λ<sub>3</sub> = −0.790,
                    giving a Kaplan–Yorke dimension
                  </Typography>

                  <Eq>
                    D<sub>KY</sub> = 2 + λ₁ / |λ₃| ≈ 2.31
                  </Eq>

                  <Typography variant="body2">
                    — a two-dimensional fractal sheet with small transverse extent.
                    The implementation is a thread-safe integrator (RK4, dt = 0.05) with an
                    optional external drive; both the attractor and its drive-perturbed
                    variants are available as reference distributions for MMD, RSA and
                    Lyapunov-deviation scoring of arbitrary input signals.
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={5}>
                <Card>
                  <Typography variant="caption" sx={{
                    color: palette.chaos, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', mb: 1.5,
                  }}>
                    Why this null model
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                    {[
                      ['Minimality', 'Three variables, a single parameter b. No hidden knobs to tune away inconvenient detections.'],
                      ['Symmetry', 'C₃ is the minimal non-trivial discrete symmetry of a 3-flow — aligned with the approximate statistical isotropy of the CMB and the cyclic phase structure of narrow-band signals.'],
                      ['Topology over values', 'Information is carried by the geometry of the trajectory, not by isolated values — the right invariant under gain, pointing and calibration drift.'],
                      ['Explicit fractality', 'Unlike CNN baselines, the reference attractor has a derived D_KY, giving a principled anomaly scale.'],
                    ].map(([head, body]) => (
                      <Box key={head}>
                        <Typography variant="body2" sx={{ color: colors.textPrimary, fontWeight: 600, fontSize: '0.85rem', mb: 0.3 }}>
                          <Box sx={bullet(palette.chaos)} />{head}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.82rem', pl: 2 }}>
                          {body}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* ───────── Planned experiments ───────── */}
          <Box sx={{ mb: 6 }}>
            <SectionTitle eyebrow="Experiments" color={palette.cmb}>
              Validation plan — known anomalies first, blind search second
            </SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <Typography variant="caption" sx={{ color: palette.cmb, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    CMB — Planck SMICA
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 0.5, mb: 2, color: colors.textPrimary }}>
                    Cold Spot &amp; quadrupole alignment
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 1, fontSize: '0.85rem', lineHeight: 1.7, color: colors.textSecondary } }}>
                    <li>Planck SMICA temperature map, HEALPix N<sub>side</sub> = 256 (≈ 0.79 M pixels).</li>
                    <li>Scan HEALPix tiles at 5° and 10° angular scales; for each tile compute: (i) Gaussianity (Kolmogorov–Smirnov on pixels), (ii) N-point cumulants, (iii) <strong>Cambioides Lyapunov-deviation score</strong> ‖λ₁<sup>(tile)</sup> − λ₁<sup>(null)</sup>‖ after driving the attractor with tile pixel sequences.</li>
                    <li>Sanity check: recover the Cold Spot (ℓ ≈ 207°, b ≈ −57°) and the low-ℓ multipole alignment above chance.</li>
                    <li>Report ROC-AUC of the Cambioides score against a CNN baseline trained on labelled non-Gaussian simulations.</li>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <Typography variant="caption" sx={{ color: palette.seti, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    SETI — Breakthrough Listen
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 0.5, mb: 2, color: colors.textPrimary }}>
                    Technosignature candidate re-scoring
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 1, fontSize: '0.85rem', lineHeight: 1.7, color: colors.textSecondary } }}>
                    <li>Public Green Bank Telescope filterbank data, 2 – 3 targets with published candidate lists (including the BLC1 region and known RFI-dense fields).</li>
                    <li>Spectrogram chunks (128 × 128 dynamic-range-compressed) → Cambioides drive → z-space embedding → anomaly score via MMD vs the undriven attractor.</li>
                    <li>Sanity check: detect injected narrow-band CW tones and real Voyager 1 telemetry above RFI at specified SNR thresholds.</li>
                    <li>Blind re-score the published candidates; compare ranking agreement with the BL team&rsquo;s candidate list (Spearman ρ + confusion matrix).</li>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* ───────── Platform infrastructure ───────── */}
          <Box sx={{ mb: 6 }}>
            <SectionTitle eyebrow="Platform" color={colors.accent}>
              Why this isn&rsquo;t a standalone script
            </SectionTitle>

            <Card>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Cambioides does not sit alone. It is a module within UCogNet — a 30+ module
                cognitive platform with the infrastructure needed to turn a detection
                hypothesis into a reproducible survey:
              </Typography>
              <Grid container spacing={2}>
                {[
                  ['Transfer-State metrics', 'LOSO + Euclidean Alignment + MMD session drift + inter-model RSA, already validated on the BNCI2014001 motor-imagery benchmark (9 subjects × 5 seeds).'],
                  ['TDA / persistent homology', 'Topological descriptors over HEALPix patches and spectrogram tiles as an orthogonal view alongside Cambioides geometry.'],
                  ['Singularity manifold', '512-dimensional latent manifold with free-energy minimisation — a shared embedding space for CMB patches, radio spectra and ancillary signals.'],
                  ['Mnemosyne memory', 'Holographic high-dimensional memory of labelled known anomalies and calibration references, with entropy-weighted consolidation.'],
                  ['Gated evolution', 'A/B rollout with safety budgets and rollback on Ψ-stability degradation — survey pipelines evolve without silently drifting.'],
                  ['Live graph server', 'SSE + HTTP endpoints for streaming candidate discovery, Lyapunov-deviation heatmaps and cross-survey comparison in real time.'],
                ].map(([head, body]) => (
                  <Grid item xs={12} md={6} key={head}>
                    <Box sx={{ p: 2, borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors.border}`, height: '100%' }}>
                      <Typography variant="body2" sx={{ color: colors.textPrimary, fontWeight: 600, fontSize: '0.88rem', mb: 0.5 }}>
                        <Box sx={bullet(colors.accent)} />{head}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.82rem' }}>
                        {body}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>

          {/* ───────── Transparency on current state ───────── */}
          <Box sx={{ mb: 6 }}>
            <SectionTitle eyebrow="Transparency" color={colors.textSecondary}>
              What exists, what is planned
            </SectionTitle>
            <Card sx={{ borderColor: `${colors.textSecondary}30` }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" sx={{ color: palette.seti, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    Implemented &amp; verified
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mt: 1, '& li': { fontSize: '0.85rem', lineHeight: 1.7, color: colors.textSecondary, mb: 0.8 } }}>
                    <li>Cambioides module: RK4 integrator, on-line Lyapunov spectrum, Kaplan–Yorke dimension, thread-safe driven-attractor API.</li>
                    <li>Smoke test matches theory: λ₁ = +0.237, λ₃ = −0.790, D<sub>KY</sub> = 2.31, ∇·F = −3b numerically confirmed.</li>
                    <li>UCogNet Transfer-State benchmark (LOSO + EA + MMD + RSA) on 9 subjects × 5 seeds × 7 models, including Riemannian baselines and quantum variants.</li>
                    <li>Honest negative result on current quantum feature-map: reported, not hidden.</li>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" sx={{ color: palette.chaos, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    Proposed / in progress
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mt: 1, '& li': { fontSize: '0.85rem', lineHeight: 1.7, color: colors.textSecondary, mb: 0.8 } }}>
                    <li>Planck SMICA ingestion + HEALPix tile scanner.</li>
                    <li>Breakthrough Listen filterbank loader + spectrogram tiler.</li>
                    <li>ROC-AUC benchmarking of Cambioides vs KS-test, cumulants and CNN baselines on labelled known anomalies.</li>
                    <li>Target venue: MICAI 2026 (Nov 2026, Springer LNCS) — submission deadline 14 June 2026.</li>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>

          {/* ───────── Contact / collaboration ───────── */}
          <Box sx={{ mb: 4 }}>
            <Card sx={{
              background: `linear-gradient(135deg, ${colors.surface} 0%, rgba(224,122,47,0.06) 100%)`,
              borderColor: `${palette.chaos}30`,
            }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="caption" sx={{ color: palette.chaos, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    Looking to collaborate
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 0.5, mb: 1.5, color: colors.textPrimary, fontSize: '1.25rem' }}>
                    PhD, postdoc and survey-team collaborations
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    The author brings prior experience with CMB and SETI data, the full UCogNet
                    platform as reproducible infrastructure, and the Cambioides module as a
                    concrete contribution. Collaborations with stellar, Galactic and
                    technosignature-search groups are welcome — especially where ML
                    pattern-recognition meets survey-scale spectroscopy (Gaia DR4/5, 4MOST,
                    Breakthrough Listen, Planck legacy).
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/contact"
                      sx={{ background: `linear-gradient(135deg, ${palette.chaos} 0%, #B86020 100%)` }}
                    >
                      Contact the author
                    </Button>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/researches"
                    >
                      See benchmark rigour
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>

          {/* ───────── References ───────── */}
          <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${colors.border}` }}>
            <Typography variant="caption" sx={{ color: colors.textSecondary, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', mb: 2 }}>
              References
            </Typography>
            <Box component="ol" sx={{ pl: 3, m: 0, '& li': { fontSize: '0.78rem', lineHeight: 1.7, color: colors.textSecondary, mb: 0.6 } }}>
              <li>Thomas, R. (1999). <em>Deterministic chaos seen in terms of feedback circuits: Analysis, synthesis, &lsquo;labyrinth chaos&rsquo;</em>. Int. J. Bifurcation and Chaos, 9(10), 1889–1905.</li>
              <li>Planck Collaboration (2020). <em>Planck 2018 results. VII. Isotropy and statistics of the CMB</em>. A&amp;A 641, A7.</li>
              <li>Price, D. C., et al. (2020). <em>The Breakthrough Listen Search for Intelligent Life: Observations of 1327 Nearby Stars over 1.10–3.45 GHz</em>. AJ 159, 86.</li>
              <li>Rodrigues, P. L. C., et al. (2019). <em>Riemannian Procrustes Analysis: Transfer Learning for Brain–Computer Interfaces</em>. IEEE TBME 66, 2390–2401.</li>
              <li>Kaplan, J. L., Yorke, J. A. (1979). <em>Chaotic behavior of multidimensional difference equations</em>. Springer LNM 730, 204–227.</li>
            </Box>
          </Box>

        </Container>
      </Box>
    </PageTransition>
  );
}
