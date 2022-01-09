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
} from "@chakra-ui/react";
import { Plus } from "react-feather";
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
import { useContext, useState } from "react";
import PasswordCard from "../Modals/PasswordCard.modal";
import passwordDeleter from "../../utils/helpers/passwordDeleter";
import DeletingFile from "../Modals/DeletingFile.modal";
import { FileContext } from "../../utils/providers/File.provider";
import fileGetter from "../../utils/helpers/fileGetter";
import EditPassword from "../Modals/EditPassword.modal";

export default function File({ file }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setFiles } = useContext(FileContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Box
      rounded="xl"
      overflow="hidden"
      roundedBottom="none"
      cursor="pointer"
      role="group"
      w={{ base: "160px", md: "240px" }}
    >
      {isDeleting && <DeletingFile />}
      {isEditing && (
        <EditPassword
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          file={file}
        />
      )}
      <PasswordCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={file}
      />
      <AspectRatio
        ratio={188 / 88}
        w="full"
        onClick={() => setIsModalOpen(true)}
      >
        <Image src="assets/password_card.svg" alt={file.type} />
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
              <Text color="black" fontWeight="semibold" noOfLines={1}>
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
                <Image src="assets/meatball_menu.png" w="6" h="6" />
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<FaPen />}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                color="red.400"
                icon={<FaTrash />}
                onClick={async () => {
                  setIsDeleting(true);
                  await passwordDeleter(file.uid);
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
