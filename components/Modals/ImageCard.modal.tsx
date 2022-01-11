/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useWeb3 } from "@3rdweb/hooks";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
} from "@chakra-ui/react";
import fileSize from "filesize";
import React, { useEffect, useState } from "react";

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
