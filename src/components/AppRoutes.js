import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/BlogDetail';
import Login from '../pages/Login';
import Consultoria from '../pages/Consultoria';
import Formacion from '../pages/Formacion';
import ChatBots from '../pages/ChatBots';
import UnderConstruction from '../pages/UnderConstruction';
import Template from '../pages/Template';
import Mentorias from '../pages/Mentorias';
import PageTransition from './PageTransition';
import CosmicMind from '../pages/CosmicMind';
import PanelVisionario from '../pages/PanelVisionario';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import SamuelPlata from '../components/SamuelPlata';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute'; // Importar el componente protegido
import Register from '../pages/Register'; // Importa el componente
import UserPage from "../pages/UserPage";
import RealTimeInteraction from '../pages/RealTimeInteraction';


export default function AppRoutes({ setHideFooter }) {
  const location = useLocation();

  const hideFooterRoutes = ['/cosmicmind', '/login'];

  React.useEffect(() => {
    const shouldHideFooter = hideFooterRoutes.some((path) =>
      location.pathname.startsWith(path)
    );
    setHideFooter(shouldHideFooter);
  }, [location, setHideFooter]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/consultoria" element={<PageTransition><Consultoria /></PageTransition>} />
        <Route path="/realtime-interaction" element={<PageTransition><RealTimeInteraction /></PageTransition>} />
        <Route path="/formacion" element={<PageTransition><Formacion /></PageTransition>} />
        <Route path="/chatbots" element={<PageTransition><ChatBots /></PageTransition>} />
        <Route path="/template" element={<PageTransition><Template /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/user/:userId" element={<UserPage />} /> {/* Ruta dinámica */}
        <Route
          path="/panelvisionario"
          element={
            <ProtectedRoute>
              <PageTransition><PanelVisionario /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cosmicmind"
          element={
            <ProtectedRoute>
              <PageTransition><CosmicMind /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="/under-construction" element={<PageTransition><UnderConstruction /></PageTransition>} />
        <Route path="/mentorias" element={<PageTransition><Mentorias /></PageTransition>} />
        <Route path="/privacypolicy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/samuelplata" element={<PageTransition><SamuelPlata /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
