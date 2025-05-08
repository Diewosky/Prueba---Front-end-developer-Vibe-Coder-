import { extendTheme } from '@chakra-ui/react'

// Configuración para el modo de color
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#E0F7FF',
    100: '#B8EAFF',
    200: '#8CD6FF',
    300: '#5FC2FF',
    400: '#33ADFF',
    500: '#0088FF',  // Azul principal
    600: '#0069D9',
    700: '#004FB3',
    800: '#00348C',
    900: '#001A66',
  },
  accent: {
    50: '#E0FFF5',
    100: '#B8FFE8',
    200: '#8CFFE0',
    300: '#5FFFD8',
    400: '#33FFD0',
    500: '#00E6B5',  // Verde para elementos destacados
    600: '#00B392',
    700: '#00806E',
    800: '#00664C',
    900: '#004D33',
  },
  background: {
    card: {
      light: '#FFFFFF',
      dark: '#1A202C'
    },
    main: {
      light: '#F0F5FA',
      dark: '#111827'
    },
  },
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
}

const fonts = {
  heading: "'Roboto', sans-serif",
  body: "'Roboto', sans-serif",
}

const shadows = {
  card: {
    light: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    dark: '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)'
  },
  elevated: {
    light: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    dark: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
  },
  button: {
    light: '0 2px 4px rgba(0, 136, 255, 0.2)',
    dark: '0 2px 4px rgba(0, 136, 255, 0.4)'
  },
}

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
      _focus: {
        boxShadow: 'outline',
      },
    },
    variants: {
      solid: (props) => ({
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          transform: 'translateY(-2px)',
          boxShadow: props.colorMode === 'dark' 
            ? '0 4px 8px rgba(0, 136, 255, 0.5)' 
            : '0 4px 8px rgba(0, 136, 255, 0.3)',
        },
        _active: {
          bg: 'brand.700',
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
      }),
      outline: {
        border: '2px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
      secondary: {
        bg: 'accent.500',
        color: 'white',
        _hover: {
          bg: 'accent.600',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 230, 181, 0.3)',
        },
        _active: {
          bg: 'accent.700',
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
      },
      ghost: (props) => ({
        color: props.colorMode === 'dark' ? 'gray.300' : 'gray.600',
        _hover: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          color: 'brand.500',
        }
      }),
    },
  },
  Card: {
    baseStyle: {
      p: '6',
      bg: 'background.card.light',
      borderRadius: 'xl',
      boxShadow: 'card.light',
      mb: '6',
      width: '100%',
      transition: 'all 0.3s',
      _hover: {
        boxShadow: 'elevated.light',
      },
    },
  },
  Heading: {
    baseStyle: (props) => ({
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      fontWeight: 'bold',
    }),
    sizes: {
      xl: {
        fontSize: ['3xl', '4xl', '5xl'],
        lineHeight: 1.2,
      },
      lg: {
        fontSize: ['xl', '2xl', '3xl'],
        lineHeight: 1.2,
      },
      md: {
        fontSize: ['lg', 'xl', '2xl'],
        lineHeight: 1.3,
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'gray.50',
          borderRadius: 'md',
          _hover: {
            bg: 'gray.100',
          },
          _focus: {
            bg: 'white',
            borderColor: 'brand.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
}

const theme = extendTheme({
  config,
  colors,
  fonts,
  shadows,
  components,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'background.main.light',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
      'h1, h2, h3, h4, h5, h6, p, span, li, a': {
        color: props.colorMode === 'dark' ? 'white' : 'inherit',
      },
      '.chakra-heading': {
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
      '.section-title': {
        color: props.colorMode === 'dark' ? 'white !important' : 'inherit',
      }
    }),
  },
  layerStyles: {
    card: {
      p: '6',
      rounded: 'xl',
      bg: 'background.card.light',
      boxShadow: 'card.light',
      transition: 'all 0.3s',
      _hover: {
        boxShadow: 'elevated.light',
      },
    },
    cardHeader: {
      borderBottom: '1px solid',
      borderColor: 'gray.100',
      pb: '4',
      mb: '4',
    },
    highlight: {
      bg: 'brand.50',
      p: '4',
      borderRadius: 'md',
    },
    currencyValue: {
      fontFamily: 'mono',
      fontSize: '2xl',
      fontWeight: 'bold',
      color: 'brand.500',
    },
  },
  textStyles: {
    h1: {
      fontSize: ['3xl', '4xl', '5xl'],
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: ['2xl', '3xl'],
      fontWeight: 'semibold',
      lineHeight: 1.2,
    },
    subtitle: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: 'gray.500',
    },
    value: {
      fontSize: '4xl',
      fontWeight: 'bold',
      color: 'brand.500',
    },
  },
})

export default theme 