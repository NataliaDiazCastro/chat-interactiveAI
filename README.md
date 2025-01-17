# Chat interactive bot

## Descripción

Este proyecto es una aplicación de chat interactiva que permite a los usuarios comunicarse con un bot basado en la API de OpenAI. Proporciona una interfaz intuitiva con un diseño limpio, que incluye un encabezado estilizado, un área de visualización de mensajes, y una sección para enviar nuevos mensajes.

## Características

- Comunicación con el bot: Los usuarios pueden enviar mensajes al bot y recibir respuestas generadas por OpenAI.
- Integración con API: Genera respuestas dinámicas.
- Indicador de carga: Muestra un indicador mientras se procesan las solicitudes a la API.
- Manejo de errores: Notifica a los usuarios en caso de que ocurra un problema al procesar las solicitudes.
- Diseño responsivo que funciona en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- React
- HTML
- CSS
- TypeScript
- OpenAI API

## Instalación

Para poner en marcha el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/NataliaDiazCastro/chat-interactiveAI.git

   ```

2. Navega al directorio del proyecto:

   ```bash
   cd chat-interactiveAI
   ```

3. Instala las dependencias:

   ```bash
   npm install
     # o
   yarn install
   ```

## Configuración

Para interactuar con el chatbot y asegurarte de que pueda responder correctamente, debes configurar tu API key:

1. Abre el archivo `api/openai.js`.
2. Encuentra la línea que contiene `const apiKey = "";`.
3. Coloca tu API Key aquí: `const OPENAI_API_KEY = "Your_API_Key";`.

## Comandos para desarrollo

Comandos para ejecutar el proyecto en un entorno de desarrollo:
   
   ```bash
   npm run dev
     # o
   yarn dev
   ```

## Estructura del proyecto

   ```
   src/
   ├── api/
   │   └── openai.ts    # Lógica para interactuar con la API de OpenAI
   ├── App.tsx          # Componente principal de la aplicación
   ├── App.css          # Estilos globales de la aplicación
   └── index.tsx        # Punto de entrada de la aplicación
   ```

## Uso

1. Envía un mensaje:
  - Escribe un mensaje en el campo de texto en la parte inferior.
  - Presiona Enter o haz clic en el botón de enviar para interactuar con el bot.
2. Respuestas del bot:
  - Observa cómo las respuestas del bot aparecen en la pantalla después de unos segundos.


## Contribuir

Si estás interesado en contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-feature`).
3. Realiza tus cambios y haz commit de los mismos (`git commit -am 'Añadir nueva feature'`).
4. Sube tus cambios (`git push origin feature/nueva-feature`).
5. Crea una nueva Pull Request.
