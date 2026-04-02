import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import { colors } from '../theme';

const palette = {
  bci: '#10b981',
  physics: '#8b5cf6',
  highlight: '#06b6d4',
  warn: '#f59e0b',
  ucognet: '#10b981',
};

/* ── Plasma — top-3 single-seed (seed=42) ── */
const plasmaTop = [
  { rank: '🥇', name: 'FNO Surrogate',    score: '0.7187', tag: null,   ours: false },
  { rank: '🥈', name: 'UCogNet Legacy',    score: '0.7253', tag: null,   ours: true },
  { rank: '🥉', name: 'NeuOp-Transformer', score: '0.7293', tag: '2026', ours: false },
];

/* ── BCI — BNCI2014001 headline ── */
const bciTop = [
  { name: 'CSP+LDA', acc: '74.6%', pass: '8/9', ours: false },
  { name: 'CSP+SVM', acc: '71.5%', pass: '8/9', ours: false },
  { name: 'UCogNet', acc: '73.7%', pass: '9/9', ours: true },
];

/* ── Stats row ── */
const stats = [
  { value: '8',   label: 'Plasma controllers', color: palette.physics },
  { value: '9/9', label: 'BCI subjects pass',  color: palette.bci },
  { value: '6',   label: 'Validation seeds',   color: palette.warn },
  { value: '7D',  label: 'Composite metric',   color: palette.highlight },
];

export default function ResearchHighlights() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      <Box sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(139,92,246,0.03) 0%, transparent 60%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
                Benchmark Results &bull; 2026
              </Typography>
              <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
                Evidence across domains
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 680, fontSize: '1.08rem' }}>
            UCogNet evaluated on plasma turbulence control (Hasegawa-Wakatani 2D, 8 controllers,
            7D composite, 6 seeds) and BCI neural decoding (BNCI2014001, 9 subjects, cross-session).
            Same cognitive architecture — two scientific domains.
          </Typography>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
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
                    background: colors.surface, border: `1px solid ${s.color}25`,
                    transition: 'all 0.2s', '&:hover': { borderColor: `${s.color}50` },
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

        <Grid container spacing={3}>
          {/* ── Plasma card ── */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                borderRadius: '16px', overflow: 'hidden',
                background: colors.surface, border: `1px solid ${colors.border}`,
                height: '100%', display: 'flex', flexDirection: 'column',
              }}>
                <Box sx={{
                  px: 3, py: 2, borderBottom: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1rem' }}>⚡</Typography>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      Plasma Turbulence Control
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{
                    color: palette.physics, fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase',
                  }}>
                    HW2D &bull; Benchmark V3
                  </Typography>
                </Box>

                {/* Top-3 mini table */}
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 2.5, py: 1.2, textAlign: 'left', fontSize: '0.82rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead>
                    <tr>
                      <th style={{ width: 32 }}>#</th>
                      <th>Controller</th>
                      <th style={{ textAlign: 'right' }}>Composite v3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plasmaTop.map((r) => (
                      <tr key={r.name}>
                        <td style={{ textAlign: 'center' }}>{r.rank}</td>
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
                        </td>
                        <td style={{
                          textAlign: 'right', fontFamily: 'monospace',
                          color: r.ours ? palette.ucognet : colors.textSecondary,
                          fontWeight: r.ours ? 700 : 400,
                        }}>
                          {r.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>

                <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.border}`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontSize: '0.78rem', mb: 2 }}>
                    <Box component="span" sx={{ color: palette.ucognet }}>●</Box>{' '}
                    <strong style={{ color: colors.textPrimary }}>2nd of 8</strong> on single-seed
                    &bull; <strong style={{ color: colors.textPrimary }}>Best multi-seed mean</strong> (UCogNet Enhanced, 0.7219)
                    &bull; Beats NeuOp-Transformer &amp; FI-Conv (2026 SOTA)
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.68rem' }}>
                    7D composite &bull; 6 seeds &bull; paired t-test &bull; 3 peer-reviewed references
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* ── BCI card ── */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                borderRadius: '16px', overflow: 'hidden',
                background: colors.surface, border: `1px solid ${colors.border}`,
                height: '100%', display: 'flex', flexDirection: 'column',
              }}>
                <Box sx={{
                  px: 3, py: 2, borderBottom: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1rem' }}>🧠</Typography>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      BCI Neural Decoding
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{
                    color: palette.bci, fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase',
                  }}>
                    BNCI2014001 &bull; 9 subjects
                  </Typography>
                </Box>

                {/* BCI mini table */}
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 2.5, py: 1.2, textAlign: 'left', fontSize: '0.82rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th style={{ textAlign: 'right' }}>2-class acc.</th>
                      <th style={{ textAlign: 'right' }}>4-class pass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bciTop.map((r) => (
                      <tr key={r.name}>
                        <td style={{
                          color: r.ours ? palette.bci : colors.textPrimary,
                          fontWeight: r.ours ? 700 : 400,
                        }}>
                          {r.name}
                        </td>
                        <td style={{ textAlign: 'right', color: colors.textSecondary }}>{r.acc}</td>
                        <td style={{
                          textAlign: 'right', fontFamily: 'monospace',
                          color: r.ours ? palette.bci : colors.textSecondary,
                          fontWeight: r.ours ? 700 : 400,
                          background: r.ours ? `${palette.bci}10` : 'transparent',
                          borderRadius: r.ours ? '6px' : 0,
                        }}>
                          {r.pass}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>

                <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.border}`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontSize: '0.78rem', mb: 2 }}>
                    <Box component="span" sx={{ color: palette.bci }}>●</Box>{' '}
                    UCogNet passes threshold for <strong style={{ color: colors.textPrimary }}>all 9 subjects</strong> in 4-class
                    (vs 8/9 for CSP+LDA and CSP+SVM). CKA analysis confirms distinct learned features.
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.68rem' }}>
                    Cross-session evaluation &bull; Motor imagery &bull; 4-class classification
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Key findings */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <Box sx={{
            mt: 4, p: 3, borderRadius: '16px',
            background: `linear-gradient(135deg, ${palette.physics}06, ${palette.bci}04)`,
            border: `1px solid ${colors.border}`,
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1.5, fontSize: '0.9rem' }}>
              Key findings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                { icon: '⚡', color: palette.physics, text: 'Plasma: UCogNet Legacy ranks 2nd of 8, beating both 2026 neural operator baselines. Enhanced variant wins 3/6 seeds.' },
                { icon: '🧠', color: palette.bci, text: 'BCI: 9/9 subject pass rate in 4-class motor imagery, higher robustness than classical CSP pipelines.' },
                { icon: '🔬', color: palette.warn, text: 'Cross-domain: single cognitive architecture operates both plasma turbulence control and neural decoding.' },
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

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ mt: 5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={RouterLink} to="/researches" variant="outlined" sx={{ px: 3 }}>
              Full research details
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
