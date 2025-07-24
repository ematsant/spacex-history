import React from 'react';
import { Box, Image, Text, Flex, Tag, Spacer } from '@chakra-ui/react';
import defaultImage from '../assets/default-rocket.png'; // Vou adicionar essa imagem depois

export function LaunchItem({ launch }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
    >
      <Flex>
        <Box>
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
            {new Date(launch.launch_date_local).toLocaleDateString("pt-BR")}
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
  );
}