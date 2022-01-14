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
  background,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import getBase64 from "../../utils/helpers/base64";
import fileGetter from "../../utils/helpers/fileGetter";
import passwordCreator from "../../utils/helpers/passwordCreator";
import { FileContext } from "../../utils/providers/File.provider";
import { UserContext } from "../../utils/providers/User.provider";
import imageCreator from "../../utils/helpers/imageCreator";
import config from "../../utils/helpers/config";
import b64toBlob from "../../utils/helpers/blobUrl";
import documentCreator from "../../utils/helpers/documentCreator";

export default function NewDocument({ isOpen, onClose }: any) {
  const { user } = useContext(UserContext);
  const { setFiles } = useContext<any>(FileContext);
  const [error, setError] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    byteData: "",
    document_type: "",
    size: "",
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    let data: any = {};
    if (acceptedFiles[0].size <= config.maxFileSize) {
      setError(undefined);
      data.byteData = await getBase64(acceptedFiles[0]);
      data.document_type = acceptedFiles[0].type;
      data.size = String(acceptedFiles[0].size);
      data.name = acceptedFiles[0].name;

      setFormData(data);
    } else {
      setError("Maximum upload size is 8 MB");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropZoneRef: React.LegacyRef<HTMLDivElement> | undefined =
    React.createRef();

  const handleFormSubmit = async () => {
    if (formData.byteData.length > 0) {
      setLoading(true);
      await documentCreator(
        formData.name,
        formData.byteData,
        formData.document_type,
        formData.size,
        user.address
      );
      const data = await fileGetter();
      setFiles(data);
      setLoading(false);
      onClose();
    } else {
      dropZoneRef.current?.focus();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!loading) {
          onClose();
        }
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent rounded={{ base: "none", md: "xl" }}>
        <ModalHeader>
          <Flex alignItems="center" experimental_spaceX="4">
            <Box color="brand.blue">
              <Image src="assets/document_file.svg" w="6" alt="image_file" />
            </Box>
            <Text>Upload new file</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <ModalBody>
            <Box>
              <Text fontSize="xs" mx="2" mb="1">
                Name
              </Text>
              <InputGroup>
                <InputLeftElement>
                  <Box color="gray.500">
                    <FaLink />
                  </Box>
                </InputLeftElement>
                <Input
                  cursor="pointer"
                  onClick={() => {
                    dropZoneRef.current?.click();
                  }}
                  _disabled={{}}
                  value={formData.name}
                  bg="gray.100"
                  rounded="lg"
                  placeholder="Enter file name"
                />
              </InputGroup>
            </Box>
            <Box>
              <input
                style={{ display: "none" }}
                {...getInputProps()}
                type="file"
                accept="application/*"
              />
              <Box
                {...getRootProps()}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                background="gray.100"
                ref={dropZoneRef}
                w="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="gray.500"
                h="60"
                rounded="xl"
                cursor="pointer"
                mt="4"
                border="dashed 2px"
                transitionDuration="200ms"
                _hover={{ borderColor: "brand.blue" }}
                _focus={{ borderColor: "brand.blue" }}
                borderColor={
                  isDragActive
                    ? "brand.blue"
                    : error
                    ? "red.500"
                    : "blackAlpha.300"
                }
                p="4"
              >
                {formData.byteData.length > 0 ? (
                  <Text isTruncated wordBreak="break-all">
                    {formData.name}
                  </Text>
                ) : (
                  <Text>Drop/Upload your file</Text>
                )}
              </Box>
              {error && (
                <Text fontSize="sm" mx="1" color="red.400" mt="2">
                  {error}
                </Text>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                if (!loading) {
                  onClose();
                }
              }}
              _hover={{}}
              _focus={{}}
              _active={{}}
              bg="gray.200"
              color="gray.600"
              rounded="lg"
              mr="2"
            >
              Cancel
            </Button>
            <Button
              leftIcon={loading ? <Spinner w="16px" h="16px" /> : <FaSave />}
              _hover={{}}
              _focus={{}}
              _active={{}}
              disabled={loading}
              bg="brand.blue"
              color="white"
              rounded="lg"
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
