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
  Flex,
  Button,
  Skeleton,
  Spinner,
  Box,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import b64toBlob from "../../utils/helpers/blobUrl";
import { saveAs } from "file-saver";
import { UserContext } from "../../utils/providers/User.provider";
import { FaDownload, FaRedo } from "react-icons/fa";
import { ImageKeyContext } from "../../utils/providers/ImageKey.provider";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export default function TakeImage({ isOpen, onClose }: any) {
  const [url, setUrl] = useState<any>(undefined);
  const [image, setImage] = useState<any>(undefined);
  const { user } = useContext(UserContext);
  const { setImageKey } = useContext(ImageKeyContext);
  const [loading, setLoading] = useState(false);
  const [dataUri, setDataUri] = useState<any>(undefined);
  const [saving, setSaving] = useState(false);

  const getBlob = async () => {
    const url = await b64toBlob(image);
    setUrl(url);
  };

  useEffect(() => {
    if (image) {
      getBlob();
    }
  }, [image]);

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
          <Box rounded="xl" overflow="hidden" h="fit-content" w="fit-content">
            {dataUri ? (
              <Image src={dataUri} />
            ) : (
              <Camera
                onTakePhotoAnimationDone={(e) => {
                  setDataUri(e);
                  setImage(e);
                }}
              />
            )}
          </Box>
          {url && (
            <Flex
              align="center"
              mt="3"
              fontSize="sm"
              justify="space-between"
              experimental_spaceX="2"
            >
              <Button
                color="white"
                leftIcon={loading ? <Spinner w="16px" h="16px" /> : <FaRedo />}
                _active={{}}
                _hover={{}}
                _focus={{}}
                disabled={loading}
                onClick={() => {
                  setImage(undefined);
                  setDataUri(undefined);
                  setUrl(undefined);
                }}
                bg="whiteAlpha.200"
              >
                Retake
              </Button>
              <Button
                bg="brand.blue"
                color="white"
                _active={{}}
                _hover={{}}
                _focus={{}}
                leftIcon={
                  saving ? <Spinner w="16px" h="16px" /> : <FaDownload />
                }
                onClick={async () => {
                  if (image) {
                    setSaving(true);
                    setImageKey({
                      byteData: dataUri,
                      fileData: {
                        type: "png",
                        name: user.address + "." + "png",
                        size: new Blob([dataUri]).size,
                      },
                    });
                    await saveAs(url, user.address);
                    setSaving(false);
                    onClose();
                  }
                }}
              >
                Download & Continue
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
