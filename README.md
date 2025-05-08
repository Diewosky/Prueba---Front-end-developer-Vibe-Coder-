# InfoDivisas - Aplicación de Información de Divisas

<div align="center">
  <h3>Visualiza, compara y convierte el valor del dólar en pesos chilenos</h3>
</div>

## Descripción
InfoDivisas es una aplicación web desarrollada con React que proporciona información en tiempo real sobre el valor del dólar en pesos chilenos (CLP). La aplicación permite visualizar el valor actual, consultar valores históricos, convertir entre divisas y visualizar la evolución del dólar a través de un gráfico de barras.

## Tecnologías Utilizadas
- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **Vite**: Herramienta de compilación y desarrollo que proporciona un entorno de desarrollo rápido
- **Axios**: Cliente HTTP basado en promesas para realizar peticiones a API
- **CSS puro**: Para los estilos de la aplicación sin dependencias de frameworks

## Características
- **Valor actual del dólar**: Muestra el valor actualizado del dólar en pesos chilenos
- **Comparación histórica**: Permite seleccionar una fecha para comparar el valor actual con un valor histórico
- **Conversor de divisas**: Conversión bidireccional entre CLP y USD usando el tipo de cambio actual
- **Gráfico histórico**: Visualización de la evolución del valor del dólar en los últimos 30 días
- **Navegación intuitiva**: Barra de navegación responsiva para acceder fácilmente a las diferentes secciones
- **Manejo de errores**: Visualización clara de estados de carga y errores
- **Diseño responsivo**: Adaptado para móviles, tablets y escritorio

## Estructura del Proyecto
```
/src
  /components            # Componentes React
    DollarValue.jsx      # Componente para mostrar valor actual y comparación
    DollarBarChart.jsx   # Componente para gráfico de barras histórico
    CurrencyConverter.jsx # Conversor de divisas CLP-USD
    Navbar.jsx           # Barra de navegación
  /services              # Servicios para comunicación con APIs
    api.js               # Funciones para llamadas a la API
  /utils                 # Utilidades generales
    helpers.js           # Funciones helper (formateo de fechas, etc.)
  /styles                # Estilos globales
    common.css           # Variables CSS y estilos comunes
  App.jsx                # Componente principal de la aplicación
  App.css                # Estilos principales
  main.jsx               # Punto de entrada de la aplicación
```

## API Utilizada
La aplicación utiliza la API pública de [mindicador.cl](https://mindicador.cl/), que proporciona indicadores económicos de Chile. Específicamente, se utiliza para obtener:

- Valor actual del dólar: `https://mindicador.cl/api`
- Valor histórico del dólar: `https://mindicador.cl/api/dolar/{fecha}`
- Serie histórica del dólar: `https://mindicador.cl/api/dolar`

## Componentes Principales

### DollarValue
Muestra el valor actual del dólar y permite compararlo con valores históricos.

**Funcionalidades:**
- Visualización del valor actual con fecha de actualización
- Selector de fecha para comparación histórica
- Cálculo de variación porcentual y absoluta
- Indicadores visuales de aumento o disminución

**Implementación:**
- Llamada a la API usando Axios para obtener el valor actual
- Llamada a la API para obtener el valor histórico en una fecha específica
- Cálculos matemáticos para determinar variaciones
- Estados separados para manejo de errores en cada llamada a la API

### CurrencyConverter
Conversor bidireccional entre pesos chilenos (CLP) y dólares estadounidenses (USD).

**Funcionalidades:**
- Conversión en tiempo real
- Actualización automática al escribir en cualquiera de los dos campos
- Visualización del tipo de cambio actual

**Implementación:**
- Utiliza el valor del dólar obtenido de la API
- Eventos de onChange para actualizar conversiones en tiempo real
- Formateo numérico usando toFixed para precisión decimal adecuada
- Manejo de estados vacíos para evitar NaN o cálculos erróneos

### DollarBarChart
Gráfico de barras verticales que muestra la evolución del valor del dólar.

**Funcionalidades:**
- Visualización de datos de los últimos 30 días
- Tooltips interactivos al pasar el cursor sobre las barras
- Escala dinámica basada en los valores máximos y mínimos

**Implementación:**
- Gráfico construido usando HTML y CSS puro (sin bibliotecas de gráficos)
- Cálculo automático de alturas relativas basadas en valores min/max
- Uso de CSS para animaciones de hover y transiciones suaves
- Generación dinámica de etiquetas de ejes basadas en los datos reales

### Navbar
Barra de navegación superior que permite acceder a las diferentes secciones.

**Funcionalidades:**
- Navegación suave con desplazamiento automático
- Diseño responsivo con menú hamburguesa en dispositivos móviles
- Enlace directo a la API externa

**Implementación:**
- Uso de scrollIntoView para navegación suave entre secciones
- Animación CSS para el menú hamburguesa
- Estado para controlar la apertura/cierre del menú móvil
- Efectos visuales para mejorar la interacción del usuario

## Manejo de Estados y Errores
Cada componente que realiza llamadas a la API implementa los siguientes estados:

```jsx
// Estados para manejar ciclo de vida de datos
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Carga de datos con manejo de errores
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await someApiCall();
    setData(result);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setError('Mensaje de error amigable');
    setLoading(false);
  }
};
```

Todos los componentes muestran:
- Indicadores de carga durante las peticiones
- Mensajes de error claros con opción de reintentar
- Estados vacíos cuando no hay datos disponibles

## Diseño Responsivo
La aplicación está diseñada para funcionar en diferentes dispositivos:
- Diseño flexible que se adapta a distintos tamaños de pantalla
- Menú de navegación colapsable en dispositivos móviles
- Sistema de variables CSS para mantener consistencia en colores, espaciados y tipografía
- Breakpoints específicos para ajustes en móviles y tablets

## Instalación y Ejecución

### Requisitos Previos
- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

### Pasos para Instalación
1. Clonar el repositorio:
   ```
   git clone [URL del repositorio]
   cd [nombre-carpeta]
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

## Mejoras Futuras
- Implementar gráficos interactivos con bibliotecas como Chart.js o D3.js
- Añadir más divisas para conversión (Euro, Libra Esterlina, etc.)
- Implementar modo oscuro
- Añadir funcionalidad para guardar conversiones favoritas
- Incorporar más indicadores económicos disponibles en la API
- Añadir pruebas unitarias y de integración
- Implementar PWA para uso offline

## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## Autor
[Tu nombre/equipo]

---

Este proyecto fue creado con [Vite](https://vitejs.dev/) y utiliza la API de [mindicador.cl](https://mindicador.cl/).
