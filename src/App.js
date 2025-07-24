import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Spinner, Center } from '@chakra-ui/react'; // Importando componentes do Chakra
import { LaunchItem } from './components/LaunchItem'; // Importando nosso novo componente
import './App.css';

function App() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.spacexdata.com/v5/launches');
        // Pegando os lançamentos mais recentes primeiro
        setLaunches(result.data.reverse());
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    // Usando o componente Box como nosso container principal
    <Box p={5} bg="gray.50" minH="100vh">
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        SpaceX Launch History
      </Heading>

      {loading ? (
        <Center h="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        // VStack empilha os itens verticalmente com um espaçamento
        <VStack spacing={4} align="stretch" maxW="4xl" mx="auto">
          {launches.map(launch => (
            <LaunchItem key={launch.id} launch={launch} />
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default App;