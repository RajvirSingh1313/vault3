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
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
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
              leftIcon={
                <Image
                  src="assets/metamask.webp"
                  w="6"
                  h="6"
                  alt="metamask-logo"
                />
              }
            >
              MetaMask
            </Button>
            <Button
              bg="transparent"
              _hover={{ transform: "translatey(-4px)" }}
              _active={{}}
              _focus={{}}
              leftIcon={
                <Image
                  src="assets/coinbase.png"
                  w="6"
                  h="6"
                  alt="coinbase-logo"
                />
              }
              onClick={() => connectWallet("walletlink")}
            >
              Coinbase Wallet
            </Button>
            <Button
              bg="transparent"
              _hover={{ transform: "translatey(-4px)" }}
              _active={{}}
              _focus={{}}
              leftIcon={
                <Image
                  src="assets/walletconnect.svg"
                  w="6"
                  h="6"
                  alt="walletconnect-logo"
                />
              }
              onClick={() => connectWallet("walletconnect")}
            >
              WalletConnect
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
