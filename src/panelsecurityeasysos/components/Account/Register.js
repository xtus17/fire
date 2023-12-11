import React, { useState } from "react";
import {
  Button,
  Stack,
  Image,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Link
} from "@chakra-ui/react";
import { useAutenticado } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import logoEasySOS from "../../../Assets/Logo EasySOS web2.png";

export function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAutenticado();
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/cpaneleasysosappsecurity/home");
    } catch (error) {
      setError("Upss! Sucedió un error");
      onOpen();
    }
  };

  return (
    <>
      <Stack minH="100vh" justifyContent={"center"}>
        <Flex flex={1} justify="center">
          <VStack
            spacing={8}
            maxW={{ base: "100%", md: "400px" }}
            w="full"
            mx="auto"
            my={20}
            p={{ base: 5, md: 10 }}
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
          >
            <Link
              _hover={{
                textDecoration: "none",
              }}
              href="/"
            >
              <Image
                src={logoEasySOS}
                objectFit="cover"
                maxH={{ base: "50px", md: "70px" }}
                alt="Logo EasySOS"
              />
            </Link>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl mb={3} isRequired>
                <FormLabel>Correo</FormLabel>
                <Input
                  type="email"
                  name="email"
                  autoFocus
                  placeholder="Tu correo"
                  onChange={handleChange}
                />
              </FormControl>

              <br />
              <FormControl mb={3} isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Tu contraseña"
                  minLength={6}
                  onChange={handleChange}
                  autocomplete="off"
                />
              </FormControl>
              <br />
              <Button
                fontSize={"sm"}
                fontWeight={600}
                colorScheme="teal"
                variant="solid"
                w="100%"
                type="submit"
              >
                Registrar Usuario
              </Button>
              <br />
              <br />
            </form>
          </VStack>

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
              bg="blackAlpha.300"
              backdropFilter="blur(10px) hue-rotate(90deg)"
            />
            <ModalContent>
              <ModalHeader>Atención</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>{error}</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Stack>
    </>
  );
}
