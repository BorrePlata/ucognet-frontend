import { Box, Typography, Button } from "@mui/material";

export default function ToolPanel({ sessionUrl }) {
    return (
      <div style={{ backgroundColor: "#2d3748", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <h3>Panel de Herramientas</h3>
        {sessionUrl ? (
          <p>Sesión activa en: <br /> {sessionUrl}</p>
        ) : (
          <p>No hay una sesión activa.</p>
        )}
      </div>
    );
  }
  