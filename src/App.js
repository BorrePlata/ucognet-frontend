import React, { Suspense, lazy } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import { LightboxProvider } from './components/ImageLightbox';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/* ── Code-split pages (reduces initial JS bundle ~83 KiB) ── */
const HomePage = lazy(() => import('./pages/HomePage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const ProofPage = lazy(() => import('./pages/ProofPage'));
const SafetyPage = lazy(() => import('./pages/SafetyPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ResearchesPage = lazy(() => import('./pages/ResearchesPage'));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TechnicalNote = lazy(() => import('./pages/TechnicalNote'));

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
        <Route path="/researches" element={<ResearchesPage />} />
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
          <Suspense fallback={<Box sx={{ minHeight: '100vh', background: '#060B14' }} />}>
            <AnimatedRoutes />
          </Suspense>
          <Footer />
        </Router>
      </LightboxProvider>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
