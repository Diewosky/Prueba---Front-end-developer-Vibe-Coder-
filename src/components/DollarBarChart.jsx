import React, { useState, useEffect } from 'react';
import { getDollarLast30Days } from '../services/api';
import { 
  Box, 
  Heading, 
  Text, 
  Spinner, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  Button, 
  VStack, 
  Flex, 
  Badge, 
  Grid, 
  GridItem,
  useColorModeValue,
  Tooltip,
  HStack,
  Icon
} from '@chakra-ui/react';
import { RepeatIcon, InfoIcon } from '@chakra-ui/icons';

const DollarBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const gridLineBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const statsBg = useColorModeValue('gray.50', 'gray.700');
  const dateColor = useColorModeValue('gray.600', 'gray.400');
  const tooltipBg = useColorModeValue('brand.500', 'brand.600');
  const valueBoxBg = useColorModeValue('brand.500', 'brand.400');
  const latestValueColor = useColorModeValue('brand.500', 'brand.300');
  const barGradient = useColorModeValue(
    "linear(to-t, brand.400, brand.600)", 
    "linear(to-t, brand.500, accent.400)"
  );
  const latestBarGradient = useColorModeValue(
    "linear(to-t, brand.500, accent.500)", 
    "linear(to-t, brand.400, accent.300)"
  );
  const statLabelColor = useColorModeValue('gray.500', 'gray.400');
  const barShadow = useColorModeValue('none', '0 0 10px rgba(99, 179, 237, 0.3)');
  const hoverBarShadow = useColorModeValue('sm', '0 0 15px rgba(99, 179, 237, 0.4)');

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDollarLast30Days();
      // Reverse data to show chronological order (oldest to newest)
      setChartData(data.reverse());
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos históricos. Por favor, intente nuevamente.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  // Find the highest value to calculate bar heights
  const maxValue = chartData.length > 0 
    ? Math.max(...chartData.map(item => item.valor)) 
    : 0;
    
  const minValue = chartData.length > 0
    ? Math.min(...chartData.map(item => item.valor))
    : 0;
    
  // Calculate average and latest change
  const calculateStats = () => {
    if (chartData.length < 2) return { avg: 0, change: 0, changePercent: 0 };
    
    const sum = chartData.reduce((acc, item) => acc + item.valor, 0);
    const avg = sum / chartData.length;
    
    const latest = chartData[chartData.length - 1].valor;
    const previous = chartData[chartData.length - 2].valor;
    const change = latest - previous;
    const changePercent = (change / previous) * 100;
    
    return { avg, change, changePercent };
  };
  
  const stats = calculateStats();

  // Función para filtrar solo los valores de días alternos para optimizar la visualización
  const getFilteredData = () => {
    // Si hay menos de 15 elementos, mostrar todos
    if (chartData.length <= 15) return chartData;
    
    // Para 30 días, mostrar aproximadamente cada tercer día para no sobrecargar el gráfico
    return chartData.filter((_, index) => index % 3 === 0 || index === chartData.length - 1);
  };

  const filteredData = getFilteredData();

  const renderContent = () => {
    if (loading) {
      return (
        <Flex direction="column" justify="center" align="center" p={4} minH="200px">
          <Spinner size="lg" color="brand.500" thickness="3px" speed="0.65s" />
          <Text mt={2} fontSize="md" color={textColor}>Cargando datos históricos...</Text>
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
          my={4}
        >
          <AlertIcon boxSize="30px" mr={0} />
          <AlertTitle mt={2} mb={2} fontSize="lg">{error}</AlertTitle>
          <Button 
            mt={2}
            size="md" 
            colorScheme="red" 
            onClick={fetchChartData}
            leftIcon={<RepeatIcon />}
          >
            Reintentar
          </Button>
        </Alert>
      );
    }

    if (chartData.length === 0) {
      return (
        <Alert status="info" borderRadius="lg" variant="subtle" my={4}>
          <AlertIcon />
          <AlertTitle>No hay datos históricos disponibles.</AlertTitle>
        </Alert>
      );
    }

    return (
      <VStack spacing={4} w="full" mt={3}>
        <HStack spacing={6} w="full" justify="space-around" p={3} bg={statsBg} borderRadius="lg">
          <Stat 
            label="Promedio" 
            value={`$${stats.avg.toFixed(0)}`} 
            icon={<InfoIcon />} 
            color="blue.500"
            labelColor={statLabelColor}
          />
          <Stat 
            label="Variación" 
            value={`${stats.change > 0 ? '+' : ''}${stats.change.toFixed(0)}`} 
            subtext={`${stats.changePercent > 0 ? '+' : ''}${stats.changePercent.toFixed(2)}%`}
            color={stats.change >= 0 ? 'green.500' : 'red.500'}
            labelColor={statLabelColor}
          />
          <Stat 
            label="Máximo" 
            value={`$${maxValue.toFixed(0)}`} 
            color="green.500"
            labelColor={statLabelColor}
          />
          <Stat 
            label="Mínimo" 
            value={`$${minValue.toFixed(0)}`} 
            color="orange.500"
            labelColor={statLabelColor}
          />
        </HStack>
      
        <Box 
          height="300px" 
          w="full" 
          position="relative" 
          bg={cardBg} 
          p={4} 
          borderRadius="lg"
          boxShadow="sm"
        >
          {/* Grid lines */}
          <Grid
            templateRows="repeat(4, 1fr)"
            h="full"
            position="absolute"
            top="0"
            left="0"
            right="0"
            px={4}
          >
            {[...Array(5)].map((_, i) => (
              <GridItem key={i} borderBottomWidth={i < 4 ? "1px" : "0"} borderColor={gridLineBg} />
            ))}
          </Grid>

          {/* Y-axis labels */}
          <Flex
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            width="50px"
            flexDirection="column"
            justify="space-between"
            p={3}
          >
            {[...Array(5)].map((_, i) => {
              const value = maxValue - ((maxValue - minValue) * i / 4);
              return (
                <Text 
                  key={i} 
                  fontSize="xs" 
                  color={textColor} 
                  fontWeight="medium"
                >
                  ${value.toFixed(0)}
                </Text>
              );
            })}
          </Flex>

          {/* Chart area */}
          <Flex 
            height="100%" 
            align="flex-end" 
            justify="space-between"
            pl="50px"
            position="relative"
            zIndex="1"
          >
            {filteredData.map((item, index) => {
              const normalizedHeight = ((item.valor - minValue) / (maxValue - minValue)) * 100;
              const date = new Date(item.fecha);
              const formattedDate = date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit'
              });
              const isLatest = index === filteredData.length - 1;
              
              return (
                <Tooltip
                  key={index}
                  label={`${date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}: $${item.valor.toFixed(0)}`}
                  bg={tooltipBg}
                  color="white"
                  fontSize="sm"
                  fontWeight="medium"
                  borderRadius="md"
                  placement="top"
                  hasArrow
                >
                  <VStack 
                    spacing={1} 
                    width={`${90 / filteredData.length}%`} 
                    height="100%"
                    justify="flex-end"
                    position="relative"
                    px={0.5}
                  >
                    <Box
                      height={`${normalizedHeight}%`}
                      width="full"
                      minH="4px"
                      bgGradient={isLatest ? latestBarGradient : barGradient}
                      borderRadius="lg"
                      transition="all 0.3s"
                      boxShadow={barShadow}
                      _hover={{
                        filter: "brightness(1.1)",
                        transform: "scaleY(1.05)",
                        boxShadow: hoverBarShadow
                      }}
                      position="relative"
                    >
                      {isLatest && (
                        <Box
                          position="absolute"
                          top="-8px"
                          left="50%"
                          transform="translateX(-50%)"
                          bg={valueBoxBg}
                          color="white"
                          fontSize="xs"
                          fontWeight="bold"
                          px={2}
                          py={1}
                          borderRadius="md"
                          whiteSpace="nowrap"
                        >
                          ${item.valor.toFixed(0)}
                        </Box>
                      )}
                    </Box>
                    <Text 
                      fontSize="xs" 
                      fontWeight="medium"
                      color={isLatest ? latestValueColor : dateColor}
                      mt={1}
                      transform="rotate(-45deg)"
                      transformOrigin="top left"
                      position="absolute"
                      bottom="-25px"
                      left="50%"
                      width="40px"
                    >
                      {formattedDate}
                    </Text>
                  </VStack>
                </Tooltip>
              );
            })}
          </Flex>
        </Box>
      </VStack>
    );
  };

  return (
    <Box 
      id="dollar-chart" 
      bg={cardBg}
      p={{ base: 3, md: 4 }}
      borderRadius="xl" 
      boxShadow="lg"
      w="full"
      transition="all 0.3s"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
    >
      <Flex mb={3} align="center" justify="space-between">
        <Heading as="h2" size="md" bgGradient="linear(to-r, brand.500, accent.500)" bgClip="text">
          Histórico del Dólar
        </Heading>
        <HStack>
          <Badge variant="subtle" colorScheme="blue" px={2} py={1} borderRadius="full" fontSize="xs">
            Últimos 30 días hábiles
          </Badge>
          <Button 
            size="sm" 
            colorScheme="brand" 
            variant="ghost" 
            onClick={fetchChartData} 
            leftIcon={<RepeatIcon />}
            p={1}
          >
            Actualizar
          </Button>
        </HStack>
      </Flex>
      {renderContent()}
    </Box>
  );
};

const Stat = ({ label, value, subtext, color, icon, labelColor }) => {
  const valueColor = useColorModeValue(color, `${color.split('.')[0]}.300`);
  
  return (
    <VStack spacing={0} align="center">
      <Text fontSize="xs" color={labelColor} fontWeight="medium">{label}</Text>
      <HStack>
        {icon && <Icon as={InfoIcon} color={valueColor} boxSize="3" />}
        <Text fontSize="md" fontWeight="bold" color={valueColor}>{value}</Text>
      </HStack>
      {subtext && (
        <Text fontSize="xs" fontWeight="medium" color={valueColor}>
          {subtext}
        </Text>
      )}
    </VStack>
  );
};

export default DollarBarChart; 