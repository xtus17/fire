import React, { useState } from "react";
//import { useAutenticado } from "../../context/authContext";
//import {useAutenticado} from "./../../context/authContext"
import { useAutenticado } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Image,
  Flex,
  Link,
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
} from "@chakra-ui/react";
import logoEasySOS from "../../../Assets/Logo EasySOS web2.png";
import { FcGoogle } from "react-icons/fc";
import { RiAccountCircleFill } from "react-icons/ri";

export function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginGoogle, resetPassword } = useAutenticado();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.email) return setError("Por favor ingresa un correo");
    try {
      await resetPassword(user.email);
      setError("Por favor revisa tu correo, se envío un enlace");
      onOpen();
    } catch (error) {
      setError("Correo no registrado");
      onOpen();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/cpaneleasysosappsecurity/home");
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
      onOpen();
    }
  };

  const handleGoogle = async () => {
    try {
      await loginGoogle();
      navigate("/cpaneleasysosappsecurity/home");
    } catch (error) {
      setError("Algo no esta funcionando como esperábamos.");
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
                alt="Logo EasySOS"
                objectFit="cover"
                maxW={{ base: "40px", sm: "60px" }}
                maxH={{ base: "40px", sm: "60px" }}
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

              <FormControl mb={3} isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Tu contraseña"
                  minLength={6}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>

              <br />
              <Button
                fontWeight={"bold"}
                colorScheme="teal"
                variant="solid"
                w="full"
                type="submit"
              >
                Iniciar sesión
              </Button>

              <br />
              <br />

              <Button w="full" onClick={handleResetPassword}>
                <Link _hover={{ textDecoration: "none" }}>
                  Recuperar Contraseña
                </Link>
              </Button>

              <br />
              <br />

              <Button
                colorScheme="teal"
                variant="solid"
                leftIcon={<FcGoogle />}
                w="full"
                onClick={handleGoogle}
              >
                Acceder con Google
              </Button>

              <br />
              <br />

              <Button
                colorScheme="teal"
                leftIcon={<RiAccountCircleFill />}
                variant="solid"
                w="full"
              >
                <Link
                  isExternal
                  href="/cpaneleasysosappsecurity/register"
                  _hover={{ textDecoration: "none" }}
                >
                  Regístrate
                </Link>
              </Button>
            </form>

            {/*
            <Flex direction="column" align="center">
              <Text>{error}</Text>
              <IconButton
                icon="close"
                aria-label="Cerrar"
                onClick={onClose}
                position="absolute"
                top="1rem"
                right="1rem"
              />
            </Flex>
  */}
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
