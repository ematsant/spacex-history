import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Spinner, Center } from '@chakra-ui/react';
import { LaunchItem } from '../components/LaunchItem'; // O caminho da importação mudou
// import '../App.css'; // Não precisa mais deste CSS

export function LaunchList() { // Nome da função alterado
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.spacexdata.com/v5/launches');
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
        <VStack spacing={4} align="stretch" maxW="4xl" mx="auto">
          {launches.map(launch => (
            <LaunchItem key={launch.id} launch={launch} />
          ))}
        </VStack>
      )}
    </Box>
  );
}