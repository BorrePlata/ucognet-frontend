const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const defaultProxyOptions = {
    changeOrigin: true,
    logLevel: 'debug', // Muestra detalles en la consola para depuración
    onError: (err, req, res) => {
      console.error(`Error en el proxy para ${req.url}:`, err.message);
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Error al procesar la solicitud a través del proxy.');
    },
  };

  // Proxy para el backend en puerto 3002
  app.use(
    '/initialize-session',
    createProxyMiddleware({
      target: 'https://localhost:3002', // Backend en 3002 para sesiones y audio
      secure: false, // Permite certificados autofirmados
      ...defaultProxyOptions,
    })
  );

  app.use(
    '/process-audio',
    createProxyMiddleware({
      target: 'https://localhost:3002', // Backend en 3002 para procesar audio
      secure: false,
      ...defaultProxyOptions,
    })
  );

  // Proxy para objetivos (8001)
  app.use(
    '/goals',
    createProxyMiddleware({
      target: 'http://localhost:8001', // Servidor de objetivos
      ...defaultProxyOptions,
    })
  );

  // Proxy para mensajes de la webapp (8001)
  app.use(
    '/webapp-message',
    createProxyMiddleware({
      target: 'http://localhost:8001', // Servidor de mensajes web
      ...defaultProxyOptions,
    })
  );

  // Proxy para el asistente (8000)
  app.use(
    '/asistente',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Servidor de asistente
      ...defaultProxyOptions,
    })
  );

  // Proxy genérico para otros endpoints en 8001
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      ...defaultProxyOptions,
    })
  );
};
