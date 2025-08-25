const fs = require("fs");
const path = require("path");

// Define las rutas de entrada y salida
const entradasPath = path.join(__dirname, "src/entradas");
const outputPath = path.join(__dirname, "public/assets/blogPosts.json");

// Validar los campos requeridos en las entradas
const validateEntry = (content) => {
  const requiredFields = ["id", "slug", "title", "description", "author", "date", "previewImage"];
  return requiredFields.every((field) => field in content && content[field]);
};

// Leer todos los archivos JSON en la carpeta `entradas` y generar el índice
const generateBlogPostsIndex = () => {
  try {
    // Verifica si la carpeta de destino existe
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Crea el directorio si no existe
    }

    // Obtener la lista de archivos JSON
    const files = fs.readdirSync(entradasPath).filter((file) => file.endsWith(".json"));

    // Procesar cada archivo JSON
    const blogPosts = files.map((file) => {
      const filePath = path.join(entradasPath, file);
      try {
        const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

        // Validar la entrada
        if (!validateEntry(content)) {
          console.warn(`Advertencia: El archivo ${file} tiene campos faltantes o inválidos.`);
          return null; // Ignorar entradas inválidas
        }

        // Retornar todo el contenido de la entrada
        return content;
      } catch (error) {
        console.error(`Error procesando el archivo ${file}:`, error.message);
        return null;
      }
    }).filter(Boolean); // Filtrar entradas nulas o inválidas

    // Escribir el archivo `blogPosts.json`
    fs.writeFileSync(outputPath, JSON.stringify(blogPosts, null, 2), "utf8");
    console.log(`Archivo blogPosts.json generado con éxito en ${outputPath}.`);
  } catch (error) {
    console.error("Error generando blogPosts.json:", error.message);
  }
};

// Ejecutar la función
generateBlogPostsIndex();
