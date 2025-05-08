import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  HStack,
  Container,
  Image,
  Tooltip
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isOpen) onToggle();
  };

  return (
    <Box 
      position="sticky" 
      top="0" 
      zIndex="1000"
      boxShadow="sm"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Container maxW="container.xl">
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          minH={'50px'}
          py={{ base: 2 }}
          align={'center'}
          justify="space-between"
        >
          <Flex alignItems="center">
            <Text
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily={'heading'}
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
              letterSpacing="tight"
            >
              InfoDivisas
            </Text>
          </Flex>

          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <NavButton
              label="Valor Actual"
              onClick={() => scrollToSection('dollar-value')}
            />
            <NavButton
              label="Comparar Histórico"
              onClick={() => scrollToSection('historical-comparison')}
            />
            <NavButton
              label="Conversor"
              onClick={() => scrollToSection('currency-converter')}
            />
            <NavButton
              label="Histórico"
              onClick={() => scrollToSection('dollar-chart')}
            />
            <Tooltip 
              label={colorMode === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'} 
              fontSize="sm"
            >
              <IconButton
                aria-label={colorMode === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                fontSize="20px"
                color={useColorModeValue('gray.600', 'gray.300')}
                _hover={{
                  color: 'brand.500',
                  bg: useColorModeValue('gray.100', 'gray.700')
                }}
              />
            </Tooltip>
          </HStack>

          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            colorScheme="brand"
            size="sm"
          />
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={3}
            display={{ md: 'none' }}
            borderRadius="md"
            mt={1}
            boxShadow="md"
            spacing={2}
          >
            <MobileNavButton
              label="Valor Actual"
              onClick={() => scrollToSection('dollar-value')}
            />
            <MobileNavButton
              label="Comparar Histórico"
              onClick={() => scrollToSection('historical-comparison')}
            />
            <MobileNavButton
              label="Conversor"
              onClick={() => scrollToSection('currency-converter')}
            />
            <MobileNavButton
              label="Histórico"
              onClick={() => scrollToSection('dollar-chart')}
            />
            <Button
              w="full"
              py={1}
              variant="ghost"
              onClick={toggleColorMode}
              justifyContent="flex-start"
              height="auto"
              fontSize="sm"
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              _hover={{
                bg: useColorModeValue('gray.50', 'gray.700'),
                color: 'brand.500'
              }}
            >
              {colorMode === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            </Button>
          </Stack>
        </Collapse>
      </Container>
      <Box 
        height="2px" 
        bgGradient="linear(to-r, brand.300, accent.300)"
      />
    </Box>
  );
};

const NavButton = ({ label, onClick }) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      position="relative"
      fontWeight="medium"
      fontSize="sm"
      py={1}
      height="auto"
      _hover={{
        textDecoration: 'none',
        color: 'brand.500',
        _after: {
          width: '100%',
          left: 0
        }
      }}
      _after={{
        content: '""',
        position: 'absolute',
        width: '0%',
        height: '2px',
        bottom: '0',
        left: '50%',
        bgGradient: 'linear(to-r, brand.500, accent.500)',
        transition: 'all 0.3s ease'
      }}
    >
      {label}
    </Button>
  );
};

const MobileNavButton = ({ label, onClick }) => {
  return (
    <Button
      w="full"
      py={1}
      variant="ghost"
      onClick={onClick}
      justifyContent="flex-start"
      height="auto"
      fontSize="sm"
      _hover={{
        bg: 'gray.50',
        color: 'brand.500'
      }}
    >
      {label}
    </Button>
  );
};

export default Navbar; 