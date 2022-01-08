/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useWeb3 } from "@3rdweb/hooks";
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
  Badge,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { FaChevronRight, FaWallet } from "react-icons/fa";
import { UserContext } from "../../utils/providers/User.provider";

export default function WalletConnect({ isOpen, onClose }: any) {
  const { connectWallet } = useWeb3();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user?.address?.length > 0 && isOpen) {
      onClose();
    }
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded={{ base: "none", md: "xl" }}>
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
          <Flex direction="column" experimental_spaceY="12" mt="4">
            <Button
              bg="transparent"
              role="group"
              _hover={{}}
              _active={{}}
              _focus={{}}
              onClick={() => {
                connectWallet("injected");
                localStorage.setItem("method", "injected");
              }}
              leftIcon={
                <Image
                  src="assets/metamask.webp"
                  w="12"
                  h="12"
                  mr="4"
                  alt="metamask-logo"
                />
              }
              rightIcon={
                <Box
                  color="gray.600"
                  ml="4"
                  _groupHover={{ transform: "translateX(4px)" }}
                  transitionDuration="200ms"
                >
                  <FaChevronRight />
                </Box>
              }
            >
              <Flex direction="column" experimental_spaceY="2">
                <Text>MetaMask</Text>
                <Badge rounded="full" py="1" colorScheme="pink">
                  Popular
                </Badge>
              </Flex>
            </Button>
            <Button
              bg="transparent"
              _hover={{}}
              _active={{}}
              _focus={{}}
              leftIcon={
                <Image
                  src="assets/coinbase.png"
                  w="12"
                  h="12"
                  mr="4"
                  alt="coinbase-logo"
                />
              }
              rightIcon={
                <Box color="gray.600" ml="4">
                  <FaChevronRight />
                </Box>
              }
              opacity={0.7}
            >
              <Flex direction="column" experimental_spaceY="2">
                <Text>Coinbase Wallet</Text>
                <Badge rounded="full" py="1" colorScheme="yellow">
                  Coming soon
                </Badge>
              </Flex>
            </Button>
            <Button
              bg="transparent"
              _hover={{}}
              _active={{}}
              _focus={{}}
              leftIcon={
                <Image
                  src="assets/walletconnect.svg"
                  w="12"
                  mr="4"
                  h="12"
                  alt="walletconnect-logo"
                />
              }
              rightIcon={
                <Box color="gray.600" ml="4">
                  <FaChevronRight />
                </Box>
              }
              opacity={0.7}
            >
              <Flex direction="column" experimental_spaceY="2">
                <Text>WalletConnect</Text>
                <Badge rounded="full" py="1" colorScheme="yellow">
                  Coming soon
                </Badge>
              </Flex>
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Image src="assets/polygontext.svg" w="20" h="6" alt="polygon-logo" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
