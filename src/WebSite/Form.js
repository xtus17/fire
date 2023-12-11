import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Image,
  Link,
  Flex,
  Textarea,
  Text,
  useDisclosure,
  Hide,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import emailjs from "@emailjs/browser";
import relax from "./../Assets/relax2.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Form() {
  const [overlay, setOverlay] = useState();
  const [textModal, setTextModal] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_60529hs",
        "template_9mzgafv",
        e.target,
        "_RihrMwdqY8D2iHbx"//acount publickey
      );

      setOverlay(<OverlayOne />);
      onOpen();
    } catch (error) {
      setTextModal(false);
      setOverlay(<OverlayOne />);
      onOpen();
    }
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: "100%" }}
    >
      <Header />
      <Stack
        py={20}
        px={20}
        minH="100vh"
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Hide below="md">
          <Flex flex={1}>
            <Image alt="Cover image" objectFit="cover" src={relax} />
          </Flex>
        </Hide>

        <Flex p={8} flex={1} align="center" justify="center">
          <Stack spacing={4}>
            <Stack align="center">
              <Heading fontSize="2xl">Contáctame</Heading>
            </Stack>

            <motion.div
              ref={ref}
              variants={boxVariant}
              initial="hidden"
              animate={animation}
            >
              <VStack
                spacing={8}
                boxSize={{ base: "xs", sm: "sm", md: "md" }}
                h="max-content !important"
                bg={useColorModeValue("white", "gray.700")}
                rounded="lg"
                boxShadow="lg"
                p={{ base: 5, sm: 10 }}
              >
                <form onSubmit={sendEmail}>
                  <Text fontWeight={500}>
                    Te agradecemos por ponerse en contacto con nosotros 👏
                  </Text>
                  <br />
                  <FormControl mb={3} isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      autoFocus
                      placeholder="Tu nombre"
                    />
                  </FormControl>

                  <FormControl mb={3} id="email">
                    <FormLabel>Correo Electrónico</FormLabel>
                    <Input
                      rounded="md"
                      type="email"
                      name="email"
                      autocomplete="off"
                      placeholder="Tu correo"
                    />
                  </FormControl>

                  <FormControl mb={3} isRequired>
                    <FormLabel>Mensaje</FormLabel>

                    <Textarea
                      name="message"
                      placeholder="Tu mensaje"
                      rows={6}
                      resize="none"
                      rounded="md"
                    />
                  </FormControl>
                  <br />
                  <Button
                    fontSize={"sm"}
                    fontWeight={600}
                    colorScheme="teal"
                    variant="solid"
                    rounded="md"
                    w="100%"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </form>
              </VStack>
            </motion.div>
          </Stack>
        </Flex>
      </Stack>

      <Modal
        motionPreset="slideInBottom"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Gracias</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {textModal
                ? "Tu mensaje fue enviado con éxito"
                : "Por favor inténtalo de nuevo o más tarde"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>
              <Link
                _hover={{
                  textDecoration: "none",
                }}
                href="/"
              >
                Regresar Inicio
              </Link>
            </Button>

            <Button onClick={onClose} ml="4">
              <Link
                _hover={{
                  textDecoration: "none",
                }}
                href="/form"
              >
                Cerrar
              </Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Footer />
    </motion.div>
  );
}
