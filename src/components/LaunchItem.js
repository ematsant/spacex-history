import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Image, Text, Flex, Tag, Spacer } from '@chakra-ui/react';
import defaultImage from '../assets/default-rocket.png';

export function LaunchItem({ launch }) {
  return (
    <RouterLink to={`/launch/${launch.id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
        transition="all 0.2s"
      >
        <Flex>
          <Box flex="1">
            <Flex align="baseline">
              <Tag size="sm" colorScheme={launch.launch_success ? "green" : "red"}>
                {launch.launch_success ? "Success" : "Failure"}
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
              {launch.mission_name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {new Date(launch.launch_date_utc).toLocaleDateString("pt-BR")}
            </Text>
          </Box>
          <Spacer />
          <Image
              boxSize="100px"
              objectFit="contain"
              src={launch.links.mission_patch_small || defaultImage}
              alt={`Patch for ${launch.mission_name}`}
          />
        </Flex>
      </Box>
    </RouterLink>
  );
}