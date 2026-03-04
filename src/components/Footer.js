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
            <Box
              component="img"
              src="/logo-brainstream-blanco.png"
              alt="Brainstream"
              sx={{
                height: 22, width: 'auto', display: 'block',
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
                '&:hover': { opacity: 1 },
              }}
            />
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
