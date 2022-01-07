import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import { useWeb3 } from "@3rdweb/hooks";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/providers/User.provider";

export default function Navigation() {
  const { connectWallet, disconnectWallet } = useWeb3();

  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topOfPage, setTopOfPage] = useState(true);

  useEffect(() => {
    if (user.address && isOpen) {
      onClose();
    }
  }, [user.address]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        setTopOfPage(false);
      } else {
        setTopOfPage(true);
      }
    });
  }, []);

  return (
    <Box
      position="fixed"
      zIndex={999}
      top="0"
      left="0"
      w="full"
      display="flex"
      transitionDuration="300ms"
      bg={topOfPage ? "transparent" : "rgba(255, 255, 255, 0.73);"}
      backdropFilter={!topOfPage ? "blur(7px)" : ""}
      borderBottom={!topOfPage ? "1px" : "1px"}
      borderColor={!topOfPage ? "gray.200" : "transparent"}
      justifyContent="center"
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center" experimental_spaceX="2">
              <Box color="brand.blue">
                <FaWallet />
              </Box>
              <Text>Connect your wallet</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton _focus={{}} />
          <ModalBody>
            <Flex direction="column" experimental_spaceY="3">
              <Button
                bg="transparent"
                _hover={{ transform: "translatey(-4px)" }}
                _active={{}}
                _focus={{}}
                onClick={() => connectWallet("injected")}
                leftIcon={<Image src="assets/metamask.webp" w="6" h="6" />}
              >
                MetaMask
              </Button>
              <Button
                bg="transparent"
                _hover={{ transform: "translatey(-4px)" }}
                _active={{}}
                _focus={{}}
                leftIcon={<Image src="assets/coinbase.png" w="6" h="6" />}
                onClick={() => connectWallet("walletlink")}
              >
                Coinbase Wallet
              </Button>
              <Button
                bg="transparent"
                _hover={{ transform: "translatey(-4px)" }}
                _active={{}}
                _focus={{}}
                leftIcon={<Image src="assets/walletconnect.svg" w="6" h="6" />}
                onClick={() => connectWallet("walletconnect")}
              >
                WalletConnect
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Image src="assets/polygontext.svg" w="20" h="6" />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        p="3.5"
        maxW="6xl"
      >
        <Flex alignItems="center" experimental_spaceX="3">
          <Image src="assets/vault3_logo.svg" alt="vault3" w="9" h="9" />
          <Flex fontSize="2xl" color="blackAlpha.900" alignItems="center">
            <Text fontFamily="heading" fontWeight="extrabold">
              vault{" "}
            </Text>
            <Text ml="0.5" fontFamily="body" fontWeight="medium" mb="1">
              3
            </Text>
          </Flex>
        </Flex>
        {!user.address ? (
          <Button
            onClick={onOpen}
            bg="brand.blue"
            color="white"
            fontWeight="semibold"
            rounded="lg"
            leftIcon={<FaWallet />}
            _hover={{}}
            _focus={{}}
            _active={{}}
          >
            Connect Wallet
          </Button>
        ) : (
          <Menu>
            <MenuButton>
              <Flex
                bg="whiteAlpha.600"
                p="2"
                rounded="full"
                experimental_spaceX="2"
                border="1px"
                borderColor={
                  user.chainId === 137 ? "blackAlpha.300" : "red.500"
                }
              >
                {user.chainId === 137 ? (
                  <Image src="assets/matic.png" w="6" h="6" />
                ) : (
                  <Image src="assets/eth.png" w="6" h="6" />
                )}
                <Text maxW="100px" isTruncated={true} fontWeight="medium">
                  {user.address}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              {user.address && (
                <MenuItem onClick={disconnectWallet} icon={<FaSignOutAlt />}>
                  Sign out
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
}
