import React, { useState } from 'react';
import { initializeSession } from '../api';
import { toast } from 'react-toastify';

const SessionInitializer = ({ onSessionInitialized }) => {
  const [loading, setLoading] = useState(false);

  const handleInitializeSession = async () => {
    setLoading(true);
    try {
      const { sessionUrl } = await initializeSession();
      toast.success('Sesión inicializada exitosamente');
      onSessionInitialized(sessionUrl);
    } catch (error) {
      toast.error('Error al inicializar la sesión');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleInitializeSession} disabled={loading}>
        {loading ? 'Inicializando...' : 'Inicializar Sesión'}
      </button>
    </div>
  );
};

export default SessionInitializer;
