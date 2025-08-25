import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://efficientai.es/auth/register", {
        phone_number: formData.phoneNumber,
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Redirige al login tras 2 segundos
    } catch (err) {
      setError("Error al registrar. Intenta de nuevo.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#1E88E5" // Fondo azul
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            marginBottom={2}
            fontWeight="bold"
          >
            Registro
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              Registro exitoso. Redirigiendo al login...
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Número de Teléfono"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1 }}
            >
              Registrarse
            </Button>
          </form>
          <Typography
            variant="body2"
            textAlign="center"
            marginTop={2}
            color="text.secondary"
          >
            ¿Ya tienes cuenta?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", padding: 0 }}
            >
              Inicia sesión aquí
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
