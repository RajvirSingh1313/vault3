/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Image, Text, Box, Grid, Divider } from "@chakra-ui/react";
import config from "../../utils/helpers/config";
import Link from "next/link";
import { TwitterShareButton } from "react-twitter-embed";

export default function Footer() {
  return (
    <Box
      zIndex={999}
      bottom="0"
      left="0"
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      transitionDuration="300ms"
      bg="linear-gradient(292.63deg, #00254A -20.23%, #000012 88.04%)"
      justifyContent="center"
    >
      <Divider filter="brightness(30%)" />
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        px={{ md: "10", lg: "10" }}
        direction={{ base: "column", md: "row" }}
        py="16"
        maxW="5xl"
      >
        <Link href="/" passHref>
          <Flex alignItems="center" experimental_spaceX="6" cursor="pointer">
            <Image
              src="assets/vault3_logo.svg"
              alt="vault3"
              w={{ base: "14", lg: "16" }}
              h={{ base: "14", lg: "16" }}
            />
            <Flex
              fontSize={{ base: "4xl", lg: "6xl" }}
              color="white"
              alignItems="center"
            >
              <Text fontFamily="heading" fontWeight="extrabold">
                vault{" "}
              </Text>
              <Text ml="0.5" fontFamily="body" fontWeight="medium" mb="1">
                3
              </Text>
            </Flex>
          </Flex>
        </Link>
        <Grid
          mt={{ base: "10", md: "0" }}
          templateColumns={{
            base: "repeat(3,1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ md: "10", lg: "20" }}
          textAlign="center"
          fontSize="base"
        >
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <a
              href={`https://mumbai.polygonscan.com/address/${config.userVault.address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Text color="white">Contract</Text>
            </a>

            <TwitterShareButton
              url={"https://vault3.vercel.app"}
              options={{
                text: "Vault3 | Your Safest Decentralized Vault\n#vault3\n",
              }}
            />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <a
              href="mailto:123saptarshi.basu@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <Text color="white">Support</Text>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Text color="white">Product</Text>
            </a>
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <Link href="/#steps" passHref>
              <Text color="white" cursor="pointer">
                How to use
              </Text>
            </Link>
            <a href="#" target="_blank" rel="no noreferrer">
              <Text color="white">Team</Text>
            </a>
          </Grid>
        </Grid>
      </Flex>
    </Box>
  );
}
