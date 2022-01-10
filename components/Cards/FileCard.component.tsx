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

export default function File({ file }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { files, setFiles } = useContext(FileContext);
  const { user } = useContext(UserContext);
  const { queriedFiles } = useContext(QueriedFilesContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<any>(undefined);

  const getImage = async () => {
    console.log(file.uid);
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

  useEffect(() => {
    if (file.file_type === FileType.IMAGE) {
      getImage();
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
        />
      )}
      <AspectRatio
        ratio={188 / 88}
        w="full"
        onClick={() => setIsModalOpen(true)}
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
          <Image
            src={`assets/${file.file_type}_card.svg`}
            alt={file.file_type}
          />
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
          <Box onClick={() => setIsModalOpen(true)}>
            <Flex align="center" color="gray.500" experimental_spaceX="1">
              <FaLink size="12px" />
              <Text
                color="black"
                fontWeight="semibold"
                fontSize={{ base: "sm", md: "md" }}
                noOfLines={1}
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
            >
              <Box>
                <Image src="assets/meatball_menu.png" w="6" h="6" alt="menu" />
              </Box>
            </MenuButton>
            <MenuList>
              {file.file_type !== FileType.IMAGE && (
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
                color="red.400"
                icon={<FaTrash />}
                onClick={async () => {
                  setIsDeleting(true);
                  if (file.file_type === FileType.PASSWORD) {
                    await passwordDeleter(file.uid);
                  }
                  if (file.file_type === FileType.IMAGE) {
                    await imageDeleter(file.uid);
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
