// src/theme.js
import { createTheme } from '@mui/material/styles';

const colors = {
  primary: '#1C2159',           // Azul oscuro para fondo y secciones
  secondary: '#5E61F4',         // Azul vibrante para botones y detalles
  background: '#0B0D2C',        // Fondo oscuro principal
  surface: '#1E2149',           // Fondo para superficies elevadas
  textPrimary: '#FFFFFF',       // Texto claro para contraste
  textSecondary: '#B0B3F5',     // Texto en tonos pasteles para detalles
  gradient: 'linear-gradient(135deg, #1C2159 30%, #5E61F4 90%)', // Degradado suave para fondos y botones
};

// Crear un tema por defecto para acceder a las sombras por defecto de MUI
const defaultTheme = createTheme();

// Definir sombras personalizadas o sobrescribir las existentes
const customShadows = [
  ...defaultTheme.shadows, // Retener las sombras por defecto de MUI (índices 0-24)
  '0px 4px 8px rgba(0, 0, 0, 0.2)',    // shadows[25]
  '0px 6px 12px rgba(0, 0, 0, 0.4)',   // shadows[26]
  '0px 8px 20px rgba(0, 0, 0, 0.6)',   // shadows[27]
  // Agrega más sombras si es necesario
];

const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: { fontSize: '3rem', fontWeight: 700, color: colors.textPrimary },
    h2: { fontSize: '2.5rem', fontWeight: 600, color: colors.textPrimary },
    body1: { fontSize: '1.1rem', fontWeight: 400, color: colors.textPrimary },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shadows: customShadows, // Utilizar el array de sombras personalizado
  transitions: { duration: { standard: 300 } },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundImage: colors.gradient,
          color: colors.textPrimary,
          borderRadius: '20px',
          padding: '10px 20px',
          boxShadow: defaultTheme.shadows[4],
          transition: `transform 0.3s, box-shadow 0.3s`,
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: defaultTheme.shadows[6],
            backgroundImage: colors.gradient,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface, // Fondo predeterminado de la tarjeta
          color: colors.textPrimary,       // Color de texto predeterminado
          borderRadius: '10px',           // Bordes redondeados
          boxShadow: customShadows[25],   // Sombra personalizada
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: customShadows[26], // Sombra en hover
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.secondary, // Color predeterminado del ícono
          fontSize: 'inherit',      // Tamaño basado en el contexto
        },
      },
    },
  },
});

export default theme;
export { colors };