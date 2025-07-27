import { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { Box, Heading, VStack, Spinner, Center } from '@chakra-ui/react';
import { LaunchItem } from '../components/LaunchItem';

const API_ENDPOINT = 'https://api.spacex.land/graphql/';
const client = new GraphQLClient(API_ENDPOINT);

const GET_LAUNCHES_QUERY = gql`
  query {
    launchesPast(limit: 500, sort: "launch_date_unix", order: "desc") {
      id
      mission_name
      launch_date_utc
      launch_success
      flight_number
      links {
        mission_patch_small
      }
    }
  }
`;

export function LaunchList() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.request(GET_LAUNCHES_QUERY);
        setLaunches(data.launchesPast);
      } catch (error) {
        console.error("Erro ao buscar dados com GraphQL:", error);
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