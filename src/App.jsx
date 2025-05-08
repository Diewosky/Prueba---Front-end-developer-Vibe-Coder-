import DollarValue from './components/DollarValue'
import DollarBarChart from './components/DollarBarChart'
import CurrencyConverter from './components/CurrencyConverter'
import Navbar from './components/Navbar'
import { 
  Box, 
  Container, 
  Heading, 
  VStack, 
  Text, 
  useColorModeValue, 
  Divider,
  Flex,
  Icon,
  HStack
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import './App.css'

function App() {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, gray.50)',
    'linear(to-br, gray.800, blue.900)'
  );

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navbar />
      
      <Box 
        position="relative" 
        py={8} 
        bgGradient={bgGradient}
        overflow="hidden"
      >
        <Box 
          position="absolute" 
          top="-100px" 
          right="-100px" 
          w="400px" 
          h="400px" 
          borderRadius="full" 
          bg="brand.50" 
          opacity="0.4" 
        />
        <Box 
          position="absolute" 
          bottom="-50px" 
          left="-50px" 
          w="250px" 
          h="250px" 
          borderRadius="full" 
          bg="accent.50" 
          opacity="0.3" 
        />
        
        <Container maxW="container.xl" position="relative" zIndex="1">
          <VStack spacing={2} align="center" mb={6}>
            <Heading 
              as="h1" 
              size="2xl" 
              textAlign="center" 
              bgGradient={useColorModeValue(
                "linear(to-r, brand.500, accent.500)",
                "linear(to-r, white, gray.300)"
              )}
              bgClip="text"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              InfoDivisas
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} maxW="3xl" textAlign="center">
              Información actualizada sobre divisas, tipos de cambio y valores históricos
            </Text>
          </VStack>
        </Container>
      </Box>
      
      <Container maxW="container.xl" py={4}>
        <VStack spacing={6} align="stretch">
          <SectionDivider title="Valor Actual" icon={InfoOutlineIcon} />
          
          <Box id="dollar-value">
            <DollarValue />
          </Box>
          
          <SectionDivider title="Conversor de Moneda" icon={InfoOutlineIcon} />
          
          <Box id="currency-converter">
            <CurrencyConverter />
          </Box>
          
          <SectionDivider title="Histórico" icon={InfoOutlineIcon} />
          
          <Box id="dollar-chart">
            <DollarBarChart />
          </Box>
        </VStack>
      </Container>
      
      <Box as="footer" py={6} bg={useColorModeValue('gray.100', 'gray.800')} mt={6}>
        <Container maxW="container.xl">
          <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
            © 2025 InfoDivisas - Desarrollado por Diego Gutierrez - Desarrollado con React y Chakra UI - Datos proporcionados por mindicador.cl
          </Text>
        </Container>
      </Box>
    </Box>
  )
}

const SectionDivider = ({ title, icon }) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const dividerColor = useColorModeValue('gray.300', 'gray.600');
  
  return (
    <Flex align="center" my={2}>
      <HStack spacing={2} mr={4}>
        {icon && <Icon as={icon} color="brand.500" w={5} h={5} />}
        <Text fontWeight="bold" fontSize="lg" color={textColor} className="section-title">
          {title}
        </Text>
      </HStack>
      <Divider borderColor={dividerColor} />
    </Flex>
  );
};

export default App
