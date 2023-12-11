import { Container, chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export function Frame() {
  return (
    <Container
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ChakraBox
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 3,
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
    </Container>
  );
}
