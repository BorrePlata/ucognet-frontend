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

export default function Login() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setSuccess(false); // Limpiar mensajes de éxito

    // Validar campos
    if (!formData.phoneNumber.trim() || !formData.password.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      console.log("Enviando datos:", formData); // Depuración

      const response = await axios.post("https://efficientai.es/auth/login", {
        phone_number: formData.phoneNumber,
        password: formData.password,
      });

      // Guardar el token en localStorage
      localStorage.setItem("token", response.data.access_token);

      // Mostrar mensaje de éxito
      setSuccess(true);

      // Redirigir a la página personalizada del usuario
      setTimeout(() => navigate(`/user/${formData.phoneNumber}`), 2000);
    } catch (err) {
      console.error("Error de inicio de sesión:", err.response || err.message);

      // Manejar errores específicos de la API o generales
      if (err.response) {
        const { status } = err.response;
        if (status === 401) {
          setError("Credenciales inválidas. Verifica tus datos.");
        } else if (status >= 500) {
          setError("Error en el servidor. Intenta más tarde.");
        } else {
          setError("Ocurrió un error desconocido.");
        }
      } else {
        setError("Error de conexión. Verifica tu red.");
      }
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
            Iniciar Sesión
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              Inicio de sesión exitoso. Redirigiendo...
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
              Iniciar Sesión
            </Button>
          </form>
          <Typography
            variant="body2"
            textAlign="center"
            marginTop={2}
            color="text.secondary"
          >
            ¿No tienes cuenta?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/register")}
              sx={{ textTransform: "none", padding: 0 }}
            >
              Regístrate aquí
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
