import React, { useState, useEffect } from 'react';
import { getAllIndicators, getIndicatorValue, getHistoricalIndicatorValue, getIndicatorByYear } from '../services/api';
import { formatDate } from '../utils/helpers';
import { 
  Box, 
  Heading, 
  Text, 
  Select, 
  Button, 
  Flex, 
  Input, 
  Spinner,
  RadioGroup,
  Radio, 
  Stack,
  useColorModeValue,
  Badge,
  HStack,
  VStack,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { InfoIcon, RepeatIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

const DollarValue = () => {
  const [indicatorData, setIndicatorData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [compareResult, setCompareResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [compareError, setCompareError] = useState(null);
  const [availableIndicators, setAvailableIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState('dolar');
  const [compareIndicator, setCompareIndicator] = useState('dolar');
  const [comparisonType, setComparisonType] = useState('date'); // 'date' o 'year'
  const [yearData, setYearData] = useState(null);

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const currencyColor = useColorModeValue('gray.500', 'gray.400');
  const boxShadow = useColorModeValue('lg', 'dark-lg');
  const highlightBg = useColorModeValue('gray.50', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.700');

  const fetchIndicators = async () => {
    try {
      const allData = await getAllIndicators();
      // Filter out non-indicators (like version, autor, fecha)
      const indicators = Object.keys(allData).filter(key => 
        typeof allData[key] === 'object' && allData[key] !== null && 'codigo' in allData[key]
      );
      setAvailableIndicators(indicators);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchIndicatorValue = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIndicatorValue(selectedIndicator);
      setIndicatorData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(`Error al obtener el valor del ${selectedIndicator}. Por favor, intente nuevamente.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, []);

  useEffect(() => {
    if (selectedIndicator) {
      fetchIndicatorValue();
      // Reset comparison data when indicator changes
      resetComparisonData();
    }
  }, [selectedIndicator]);

  useEffect(() => {
    // Inicialmente, el indicador de comparación es el mismo que el indicador principal
    setCompareIndicator(selectedIndicator);
  }, [selectedIndicator]);

  const resetComparisonData = () => {
    setHistoricalData(null);
    setYearData(null);
    setCompareResult(null);
    setCompareError(null);
    setSelectedDate('');
    setSelectedYear('');
    setComparing(false);
  };

  const cleanupComparisonStates = () => {
    resetComparisonData();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Reset comparison data when date changes
    setHistoricalData(null);
    setCompareResult(null);
    setCompareError(null);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    // Reset comparison data when year changes
    setYearData(null);
    setCompareResult(null);
    setCompareError(null);
  };

  const handleIndicatorChange = (e) => {
    setSelectedIndicator(e.target.value);
  };

  const handleCompareIndicatorChange = (e) => {
    setCompareIndicator(e.target.value);
    // Reset comparison data when indicator changes
    resetComparisonData();
  };

  const handleComparisonTypeChange = (value) => {
    setComparisonType(value);
    resetComparisonData();
  };

  const compareByDate = async () => {
    if (!selectedDate) {
      alert('Por favor, seleccione una fecha');
      return;
    }

    try {
      setComparing(true);
      setCompareError(null);
      setHistoricalData(null);
      setCompareResult(null);
      
      const data = await getHistoricalIndicatorValue(compareIndicator, selectedDate);
      
      if (!data || !data.valor) {
        setCompareError(`No hay datos disponibles para ${compareIndicator.toUpperCase()} en la fecha seleccionada.`);
        setComparing(false);
        return;
      }
      
      setHistoricalData(data);

      // Compare values
      if (indicatorData && data) {
        compareValues(data.valor);
      }
      
      setComparing(false);
    } catch (err) {
      console.error(err);
      setComparing(false);
      setHistoricalData(null);
      setCompareError('Error al obtener datos históricos. Por favor, intente con otra fecha.');
    }
  };

  const compareByYear = async () => {
    if (!selectedYear) {
      alert('Por favor, ingrese un año');
      return;
    }

    try {
      setComparing(true);
      setCompareError(null);
      setYearData(null);
      setCompareResult(null);
      
      const yearResponse = await getIndicatorByYear(compareIndicator, selectedYear);
      
      if (!yearResponse || !yearResponse.serie || yearResponse.serie.length === 0) {
        setCompareError(`No hay datos disponibles para ${compareIndicator.toUpperCase()} en el año ${selectedYear}.`);
        setComparing(false);
        return;
      }
      
      setYearData(yearResponse);

      // Calcular promedio anual para comparación
      const yearValues = yearResponse.serie.map(item => item.valor);
      const averageValue = yearValues.reduce((sum, value) => sum + value, 0) / yearValues.length;
      
      // Comparar con el valor actual
      if (indicatorData) {
        compareValues(averageValue);
      }
      
      setComparing(false);
    } catch (err) {
      console.error(err);
      setComparing(false);
      setYearData(null);
      setCompareError(`Error al obtener datos del año ${selectedYear}.`);
    }
  };

  const compareValues = (historicalValue) => {
    try {
      const currentValue = indicatorData.valor;
      const difference = Math.abs(currentValue - historicalValue).toFixed(2);
      const percentage = ((Math.abs(currentValue - historicalValue) / historicalValue) * 100).toFixed(2);
      
      let status = 'unchanged';
      if (currentValue > historicalValue) {
        status = 'increased';
      } else if (currentValue < historicalValue) {
        status = 'decreased';
      }
      
      setCompareResult({
        status,
        difference,
        percentage
      });
    } catch (error) {
      console.error("Error al comparar valores:", error);
      setCompareError("Ocurrió un error al comparar los valores. Por favor, intente nuevamente.");
    }
  };

  const handleCompare = () => {
    if (comparisonType === 'date') {
      compareByDate();
    } else {
      compareByYear();
    }
  };

  const renderComparisonResult = () => {
    if (compareError) {
      return (
        <Alert status="error" variant="subtle" mt={4} borderRadius="md">
          <AlertIcon />
          {compareError}
        </Alert>
      );
    }

    if (comparing) {
      return (
        <Flex direction="column" justify="center" align="center" my={4} p={3}>
          <Spinner size="md" color="brand.500" thickness="3px" speed="0.65s" />
          <Text mt={2} color={labelColor}>Comparando valores...</Text>
        </Flex>
      );
    }

    if (!compareResult) return null;

    const dateDisplay = comparisonType === 'date' 
      ? formatDate(historicalData?.fecha || selectedDate)
      : `año ${selectedYear}`;

    const comparedIndicatorName = (compareIndicator.charAt(0).toUpperCase() + compareIndicator.slice(1)).replace('_', ' ');
    const valueToShow = comparisonType === 'date' 
      ? historicalData?.valor 
      : yearData?.serie 
        ? yearData.serie.reduce((sum, item) => sum + item.valor, 0) / yearData.serie.length
        : 0;

    const unitDisplay = indicatorData?.unidad_medida === 'Pesos' ? 'CLP' : indicatorData?.unidad_medida || '';

    return (
      <Box 
        mt={4} 
        p={4} 
        borderRadius="md" 
        bg={highlightBg}
        borderLeftWidth="4px"
        borderLeftColor={
          compareResult.status === 'increased' ? "red.400" :
          compareResult.status === 'decreased' ? "green.400" : "yellow.400"
        }
      >
        <Flex justify="space-between" align="center" pb={2} mb={2} borderBottom="1px" borderColor={borderColor} borderStyle="dashed">
          <Text fontWeight="medium" color={labelColor}>Valor {comparedIndicatorName} {dateDisplay}:</Text>
          <Text fontWeight="bold" fontSize="lg">
            ${valueToShow.toFixed(2)} <Text as="span" fontSize="xs" color={currencyColor}>{unitDisplay}</Text>
          </Text>
        </Flex>
        <Text color={textColor} fontWeight="medium">
          {comparedIndicatorName} ha {' '}
          {compareResult.status === 'increased' ? (
            <Text as="span" color="red.400">aumentado <ArrowUpIcon /></Text>
          ) : compareResult.status === 'decreased' ? (
            <Text as="span" color="green.400">disminuido <ArrowDownIcon /></Text>
          ) : (
            <Text as="span" color="yellow.400">mantenido</Text>
          )}{' '}
          en ${compareResult.difference} ({compareResult.percentage}%) en comparación con {dateDisplay}
        </Text>
      </Box>
    );
  };

  const renderCurrentValue = () => {
    if (loading) {
      return (
        <Flex direction="column" justify="center" align="center" my={6} p={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" speed="0.65s" />
          <Text mt={4} color={labelColor}>Cargando valor actual...</Text>
        </Flex>
      );
    }
    
    if (error) {
      return (
        <Alert status="error" variant="subtle" my={4} p={4} borderRadius="md">
          <AlertIcon />
          <Box>
            <Text mb={2}>{error}</Text>
            <Button 
              leftIcon={<RepeatIcon />}
              colorScheme="red" 
              size="sm"
              onClick={fetchIndicatorValue}
              variant="outline"
            >
              Intentar Nuevamente
            </Button>
          </Box>
        </Alert>
      );
    }

    if (!indicatorData) {
      return (
        <Box p={4} textAlign="center" color={labelColor}>
          <InfoIcon mb={2} />
          <Text>No hay datos disponibles.</Text>
        </Box>
      );
    }

    // Formatear la unidad de medida
    let unitDisplay = indicatorData.unidad_medida;
    if (unitDisplay && unitDisplay.toLowerCase() === "pesos") {
      unitDisplay = "CLP";
    }

    return (
      <Box 
        p={8} 
        py={10}
        bg={highlightBg} 
        borderRadius="lg" 
        boxShadow="inner"
        textAlign="center"
      >
        <Flex 
          align="center" 
          justify="center" 
          direction="column"
        >
          <Flex 
            align="baseline" 
            justify="center"
            mb={4}
          >
            <Text fontSize="3xl" color={textColor} mr={2}>$</Text>
            <Text 
              fontSize={{ base: "5xl", md: "7xl" }} 
              fontWeight="bold" 
              color="cyan.400"
              lineHeight="1"
            >
              {indicatorData.valor.toFixed(2)}
            </Text>
            <Text 
              fontSize="2xl" 
              ml={3} 
              color="green.500" 
              fontWeight="semibold"
              alignSelf="flex-end"
              mb={1}
            >
              {unitDisplay}
            </Text>
          </Flex>
          <Text color={labelColor} fontSize="sm" fontStyle="italic">
            Última actualización: {formatDate(indicatorData.fecha)}
          </Text>
        </Flex>
      </Box>
    );
  };

  const renderComparisonInputs = () => {
    if (comparisonType === 'date') {
      return (
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]}
          isDisabled={loading || !!error}
          size="md"
          flexBasis="60%"
          bg={inputBg}
          borderColor={borderColor}
        />
      );
    } else {
      const currentYear = new Date().getFullYear();
      return (
        <Input
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Ej: 2022"
          min="2000"
          max={currentYear}
          isDisabled={loading || !!error}
          size="md"
          flexBasis="30%"
          textAlign="center"
          bg={inputBg}
          borderColor={borderColor}
        />
      );
    }
  };

  // Agregar función de limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpiar todos los estados cuando el componente se desmonta
      cleanupComparisonStates();
    };
  }, []);

  return (
    <>
      <Box 
        id="dollar-value" 
        bg={cardBg} 
        p={5} 
        borderRadius="xl" 
        boxShadow={boxShadow}
        mb={6}
        mx="auto"
        maxW="container.md"
        w="full"
        transition="all 0.3s"
        _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
      >
        <Flex justify="center" mb={4} direction={{ base: "column", md: "row" }} align="center" gap={2}>
          <Text fontWeight="medium" color={labelColor} whiteSpace="nowrap">Seleccionar Indicador:</Text>
          <Select 
            value={selectedIndicator} 
            onChange={handleIndicatorChange}
            size="md"
            maxW={{ base: "full", md: "200px" }}
            bg={useColorModeValue('white', 'gray.700')}
            borderColor={borderColor}
            isDisabled={loading || availableIndicators.length === 0}
          >
            {availableIndicators.map(indicator => (
              <option key={indicator} value={indicator}>
                {indicator.toUpperCase()}
              </option>
            ))}
          </Select>
        </Flex>
        
        <Heading 
          as="h2" 
          size="lg" 
          textAlign="center" 
          mb={4}
          color={textColor}
        >
          Valor Actual del {indicatorData ? indicatorData.nombre : 'Indicador'}
        </Heading>
        
        {renderCurrentValue()}
      </Box>

      <Box 
        id="historical-comparison" 
        bg={cardBg} 
        p={5} 
        borderRadius="xl" 
        boxShadow={boxShadow}
        mb={6}
        mx="auto"
        maxW="container.md"
        w="full"
        transition="all 0.3s"
        _hover={{ boxShadow: 'xl' }}
      >
        <Heading 
          as="h2" 
          size="lg" 
          textAlign="center" 
          mb={4}
          color={textColor}
          pb={2}
          borderBottom="1px"
          borderColor={borderColor}
          position="relative"
          display="inline-block"
          left="50%"
          transform="translateX(-50%)"
        >
          Comparar con valor histórico
        </Heading>
        
        <Flex justify="center" mb={4} direction={{ base: "column", md: "row" }} align="center" gap={2}>
          <Text fontWeight="medium" color={labelColor} whiteSpace="nowrap">Moneda a comparar:</Text>
          <Select 
            value={compareIndicator} 
            onChange={handleCompareIndicatorChange}
            size="md"
            maxW={{ base: "full", md: "200px" }}
            bg={useColorModeValue('white', 'gray.700')}
            borderColor={borderColor}
            isDisabled={loading || availableIndicators.length === 0}
          >
            {availableIndicators.map(indicator => (
              <option key={indicator} value={indicator}>
                {indicator.toUpperCase()}
              </option>
            ))}
          </Select>
        </Flex>
        
        <RadioGroup 
          onChange={handleComparisonTypeChange} 
          value={comparisonType}
          mb={4}
        >
          <Stack 
            direction={{ base: "column", sm: "row" }} 
            spacing={{ base: 2, sm: 6 }} 
            justify="center"
          >
            <Radio value="date" colorScheme="brand" size="lg">Por fecha específica</Radio>
            <Radio value="year" colorScheme="brand" size="lg">Por año</Radio>
          </Stack>
        </RadioGroup>
        
        <Flex 
          gap={3} 
          mb={4} 
          justify="center" 
          align="center" 
          wrap="wrap"
          direction={{ base: "column", sm: "row" }}
          w="full"
        >
          <Box flexBasis={{ base: "100%", sm: "60%" }} w="full">
            {renderComparisonInputs()}
          </Box>
          <Button 
            colorScheme="brand"
            onClick={handleCompare}
            isLoading={comparing}
            loadingText="Comparando..."
            size="lg"
            flexBasis={{ base: "100%", sm: "30%" }}
            isDisabled={
              (comparisonType === 'date' && !selectedDate) || 
              (comparisonType === 'year' && !selectedYear) || 
              loading || 
              !!error
            }
          >
            Comparar
          </Button>
        </Flex>
        
        {renderComparisonResult()}
      </Box>
    </>
  );
};

export default DollarValue; 