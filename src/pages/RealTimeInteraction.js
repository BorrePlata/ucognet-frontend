import { useEffect, useState, useRef } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import EventLog from "../components/EventLog";
import ToolPanel from "../components/ToolPanel";
import AudioVisualizer from "../components/AudioVisualizer";

export default function RealtimeAudioTool() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [events, setEvents] = useState([]);
  const [sessionUrl, setSessionUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(new Float32Array(2048)); // Datos para la visualización

  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioProcessorRef = useRef(null);
  const webSocketRef = useRef(null);

  // Función para inicializar una nueva sesión
  const startSession = async () => {
    try {
      const response = await fetch("/openai-service/initialize-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { sessionUrl } = await response.json();
      setSessionUrl(sessionUrl);
      setIsSessionActive(true);
      console.log("Sesión activa en:", sessionUrl);
    } catch (error) {
      console.error("Error al iniciar la sesión:", error);
    }
  };

  // Función para detener la sesión
  const stopSession = () => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    setSessionUrl(null);
    setIsSessionActive(false);
    stopRecording(); // Asegurarse de detener la grabación si está activa
    console.log("Sesión finalizada.");
  };

  // Función para iniciar la grabación de audio
  const startRecording = async () => {
    if (!sessionUrl) {
      alert("Por favor, inicia una sesión primero.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);

      processor.onaudioprocess = (event) => {
        const audioData = event.inputBuffer.getChannelData(0);

        // Actualiza el estado de visualización
        setAudioData(audioData);

        // Envía datos al WebSocket
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
          const int16Array = convertFloat32ToInt16(audioData);
          webSocketRef.current.send(int16Array);
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
      audioProcessorRef.current = processor;

      // Conexión WebSocket
      const ws = new WebSocket(sessionUrl);
      ws.onopen = () => console.log("[WebSocket] Conectado.");
      ws.onmessage = (message) => {
        console.log("[WebSocket] Mensaje recibido:", message.data);
        setEvents((prev) => [JSON.parse(message.data), ...prev]);
      };
      ws.onerror = (error) => console.error("[WebSocket] Error:", error);
      ws.onclose = () => console.log("[WebSocket] Desconectado.");
      webSocketRef.current = ws;

      setIsRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  };

  // Función para detener la grabación de audio
  const stopRecording = () => {
    if (audioProcessorRef.current) {
      audioProcessorRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }

    setIsRecording(false);
    console.log("Grabación detenida.");
  };

  // Convertir audio de Float32Array a Int16Array para WebSocket
  const convertFloat32ToInt16 = (float32Array) => {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      int16Array[i] = Math.min(1, Math.max(-1, float32Array[i])) * 0x7fff;
    }
    return int16Array.buffer;
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", margin: "20px 0" }}>
        <Typography variant="h4" gutterBottom>
          Realtime Audio Tool
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 4 }}>
        {!isSessionActive ? (
          <Button variant="contained" color="primary" onClick={startSession}>
            Iniciar Sesión
          </Button>
        ) : (
          <>
            {!isRecording ? (
              <Button variant="contained" color="success" onClick={startRecording}>
                Iniciar Grabación
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={stopRecording}>
                Detener Grabación
              </Button>
            )}
            <Button variant="contained" color="secondary" onClick={stopSession}>
              Finalizar Sesión
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <AudioVisualizer audioData={audioData} />
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <EventLog events={events} />
          </Box>
          <Box sx={{ width: "300px" }}>
            <ToolPanel sessionUrl={sessionUrl} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
