import type { NextPage } from "next";
import {
  Box,
  Text,
  Flex,
  Image,
  AspectRatio,
  Link,
  Input,
} from "@chakra-ui/react";
import { FaImage, FaLock, FaUnlock } from "react-icons/fa";
import Typed from "react-typed";
import Navigation from "../components/Navigation/Navigation.component";
import Art from "../assets/art.png";
import UIBlur1 from "../assets/ui_blur_1.png";
import UIBlur2 from "../assets/ui_blur_2.png";
import PageWrapper from "../components/Wrappers/PageWrapper.wrapper";
import Dropzone, { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import getBase64 from "../utils/helpers/base64";

const Home: NextPage = () => {
  const [imageKey, setImageKey] = useState<any>(undefined);

  const onDrop = useCallback((acceptedFiles) => {
    const imageData = acceptedFiles[0];
    setImageKey({ fileData: imageData });
    getBase64(imageData)
      .then((data) => {
        setImageKey({ byteData: data, fileData: imageData });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Image
        src="assets/ui_blur_1.png"
        position="absolute"
        opacity={{ base: 0.3, md: 0.6, lg: 0.8 }}
        top="0"
        right="0"
        zIndex={2}
      />
      <Image
        src="assets/ui_blur_2.png"
        position="absolute"
        opacity={0.7}
        top="20"
        left="0"
        zIndex={2}
      />

      <Box position="relative" zIndex={3}>
        <Navigation />
        <Box padding={{ base: "20px", md: "30px" }} />
        <Box
          mb="20"
          px="6"
          mx="auto"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Box
            fontSize={{ base: "6xl", md: "6xl", lg: "7xl", xl: "8xl" }}
            mt="10"
            textAlign="center"
            fontWeight="black"
            display="flex"
            justifyContent="center"
            experimental_spaceX={{ md: "7" }}
            experimental_spaceY={{ base: "-7", md: "0" }}
            flexDir={{ base: "column", md: "row" }}
          >
            <Text
              style={{
                background:
                  "-webkit-linear-gradient(169.29deg, #00E3D6 -36.18%, #3788FF 116.82%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vault
            </Text>
            <Text minH="92px">
              <Typed
                showCursor={false}
                strings={["you", "everyone", "we"]}
                loop
                smartBackspace={true}
                backDelay={2000}
                typeSpeed={90}
                backSpeed={80}
              />
            </Text>
            <Text>trust</Text>
          </Box>
          <Text
            px="4"
            color="blackAlpha.700"
            mt={{ base: "3", md: "1", lg: "1" }}
            mb={{ base: "10", md: "8", lg: "10" }}
            fontSize={{ md: "xl", lg: "2xl" }}
            textAlign="center"
          >
            Secure your passwords, files, pizzas and much more just in a
            ka-chow!
          </Text>

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

          <Box mt="2">
            <Text display="inline" color="blackAlpha.500">
              Not sure how it works?
            </Text>{" "}
            <Link color="blackAlpha.600">Get started</Link>
          </Box>
          <AspectRatio ratio={16 / 9} w="full" maxW="800px" mt="10">
            <Image src="assets/art.png" rounded="xl" />
          </AspectRatio>
        </Box>
      </Box>
    </>
  );
};

export default Home;
