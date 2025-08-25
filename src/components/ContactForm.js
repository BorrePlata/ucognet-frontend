import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false); // Estado para mostrar el aviso
  const [formValues, setFormValues] = useState({
    company: '',
    phone: '',
    email: '',
    message: '',
    privacyPolicy: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setShowSnackbar(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (!formValues.privacyPolicy) {
      alert('Debes aceptar las políticas de privacidad para continuar.');
      return;
    }

    // Construir el enlace mailto
    const mailtoLink = `mailto:contacto@efficientai.es?subject=Contacto desde la web&body=${encodeURIComponent(
      `Empresa: ${formValues.company}\nTeléfono: ${formValues.phone}\nCorreo: ${formValues.email}\nMensaje: ${formValues.message}`
    )}`;

    // Abrir el cliente de correo predeterminado
    window.location.href = mailtoLink;

    // Mostrar el aviso de envío
    setShowSnackbar(true);

    // Cerrar el formulario
    setOpen(false);
  };

  return (
    <Box textAlign="center" padding="40px 0">
      <Typography variant="h5" gutterBottom>
        ¿Listo para conocer más sobre EfficientAI?
      </Typography>
      <Typography variant="body1" paragraph>
        Contáctanos y descubre cómo podemos ser el socio tecnológico que tu
        empresa necesita para dar el siguiente paso en inteligencia artificial.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<MailOutlineIcon />}
        onClick={handleOpen}
      >
        Contáctanos
      </Button>

      {/* Dialogo para el formulario */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Formulario de Contacto
          </Typography>
          <TextField
            label="Empresa"
            name="company"
            value={formValues.company}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Teléfono de contacto"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Correo"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Mensaje"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={4}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="privacyPolicy"
                checked={formValues.privacyPolicy}
                onChange={handleChange}
              />
            }
            label={
              <>
                Acepto las{' '}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'blue',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'darkblue',
                    },
                  }}
                >
                  políticas de privacidad
                </Link>
                .
              </>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Aviso de Envío */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          ¡Tu mensaje ha sido enviado con éxito!
        </Alert>
      </Snackbar>
    </Box>
  );
}
