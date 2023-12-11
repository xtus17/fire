import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  useColorModeValue,
  Flex,
  chakra,
  Container,
} from "@chakra-ui/react";
import { FcCustomerSupport, FcTabletAndroid, FcUnlock } from "react-icons/fc";
import { motion } from "framer-motion";

const Feature = (props) => {
  const { title, text, icon } = props;
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export function Features() {
  return (
    <Box p={{ sm: 10, md: 10 }} mx={{ base: 5 }}>
      <chakra.h1
        fontSize="3xl"
        lineHeight={10}
        fontWeight="bold"
        textAlign="center"
       // py={20}
        paddingBottom={25}
      >
        Nuestro equipo trabaja constantemente para mejorar y
        <br />
        <chakra.span color="teal">brindar las mejores ventajas</chakra.span>
      </chakra.h1>

      <Container maxW="6xl" px={{ base: 15 }} py={15}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <motion.div whileHover={{ scale: 1.1, y: -10 }}>
            <Feature
              icon={<Icon as={FcUnlock} w={10} h={10} />}
              title={"Mapa del Delito"}
              text={
                <Text
                  fontSize="1.2rem"
                  lineHeight="1.375"
                  fontWeight="450"
                  color={useColorModeValue("#1A202C", "gray.500")}
                >
                  Un mapa en tiempo real de lo que sucede en tu comunidad
                </Text>
              }
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.1, y: -10 }}>
            <Feature
              icon={<Icon as={FcCustomerSupport} w={10} h={10} />}
              title={"Botón de Emergencia"}
              text={
                <Text
                  fontSize="1.2rem"
                  lineHeight="1.375"
                  fontWeight="450"
                  color={useColorModeValue("#1A202C", "gray.500")}
                >
                  Permite enviar la geolocalización actual y un audio a las
                  autoridades
                </Text>
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, y: -10 }}>
            <Feature
              icon={<Icon as={FcTabletAndroid} w={10} h={10} />}
              title={"Muro de Reportes"}
              text={
                <Text
                  fontSize="1.2rem"
                  lineHeight="1.375"
                  fontWeight="450"
                  color={useColorModeValue("#1A202C", "gray.500")}
                >
                  Reportes en tiempo real
                </Text>
              }
            />
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
