import React, { useEffect } from "react";
import {
  chakra,
  Container,
  SimpleGrid,
  HStack,
  Text,
  useColorModeValue,
  Image,
  Box,
  Link,
  Flex,
} from "@chakra-ui/react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import googlePlay from "./../Assets/googlePlay2.png";
import appGallery from "./../Assets/appgallery2.png";
import phone from "./../Assets/phoneEasySOS.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Body() {
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9 } },
    hidden: { opacity: 0, scale: 0 },
  };

  const animation = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [animation, inView]);

  return (
    <Box bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}>
      <Container maxW="6xl" px={{ base: 15, md: 3 }} pb={20}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="">
          <SimpleGrid spacing="15px" columns={{ sm: 2, md: 1 }}>
            <Box>
              <chakra.h1
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
                py={8}
              >
                Envía tu primer <br />
                <chakra.span color="teal">Reporte → </chakra.span>
              </chakra.h1>
              <HStack>
                <Text>
                  <VscDebugBreakpointLog />
                </Text>
                <Text
                  fontSize="1.2rem"
                  textAlign="left"
                  lineHeight="1.375"
                  fontWeight="600"
                  color={useColorModeValue("#1A202C", "gray.500")}
                >
                  Descarga la App desde la Tienda
                </Text>
              </HStack>
              <HStack>
                <Text>
                  <VscDebugBreakpointLog />
                </Text>
                <Text
                  fontSize="1.2rem"
                  textAlign="left"
                  lineHeight="1.375"
                  fontWeight="600"
                  color={useColorModeValue("#1A202C", "gray.500")}
                >
                  Graba un vídeo o fotografia y envíalo
                </Text>
              </HStack>
              <HStack>
                <Text>
                  <VscDebugBreakpointLog />
                </Text>
                <Text
                  fontSize="1.2rem"
                  textAlign="left"
                  lineHeight="1.375"
                  color={useColorModeValue("#1A202C", "gray.500")}
                  fontWeight="600"
                >
                  Las autoridades recibirán tu reporte
                </Text>
              </HStack>
              <HStack>
                <Text>
                  <VscDebugBreakpointLog />
                </Text>
                <Text
                  fontSize="1.2rem"
                  textAlign="left"
                  lineHeight="1.375"
                  fontWeight="600"
                  color={useColorModeValue("#1A202C", "gray.500")}
                >
                  Se notificará una vez atendido
                </Text>
              </HStack>
            </Box>

            <Box paddingTop={{ sm: "150px", md: 0 }}>
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="5px">
                <Box>
                  <Link
                    isExternal
                    href="https://play.google.com/store/apps/details?id=com.easy.easysos"
                  >
                    <Image
                      src={googlePlay}
                      alt="Google Play EasySOS"
                      maxW={{ sm: "100%", md: "100%", lg: "100%" }}
                      maxH="auto"
                    />
                  </Link>
                </Box>
                <Box>
                  <Link
                    isExternal
                    href="https://play.google.com/store/apps/details?id=com.easy.easysos"
                  >
                    <Image
                      src={appGallery}
                      alt="AppGallery EasySOS"
                      maxW={{ sm: "100%", md: "100%", lg: "100%" }}
                      maxH="auto"
                    />
                  </Link>
                </Box>
              </SimpleGrid>
            </Box>
          </SimpleGrid>

          <motion.div
            ref={ref}
            variants={boxVariant}
            initial="hidden"
            animate={animation}
          >
            <Flex
              justify="center"
              align="center"
              y={{ sm: 20, md: 8 }}
              flex={1}
              pt={{ base: "20px", sm: 8, md: "80px" }}
              px={{ sm: "20px", xl: "15px" }}
            >
              <Image
                alt="EasySOS Reporte"
                src={phone}
                maxW={{ base: "100%", md: "100%" }}
                maxH="auto"
                objectFit="contain"
              />
            </Flex>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
