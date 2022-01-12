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
} from "@chakra-ui/react";
import fileSize from "filesize";
import React, { useContext, useEffect, useState } from "react";
import imageToBase64 from "image-to-base64";
import b64toBlob from "../../utils/helpers/blobUrl";
import { saveAs } from "file-saver";
import getRandomImage from "../../utils/helpers/getRandomImage";
import { UserContext } from "../../utils/providers/User.provider";
import { FaDownload, FaRedo } from "react-icons/fa";
import { ImageKeyContext } from "../../utils/providers/ImageKey.provider";
import getBase64, { getBase64FromUrl } from "../../utils/helpers/base64";

export default function RandomImageCard({ isOpen, onClose }: any) {
  const [url, setUrl] = useState<any>(undefined);
  const [image, setImage] = useState<any>(undefined);
  const { user } = useContext(UserContext);
  const { setImageKey } = useContext(ImageKeyContext);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const getImage = async () => {
    setLoading(true);
    const data = await getRandomImage();
    setImage(data.data);
    setUrl(data.data.images.original.url);
  };

  useEffect(() => {
    getImage();
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
          {url ? (
            <Image
              mx="auto"
              src={url}
              rounded="xl"
              my="1"
              alt="image"
              onLoad={() => {
                setLoading(false);
              }}
            />
          ) : (
            <Skeleton w="full" h="400px" rounded="xl" />
          )}
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
                onClick={getImage}
                _active={{}}
                _hover={{}}
                _focus={{}}
                disabled={loading}
                bg="whiteAlpha.200"
              >
                Reroll
              </Button>
              <Button
                bg="brand.blue"
                color="white"
                _active={{}}
                _hover={{}}
                _focus={{}}
                disabled={saving}
                leftIcon={
                  saving ? <Spinner w="16px" h="16px" /> : <FaDownload />
                }
                onClick={async () => {
                  if (image) {
                    setSaving(true);
                    const byteData = await getBase64FromUrl(url);
                    setImageKey({
                      byteData: byteData,
                      fileData: {
                        type: image.type,
                        name: user.address + "." + image.type,
                        size: image.images.original.size,
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
