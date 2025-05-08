import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ text, onClick, type = 'primary', disabled = false }) => {
  const variant = type === 'primary' ? 'solid' : type === 'secondary' ? 'outline' : 'ghost';
  
  return (
    <ChakraButton
      onClick={onClick}
      variant={variant}
      isDisabled={disabled}
      colorScheme="brand"
    >
      {text}
    </ChakraButton>
  );
};

export default Button; 