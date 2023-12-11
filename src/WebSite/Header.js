import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { MdNightlight } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiChevronDownCircle, BiChevronRightCircle } from "react-icons/bi";
import logoEasySOS from "./../Assets/Logo EasySOS web2.png";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Box zIndex={1} w="100%" position="fixed">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <AiFillCloseCircle w={3} h={3} />
              ) : (
                <GiHamburgerMenu w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          align="center"
          justify={{ base: "center", md: "start" }}
        >
          <Link
            _hover={{
              textDecoration: "none",
            }}
            href="/"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "40px", sm: "60px" }}
              maxH={{ base: "40px", sm: "60px" }}
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              alt="Logo EasySOS"
              src={logoEasySOS}
            />
          </Link>

          <Box p="2">
            <Link
              fontSize={"sm"}
              direction={"row"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              href="/"
              display="flex"
              alignItems="center"
            >
              <Text fontWeight={"bold"} size="md" mb="1px">
                EasySOS
              </Text>
            </Link>
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={20} pt={2}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0.5 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          align={"center"}
        >
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            colorScheme="teal"
            variant="solid"
          >
            <Link
              _hover={{
                textDecoration: "none",
              }}
              href="/form"
            >
              Contáctame
            </Link>
          </Button>

          <Button as={"a"} size="sm" variant="ghost" onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <MdNightlight size={"sm"} />
            ) : (
              <FaSun size={"sm"} />
            )}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
      {NAV_ITEMS.map((nav) => (
        <Box key={nav.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={nav.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {nav.label}
              </Link>
            </PopoverTrigger>

            {nav.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {nav.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = (props) => {
  const { label, href, subLabel } = props;
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("teal.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "teal.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"teal.400"} w={5} h={5} as={BiChevronRightCircle} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((nav) => (
        <MobileNavItem key={nav.label} {...nav} />
      ))}
    </Stack>
  );
};

const MobileNavItem = (props) => {
  const { label, href, children } = props;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={BiChevronDownCircle}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  /*
  {
    label: "Preguntas Frecuentes",
    children: [
      {
        label: "Explore Design Work",
        // subLabel: "Trending Design to inspire you",
        href: "#",
      },
    ],
  },
  */

  {
    label: "Preguntas Frecuentes",
    href: "#",
  },

  {
    label: "Blog",
    href: "#",
  },
];
