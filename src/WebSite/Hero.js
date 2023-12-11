import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion"; //import { motion, isValidMotionProp } from "framer-motion";

export function Hero() {
  return (
    <>
      <Container pt={20} maxW={"6xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 20 }}
        >
          <motion.Box
            initial={{ opacity: 0, scale: 0.1 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
            animate={{
              y: 30,
              scale: 1,
              opacity: 1,
            }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              pb={"50"}
            >
              EasySOS, tu Aliado en Seguridad Ciudadana
            </Heading>
            <Box>
              <Text fontWeight={600} fontSize={"30"} as={"span"} color={"teal"}>
                Es una aplicación innovadora diseñada para fortalecer la
                participación ciudadana en la construcción de comunidades más
                seguras.
              </Text>
            </Box>
          </motion.Box>

          <motion.Box
            initial={{ color: "ff0000" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              opacity: { ease: "linear" },
            }}
            animate={{
              y: 10,
            }}
          >
            <Text
              fontWeight={500}
              fontSize={{ base: "1xl", sm: "2xl", md: "4xl" }}
            >
              Proporciona una plataforma que permite a los usuarios informar de
              manera rápida sobre delitos, emergencias, etc.
            </Text>
          </motion.Box>

          <Box>
            <Text
              fontSize={{ base: "0.8xl", sm: "1.5xl", md: "3xl" }}
              color={"teal.300"}
              fontWeight={500}
            >
              Y contribuye a la seguridad y cumplimiento de la ley.
            </Text>
          </Box>
        </Stack>

        <Container
          pb={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/*
          <ChakraBox
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            padding="2"
            bgGradient="linear(to-l, #008080, black)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="35px"
            height="35px"
          >
            🤖👨‍💻
          </ChakraBox>
          */}
        </Container>
      </Container>
    </>
  );
}
