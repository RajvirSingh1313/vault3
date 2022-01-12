/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Badge, Image, Link, Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FaArrowLeft, FaDatabase, FaUser } from "react-icons/fa";
import { StorageContext } from "../../utils/providers/Database.provider";
import { FileContext } from "../../utils/providers/File.provider";
import { UserContext } from "../../utils/providers/User.provider";
import fileSize from "filesize";
import config from "../../utils/helpers/config";

export default function DataStats({ goBack }: any) {
  const { files } = useContext(FileContext);
  const { user } = useContext(UserContext);
  const { storage, setStorage } = useContext(StorageContext);

  useEffect(() => {
    let storage = 0;
    files.forEach((file) => {
      storage += Number(file.size);
    });
    setStorage(storage);
  }, [files]);

  return (
    <Flex w="full" mt="2" direction="column" experimental_spaceY="3">
      <Button
        onClick={goBack}
        size="sm"
        w="fit-content"
        leftIcon={<FaArrowLeft />}
        mb="2"
      >
        Go back
      </Button>
      <Flex align="center" experimental_spaceX="4">
        <Box color="gray.500">
          <FaUser />
        </Box>
        <Text color="gray.500" minW="110px">
          Wallet address
        </Text>
        <Badge px="3" py="1" rounded="lg" noOfLines={1} maxW="400px">
          <Text wordBreak="break-all" isTruncated>
            {user.address}
          </Text>
        </Badge>
      </Flex>
      <Flex align="center" experimental_spaceX="4">
        <Box color="gray.500">
          <FaDatabase />
        </Box>
        <Text color="gray.500" minW="110px">
          Storage used
        </Text>
        <Badge
          colorScheme="blue"
          px="3"
          py="1"
          rounded="lg"
          noOfLines={1}
          maxW="400px"
        >
          <Text wordBreak="break-all" isTruncated>
            {fileSize(Number(storage))}
          </Text>
        </Badge>
      </Flex>
      <Link
        href={`https://mumbai.polygonscan.com/address/${config.userVault.address}`}
        _hover={{}}
        _active={{}}
        _focus={{}}
        isExternal
      >
        <Flex align="center" experimental_spaceX="2" pt="2">
          <Image src="assets/matic.png" w="6" h="6" alt="polygon contract" />
          <Text fontWeight="semibold" color="gray.600">
            Contract
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
}
