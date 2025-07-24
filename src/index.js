import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // Importando o Provider
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envolvendo o App com o ChakraProvider */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);