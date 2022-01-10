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
  Link,
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
import b64toBlob from "../../utils/helpers/blobUrl";

export default function ImageCard({ isOpen, onClose, image }: any) {
  const [url, setUrl] = useState<any>(undefined);
  const getBlob = async () => {
    const url = await b64toBlob(image);
    setUrl(url);
  };
  useEffect(() => {
    getBlob();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        rounded={{ base: "none", md: "xl" }}
        bg="transparent"
        shadow="n"
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton
          color="white"
          _hover={{ bg: "whiteAlpha.400" }}
          _focus={{}}
        />

        <ModalBody>
          <Image mx="auto" src={image} rounded="xl" my="1" alt="image" />
          {url && (
            <Link href={url} isExternal color="white" fontSize="sm" mx="2">
              Open original
            </Link>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
