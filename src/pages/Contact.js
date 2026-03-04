import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, MenuItem, Chip, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { colors } from '../theme';

const roles = [
  'Venture Capital',
  'Angel Investor',
  'Strategic Partner',
  'Corporate Development',
  'Academic Researcher',
  'Other',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', role: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: send to API / email service
    setSubmitted(true);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: colors.surface,
      borderRadius: '12px',
      '& fieldset': { borderColor: colors.border },
      '&:hover fieldset': { borderColor: 'rgba(0,229,255,0.3)' },
      '&.Mui-focused fieldset': { borderColor: colors.secondary },
    },
    '& .MuiInputLabel-root': { color: colors.textSecondary },
    '& .MuiInputBase-input': { color: colors.textPrimary },
  };

  return (
    <>
      {/* ─── HEADER ─── */}
      <Box sx={{ pt: 12, pb: 6 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              label="Let's Talk"
              sx={{
                mb: 3, background: 'rgba(255,109,0,0.08)',
                border: `1px solid rgba(255,109,0,0.2)`,
                color: colors.accentAlt, fontWeight: 600,
              }}
            />
            <Typography variant="h1" sx={{ mb: 2 }}>
              Get in <Box component="span" className="gradient-text">Touch</Box>
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, fontSize: '1.15rem' }}>
              Interested in investing, partnering, or integrating U-CogNet? 
              We&apos;d love to hear from you.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ─── FORM + INFO ─── */}
      <Box sx={{ pb: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Form */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {submitted ? (
                  <Box sx={{
                    p: 6, textAlign: 'center',
                    background: colors.surface,
                    borderRadius: '20px',
                    border: `1px solid ${colors.border}`,
                  }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>✅</Typography>
                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                      Thank you!
                    </Typography>
                    <Typography variant="body1">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                      p: 4,
                      background: `linear-gradient(135deg, ${colors.surface} 0%, rgba(0,229,255,0.02) 100%)`,
                      borderRadius: '20px',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth required
                          name="name"
                          label="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          sx={inputSx}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth required
                          name="email"
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          sx={inputSx}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="company"
                          label="Company / Fund"
                          value={formData.company}
                          onChange={handleChange}
                          sx={inputSx}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth select
                          name="role"
                          label="I am a..."
                          value={formData.role}
                          onChange={handleChange}
                          sx={inputSx}
                        >
                          {roles.map((r) => (
                            <MenuItem key={r} value={r}>{r}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth required
                          multiline rows={5}
                          name="message"
                          label="Message"
                          placeholder="Tell us about your interest in U-CogNet..."
                          value={formData.message}
                          onChange={handleChange}
                          sx={inputSx}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{ py: 1.5, fontSize: '1rem' }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </motion.div>
            </Grid>

            {/* Info Panel */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {/* Quick Info */}
                  <Box sx={{
                    p: 4, borderRadius: '16px',
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                  }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                      Quick Info
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EmailIcon sx={{ color: colors.secondary, fontSize: 20 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: colors.textSecondary }}>Email</Typography>
                          <Typography variant="body2" sx={{ color: colors.textPrimary }}>research@ucognet.ai</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LocationOnIcon sx={{ color: colors.secondary, fontSize: 20 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: colors.textSecondary }}>Location</Typography>
                          <Typography variant="body2" sx={{ color: colors.textPrimary }}>Remote-first — EU/Americas</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* What We Offer */}
                  <Box sx={{
                    p: 4, borderRadius: '16px',
                    background: `linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(124,77,255,0.03) 100%)`,
                    border: `1px solid ${colors.border}`,
                  }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                      What We Offer
                    </Typography>
                    {[
                      '🔬 Live benchmark demonstrations',
                      '📄 Full technical whitepaper & code access',
                      '💼 Investment & partnership opportunities',
                      '🤝 Licensing for enterprise integration',
                      '🎓 Research collaboration',
                    ].map((item, i) => (
                      <Typography key={i} variant="body2" sx={{
                        py: 1, color: colors.textSecondary,
                        borderBottom: i < 4 ? `1px solid ${colors.border}` : 'none',
                      }}>
                        {item}
                      </Typography>
                    ))}
                  </Box>

                  {/* Response Time */}
                  <Alert severity="info" sx={{
                    background: 'rgba(0,229,255,0.05)',
                    border: `1px solid ${colors.border}`,
                    color: colors.textSecondary,
                    '& .MuiAlert-icon': { color: colors.secondary },
                  }}>
                    Typical response time: within 24 hours
                  </Alert>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
