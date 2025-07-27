import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Image,
  Flex,
  Tag,
  Button,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa'; // Importando o ícone do YouTube

export function LaunchDetails() {
  const { launchId } = useParams(); // Pega o 'launchId' da URL
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunch = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`https://api.spacexdata.com/v5/launches/${launchId}`);
        setLaunch(result.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do lançamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunch();
  }, [launchId]); // Roda o efeito sempre que o launchId mudar na URL

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
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
          src={launch.links.patch.large}
          alt={`Patch for ${launch.name}`}
          boxSize={{ base: '150px', md: '300px' }}
          objectFit="contain"
          mx="auto"
          flexShrink={0}
        />
        <Box>
          <Flex align="center" gap={4} mb={2}>
            <Tag colorScheme={launch.success ? 'green' : 'red'} size="lg">
              {launch.success ? 'Sucesso' : 'Falha'}
            </Tag>
            <Heading as="h1" size="xl">{launch.name}</Heading>
          </Flex>

          <Text fontSize="lg" color="gray.500" mb={4}>
            <strong>Data:</strong> {new Date(launch.date_utc).toLocaleString('pt-BR', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </Text>
          
          <Text mb={4}>
            {launch.details || 'Sem detalhes oficiais disponíveis para esta missão.'}
          </Text>
          
          <Text fontSize="md" color="gray.600" mb={2}>
            <strong>ID do Voo:</strong> {launch.flight_number}
          </Text>

          <VStack align="start" spacing={3} mt={6}>
            <Heading as="h3" size="md">Links Úteis:</Heading>
            {launch.links.webcast && (
              <Button as="a" href={launch.links.webcast} target="_blank" colorScheme="red" leftIcon={<Icon as={FaYoutube} />}>
                Assistir no YouTube
              </Button>
            )}
            {launch.links.article && (
              <Button as="a" href={launch.links.article} target="_blank" colorScheme="blue">
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