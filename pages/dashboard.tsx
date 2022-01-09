/* eslint-disable react-hooks/exhaustive-deps */
import { ConnectorOptions, useWeb3 } from "@3rdweb/hooks";
import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Plus } from "react-feather";
import { FaDatabase, FaPlus, FaSearch } from "react-icons/fa";
import NewFile from "../components/Cards/NewFile.component";
import NewPassword from "../components/Modals/NewPassword.modal";
import Navigation from "../components/Navigation/Navigation.component";
import { AccessStatus } from "../types/accessStatus.enum";
import keyGetter from "../utils/helpers/keyGetter";
import File from "../components/Cards/FileCard.component";
import fileGetter from "../utils/helpers/fileGetter";
import { FileContext } from "../utils/providers/File.provider";

const Dashboard: NextPage = () => {
  const { address, connectWallet } = useWeb3();
  const { files, setFiles } = useContext<any>(FileContext);
  const [loading, setLoading] = useState(true);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  const isAuthenticated = async () => {
    console.log(address);
    const keyData = await keyGetter(
      JSON.parse(String(sessionStorage.getItem("imageKey"))),
      String(address)
    );
    console.log(keyData);
    if (keyData?.accessStatus !== AccessStatus.KEY_MATCHED) {
      window.location.href = "/";
    } else {
      setLoading(false);
      const data = await fileGetter();
      setFiles(data);
    }
  };

  useEffect(() => {
    if (loading) {
      if (address) {
        isAuthenticated();
      } else {
        if (localStorage.getItem("method")) {
          let method: keyof ConnectorOptions | any = String(
            localStorage.getItem("method")
          );
          connectWallet(method);
        } else {
          window.location.href = "/";
        }
      }
    }
  }, [address]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <NewPassword
            isOpen={showNewPasswordModal}
            onClose={() => {
              setShowNewPasswordModal(false);
            }}
          />
          <Box position="relative" zIndex={3}>
            <Box bg="gray.200">
              <Navigation />

              <Box padding={{ base: "20px", md: "30px" }} />
              <Box display="flex" justifyContent="center" mt="8">
                <Flex
                  justify="space-between"
                  w="full"
                  align="end"
                  px={{ base: "4", md: "6", lg: "4" }}
                  maxW="5xl"
                >
                  <Flex align="center">
                    <Text fontSize="lg" color="gray.500" minW="120px">
                      Recent files
                    </Text>

                    <InputGroup>
                      <InputLeftElement color="gray.500">
                        <FaSearch />
                      </InputLeftElement>
                      <Input
                        minW={{ md: "300px", lg: "400px" }}
                        placeholder="Search"
                        bg="white"
                        rounded="xl"
                        roundedBottom="none"
                        border="none"
                        type="search"
                      />
                    </InputGroup>
                  </Flex>
                  <Flex
                    display={{ base: "none", md: "flex" }}
                    align="center"
                    experimental_spaceX="6"
                    color="gray.500"
                  >
                    <Text
                      pb="3"
                      _focus={{ borderBottom: "2px" }}
                      borderBottom="2px"
                      borderColor="brand.blue"
                      color="brand.blue"
                      fontWeight="semibold"
                    >
                      Images
                    </Text>
                    <Text pb="3">Passwords</Text>
                    <Text pb="3">Files</Text>
                    <Box pb="3" color="brand.blue">
                      <FaDatabase />
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
            <Box
              maxW="5xl"
              mb="20"
              px={{ base: "4", md: "6", lg: "4" }}
              mx="auto"
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              <Flex mt="6" wrap="wrap" w="full">
                <Box
                  mr={{ md: "4" }}
                  mb="4"
                  w={{ base: "full", md: "auto" }}
                  onClick={() => {
                    setShowNewPasswordModal(true);
                  }}
                >
                  <NewFile
                    accentColor="rgba(49, 152, 254, 0.2)"
                    accentColorMain="brand.blue"
                    imageIcon="assets/password_file.svg"
                    title="New password"
                    subTitle="Password and access keys"
                  />
                </Box>
                <Box mr={{ md: "4" }} mb="4" w={{ base: "full", md: "auto" }}>
                  <NewFile
                    accentColor="rgba(169, 84, 255, 0.2)"
                    accentColorMain="#A954FF"
                    imageIcon="assets/image_file.svg"
                    title="New image"
                    subTitle="PNG, JPEG, GIF"
                  />
                </Box>
                <Box mr={{ md: "4" }} mb="4" w={{ base: "full", md: "auto" }}>
                  <NewFile
                    accentColor="rgba(255, 146, 84, 0.2)"
                    accentColorMain="#FF925493"
                    imageIcon="assets/text_file.svg"
                    title="Import file"
                    subTitle="All kind of files/documents"
                  />
                </Box>
              </Flex>
              {files.length === 0 ? (
                <Flex
                  textAlign="center"
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <Image src="assets/vault_art.svg" mt="20" w="32" />
                  <Text mt="4" opacity={0.5} maxW="130px">
                    Create a file to get started
                  </Text>
                </Flex>
              ) : (
                <Flex w="full" mt="2" wrap="wrap">
                  {files.map((data: any, key: any) => (
                    <Box key={key} mr="4" mb="4">
                      <File file={data} />
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
