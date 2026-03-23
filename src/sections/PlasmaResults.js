import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
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
};

/* Module 5 — OOD Regime Shift (Campaign C) benchmark table */
const benchmarkRows = [
  { name: 'PID',        score: '0.090', highlight: false },
  { name: 'LQR',        score: '0.239', highlight: false },
  { name: 'Zero',       score: '0.345', highlight: false },
  { name: 'Cognitive',  score: '0.351', highlight: true },
];

/* BCI — BNCI2014001 headline results */
const bciRows = [
  { name: 'CSP+LDA',  acc2: '74.6%', acc4: '58.1%', pass4: '8/9', highlight: false },
  { name: 'CSP+SVM',  acc2: '71.5%', acc4: '55.5%', pass4: '8/9', highlight: false },
  { name: 'UCogNet',  acc2: '73.7%', acc4: '52.7%', pass4: '9/9', highlight: true },
];

const stats = [
  { value: '9/9', label: 'BCI subjects pass', color: palette.bci },
  { value: '5', label: 'OOD campaigns', color: palette.physics },
  { value: '3', label: 'Seeds per run', color: palette.warn },
  { value: '61/61', label: 'Physics tests pass', color: palette.highlight },
];

const archLayers = [
  { icon: '\uD83E\uDDE0', name: 'Cognitive Router', desc: 'Task-aware mode dispatch', color: colors.accent },
  { icon: '\uD83D\uDCCA', name: 'Evidence Logger', desc: 'Frozen reproducible traces', color: palette.bci },
  { icon: '\u2699\uFE0F', name: 'Module Executor', desc: 'Sandboxed domain modules', color: palette.physics },
  { icon: '\u26A1', name: 'Gated Evolution', desc: 'A/B tested improvements', color: palette.warn },
  { icon: '\uD83C\uDFAF', name: 'Output + Audit', desc: 'Verifiable decision output', color: colors.accent },
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
                Benchmark Results &bull; 2026
              </Typography>
              <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
                Evidence across domains
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 620, fontSize: '1.08rem' }}>
            UCogNet evaluated on the public BNCI2014001 BCI dataset (9 subjects, cross-session)
            and parametric physics control (Module 5) with 5 out-of-distribution campaigns and 3 seeds.
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
              <Box sx={{
                p: 3, borderRadius: '18px',
                background: colors.surface, border: `1px solid ${colors.border}`,
              }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2.5 }}>
                  Architecture Overview
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {archLayers.map((layer, i) => (
                    <React.Fragment key={layer.name}>
                      <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        p: 1.5, borderRadius: '10px',
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${layer.color}18`,
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: `${layer.color}40`, background: `${layer.color}06` },
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '1.1rem' }}>{layer.icon}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: layer.color, fontSize: '0.85rem' }}>
                            {layer.name}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.72rem' }}>
                          {layer.desc}
                        </Typography>
                      </Box>
                      {i < archLayers.length - 1 && (
                        <Box sx={{ textAlign: 'center', color: colors.textSecondary, fontSize: '0.8rem', lineHeight: 1, my: -0.3 }}>
                          ↓
                        </Box>
                      )}
                    </React.Fragment>
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

            {/* Benchmark table */}
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
                    Physics Control — OOD Regime Shift
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: palette.physics, fontSize: '0.68rem', fontWeight: 600,
                      textTransform: 'uppercase',
                  }}>
                    Campaign C &bull; 3 seeds
                  </Typography>
                </Box>
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 3, py: 1.5, textAlign: 'left', fontSize: '0.88rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead>
                    <tr>
                      <th>Controller</th>
                      <th style={{ textAlign: 'right' }}>Objective score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkRows.map((r) => (
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
                          {r.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>

                <Box sx={{
                  px: 3, py: 2, borderTop: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', gap: 2,
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', flex: 1 }}>
                    <Box component="span" sx={{ color: palette.bci }}>&#9679;</Box>{' '}Cognitive controller scores <strong style={{ color: colors.textPrimary }}>0.351 vs PID 0.090</strong> under OOD regime shift.
                    Strongest differentiation where classical controllers degrade most.
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
                    9 subjects &bull; cross-session
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
                      <th style={{ textAlign: 'right' }}>2-class</th>
                      <th style={{ textAlign: 'right' }}>4-class</th>
                      <th style={{ textAlign: 'right' }}>4-class pass</th>
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
                        <td style={{ textAlign: 'right', color: colors.textSecondary }}>{r.acc2}</td>
                        <td style={{ textAlign: 'right', color: colors.textSecondary }}>{r.acc4}</td>
                        <td style={{
                          textAlign: 'right',
                          color: r.highlight ? palette.bci : colors.textSecondary,
                          fontWeight: r.highlight ? 700 : 400,
                          background: r.highlight ? `${palette.bci}10` : 'transparent',
                          borderRadius: r.highlight ? '6px' : 0,
                        }}>
                          {r.pass4}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
                <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.border}` }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    <Box component="span" sx={{ color: palette.bci }}>&#9679;</Box>{' '}UCogNet passes threshold for <strong style={{ color: colors.textPrimary }}>all 9 subjects</strong> in 4-class.
                    CKA analysis confirms representationally distinct learned features.
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
                    { icon: '\uD83E\uDDE0', color: palette.bci, text: 'BCI: competitive accuracy with higher robustness across individual neural variability (9/9 vs 8/9).' },
                    { icon: '\u2699\uFE0F', color: palette.physics, text: 'Physics: cognitive controller generalizes best under out-of-distribution regime shifts (Campaign C).' },
                    { icon: '\uD83D\uDD2C', color: palette.warn, text: 'Cross-domain: single cognitive core operates across neural decoding and physical control.' },
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
