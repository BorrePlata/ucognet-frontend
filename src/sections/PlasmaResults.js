import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import { colors } from '../theme';

/* Colors matching the plasma research palette */
const plasma = {
  thc: '#10b981',
  dmt: '#8b5cf6',
  synergy: '#f59e0b',
  crisis: '#ef4444',
  cyan: '#06b6d4',
};

const benchmarkRows = [
  { name: 'PID',      crises: '3.4', highlight: false },
  { name: 'MPC',      crises: '4.2', highlight: false },
  { name: 'PPO (RL)', crises: '5.4', highlight: false },
  { name: 'U-CogNet', crises: '6.4', highlight: true },
];

const stats = [
  { value: '1,767', label: 'THC Activations', color: plasma.thc },
  { value: '262', label: 'DMT Breakthroughs', color: plasma.dmt },
  { value: '1.5\u00d7', label: 'Synergy Multiplier', color: plasma.synergy },
  { value: '+19%', label: 'Crisis Survival', color: plasma.cyan },
];

const archLayers = [
  { icon: '\uD83D\uDCCA', name: 'Sensory Input', desc: 'Plasma state observation', color: colors.accent },
  { icon: '\uD83C\uDF3F', name: 'THC Module', desc: 'Creative exploration under stress', color: plasma.thc },
  { icon: '\uD83C\uDF0C', name: 'DMT Module', desc: 'Cognitive reset near disruption', color: plasma.dmt },
  { icon: '\u26A1', name: 'Synergy Gate', desc: 'Combined power boost', color: plasma.synergy },
  { icon: '\uD83C\uDFAF', name: 'Control Action', desc: 'Adaptive plasma response', color: colors.accent },
];

export default function PlasmaResults() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      {/* Subtle plasma gradient background */}
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
              background: `${plasma.dmt}15`, border: `1px solid ${plasma.dmt}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ScienceIcon sx={{ color: plasma.dmt, fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{
                color: plasma.dmt, fontWeight: 700, fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Latest Research &bull; February 2026
              </Typography>
              <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
                Plasma crisis control
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 620, fontSize: '1.08rem' }}>
            UCogNet&apos;s cognitive architecture applied to catastrophic plasma instabilities in fusion reactors.
            Bio-inspired modules outperform traditional controllers under extreme multi-crisis scenarios.
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
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2.5 }}>
                  Cognitive Architecture
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
                  <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    Post-Human Benchmark
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: plasma.crisis, fontSize: '0.68rem', fontWeight: 600,
                      textTransform: 'uppercase',
                  }}>
                    Nightmare difficulty &bull; 10 crisis types
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
                      <th style={{ textAlign: 'right' }}>Crises survived</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkRows.map((r) => (
                      <tr key={r.name}>
                        <td style={{
                          color: r.highlight ? plasma.thc : colors.textPrimary,
                          fontWeight: r.highlight ? 700 : 400,
                        }}>
                          {r.name}
                        </td>
                        <td style={{
                          textAlign: 'right',
                          color: r.highlight ? plasma.thc : colors.textSecondary,
                          fontWeight: r.highlight ? 700 : 400,
                          background: r.highlight ? `${plasma.thc}10` : 'transparent',
                          borderRadius: r.highlight ? '6px' : 0,
                        }}>
                          {r.crises}
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
                    <Box component="span" sx={{ color: plasma.thc }}>&#9679;</Box>{' '}U-CogNet survived <strong style={{ color: colors.textPrimary }}>19% more crises</strong> than the best RL baseline.
                    Cognitive modules activated <strong style={{ color: colors.textPrimary }}>2,029 times</strong> across all seeds.
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Key findings summary */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{
                mt: 3, p: 3, borderRadius: '16px',
                background: `linear-gradient(135deg, ${plasma.dmt}06, ${plasma.thc}04)`,
                border: `1px solid ${colors.border}`,
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1.5, fontSize: '0.9rem' }}>
                  Key findings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {[
                    { icon: '\uD83C\uDF3F', color: plasma.thc, text: 'THC exploration discovers novel control patterns that fixed-policy controllers cannot find.' },
                    { icon: '\uD83C\uDF0C', color: plasma.dmt, text: 'Cognitive reset near disruption enables recovery from near-death plasma states.' },
                    { icon: '\u26A1', color: plasma.synergy, text: 'THC+DMT synergy produces emergent behavior exceeding individual contributions.' },
                  ].map((f, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Typography sx={{ fontSize: '0.9rem', mt: '1px' }}>{f.icon}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                        <Box component="span" sx={{ color: f.color, fontWeight: 600 }}>{f.text.split(' ')[0]}</Box>{' '}{f.text.split(' ').slice(1).join(' ')}
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
