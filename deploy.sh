#!/bin/bash

set -e  # Detiene la ejecución si ocurre algún error

# Directorio base
BASE_DIR="/root/app/frontend"
PUBLIC_DIR="$BASE_DIR/public/assets"
BUILD_DIR="/var/www/html"

# Paso 1: Generar el archivo JSON de blog posts
echo "Generando archivo JSON para blog posts..."
cd "$BASE_DIR"
node generateBlogPosts.js
if [ -f "$PUBLIC_DIR/blogPosts.json" ]; then
    echo "Archivo blogPosts.json generado con éxito en $PUBLIC_DIR"
else
    echo "Error al generar blogPosts.json"
    exit 1
fi

# Paso 2: Construir la aplicación con npm
echo "Ejecutando npm run build..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error durante la compilación. Revisa los logs."
    exit 1
fi

# Paso 3: Copiar los archivos al servidor web
echo "Copiando archivos al servidor web en $BUILD_DIR..."
sudo cp -r "$BASE_DIR/build/"* "$BUILD_DIR"
if [ $? -eq 0 ]; then
    echo "Archivos copiados con éxito a $BUILD_DIR"
else
    echo "Error al copiar archivos."
    exit 1
fi

echo "Proceso completado exitosamente."
