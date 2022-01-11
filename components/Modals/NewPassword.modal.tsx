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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
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
import fileGetter from "../../utils/helpers/fileGetter";
import passwordCreator from "../../utils/helpers/passwordCreator";
import { FileContext } from "../../utils/providers/File.provider";
import { UserContext } from "../../utils/providers/User.provider";

export default function NewPassword({ isOpen, onClose }: any) {
  const { user } = useContext(UserContext);
  const { setFiles } = useContext<any>(FileContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    username: "",
    password: "",
  });

  const handleFormSubmit = async () => {
    setLoading(true);
    await passwordCreator(
      formData.url,
      formData.username,
      formData.password,
      user.address
    );

    const data = await fileGetter();
    setFiles(data);
    setLoading(false);
    onClose();
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
              <Image src="assets/password_file.svg" w="6" alt="password_file" />
            </Box>
            <Text>Create new password</Text>
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
                Site name/URL
              </Text>
              <InputGroup>
                <InputLeftElement>
                  <Box color="gray.500">
                    <FaLink />
                  </Box>
                </InputLeftElement>
                <Input
                  required
                  onChange={(e: any) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  bg="gray.100"
                  rounded="lg"
                  placeholder="Enter site name or URL"
                />
              </InputGroup>
            </Box>
            <Flex w="full" experimental_spaceX="4" mt="2">
              <Box w="45%">
                <Text fontSize="xs" mx="2" mb="1">
                  Username/Email
                </Text>
                <InputGroup>
                  <InputLeftElement>
                    <Box color="gray.500">
                      <FaUser />
                    </Box>
                  </InputLeftElement>
                  <Input
                    onChange={(e: any) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    bg="gray.100"
                    rounded="lg"
                    placeholder="Enter username or email"
                  />
                </InputGroup>
              </Box>
              <Box w="55%">
                <Text fontSize="xs" mx="2" mb="1">
                  Password
                </Text>
                <InputGroup>
                  <InputLeftElement>
                    <Box color="gray.500">
                      <FaStarOfLife />
                    </Box>
                  </InputLeftElement>
                  <Input
                    required
                    onChange={(e: any) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    bg="gray.100"
                    rounded="lg"
                    type="password"
                    placeholder="Enter password"
                  />
                </InputGroup>
              </Box>
            </Flex>
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
