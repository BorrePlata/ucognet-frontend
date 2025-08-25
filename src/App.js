import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent'; // Importa el componente de cookies

function App() {
  const [hideFooter, setHideFooter] = useState(false); // Estado para controlar el footer

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Box className="app-container">
          {/* Header */}
          <Navbar />

          {/* Contenido principal con AppRoutes */}
          <Box component="main" className="content">
            <AppRoutes setHideFooter={setHideFooter} />
          </Box>

          {/* Footer */}
          {!hideFooter && <Footer />}
        </Box>

        {/* Aviso de Cookies */}
        <CookieConsent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
