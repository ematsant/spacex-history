import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, Spinner, Center, Image, Flex, Tag, Button } from '@chakra-ui/react';

export function LaunchDetails() {
  const { launchId } = useParams(); // Pega o 'launchId' da URL
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunch = async () => {
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
  }, [launchId]); // Roda o efeito sempre que o launchId mudar

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
    <Box p={5}>
      <Button as={RouterLink} to="/" mb={4}>
        Voltar para a lista
      </Button>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Image
          src={launch.links.patch.large}
          alt={`Patch for ${launch.name}`}
          boxSize="300px"
          objectFit="contain"
          mx="auto"
        />
        <Box>
          <Tag colorScheme={launch.success ? "green" : "red"} mb={2}>
            {launch.success ? "Sucesso" : "Falha"}
          </Tag>
          <Heading as="h1" size="xl">{launch.name}</Heading>
          <Text fontSize="lg" color="gray.500" mb={4}>
            {new Date(launch.date_utc).toLocaleDateString("pt-BR", {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </Text>
          <Text>{launch.details || "Sem detalhes disponíveis para esta missão."}</Text>
        </Box>
      </Flex>
    </Box>
  );
}