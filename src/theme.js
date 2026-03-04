import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: '#0D1B2A',
  accent: '#00B4D8',
  accentSoft: '#48CAE4',
  accentWarm: '#E07A2F',
  background: '#060B14',
  surface: '#0C1622',
  surfaceElevated: '#111E30',
  surfaceLight: '#162640',
  textPrimary: '#F0F4F8',
  textSecondary: '#7B8FA3',
  border: 'rgba(0,180,216,0.10)',
  borderHover: 'rgba(0,180,216,0.25)',
  borderWarm: 'rgba(224,122,47,0.25)',
  gradientAccent: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
  gradientHero: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,180,216,0.06) 0%, transparent 60%)',
  glow: '0 4px 40px rgba(0,180,216,0.10)',
  glowStrong: '0 8px 60px rgba(0,180,216,0.18)',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.accent },
    secondary: { main: colors.accentWarm },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, lineHeight: 1.25 },
    h5: { fontSize: '1.1rem', fontWeight: 600 },
    body1: { fontSize: '1.05rem', lineHeight: 1.8, color: '#7B8FA3' },
    body2: { fontSize: '0.92rem', lineHeight: 1.7, color: '#7B8FA3' },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '8px', padding: '10px 24px', fontSize: '0.92rem', transition: 'all 0.25s ease' },
        containedPrimary: {
          background: colors.gradientAccent,
          color: '#fff',
          fontWeight: 700,
          boxShadow: '0 2px 12px rgba(0,180,216,0.2)',
          '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 24px rgba(0,180,216,0.3)' },
        },
        outlinedPrimary: {
          borderColor: colors.accent,
          color: colors.accent,
          '&:hover': { background: 'rgba(0,180,216,0.06)', borderColor: colors.accent },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': { transform: 'translateY(-4px)', borderColor: colors.borderHover, boxShadow: colors.glowStrong },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        '*::-webkit-scrollbar': { width: '6px' },
        '*::-webkit-scrollbar-track': { background: colors.background },
        '*::-webkit-scrollbar-thumb': { background: colors.surfaceLight, borderRadius: '3px' },
      },
    },
  },
});

export default theme;
