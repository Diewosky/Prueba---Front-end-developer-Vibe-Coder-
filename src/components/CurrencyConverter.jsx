import React, { useState, useEffect } from 'react';
import { getIndicatorValue, getAllIndicators } from '../services/api';
import { 
  Box, 
  Heading, 
  Input, 
  InputGroup, 
  InputLeftAddon,
  InputRightElement, 
  VStack, 
  HStack, 
  Text, 
  Spinner, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  Button,
  Flex,
  Icon,
  useColorModeValue,
  Badge,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react';
import { RepeatIcon, ChevronDownIcon } from '@chakra-ui/icons';

const CurrencyConverter = () => {
  const [currencyRate, setCurrencyRate] = useState(null);
  const [currentCurrency, setCurrentCurrency] = useState('dolar');
  const [currencyName, setCurrencyName] = useState('Dólar Estadounidense (USD)');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [clpAmount, setClpAmount] = useState('');
  const [foreignAmount, setForeignAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [error, setError] = useState(null);
  const [currenciesError, setCurrenciesError] = useState(null);

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, cyan.50)',
    'linear(to-br, blue.900, cyan.900)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'white');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');
  const textColor = useColorModeValue('gray.800', 'white');
  const hoverBorderColor = useColorModeValue('brand.300', 'brand.400');
  const boxShadowValue = useColorModeValue('lg', 'dark-lg');
  const boxShadowHoverValue = useColorModeValue('xl', 'dark-xl');
  const borderWidthValue = useColorModeValue(0, '1px');
  const borderColorValue = useColorModeValue('transparent', 'gray.700');

  const fetchCurrencyRate = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIndicatorValue(currentCurrency);
      setCurrencyRate(data.valor);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al obtener el tipo de cambio. Por favor, intente nuevamente.');
      setLoading(false);
    }
  };

  const fetchAvailableCurrencies = async () => {
    try {
      setLoadingCurrencies(true);
      setCurrenciesError(null);
      const data = await getAllIndicators();
      
      console.log('Datos completos de la API:', data);
      
      // Extraer todos los indicadores disponibles en la API sin restricciones
      const currencies = Object.keys(data)
        .filter(key => 
          // Solo incluir aquellos que son objetos con valores
          typeof data[key] === 'object' && 
          data[key] !== null &&
          data[key].valor !== undefined
        )
        .map(key => ({
          id: key,
          name: data[key].nombre || key,
          code: data[key].codigo || key.toUpperCase(),
          value: data[key].valor,
          symbol: key === 'dolar' ? '$' : 
                 key === 'euro' ? '€' : 
                 key === 'uf' ? 'UF' : 
                 key === 'utm' ? 'UTM' :
                 key === 'bitcoin' ? '₿' :
                 key === 'libra_cobre' ? 'lb' :
                 key === 'yen' ? '¥' :
                 key === 'won' ? '₩' :
                 key === 'real' ? 'R$' : ''
        }))
        // Ordenar por nombre para una mejor experiencia de usuario
        .sort((a, b) => {
          // Priorizar algunas monedas comunes
          const priority = ['dolar', 'euro', 'uf', 'utm', 'bitcoin'];
          
          const indexA = priority.indexOf(a.id);
          const indexB = priority.indexOf(b.id);
          
          // Si ambas están en la lista de prioridad, ordenar por índice de prioridad
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          
          // Si solo una está en la lista de prioridad, ponerla primero
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          
          // Si ninguna está en la lista de prioridad, ordenar alfabéticamente
          return a.name.localeCompare(b.name);
        });
      
      console.log('Todas las monedas e indicadores disponibles:', currencies);
      
      if (currencies.length === 0) {
        setCurrenciesError('No se encontraron monedas disponibles. Por favor, intente más tarde.');
      } else {
        setAvailableCurrencies(currencies);
      }
      
      setLoadingCurrencies(false);
    } catch (err) {
      console.error('Error fetching available currencies:', err);
      setCurrenciesError('Error al obtener las monedas disponibles. Por favor, intente nuevamente.');
      setLoadingCurrencies(false);
    }
  };

  useEffect(() => {
    fetchAvailableCurrencies();
  }, []);

  useEffect(() => {
    fetchCurrencyRate();
    
    // Actualizar información de la moneda seleccionada
    if (availableCurrencies.length > 0) {
      const selected = availableCurrencies.find(c => c.id === currentCurrency);
      if (selected) {
        setCurrencyName(selected.name);
        setCurrencySymbol(selected.symbol || '');
        setCurrencyCode(selected.code);
      }
    }
  }, [currentCurrency, availableCurrencies]);

  const handleClpChange = (e) => {
    const clp = e.target.value;
    setClpAmount(clp);
    
    // Only convert if we have a value and a currency rate
    if (clp && currencyRate) {
      const foreign = (Number(clp) / currencyRate).toFixed(2);
      setForeignAmount(foreign);
    } else {
      setForeignAmount('');
    }
  };

  const handleForeignChange = (e) => {
    const foreign = e.target.value;
    setForeignAmount(foreign);
    
    // Only convert if we have a value and a currency rate
    if (foreign && currencyRate) {
      const clp = (Number(foreign) * currencyRate).toFixed(0);
      setClpAmount(clp);
    } else {
      setClpAmount('');
    }
  };

  const handleCurrencyChange = (currencyId) => {
    setCurrentCurrency(currencyId);
    // Limpiar los campos al cambiar de moneda
    setClpAmount('');
    setForeignAmount('');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Flex direction="column" justify="center" align="center" p={4} minH="150px">
          <Spinner size="lg" color="brand.500" thickness="3px" speed="0.65s" />
          <Text mt={2} fontSize="md" color={labelColor}>Cargando tipo de cambio...</Text>
        </Flex>
      );
    }
    
    if (error) {
      return (
        <Alert 
          status="error" 
          borderRadius="lg" 
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={4}
        >
          <AlertIcon boxSize="30px" mr={0} />
          <AlertTitle mt={2} mb={1} fontSize="md">{error}</AlertTitle>
          <Button 
            mt={2}
            size="sm"
            colorScheme="red"
            onClick={fetchCurrencyRate}
          >
            Intentar Nuevamente
          </Button>
        </Alert>
      );
    }

    if (!currencyRate) {
      return (
        <Alert status="info" borderRadius="lg" variant="subtle">
          <AlertIcon />
          <AlertTitle>Datos de tipo de cambio no disponibles.</AlertTitle>
        </Alert>
      );
    }

    return (
      <VStack spacing={4} align="stretch" w="full">
        <Box 
          p={3} 
          borderRadius="lg" 
          bgGradient={bgGradient}
          boxShadow="sm"
          position="relative"
          overflow="hidden"
        >
          <Box 
            position="absolute" 
            top="-20px" 
            right="-20px" 
            w="80px" 
            h="80px" 
            borderRadius="full" 
            bg="accent.50" 
            opacity="0.4" 
          />
          <Flex justify="space-between" align="center">
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="sm" fontWeight="medium" color={labelColor}>Tipo de Cambio Actual</Text>
              <HStack spacing={2} alignItems="baseline">
                <Text fontSize="xl" fontWeight="bold" color="brand.500">1 {currencyCode} = {currencyRate.toFixed(2)} CLP</Text>
                <Badge colorScheme="green" variant="solid" rounded="full" px={1} py={0} fontSize="xs">
                  Actualizado
                </Badge>
              </HStack>
            </VStack>
            <Icon as={RepeatIcon} w={6} h={6} color="gray.400" onClick={fetchCurrencyRate} cursor="pointer" />
          </Flex>
        </Box>

        <Box position="relative" p={3} bg={cardBg} borderRadius="lg" boxShadow="sm" mb={3}>
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={2}>
            Seleccionar Moneda
          </Text>
          
          {loadingCurrencies ? (
            <Flex justify="center" align="center" p={2}>
              <Spinner size="sm" color="brand.500" mr={2} />
              <Text fontSize="sm">Cargando monedas...</Text>
            </Flex>
          ) : currenciesError ? (
            <Alert status="error" size="sm" borderRadius="md" mb={2} fontSize="sm">
              <AlertIcon />
              <Text>{currenciesError}</Text>
              <Button 
                ml="auto" 
                size="xs" 
                colorScheme="red" 
                onClick={fetchAvailableCurrencies}
              >
                Reintentar
              </Button>
            </Alert>
          ) : (
            <Select
              placeholder="Seleccione una moneda"
              value={currentCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              size="md"
              bg={inputBg}
              color={textColor}
              borderColor={borderColor}
              focusBorderColor="brand.500"
              borderRadius="md"
              _hover={{ borderColor: hoverBorderColor }}
              cursor="pointer"
              icon={<ChevronDownIcon />}
              iconSize="24px"
              _placeholder={{ color: placeholderColor }}
            >
              {availableCurrencies.map(currency => (
                <option key={currency.id} value={currency.id}>
                  {currency.symbol && `${currency.symbol} `}{currency.name} ({currency.code})
                </option>
              ))}
            </Select>
          )}
        </Box>

        <VStack spacing={4} w="full" bg={cardBg} p={3} borderRadius="lg" boxShadow="sm">
          <CurrencyInput 
            label="Peso Chileno (CLP)"
            value={clpAmount}
            onChange={handleClpChange}
            placeholder="Ingrese monto en CLP"
            symbol="$"
          />

          <Flex justify="center" align="center" w="full" position="relative" py={1}>
            <Box position="absolute" left="0" right="0" height="1px" bg="gray.200" />
            <Box 
              bg={cardBg} 
              p={1} 
              borderRadius="full" 
              boxShadow="md" 
              position="relative" 
              zIndex="1"
            >
              <Icon 
                as={RepeatIcon} 
                w={5} 
                h={5} 
                color="accent.500"
                transform="rotate(90deg)"
              />
            </Box>
          </Flex>

          <CurrencyInput 
            label={currencyName}
            value={foreignAmount}
            onChange={handleForeignChange}
            placeholder={`Ingrese monto en ${currencyCode}`}
            symbol={currencySymbol || currencyCode}
          />
        </VStack>
      </VStack>
    );
  };

  return (
    <Box 
      id="currency-converter" 
      bg={cardBg}
      p={{ base: 3, md: 4 }}
      borderRadius="xl" 
      boxShadow={boxShadowValue}
      w="full"
      transition="all 0.3s"
      _hover={{ boxShadow: boxShadowHoverValue, transform: 'translateY(-2px)' }}
      borderWidth={borderWidthValue}
      borderColor={borderColorValue}
    >
      <Flex mb={3} align="center" justify="space-between">
        <Heading as="h2" size="md" bgGradient={useColorModeValue("linear(to-r, brand.500, accent.500)", "linear(to-r, white, gray.300)")} bgClip="text">
          Conversor de Moneda
        </Heading>
        <Badge variant="subtle" colorScheme="blue" px={2} py={0} borderRadius="full" fontSize="xs">
          En tiempo real
        </Badge>
      </Flex>
      {renderContent()}
    </Box>
  );
};

const CurrencyInput = ({ label, value, onChange, placeholder, symbol }) => {
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const addonBg = useColorModeValue('brand.500', 'brand.600');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <VStack spacing={1} w="full" align="flex-start">
      <Text fontSize="sm" fontWeight="medium" color={labelColor}>{label}</Text>
      <InputGroup size="md">
        <InputLeftAddon 
          children={symbol} 
          bg={addonBg}
          color="white" 
          fontWeight="bold"
          borderRightRadius="none"
          px={2}
          borderColor={addonBg}
        />
        <Input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          borderLeftRadius="none"
          fontSize="md"
          fontWeight="500"
          bg={inputBg}
          borderColor={borderColor}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)'
          }}
        />
      </InputGroup>
    </VStack>
  );
};

export default CurrencyConverter; 