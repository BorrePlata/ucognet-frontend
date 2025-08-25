import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
  }, [pathname]); // Ejecuta cada vez que cambie la ruta

  return null; // No renderiza nada
}
