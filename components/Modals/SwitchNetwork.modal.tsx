import { useSwitchNetwork } from "@3rdweb/hooks";
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
import { FaExchangeAlt, FaInfoCircle, FaWallet } from "react-icons/fa";

export default function SwitchNetwork({ onResolve }: any) {
  const { switchNetwork } = useSwitchNetwork();
  return (
    <Modal isOpen={true} onClose={() => {}}>
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
          <Flex
            direction="column"
            experimental_spaceY="4"
            p="4"
            border="dashed 2px"
            rounded="xl"
            borderColor="blackAlpha.400"
          >
            <Flex justify="center" alignItems="start" experimental_spaceX="2">
              <Box mt="1">
                <FaInfoCircle />
              </Box>
              <Text textAlign="center" fontSize="base">
                You are not currently linked to polygon network.
              </Text>
            </Flex>
            <Button
              leftIcon={<FaExchangeAlt />}
              size="lg"
              color="white"
              _hover={{}}
              _focus={{}}
              _active={{}}
              onClick={async () => {
                await switchNetwork(137);
              }}
              fontWeight="bold"
              bg="linear-gradient(289.29deg, #00E3D6 -76.18%, #3788FF 116.82%)"
            >
              Switch to Polygon
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
