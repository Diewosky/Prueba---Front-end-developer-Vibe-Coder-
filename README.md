# InfoDivisas - Aplicación de Información de Divisas

<div align="center">
  <h3>Visualiza, compara y convierte valores de divisas con una interfaz moderna y elegante</h3>
  <p><em>Proyecto desarrollado como prueba técnica para la posición de Front-end Developer (Vibe Coder)</em></p>
</div>

## Descripción
InfoDivisas es una aplicación web desarrollada con React y Chakra UI que proporciona información en tiempo real sobre el valor del dólar y otras divisas en pesos chilenos (CLP). La aplicación permite visualizar el valor actual, consultar valores históricos, convertir entre divisas y visualizar la evolución del dólar a través de gráficos interactivos.

Esta aplicación fue desarrollada como respuesta al desafío de crear una solución utilizando la API pública de [mindicador.cl](https://mindicador.cl/), combinando programación tradicional con el uso de inteligencia artificial para asistir en el proceso de desarrollo.

## Tecnologías Utilizadas
- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **Vite**: Herramienta de compilación y desarrollo que proporciona un entorno de desarrollo rápido
- **Chakra UI**: Sistema de diseño para React con componentes personalizables y accesibles
- **Axios**: Cliente HTTP basado en promesas para realizar peticiones a API
- **Framer Motion**: Biblioteca para animaciones fluidas y naturales
- **Cursor**: IDE potenciado por IA que facilita la programación con asistencia inteligente

## Características
- **Valor actual del dólar**: Muestra el valor actualizado del dólar en pesos chilenos
- **Comparación histórica**: Permite seleccionar una fecha o año para comparar valores
- **Conversor de divisas**: Conversión entre múltiples divisas y pesos chilenos (CLP)
- **Gráfico histórico**: Visualización interactiva de la evolución del valor del dólar en los últimos 30 días hábiles
- **Múltiples indicadores**: Soporte para diferentes divisas e indicadores financieros (dólar, euro, UF, etc.)
- **Estadísticas avanzadas**: Visualización de valores máximos, mínimos, promedios y variaciones porcentuales
- **Navegación intuitiva**: Barra de navegación moderna con animaciones y desplazamiento suave
- **Diseño UI/UX moderno**: Interfaz elegante con tarjetas, gradientes, animaciones y efectos visuales
- **Modo oscuro completo**: Soporte para alternancia entre modo claro y oscuro, con estilos optimizados
- **Manejo de errores**: Visualización clara de estados de carga y errores
- **Diseño responsivo**: Adaptado para móviles, tablets y escritorio
- **Tema personalizado**: Sistema de diseño coherente con paleta de colores y componentes personalizados
- **Logo personalizado**: SVG con gradientes y efectos visuales que representa la identidad de la aplicación

## Uso de Inteligencia Artificial en el Desarrollo

Esta aplicación fue desarrollada utilizando Inteligencia Artificial como herramienta de apoyo durante todo el proceso. Se emplearon principalmente:

- **Claude (Anthropic)**: Para asistir en generación de código, planificación y diseño.
- **Cursor**: Como IDE potenciado por IA que facilitó la codificación, autocompletado, y sugerencias en tiempo real.

A continuación se detalla cómo la IA fue integrada al flujo de trabajo:

### Planificación y Arquitectura
- **Definición del concepto**: La IA ayudó a explorar ideas sobre qué tipo de aplicación crear con los datos de la API de mindicador.cl
- **Planificación de componentes**: Se utilizó para definir la estructura de componentes y su jerarquía
- **Selección de tecnologías**: Recomendaciones sobre qué tecnologías serían adecuadas (React, Chakra UI)

### Desarrollo de Código
- **Generación de código base**: Estructura inicial de componentes como DollarValue, CurrencyConverter y DollarBarChart
- **Integración con API**: Código para realizar llamadas a la API y manejar las respuestas
- **Manejo de estados**: Implementación de lógica para gestionar estados de los componentes
- **Resolución de errores**: Diagnóstico y corrección de bugs durante el desarrollo

### Diseño de UI/UX
- **Sistema de diseño**: Definición de un tema personalizado para Chakra UI con paleta de colores, estilos y componentes
- **Implementación de modo oscuro**: Adaptación de componentes para soportar tema claro y oscuro
- **Efectos visuales**: Mejora de la experiencia del usuario con animaciones, transiciones y feedback visual
- **Creación del logo**: Diseño de un SVG personalizado con gradientes y simbolismo relacionado con divisas

### Mejoras y Optimizaciones
- **Mejora de rendimiento**: Identificación de problemas potenciales y optimización del código
- **Accesibilidad**: Sugerencias para mejorar la accesibilidad de la interfaz
- **Depuración**: Ayuda para encontrar y corregir problemas en el código
- **Documentación**: Asistencia en la creación de este README.md detallado

### Flujo de Trabajo con IA
1. **Planteamiento del problema o tarea**: Definir claramente qué se necesitaba desarrollar
2. **Generación de soluciones**: La IA proponía diferentes enfoques o fragmentos de código
3. **Evaluación y adaptación**: Revisión humana de las propuestas, seleccionando y adaptando según necesidades
4. **Implementación y pruebas**: Integración del código y verificación de funcionamiento
5. **Iteración**: Mejora continua basada en feedback y nuevas necesidades

#### Herramientas de IA Utilizadas en el Flujo de Trabajo

**Claude (Anthropic)**
- Planificación de la arquitectura de la aplicación
- Generación de componentes completos basados en requerimientos
- Solución de problemas complejos de lógica
- Creación de estilos y diseños visuales detallados
- Optimización de código existente

**Cursor IDE**
- Autocompletado inteligente de código durante la programación
- Explicación en tiempo real de código complejo
- Sugerencias proactivas para mejoras y buenas prácticas
- Debugging asistido de errores en el código
- Refactorización inteligente de componentes
- Búsqueda contextual en la base de código

### Contribución Humana vs. IA
- **Dirección creativa**: Las decisiones sobre el concepto, enfoque y estética fueron humanas
- **Juicio crítico**: Evaluación de las propuestas de la IA y selección de las más adecuadas
- **Integración y cohesión**: Asegurar que las diferentes partes trabajen juntas de manera armónica
- **Testing y experiencia de usuario**: Evaluación de la usabilidad y funcionalidad real

Esta metodología de trabajo permitió combinar las fortalezas de la IA (generación rápida de código, exploración de opciones) con el juicio humano (dirección creativa, toma de decisiones), resultando en un desarrollo más eficiente sin sacrificar calidad ni originalidad.

## Estructura del Proyecto
```
/src
  /components            # Componentes React
    DollarValue.jsx      # Componente para mostrar valor actual y comparación
    DollarBarChart.jsx   # Componente para gráfico de barras histórico
    CurrencyConverter.jsx # Conversor de divisas CLP-USD
    Navbar.jsx           # Barra de navegación con selector de modo
    Button.jsx           # Componente de botón personalizado
  /services              # Servicios para comunicación con APIs
    api.js               # Funciones para llamadas a la API
  /utils                 # Utilidades generales
    helpers.js           # Funciones helper (formateo de fechas, etc.)
  /styles                # Estilos globales
    common.css           # Variables CSS y estilos comunes
  /assets                # Recursos estáticos
    logo.svg             # Logo de la aplicación en formato SVG
  theme.js               # Tema personalizado de Chakra UI
  App.jsx                # Componente principal de la aplicación
  App.css                # Estilos principales
  main.jsx               # Punto de entrada de la aplicación
```

## API Utilizada
La aplicación utiliza la API pública de [mindicador.cl](https://mindicador.cl/), que proporciona indicadores económicos de Chile. Específicamente, se utiliza para obtener:

- Indicadores disponibles: `https://mindicador.cl/api`
- Valor actual de un indicador: `https://mindicador.cl/api/{indicador}`
- Valor histórico por fecha: `https://mindicador.cl/api/{indicador}/{fecha}`
- Valor histórico por año: `https://mindicador.cl/api/{indicador}/{año}`
- Serie histórica: `https://mindicador.cl/api/{indicador}`

## Sistema de Diseño con Chakra UI

La aplicación utiliza Chakra UI con un tema personalizado que incluye:

### Paleta de Colores
- **Primario (Brand)**: Gradiente de azules (#0088FF) utilizados para botones principales, acentos y elementos interactivos
- **Acento (Accent)**: Gradiente de verde-azulado (#00E6B5) para destacar información y elementos secundarios
- **Fondos**: Variaciones de blancos/grises para modo claro y tonos oscuros para modo nocturno
- **Grises**: Paleta extendida para textos, bordes y elementos sutiles, optimizada para ambos modos

### Componentes Personalizados
- **Botones**: Varios estilos (solid, outline, ghost) con efectos hover y transiciones
- **Tarjetas**: Con sombras, bordes redondeados y efectos hover
- **Inputs**: Campos personalizados con iconos y efectos focus
- **Badges**: Etiquetas pequeñas para información adicional
- **Alertas**: Mensajes de éxito, error e información
- **Switch de Modo**: Toggle para alternar entre modo claro y oscuro

### Estilos y Efectos
- **Gradientes**: Utilizados en títulos, fondos y elementos decorativos
- **Sombras**: Sistema de elevación consistente para tarjetas y elementos
- **Animaciones**: Transiciones suaves y efectos hover en elementos interactivos
- **Tipografía**: Sistema jerárquico con fuente Roboto
- **Modo Oscuro**: Adaptación de colores, contrastes y efectos visuales optimizados para modo nocturno

## Componentes Principales

### Navbar
Barra de navegación moderna con:
- Logo con gradiente de texto
- Navegación con efecto de subrayado en hover
- Menú móvil responsivo con animación
- Toggle para cambiar entre modo claro y oscuro
- Línea decorativa inferior con gradiente

### DollarValue
Muestra el valor actual del dólar y permite compararlo con valores históricos.

**Funcionalidades:**
- Visualización del valor actual con fecha de actualización
- Selector de indicadores (dólar, euro, UF, etc.)
- Comparación por fecha específica o por año
- Cálculo de variación porcentual y absoluta
- Indicadores visuales de aumento o disminución
- Diseño optimizado con números más grandes y centrados

### CurrencyConverter
Conversor entre múltiples divisas y pesos chilenos (CLP).

**Funcionalidades:**
- Conversión en tiempo real
- Selector de moneda de origen
- Interfaz moderna con tarjetas elevadas
- Visualización destacada del tipo de cambio actual
- Icono interactivo para intercambiar conversión

### DollarBarChart
Gráfico de barras interactivo para visualizar la evolución del dólar.

**Funcionalidades:**
- Visualización de datos de los últimos 30 días hábiles
- Destacado del valor más reciente
- Tooltips interactivos al pasar el cursor
- Panel de estadísticas con valores promedio, máximo, mínimo y variación
- Botón de actualización para refrescar datos
- Optimizado para modo oscuro con colores y contrastes mejorados
- Efectos visuales adaptados para ambos modos

## Mejoras de UI/UX Implementadas
- **Modo Oscuro Completo**: Sistema que adapta colores, contrastes y elementos visuales
- **Elementos decorativos**: Círculos con gradientes y opacidad para crear profundidad visual
- **Animaciones sutiles**: Transiciones en hover, focus y carga de componentes
- **Consistencia visual**: Sistema de diseño coherente en toda la aplicación
- **Jerarquía de información**: Uso de tamaños, colores y espaciado para guiar al usuario
- **Feedback visual**: Indicadores claros de estados (carga, error, éxito)
- **Responsividad**: Diseño optimizado para diferentes dispositivos
- **Accesibilidad**: Contraste adecuado, textos legibles y enfoque visible
- **Gráficos mejorados**: Barras con gradientes y efectos de sombra según el modo

## Reflexiones y Aprendizajes

### Lo que se Aprendió
- La combinación de programación tradicional e IA puede acelerar significativamente el desarrollo
- Chakra UI proporciona un sistema de diseño robusto y flexible para crear interfaces modernas
- La implementación adecuada del modo oscuro requiere un enfoque sistemático, no solo cambiar colores
- La API de mindicador.cl ofrece datos valiosos que pueden presentarse de formas interactivas y útiles

### Con Más Tiempo, se Hubiera Implementado
- Gráficos más avanzados utilizando bibliotecas especializadas como Recharts o Nivo
- Comparativas múltiples entre diferentes indicadores económicos
- Exportación de datos a formatos como PDF o Excel
- Sistema de notificaciones para cambios significativos en los valores
- Tests unitarios y de integración para asegurar la robustez del código
- Versión PWA para uso offline y mejor experiencia en móviles

## Aplicación en Vivo
Esta aplicación ha sido desplegada en Azure Static Web Apps y está disponible en el siguiente enlace:

**[InfoDivisas en Azure](https://wonderful-plant-00313591e.6.azurestaticapps.net/)**

## Instalación y Ejecución

### Requisitos Previos
- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

### Pasos para Instalación
1. Clonar el repositorio:
   ```
   git clone [URL del repositorio]
   cd infodivisas
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```
   npm run dev
   ```

4. La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne)

### Compilación para Producción
```
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## Guía para Nuevos Colaboradores

Si has clonado este repositorio y quieres comenzar a trabajar en él, sigue esta guía para una configuración rápida:

### Configuración Inicial

1. **Verifica la versión de Node.js**:
   ```bash
   node -v
   ```
   Asegúrate de tener Node.js v14.0.0 o superior. Si necesitas actualizar, visita [nodejs.org](https://nodejs.org/).

2. **Instala las dependencias**:
   ```bash
   npm install
   ```
   Este comando instalará todas las dependencias necesarias, incluyendo React, Chakra UI y otras bibliotecas.

3. **Posibles Problemas de Compatibilidad**:
   - Si estás usando React 19, podrías encontrar problemas de compatibilidad con algunas bibliotecas.
   - En ese caso, utiliza `--legacy-peer-deps`:
     ```bash
     npm install --legacy-peer-deps
     ```

### Estructura de Archivos Clave

- **`src/theme.js`**: Define todo el sistema de diseño personalizado de Chakra UI.
- **`src/components/`**: Contiene todos los componentes React.
- **`src/services/api.js`**: Contiene las funciones para comunicarse con la API.

### Ejecutar la Aplicación

```bash
npm run dev
```

### Modificaciones Comunes

1. **Actualizar el Tema**:
   - Edita `src/theme.js` para modificar colores, tipografía o componentes.
   - Ejemplo para modificar un color:
     ```javascript
     const colors = {
       brand: {
         // Modificar los colores aquí
         500: '#0088FF',  // Color principal
       }
     }
     ```

2. **Añadir un Nuevo Componente**:
   - Crea un nuevo archivo en `src/components/`
   - Importa los componentes de Chakra UI necesarios
   - Conecta con la API si es necesario

3. **Modificar la API**:
   - En `src/services/api.js` puedes añadir nuevas funciones para obtener datos adicionales
   - Ejemplo para añadir un nuevo endpoint:
     ```javascript
     export const getNewIndicator = async (indicatorName) => {
       try {
         const response = await axios.get(`https://mindicador.cl/api/${indicatorName}`);
         return response.data;
       } catch (error) {
         console.error(`Error fetching ${indicatorName}:`, error);
         throw error;
       }
     };
     ```

### Depuración

- Revisa la consola del navegador (F12) para ver errores.
- La API puede experimentar ocasionalmente retrasos o errores, prueba usando un timeout más largo en las llamadas.

## Autor
Diego Gutierrez

---

Este proyecto fue creado con [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [Chakra UI](https://chakra-ui.com/) y utiliza la API de [mindicador.cl](https://mindicador.cl/).
