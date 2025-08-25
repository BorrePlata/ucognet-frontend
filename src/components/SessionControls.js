import { useState } from "react";
import { Button } from "@mui/material";

export default function SessionControls({ startSession, stopSession, startRecording, stopRecording, isSessionActive }) {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartSession = async () => {
    await startSession();
    handleStartRecording();
  };

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {!isSessionActive ? (
        <Button variant="contained" color="primary" onClick={handleStartSession}>
          Iniciar Sesión
        </Button>
      ) : (
        <>
          {!isRecording ? (
            <Button variant="contained" color="success" onClick={handleStartRecording}>
              Iniciar Grabación
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={handleStopRecording}>
              Detener Grabación
            </Button>
          )}
          <Button variant="contained" color="warning" onClick={stopSession}>
            Finalizar Sesión
          </Button>
        </>
      )}
    </div>
  );
}
