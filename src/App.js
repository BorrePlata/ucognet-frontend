import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import { LightboxProvider } from './components/ImageLightbox';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import ProofPage from './pages/ProofPage';
import SafetyPage from './pages/SafetyPage';
import ResearchPage from './pages/ResearchPage';
import UpdatesPage from './pages/UpdatesPage';
import ContactPage from './pages/ContactPage';
import TechnicalNote from './pages/TechnicalNote';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/proof" element={<ProofPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/technical-note" element={<TechnicalNote />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LightboxProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </Router>
      </LightboxProvider>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
