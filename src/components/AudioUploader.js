import React, { useState } from 'react';
import { processAudio } from '../api';
import { toast } from 'react-toastify';

const AudioUploader = ({ sessionUrl }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleProcessAudio = async () => {
    if (!audioFile || !sessionUrl) {
      toast.error('Selecciona un archivo de audio y asegúrate de que la sesión esté inicializada.');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        const response = await processAudio(base64Audio, sessionUrl);
        toast.success('Audio procesado exitosamente');
        console.log('Audio procesado:', response);
      };
      reader.readAsDataURL(audioFile);
    } catch (error) {
      toast.error('Error al procesar el audio');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      <button onClick={handleProcessAudio} disabled={loading || !audioFile}>
        {loading ? 'Procesando...' : 'Procesar Audio'}
      </button>
    </div>
  );
};

export default AudioUploader;
