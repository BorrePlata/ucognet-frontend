import React, { useRef, useEffect } from "react";

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!audioData || audioData.length === 0) return;

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");

    const { width, height } = canvas;
    canvasContext.clearRect(0, 0, width, height);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = "#3f51b5";

    canvasContext.beginPath();

    const sliceWidth = width / audioData.length;
    let x = 0;

    for (let i = 0; i < audioData.length; i++) {
      const v = (audioData[i] + 1) / 2; // Normaliza los datos de -1 a 1 en 0 a 1
      const y = v * height;

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.lineTo(width, height / 2);
    canvasContext.stroke();
  }, [audioData]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={150}
      style={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
    />
  );
};

export default AudioVisualizer;
