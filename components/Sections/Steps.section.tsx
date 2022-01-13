/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Box,
  Text,
  Badge,
  Image,
  Link,
  Button,
  Code,
  Grid,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FaArrowLeft, FaDatabase, FaUser } from "react-icons/fa";
import { StorageContext } from "../../utils/providers/Database.provider";
import { FileContext } from "../../utils/providers/File.provider";
import { UserContext } from "../../utils/providers/User.provider";
import fileSize from "filesize";
import config from "../../utils/helpers/config";

export default function Steps() {
  const Step = ({ step, title, description }: any) => {
    return (
      <Flex
        direction="column"
        bg="whiteAlpha.100"
        cursor="pointer"
        _hover={{ bg: "whiteAlpha.200" }}
        transitionDuration="200ms"
        p="10"
        rounded="xl"
      >
        <Box
          bg="brand.blue"
          border="4px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          rounded="full"
          w="12"
          h="12"
          fontSize="xl"
          fontWeight="bold"
          color="white"
          p="2"
          borderColor="whiteAlpha.500"
        >
          {step}
        </Box>
        <Box mt="2">
          <Text fontWeight="bold" fontSize="2xl" color="white">
            {title}
          </Text>
          <Text mt="1" color="whiteAlpha.600">
            {description}
          </Text>
        </Box>
      </Flex>
    );
  };

  return (
    <Box
      w="full"
      bg="linear-gradient(292.63deg, #00254A -20.23%, #000000 88.04%)"
      mx="auto"
      py="20"
    >
      <Text
        color="white"
        align="center"
        fontWeight="bold"
        fontSize="4xl"
        mb="10"
      >
        How it works
      </Text>
      <Grid
        mt="2"
        px="10"
        maxW="6xl"
        mx="auto"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="10"
        w="full"
      >
        <Step
          title="Create Key"
          step="1"
          description={
            <>
              {" "}
              Choose your image key for your vault, and save it somewhere safe.
              We are using HmacSHA256 algorithm to encrypt your key, in which
              inverse is not possible.
            </>
          }
        />
        <Step
          title="Hashing"
          step="2"
          description={
            <>
              We hash your image key on the blockchain to your address, this
              step is permanent and cannot be reverted, and the image key cannot
              be changed afterwards.
            </>
          }
        />
        <Step
          title="Unlock"
          step="3"
          description={
            <>
              Your image key is created, now you can use your image key to
              access your vault whenever you want.
            </>
          }
        />
      </Grid>
    </Box>
  );
}
