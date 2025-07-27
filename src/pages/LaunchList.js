import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Spinner, Center } from '@chakra-ui/react';
import { LaunchItem } from '../components/LaunchItem';

export function LaunchList() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usamos axios.post para o endpoint de query da v4
        const result = await axios.post('https://api.spacexdata.com/v4/launches/query', {
          query: {}, // Nenhum filtro, queremos todos
          options: {
            sort: {
              flight_number: 'desc' // Ordena pelo número do voo, mais recentes primeiro
            },
            limit: 500
          }
        });
        setLaunches(result.data.docs);
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
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
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