/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Image,
  Box,
  Text,
  AspectRatio,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
} from "@chakra-ui/react";
import { Folder, Plus } from "react-feather";
import {
  FaBitbucket,
  FaCloudMeatball,
  FaHamburger,
  FaLink,
  FaOpencart,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import fileSize from "filesize";
import { useContext, useEffect, useState } from "react";
import PasswordCard from "../Modals/PasswordCard.modal";
import passwordDeleter from "../../utils/helpers/passwordDeleter";
import DeletingFile from "../Modals/DeletingFile.modal";
import { FileContext } from "../../utils/providers/File.provider";
import fileGetter from "../../utils/helpers/fileGetter";
import EditPassword from "../Modals/EditPassword.modal";
import { FileType } from "../../types/fileTypes";
import { supabase } from "../../utils/helpers/supabase";
import { UserContext } from "../../utils/providers/User.provider";
import CryptoJs from "crypto-js";
import ImageCard from "../Modals/ImageCard.modal";
import imageDeleter from "../../utils/helpers/imageDeleter";
import { QueriedFilesContext } from "../../utils/providers/QueriedFiles.provider";
import documentDeleter from "../../utils/helpers/documentDeleter";
import b64toBlob from "../../utils/helpers/blobUrl";

export default function File({ file }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { files, setFiles } = useContext(FileContext);
  const { user } = useContext(UserContext);
  const { queriedFiles } = useContext(QueriedFilesContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<any>(undefined);
  const [document, setDocument] = useState<any>(undefined);

  const getImage = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("images")
      .select("hash")
      .eq("uid", file.uid)
      .single();

    setImage(
      CryptoJs.AES.decrypt(data.hash, user.address).toString(CryptoJs.enc.Utf8)
    );
    setLoading(false);
  };

  const getDocument = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("documents")
      .select("hash")
      .eq("uid", file.uid)
      .single();
    const hash = CryptoJs.AES.decrypt(data.hash, user.address).toString(
      CryptoJs.enc.Utf8
    );
    const url = await b64toBlob(hash);
    setDocument(url);
    setLoading(false);
  };

  useEffect(() => {
    if (file.file_type === FileType.IMAGE) {
      getImage();
    }
    if (file.file_type === FileType.DOCUMENT) {
      getDocument();
    }
  }, [files, queriedFiles]);

  return (
    <Box
      rounded="xl"
      overflow="hidden"
      roundedBottom="none"
      cursor="pointer"
      role="group"
      w="full"
    >
      {isDeleting && <DeletingFile />}

      {isEditing && file.file_type === FileType.PASSWORD && (
        <EditPassword
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          file={file}
        />
      )}

      {isModalOpen && file.file_type === FileType.PASSWORD && (
        <PasswordCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          file={file}
        />
      )}
      {isModalOpen && file.file_type === FileType.IMAGE && image && (
        <ImageCard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          image={image}
          name={file.name}
        />
      )}
      <AspectRatio
        ratio={188 / 88}
        w="full"
        onClick={() => {
          console.log(file);
          if (file.file_type === FileType.DOCUMENT) {
            if (!loading) {
              window.open(document, "_blank");
            }
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        {file.file_type === FileType.IMAGE ? (
          <>
            {image && !loading ? (
              <Image src={image} alt={file.file_type} />
            ) : (
              <Skeleton />
            )}
          </>
        ) : (
          <>
            {!loading ? (
              <Image
                src={`assets/${file.file_type}_card.svg`}
                alt={file.file_type}
              />
            ) : (
              <Skeleton />
            )}
          </>
        )}
      </AspectRatio>
      <Box
        _groupHover={{ bg: "gray.100" }}
        transitionDuration="200ms"
        border="1px"
        roundedBottom="xl"
        p="2"
        px="4"
        borderTop="none"
        borderColor="gray.300"
      >
        <Flex justify="space-between">
          <Box
            onClick={() => {
              console.log(file);
              if (file.file_type === FileType.DOCUMENT) {
                if (!loading) {
                  window.open(document, "_blank");
                }
              } else {
                setIsModalOpen(true);
              }
            }}
          >
            <Flex align="center" color="gray.500" experimental_spaceX="1">
              <Box maxW="12px">
                <FaLink size="12px" />
              </Box>
              <Text
                color="black"
                fontWeight="semibold"
                fontSize={{ base: "sm", md: "md" }}
                noOfLines={1}
                wordBreak="break-all"
              >
                {file.name}
              </Text>
            </Flex>
            <Text color="gray.500" fontSize="xs">
              {fileSize(Number(file.size))}
            </Text>
          </Box>
          <Menu>
            <MenuButton
              _hover={{ bg: "gray.300" }}
              h="fit-content"
              rounded="full"
              minW="6"
              minH="6"
            >
              <Box>
                <Image
                  src="assets/meatball_menu.png"
                  minW="6"
                  mr="-2"
                  minH="6"
                  w="6"
                  h="6"
                  alt="menu"
                />
              </Box>
            </MenuButton>
            <MenuList>
              {file.file_type === FileType.PASSWORD && (
                <MenuItem
                  icon={<FaPen />}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </MenuItem>
              )}
              <MenuItem
                color="red.500"
                icon={<FaTrash />}
                onClick={async () => {
                  setIsDeleting(true);
                  if (file.file_type === FileType.PASSWORD) {
                    await passwordDeleter(file.uid);
                  }
                  if (file.file_type === FileType.IMAGE) {
                    await imageDeleter(file.uid);
                  }
                  if (file.file_type === FileType.DOCUMENT) {
                    await documentDeleter(file.uid);
                  }
                  const data: any = await fileGetter();
                  setFiles(data);
                  setIsDeleting(false);
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Box>
  );
}
