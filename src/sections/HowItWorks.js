import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ClickableImage from '../components/ImageLightbox';
import { colors } from '../theme';

const steps = [
  { tag: 'Route', desc: 'Metacognitive router picks mode and budgets.', num: '01' },
  { tag: 'Execute', desc: 'Sandboxed tools, strict permissions.', num: '02' },
  { tag: 'Reward', desc: 'Composite reward with anti-hacking caps.', num: '03' },
  { tag: 'Evolve', desc: 'Controlled mutations with A/B gates and gradual rollout.', num: '04' },
];

const modes = [
  { name: 'Exam minimal', purpose: 'Low-budget closed-book tasks' },
  { name: 'Puzzle short', purpose: 'Abstract reasoning under constraints' },
  { name: 'Agentic verify', purpose: 'Tool-assisted with evidence audit' },
  { name: 'Patch loop', purpose: 'Multi-step code patching with TDD' },
];

export default function HowItWorks() {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      {/* Subtle bg glow */}
      <Box sx={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(0,180,216,0.015), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" sx={{ mb: 1.5 }}>How it works</Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: 520 }}>
            A four-stage loop that routes, executes, evaluates, and evolves — under strict controls.
          </Typography>
        </motion.div>

        <Grid container spacing={5} alignItems="stretch">
          {/* Left — dual images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ flex: 1 }}
              >
                <Box sx={{
                  borderRadius: '16px', overflow: 'hidden',
                  border: `1px solid ${colors.border}`,
                  boxShadow: colors.glow,
                  background: colors.surface,
                  height: '100%',
                }}>
                  <ClickableImage
                    src="/benchmarks/ucognet_09_rollout_pipeline.png"
                    alt="UCogNet Rollout Pipeline"
                    caption="Rollout pipeline — gated A/B evolution with gradual deployment"
                  />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ flex: 1 }}
              >
                <Box sx={{
                  borderRadius: '16px', overflow: 'hidden',
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  height: '100%',
                }}>
                  <ClickableImage
                    src="/benchmarks/ucognet_04_routing_heatmap.png"
                    alt="UCogNet Routing Heatmap"
                    caption="Routing heatmap — task-aware mode selection across benchmarks"
                  />
                </Box>
              </motion.div>
            </Box>
          </Grid>

          {/* Right — steps */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {steps.map((s, i) => (
                <motion.div
                  key={s.tag}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Box sx={{
                    p: 3, borderRadius: '14px',
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    display: 'flex', gap: 2.5,
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: colors.borderHover, background: colors.surfaceElevated },
                  }}>
                    {/* Step number */}
                    <Box sx={{
                      minWidth: 40, height: 40, borderRadius: '10px',
                      background: `rgba(0,180,216,${0.04 + i * 0.02})`,
                      border: `1px solid rgba(0,180,216,${0.08 + i * 0.04})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Typography variant="caption" sx={{
                        color: colors.accent, fontWeight: 700, fontSize: '0.75rem',
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {s.num}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{
                        color: colors.accent, fontWeight: 700, fontSize: '0.88rem', mb: 0.3,
                      }}>
                        {s.tag}
                      </Typography>
                      <Typography variant="body2">{s.desc}</Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Modes table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Paper sx={{
                mt: 3, overflow: 'hidden',
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '14px',
              }}>
                <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${colors.border}` }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    Execution Modes
                  </Typography>
                </Box>
                <Box component="table" sx={{
                  width: '100%', borderCollapse: 'collapse',
                  '& th, & td': { px: 3, py: 1.5, textAlign: 'left', fontSize: '0.85rem' },
                  '& th': { color: colors.textSecondary, fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
                  '& td': { borderTop: `1px solid ${colors.border}` },
                }}>
                  <thead><tr><th>Mode</th><th>Purpose</th></tr></thead>
                  <tbody>
                    {modes.map((m) => (
                      <tr key={m.name}>
                        <td style={{ color: colors.textPrimary, fontWeight: 500 }}>{m.name}</td>
                        <td style={{ color: colors.textSecondary }}>{m.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
