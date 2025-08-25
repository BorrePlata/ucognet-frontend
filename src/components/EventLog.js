import { Box, Typography } from "@mui/material";

export default function EventLog({ events }) {
    return (
      <div style={{ backgroundColor: "#1a202c", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <h3>Eventos Recibidos</h3>
        {events.length === 0 ? (
          <p>Esperando eventos...</p>
        ) : (
          events.map((event, index) => <pre key={index}>{JSON.stringify(event, null, 2)}</pre>)
        )}
      </div>
    );
  }
  