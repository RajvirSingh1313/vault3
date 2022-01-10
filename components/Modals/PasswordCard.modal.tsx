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
  InputRightElement,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import fileSize from "filesize";
import React, { useContext, useEffect, useState } from "react";
import {
  FaCheck,
  FaChevronRight,
  FaCopy,
  FaLink,
  FaPassport,
  FaRegCopy,
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
import { Copy } from "react-feather";

export default function PasswordCard({ isOpen, onClose, file }: any) {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState<any>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { hasCopied, onCopy } = useClipboard(
    password
      ? CryptoJs.AES.decrypt(password?.hash, user.address).toString(
          CryptoJs.enc.Utf8
        )
      : ""
  );

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
              <Image src="assets/password_file.svg" w="6" alt="password_file" />
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
              <Text
                noOfLines={1}
                transitionDuration="400ms"
                filter={password?.username.length > 0 ? "" : "blur(5px)"}
              >
                {password?.username.length > 0
                  ? password?.username
                  : "Anonymous"}
              </Text>
            </Flex>
            <Flex alignItems="center" wrap="wrap">
              <InputGroup
                maxW="300px"
                mr="4"
                filter={password ? "" : "blur(2px)"}
                transitionDuration="400ms"
              >
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
                      : "Anonymous"
                  }
                  disabled
                  _disabled={{}}
                  type={!showPassword ? "password" : "text"}
                />
                <InputRightElement>
                  <Tooltip label="Copy to clipboard">
                    <Box color="gray.500" cursor="pointer" onClick={onCopy}>
                      {hasCopied ? <FaCheck /> : <FaRegCopy />}
                    </Box>
                  </Tooltip>
                </InputRightElement>
              </InputGroup>
              <Checkbox
                ml="1"
                mt="1"
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
