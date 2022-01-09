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
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import fileSize from "filesize";
import React, { useContext, useEffect, useState } from "react";
import {
  FaChevronRight,
  FaLink,
  FaPassport,
  FaSave,
  FaStarOfLife,
  FaUser,
  FaUserSecret,
  FaWallet,
} from "react-icons/fa";
import fileGetter from "../../utils/helpers/fileGetter";
import passwordCreator from "../../utils/helpers/passwordCreator";
import passwordGetter from "../../utils/helpers/passwordGetter";
import { FileContext } from "../../utils/providers/File.provider";
import { UserContext } from "../../utils/providers/User.provider";
import CryptoJs from "crypto-js";

export default function PasswordCard({ isOpen, onClose, file }: any) {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState<any>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFile = async () => {
    const data = await passwordGetter(file.uid);
    setPassword(data);
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent rounded={{ base: "none", md: "xl" }}>
        <ModalHeader>
          <Flex alignItems="center" experimental_spaceX="4">
            <Box color="brand.blue">
              <Image src="assets/password_file.svg" w="6" />
            </Box>
            <Text noOfLines={1}>Password for {file.name}</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />

        <ModalBody>
          <Flex direction="column" experimental_spaceY="4">
            <Flex alignItems="center" experimental_spaceX="2">
              <Box color="gray.500">
                <FaUser />
              </Box>
              <Text noOfLines={1}>
                {password?.username.length > 0
                  ? password?.username
                  : user.address}
              </Text>
            </Flex>
            <Flex alignItems="center" wrap="wrap">
              <InputGroup maxW="300px" mr="4">
                <InputLeftElement>
                  <Box color="gray.500">
                    <FaStarOfLife />
                  </Box>
                </InputLeftElement>
                <Input
                  value={
                    password
                      ? CryptoJs.AES.decrypt(
                          password.hash,
                          user.address
                        ).toString(CryptoJs.enc.Utf8)
                      : user.address
                  }
                  disabled
                  _disabled={{}}
                  type={!showPassword ? "password" : "text"}
                />
              </InputGroup>
              <Checkbox
                defaultChecked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              >
                Show password
              </Checkbox>
            </Flex>
            <Flex alignItems="center" experimental_spaceX="2" color="blue.500">
              <Box>
                {" "}
                <FaLink />
              </Box>
              <Text noOfLines={1}>{file.name}</Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Text>{fileSize(Number(file.size))}</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
