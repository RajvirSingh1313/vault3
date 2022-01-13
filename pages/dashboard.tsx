/* eslint-disable react-hooks/exhaustive-deps */
import { ConnectorOptions, useWeb3 } from "@3rdweb/hooks";
import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  Grid,
  Kbd,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { X } from "react-feather";
import { FaDatabase, FaSearch } from "react-icons/fa";
import NewFile from "../components/Cards/NewFile.component";
import NewPassword from "../components/Modals/NewPassword.modal";
import Navigation from "../components/Navigation/Navigation.component";
import { AccessStatus } from "../types/accessStatus.enum";
import keyGetter from "../utils/helpers/keyGetter";
import File from "../components/Cards/FileCard.component";
import fileGetter from "../utils/helpers/fileGetter";
import { FileContext } from "../utils/providers/File.provider";
import NewImage from "../components/Modals/NewImage.modal";
import { QueriedFilesContext } from "../utils/providers/QueriedFiles.provider";
import { FileType } from "../types/fileTypes";
import { Menu as MenuIcon } from "react-feather";
import NewDocument from "../components/Modals/NewDocument.modal";
import DataStats from "../components/Sections/DataStats.section";
import Head from "next/head";
import { UserContext } from "../utils/providers/User.provider";

const Dashboard: NextPage = () => {
  const { address, connectWallet } = useWeb3();
  const { files, setFiles } = useContext<any>(FileContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [showNewImageModal, setShowNewImageModal] = useState(false);
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);
  const [query, setQuery] = useState("");
  const [typeContext, setTypeContext] = useState<any>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [isFocussing, setIsFocussing] = useState(false);
  const { queriedFiles, setQueriedFiles } = useContext(QueriedFilesContext);

  const isAuthenticated = async () => {
    const keyData = await keyGetter(
      JSON.parse(String(sessionStorage.getItem("imageKey"))),
      String(address)
    );
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

  useEffect(() => {
    setTypeContext(undefined);
    setQuery("");
    setSearchQuery("", files);
  }, [files]);

  const setSearchQuery = (query: string, files: any) => {
    if (query.length < 1) {
      setQueriedFiles([]);
    } else {
      let data: Array<any> = [];
      files.forEach((file: any) => {
        if (
          file.name.toLowerCase().startsWith(query.toLowerCase()) ||
          file.file_type.toLowerCase().startsWith(query.toLowerCase())
        ) {
          data.push(file);
        }
      });
      setQueriedFiles(data);
      return data;
    }
    setIsFocussing(false);
  };

  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Vault | {user.address}</title>
      </Head>
      {loading ? (
        <Flex
          h="100vh"
          w="100vw"
          align="center"
          justify="center"
          experimental_spaceX="3"
          color="brand.blue"
        >
          <Spinner w="16px" h="16px" />
          <Text fontWeight="semibold">Verifying</Text>
        </Flex>
      ) : (
        <>
          {showNewPasswordModal && (
            <NewPassword
              isOpen={showNewPasswordModal}
              onClose={() => {
                setShowNewPasswordModal(false);
              }}
            />
          )}
          {showNewImageModal && (
            <NewImage
              isOpen={showNewImageModal}
              onClose={() => {
                setShowNewImageModal(false);
              }}
            />
          )}
          {showNewDocumentModal && (
            <NewDocument
              isOpen={showNewDocumentModal}
              onClose={() => {
                setShowNewDocumentModal(false);
              }}
            />
          )}
          <Box position="relative" zIndex={3}>
            <Box bg="linear-gradient(90deg, #050F23 10.43%, #030A44 101.47%)">
              <Navigation color="black" />

              <Box padding={{ base: "20px", md: "30px" }} />
              <Box display="flex" justifyContent="center" mt="8">
                <Flex
                  justify="space-between"
                  w="full"
                  align="end"
                  px={{ base: "4", md: "6", lg: "4" }}
                  maxW="5xl"
                >
                  <Flex mt="4" align="center">
                    <Text
                      mb="2"
                      color="whiteAlpha.700"
                      _hover={{ color: "whiteAlpha.900" }}
                      minW="100px"
                      cursor="pointer"
                      mr="1"
                      onClick={() => {
                        setTypeContext(undefined);
                        setQuery("");
                        setSearchQuery("", files);
                      }}
                    >
                      Recent files
                    </Text>
                    <Box
                      position="relative"
                      onFocus={() => {
                        setIsFocussing(true);
                      }}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setQuery(inputValue);
                          if (typeContext) {
                            const data = setSearchQuery(typeContext, files);
                            setSearchQuery(inputValue, data);
                          } else {
                            setSearchQuery(inputValue, files);
                          }
                          setIsFocussing(false);
                        }}
                      >
                        <InputGroup>
                          <InputLeftElement color="gray.500">
                            <FaSearch />
                          </InputLeftElement>
                          <Input
                            onChange={(e) => {
                              setIsFocussing(true);
                              if (
                                e.target.value.length < 1 &&
                                query.length !== 0 &&
                                !typeContext
                              ) {
                                setQuery(e.target.value);
                                setQueriedFiles([]);
                              } else if (
                                e.target.value.length < 1 &&
                                query.length !== 0
                              ) {
                                setQuery(e.target.value);
                                setSearchQuery(typeContext, files);
                              }
                              setInputValue(e.target.value);
                            }}
                            value={inputValue}
                            mr="4"
                            minW={{ base: "30px", md: "300px", lg: "400px" }}
                            placeholder="Search"
                            bg=""
                            color="black"
                            rounded="xl"
                            roundedBottom="none"
                            border="none"
                            type="search"
                          />
                        </InputGroup>
                      </form>
                      {isFocussing && inputValue.length > 0 && (
                        <Box
                          cursor="pointer"
                          onClick={() => {
                            setQuery(inputValue);
                            if (typeContext) {
                              const data = setSearchQuery(typeContext, files);
                              setSearchQuery(inputValue, data);
                            } else {
                              setSearchQuery(inputValue, files);
                            }
                            setIsFocussing(false);
                          }}
                          position="absolute"
                          bottom="-10"
                          rounded="lg"
                          shadow="xl"
                          color="white"
                          bg="gray.500"
                          p="2"
                          px="4"
                          w="full"
                          maxW="300px"
                          display="flex"
                          alignItems="center"
                          experimental_spaceX="2"
                        >
                          <Text
                            fontWeight="semibold"
                            color="whiteAlpha.700"
                            fontSize="xs"
                            noOfLines={1}
                          >
                            SEARCH FOR
                          </Text>
                          <Text
                            fontWeight="semibold"
                            fontSize="sm"
                            wordBreak="break-all"
                            maxW={{ base: "60px", md: "100px" }}
                            noOfLines={1}
                          >
                            {inputValue}
                          </Text>
                          <Kbd bg="white" color="gray.600">
                            Enter
                          </Kbd>
                        </Box>
                      )}
                    </Box>
                  </Flex>
                  <Menu>
                    <MenuButton
                      mb="3"
                      display={{ base: "block", md: "none" }}
                      color="gray.600"
                    >
                      <MenuIcon size="18px" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setTypeContext(FileType.IMAGE);
                          const data = setSearchQuery(FileType.IMAGE, files);
                          if (query.length > 0) {
                            setSearchQuery(query, data);
                          }
                        }}
                      >
                        Images
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setTypeContext(FileType.PASSWORD);
                          const data = setSearchQuery(FileType.PASSWORD, files);
                          if (query.length > 0) {
                            setSearchQuery(query, data);
                          }
                        }}
                      >
                        Passwords
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setTypeContext(FileType.DOCUMENT);
                          const data = setSearchQuery(FileType.DOCUMENT, files);
                          if (query.length > 0) {
                            setSearchQuery(query, data);
                          }
                        }}
                      >
                        Files
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        onClick={() => {
                          setTypeContext("DataStats");
                        }}
                      >
                        <FaDatabase />
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Flex
                    display={{ base: "none", md: "flex" }}
                    align="center"
                    experimental_spaceX="6"
                    color="whiteAlpha.700"
                  >
                    <Text
                      onClick={() => {
                        setTypeContext(FileType.IMAGE);
                        const data = setSearchQuery(FileType.IMAGE, files);
                        if (query.length > 0) {
                          setSearchQuery(query, data);
                        }
                      }}
                      pb="3"
                      cursor="pointer"
                      _hover={{
                        borderBottom: "2px",
                        borderColor: "brand.blue",
                        color: "whiteAlpha.900",
                      }}
                      borderBottom={
                        typeContext === FileType.IMAGE ? "2px" : "2px"
                      }
                      borderColor={
                        typeContext === FileType.IMAGE
                          ? "brand.blue"
                          : "transparent"
                      }
                      color={typeContext === FileType.IMAGE ? "brand.blue" : ""}
                      fontWeight={
                        typeContext === FileType.IMAGE ? "medium" : ""
                      }
                    >
                      Images
                    </Text>
                    <Text
                      onClick={() => {
                        setTypeContext(FileType.PASSWORD);
                        const data = setSearchQuery(FileType.PASSWORD, files);
                        if (query.length > 0) {
                          setSearchQuery(query, data);
                        }
                      }}
                      pb="3"
                      cursor="pointer"
                      _hover={{
                        borderBottom: "2px",
                        borderColor: "brand.blue",
                        color: "whiteAlpha.900",
                      }}
                      borderBottom={
                        typeContext === FileType.PASSWORD ? "2px" : "2px"
                      }
                      borderColor={
                        typeContext === FileType.PASSWORD
                          ? "brand.blue"
                          : "transparent"
                      }
                      color={
                        typeContext === FileType.PASSWORD ? "brand.blue" : ""
                      }
                      fontWeight={
                        typeContext === FileType.PASSWORD ? "medium" : ""
                      }
                    >
                      Passwords
                    </Text>
                    <Text
                      cursor="pointer"
                      _hover={{
                        borderBottom: "2px",
                        borderColor: "brand.blue",
                        color: "whiteAlpha.900",
                      }}
                      borderBottom={
                        typeContext === FileType.DOCUMENT ? "2px" : "2px"
                      }
                      borderColor={
                        typeContext === FileType.DOCUMENT
                          ? "brand.blue"
                          : "transparent"
                      }
                      color={
                        typeContext === FileType.DOCUMENT ? "brand.blue" : ""
                      }
                      fontWeight={
                        typeContext === FileType.DOCUMENT ? "medium" : ""
                      }
                      pb="3"
                      onClick={() => {
                        setTypeContext(FileType.DOCUMENT);
                        const data = setSearchQuery(FileType.DOCUMENT, files);
                        if (query.length > 0) {
                          setSearchQuery(query, data);
                        }
                      }}
                    >
                      Files
                    </Text>
                    <Box
                      pb="3"
                      color="brand.blue"
                      cursor="pointer"
                      onClick={() => {
                        setTypeContext("DataStats");
                      }}
                    >
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
                <Box
                  mr={{ md: "4" }}
                  mb="4"
                  w={{ base: "full", md: "auto" }}
                  onClick={() => {
                    setShowNewImageModal(true);
                  }}
                >
                  <NewFile
                    accentColor="rgba(169, 84, 255, 0.2)"
                    accentColorMain="#A954FF"
                    imageIcon="assets/image_file.svg"
                    title="New image"
                    subTitle="PNG, JPEG, GIF"
                  />
                </Box>
                <Box
                  mr={{ md: "4" }}
                  mb="4"
                  w={{ base: "full", md: "auto" }}
                  onClick={() => {
                    setShowNewDocumentModal(true);
                  }}
                >
                  <NewFile
                    accentColor="rgba(255, 146, 84, 0.2)"
                    accentColorMain="#FF925493"
                    imageIcon="assets/document_file.svg"
                    title="Import file"
                    subTitle="All kind of files/documents"
                  />
                </Box>
              </Flex>
              {typeContext === "DataStats" ? (
                <DataStats
                  goBack={() => {
                    setTypeContext(undefined);
                    setQuery("");
                    setSearchQuery("", files);
                  }}
                />
              ) : (
                <>
                  {files?.length === 0 ? (
                    <Flex
                      textAlign="center"
                      direction="column"
                      justify="center"
                      align="center"
                    >
                      <Image
                        src="assets/vault_art.svg"
                        mt="20"
                        w="32"
                        alt="empty vault"
                      />
                      <Text mt="4" opacity={0.5} maxW="130px">
                        Create a file to get started
                      </Text>
                    </Flex>
                  ) : (
                    <Box w="full">
                      <Box w="full">
                        <Flex
                          w="full"
                          alignItems="center"
                          justifyContent="start"
                          experimental_spaceX="4"
                        >
                          {query.length > 0 && (
                            <Flex
                              mb="3"
                              alignItems="center"
                              experimental_spaceX="2"
                            >
                              <Text
                                fontSize="xl"
                                fontWeight="bold"
                                color="brand.blue"
                              >
                                &quot;{query}&quot;
                              </Text>
                              <Box
                                p="1"
                                transitionDuration="200ms"
                                cursor="pointer"
                                onClick={() => {
                                  setQuery("");
                                  setInputValue("");
                                  if (typeContext) {
                                    setSearchQuery(typeContext, files);
                                  } else {
                                    setSearchQuery("", files);
                                  }
                                }}
                                rounded="full"
                                _hover={{ bg: "gray.100" }}
                              >
                                <X size="18px" />
                              </Box>
                            </Flex>
                          )}
                          {typeContext && (
                            <Badge
                              alignItems="center"
                              experimental_spaceX="1"
                              display="flex"
                              colorScheme="blue"
                              rounded="lg"
                              px="2"
                              py="1"
                              mb="3"
                            >
                              <Text>{typeContext}</Text>
                              <Box
                                _hover={{ bg: "whiteAlpha.600" }}
                                cursor="pointer"
                                rounded="full"
                                onClick={() => {
                                  setTypeContext(undefined);
                                  setSearchQuery(query, files);
                                }}
                              >
                                <X size="16px" />
                              </Box>
                            </Badge>
                          )}
                        </Flex>
                      </Box>
                      {(query.length > 0 || typeContext) &&
                        queriedFiles.length === 0 && (
                          <Flex w="full" justify="start">
                            <Text color="gray.500" fontSize="sm">
                              🐝 No files found
                            </Text>
                          </Flex>
                        )}
                      <Grid
                        mt="2"
                        templateColumns={{
                          base: "repeat(2,1fr)",
                          sm: "repeat(3,1fr)",
                          md: "repeat(4,1fr)",
                          lg: "repeat(4, 1fr)",
                        }}
                        gap="4"
                        w="full"
                      >
                        {query.length > 0 || typeContext
                          ? queriedFiles.map((data: any, key: any) => (
                              <File key={key} file={data} />
                            ))
                          : files.map((data: any, key: any) => (
                              <File key={key} file={data} />
                            ))}
                      </Grid>
                    </Box>
                  )}{" "}
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
