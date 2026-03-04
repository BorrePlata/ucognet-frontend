import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '../theme';

const roles = ['VC / Investor', 'Researcher', 'Engineer', 'Other'];

export default function Contact() {
  const [role, setRole] = useState('');

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left — Bio */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h2" sx={{ mb: 2 }}>Contact</Typography>

              <Box sx={{
                p: 3, borderRadius: '16px',
                background: colors.surface,
                border: `1px solid ${colors.border}`,
              }}>
                {/* Avatar placeholder */}
                <Box sx={{
                  width: 56, height: 56, borderRadius: '14px',
                  background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accentSoft}20)`,
                  border: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 2,
                }}>
                  <Typography sx={{ fontWeight: 700, color: colors.accent, fontSize: '1.2rem' }}>SP</Typography>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 0.5 }}>
                  Samuel Plata
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  AI systems researcher. Building a metacognitive platform for safe self-improving agents.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  {['Evidence-first design', 'Gated evolution', 'Audit-ready'].map((tag) => (
                    <Typography key={tag} variant="caption" sx={{
                      px: 1.2, py: 0.4, borderRadius: '6px',
                      background: 'rgba(0,180,216,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.textSecondary,
                      fontSize: '0.7rem', fontWeight: 500,
                    }}>
                      {tag}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right — Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Box
                component="form"
                action="https://formspree.io/f/your-id"
                method="POST"
                sx={{
                  p: { xs: 3, md: 4 }, borderRadius: '18px',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Accent line */}
                <Box sx={{
                  position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.3), transparent)',
                }} />

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: colors.textPrimary }}>
                  Request a demo or audit
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField name="name" label="Name" fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField name="email" type="email" label="Email" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="role"
                      select
                      label="I am a…"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      fullWidth
                    >
                      {roles.map((r) => (
                        <MenuItem key={r} value={r}>{r}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="message" label="Message (optional)" multiline rows={3} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" fullWidth sx={{
                      py: 1.5, mt: 0.5,
                    }}>
                      Send message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
