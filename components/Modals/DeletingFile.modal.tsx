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
  Code,
  Spinner,
} from "@chakra-ui/react";
import { FaExchangeAlt, FaInfoCircle, FaWallet } from "react-icons/fa";
import config from "../../utils/helpers/config";

export default function DeletingFile() {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent rounded={{ base: "none", md: "xl" }}>
        <ModalHeader>
          <Flex alignItems="center" experimental_spaceX="2">
            <Text>Deleting file</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />
        <ModalBody mb="4">
          <Flex
            direction="column"
            experimental_spaceY="4"
            p="4"
            border="dashed 2px"
            rounded="xl"
            borderColor="blackAlpha.400"
          >
            <Flex justify="center" alignItems="center" experimental_spaceX="4">
              <Box mt="1">
                <Spinner w="4" h="4" />
              </Box>
              <Text textAlign="center" fontSize="base">
                Deleting file, please wait ...
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
