import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Importa o Link
import { Box, Image, Text, Flex, Tag, Spacer } from '@chakra-ui/react';
import defaultImage from '../assets/default-rocket.png';

export function LaunchItem({ launch }) {
  return (
    // Envolve o Box com o RouterLink
    <RouterLink to={`/launch/${launch.id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }} // Efeito visual
        transition="all 0.2s"
      >
        <Flex>
          <Box>
            <Flex align="baseline">
              <Tag size="sm" colorScheme={launch.success ? "green" : "red"}>
                {launch.success ? "Success" : "Failure"}
              </Tag>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                Flight #{launch.flight_number}
              </Box>
            </Flex>
            <Text
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              fontSize="xl"
            >
              {launch.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {new Date(launch.date_utc).toLocaleDateString("pt-BR")}
            </Text>
          </Box>
          <Spacer />
          <Image
              boxSize="100px"
              objectFit="contain"
              src={launch.links.patch.small || defaultImage}
              alt={`Patch for ${launch.name}`}
          />
        </Flex>
      </Box>
    </RouterLink>
  );
}