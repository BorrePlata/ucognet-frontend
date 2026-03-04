import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { colors } from '../theme';

export default function Footer() {
  return (
    <Box component="footer" sx={{
      py: 5,
      borderTop: `1px solid ${colors.border}`,
      background: colors.surface,
    }}>
      <Container maxWidth="lg" sx={{
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center', justifyContent: 'space-between', gap: 2,
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Typography variant="body2" sx={{ fontSize: '0.82rem' }}>
            &copy; {new Date().getFullYear()} UCogNet Lab &mdash; Reproducible metacognitive AI.
          </Typography>

          {/* Powered by Brainstream */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{
              fontSize: '0.68rem', fontWeight: 500,
              color: colors.textSecondary, letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              A product of
            </Typography>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center',
              px: 1.5, py: 0.5,
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              <Box
                component="img"
                src="/Logo-Brainstream.png"
                alt="Brainstream"
                sx={{ height: 20, width: 'auto', display: 'block' }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[
            { icon: <LinkedInIcon fontSize="small" />, href: 'https://linkedin.com/in/samuelplata' },
            { icon: <EmailIcon fontSize="small" />, href: 'mailto:orion@brainstream.pro' },
          ].map((s, i) => (
            <IconButton key={i} component="a" href={s.href} target="_blank" rel="noopener"
              sx={{ color: colors.textSecondary, '&:hover': { color: colors.accent } }}
            >
              {s.icon}
            </IconButton>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
