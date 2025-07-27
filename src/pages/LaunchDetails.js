import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { GraphQLClient, gql } from 'graphql-request';
import { Box, Heading, Text, Spinner, Center, Image, Flex, Tag, Button, VStack, Icon } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';

const API_ENDPOINT = 'https://api.spacex.land/graphql/';
const client = new GraphQLClient(API_ENDPOINT);

const GET_LAUNCH_DETAILS_QUERY = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      id
      mission_name
      details
      launch_success
      flight_number
      launch_date_utc
      links {
        mission_patch
        article_link
        video_link
        wikipedia
      }
    }
  }
`;

export function LaunchDetails() {
  const { launchId } = useParams();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunch = async () => {
      setLoading(true);
      try {
        const data = await client.request(GET_LAUNCH_DETAILS_QUERY, { launchId });
        setLaunch(data.launch);
      } catch (error) {
        console.error("Erro ao buscar detalhes do lançamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunch();
  }, [launchId]);

  if (loading) {
    return <Center h="100vh"><Spinner size="xl" /></Center>;
  }

  if (!launch) {
    return <Center h="100vh">Lançamento não encontrado.</Center>;
  }

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Button as={RouterLink} to="/" mb={4} colorScheme="blue">
        Voltar para a lista
      </Button>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Image
          src={launch.links.mission_patch}
          alt={`Patch for ${launch.mission_name}`}
          boxSize={{ base: '150px', md: '300px' }}
          objectFit="contain"
          mx="auto"
          flexShrink={0}
        />
        <Box>
          <Flex align="center" gap={4} mb={2}>
            <Tag colorScheme={launch.launch_success ? 'green' : 'red'} size="lg">
              {launch.launch_success ? 'Sucesso' : 'Falha'}
            </Tag>
            <Heading as="h1" size="xl">{launch.mission_name}</Heading>
          </Flex>
          <Text fontSize="lg" color="gray.500" mb={4}>
            <strong>Data:</strong> {launch.launch_date_utc ? new Date(launch.launch_date_utc).toLocaleString('pt-BR', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) : 'Data não disponível'}
          </Text>
          <Text mb={4}>{launch.details || 'Sem detalhes oficiais disponíveis para esta missão.'}</Text>
          <Text fontSize="md" color="gray.600" mb={2}>
            <strong>ID do Voo:</strong> {launch.flight_number}
          </Text>
          <VStack align="start" spacing={3} mt={6}>
            <Heading as="h3" size="md">Links Úteis:</Heading>
            {launch.links.video_link && (
              <Button as="a" href={launch.links.video_link} target="_blank" colorScheme="red" leftIcon={<Icon as={FaYoutube} />}>
                Assistir no YouTube
              </Button>
            )}
            {launch.links.article_link && (
              <Button as="a" href={launch.links.article_link} target="_blank" colorScheme="blue">
                Ler o Artigo
              </Button>
            )}
            {launch.links.wikipedia && (
              <Button as="a" href={launch.links.wikipedia} target="_blank" colorScheme="gray">
                Página na Wikipedia
              </Button>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}