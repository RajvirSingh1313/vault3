/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  UnorderedList,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaArrowRight,
  FaCheck,
  FaImage,
  FaKey,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import ReactTyped from "react-typed";
import getBase64 from "../../utils/helpers/base64";
import { ImageKeyContext } from "../../utils/providers/ImageKey.provider";

export default function NewImageKey({ isOpen, onClose }: any) {
  const { imageKey, setImageKey } = useContext(ImageKeyContext);
  const [step, setStep] = useState(1);
  const [rulesChecked, setRulesChecked] = useState(false);

  const rulesCheckboxRef: React.LegacyRef<HTMLInputElement> | undefined =
    React.createRef();
  const dropZoneRef: React.LegacyRef<HTMLDivElement> | undefined =
    React.createRef();

  const onDrop = useCallback((acceptedFiles) => {
    const imageData = acceptedFiles[0];
    setImageKey({ fileData: imageData, byteData: undefined });
    getBase64(imageData)
      .then((data) => {
        setImageKey({ byteData: data, fileData: imageData });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageSubmit = () => {
    if (imageKey?.byteData && rulesChecked) {
      setStep(2);
      setTimeout(() => {
        setStep(3);
      }, 6000);
    } else if (!imageKey?.byteData) {
      dropZoneRef.current?.focus();
    } else if (!rulesChecked) {
      rulesCheckboxRef.current?.focus();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent rounded={{ base: "none", md: "xl" }}>
        <ModalHeader>
          <Flex alignItems="center" experimental_spaceX="2">
            <Box color="brand.blue">
              <FaKey />
            </Box>
            <Text>Choose your image key</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />
        <ModalBody>
          <Box px={{ lg: "4" }} mb="4">
            <Box
              position="relative"
              zIndex={1}
              w={{ base: "62%", md: "76%" }}
              h="1"
              mx="auto"
              display="flex"
              transform="translateY(20px)"
            >
              <Box
                w="50%"
                h="full"
                bg="brand.blue"
                transitionDuration="400ms"
                opacity={step > 1 ? 1 : 0.5}
              ></Box>
              <Box
                Box
                w="50%"
                h="full"
                bg="brand.blue"
                transitionDuration="400ms"
                opacity={step > 2 ? 1 : 0.5}
              ></Box>
            </Box>

            <Flex
              alignItems="center"
              justify="space-between"
              px={{ md: "10" }}
              position="relative"
              zIndex={2}
            >
              <Flex justify="center" direction="column" alignItems="center">
                <Box bg="white">
                  <Box
                    opacity={step === 1 ? 1 : 0.5}
                    transitionDuration="400ms"
                    bg="brand.blue"
                    w="9"
                    h="9"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    fontWeight="bold"
                    rounded="full"
                    border="4px"
                    borderColor="whiteAlpha.600"
                  >
                    1
                  </Box>
                </Box>
                <Text
                  textAlign="center"
                  mt="2"
                  fontSize="xs"
                  transitionDuration="400ms"
                  opacity={step === 1 ? 1 : 0.5}
                >
                  Select your image key
                </Text>
              </Flex>

              <Flex justify="center" direction="column" alignItems="center">
                <Box bg="white">
                  <Box
                    bg="brand.blue"
                    transitionDuration="400ms"
                    opacity={step === 2 ? 1 : 0.5}
                    w="9"
                    h="9"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    fontWeight="bold"
                    rounded="full"
                    border="4px"
                    borderColor="whiteAlpha.600"
                  >
                    2
                  </Box>
                </Box>
                <Text
                  textAlign="center"
                  mt="2"
                  fontSize="xs"
                  transitionDuration="400ms"
                  opacity={step === 2 ? 1 : 0.5}
                >
                  We get your image key hashed
                </Text>
              </Flex>

              <Flex justify="center" direction="column" alignItems="center">
                <Box bg="white">
                  <Box
                    opacity={step === 3 ? 1 : 0.5}
                    transitionDuration="400ms"
                    bg="brand.blue"
                    w="9"
                    h="9"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    fontWeight="bold"
                    rounded="full"
                    border="4px"
                    borderColor="whiteAlpha.600"
                  >
                    3
                  </Box>
                </Box>
                <Text
                  textAlign="center"
                  mt="2"
                  opacity={step === 3 ? 1 : 0.5}
                  transitionDuration="400ms"
                  fontSize="xs"
                >
                  Unlock your vault
                </Text>
              </Flex>
            </Flex>

            {step === 1 && (
              <>
                <Box px={{ md: "10" }}>
                  <input
                    style={{ display: "none" }}
                    {...getInputProps()}
                    type="file"
                    accept="image/*"
                  />
                  <Box
                    ref={dropZoneRef}
                    {...getRootProps()}
                    w="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="gray.500"
                    h="32"
                    bg="gray.100"
                    rounded="xl"
                    cursor="pointer"
                    mt="8"
                    border="dashed 2px"
                    transitionDuration="200ms"
                    _hover={{ borderColor: "brand.blue" }}
                    borderColor={isDragActive ? "brand.blue" : "gray.400"}
                    p="4"
                  >
                    {imageKey?.fileData ? (
                      <Text color="gray.600">{imageKey?.fileData?.name}</Text>
                    ) : (
                      <Text>Drop/Upload your image</Text>
                    )}
                  </Box>
                  <Flex justify="space-between" mt="3" alignItems="start">
                    <Menu>
                      <MenuButton>
                        <Button
                          size="xs"
                          bg="transparent"
                          _active={{}}
                          _hover={{}}
                          _focus={{}}
                          px="0"
                        >
                          Dont have an image or not sure?
                        </Button>
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Generate a random image</MenuItem>
                      </MenuList>
                    </Menu>

                    <Button
                      rounded="lg"
                      px="6"
                      _active={{}}
                      _hover={{}}
                      _focus={{}}
                      color="white"
                      bg="brand.blue"
                      rightIcon={<FaArrowRight size="14px" />}
                      onClick={handleImageSubmit}
                    >
                      Next
                    </Button>
                  </Flex>
                </Box>
                <Divider filter="brightness(80%)" mt="5" />
                <UnorderedList
                  color="blue.500"
                  px={{ md: "10" }}
                  mt="5"
                  fontSize="sm"
                >
                  <ListItem>
                    <Text>
                      The image should be unique. You cant change it afterwards
                    </Text>
                  </ListItem>
                  <ListItem>
                    You should not share it with anyone unless you want someone
                    to access your vault.
                  </ListItem>
                  <ListItem>
                    Use our key transfer protocol to restrict data loss which
                    can cause account loss.
                  </ListItem>

                  <ListItem>
                    We promise we will never save your key on our server.
                  </ListItem>
                  <Checkbox
                    ref={rulesCheckboxRef}
                    color="black"
                    mt="2"
                    size="md"
                    onChange={(e) => setRulesChecked(e.target.checked)}
                  >
                    I&apos;ve read the rules
                  </Checkbox>
                </UnorderedList>
              </>
            )}
            {step === 2 && (
              <Flex
                mt="10"
                alignItems="center"
                justify="center"
                px={{ md: "10" }}
                position="relative"
                direction="column"
                experimental_spaceY="6"
                zIndex={2}
              >
                <Image src="assets/hacking.gif" rounded="xl" alt="hacking" />
                <Flex experimental_spaceX="4" align="center" color="brand.blue">
                  <Spinner w="18px" h="18px" />
                  <Text fontWeight="semibold" fontSize="lg">
                    Hashing your image{" "}
                    <ReactTyped
                      strings={["..."]}
                      loop
                      showCursor={false}
                      typeSpeed={200}
                      backSpeed={80}
                    />
                  </Text>
                </Flex>
              </Flex>
            )}
            {step === 3 && (
              <Flex
                mt="10"
                alignItems="center"
                justify="center"
                px={{ md: "10" }}
                position="relative"
                direction="column"
                experimental_spaceY="6"
                zIndex={2}
              >
                <Flex alignItems="start" experimental_spaceX="3">
                  <Box color="brand.blue" mt="1">
                    <FaCheck />
                  </Box>
                  <Text>
                    You&apos;ve successfully created an image key for your vault
                  </Text>
                </Flex>
                <Flex
                  maxW="lg"
                  mx="auto"
                  fontSize={{ lg: "lg" }}
                  justify="space-between"
                >
                  <input
                    style={{ display: "none" }}
                    {...getInputProps()}
                    type="file"
                    accept="image/*"
                  />
                  <Flex
                    {...getRootProps()}
                    border="dashed 2px"
                    borderRight="0px"
                    transitionDuration="200ms"
                    _hover={{ borderColor: "brand.blue" }}
                    _focus={{ borderColor: "brand.blue" }}
                    ref={dropZoneRef}
                    outline="none"
                    borderColor={isDragActive ? "brand.blue" : "blackAlpha.300"}
                    bg="blackAlpha.100"
                    py={{ base: "3", lg: "4" }}
                    px={{ base: "5", lg: "6" }}
                    pr={{ base: "2", md: "6" }}
                    alignItems="center"
                    roundedLeft="2xl"
                    cursor="pointer"
                    experimental_spaceX="4"
                    w="full"
                  >
                    <Box color="brand.blue">
                      <FaImage size="34px" />
                    </Box>
                    {imageKey ? (
                      <Text
                        noOfLines={1}
                        wordBreak="break-all"
                        color="blackAlpha.800"
                      >
                        {imageKey?.fileData?.name}
                      </Text>
                    ) : (
                      <Text
                        noOfLines={1}
                        wordBreak="break-all"
                        color="blackAlpha.500"
                      >
                        Drop your image key
                      </Text>
                    )}
                  </Flex>

                  <Flex
                    bg="linear-gradient(289.29deg, #00E3D6 -76.18%, #3788FF 116.82%)"
                    cursor="pointer"
                    transitionDuration="200ms"
                    _hover={{ filter: "brightness(95%)" }}
                    px={{ base: "6", lg: "7" }}
                    experimental_spaceX="2"
                    alignItems="center"
                    color="white"
                    fontWeight="bold"
                    roundedRight="2xl"
                  >
                    {imageKey?.byteData ? <FaUnlock /> : <FaLock />}
                    <Text>Unlock</Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
