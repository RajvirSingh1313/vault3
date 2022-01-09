import { Flex, Image, Box, Text } from "@chakra-ui/react";
import { Plus } from "react-feather";

export default function NewFile({
  imageIcon,
  title,
  subTitle,
  accentColor,
  accentColorMain,
}: any) {
  return (
    <Flex
      minW={{ base: "full", md: "300px" }}
      w="full"
      p="3"
      pr="6"
      cursor="pointer"
      role="group"
      bg="gray.100"
      experimental_spaceX="4"
      rounded="xl"
      justify="space-between"
      border="1px"
      transitionDuration="200ms"
      borderColor="gray.200"
      _hover={{ borderColor: accentColorMain, bg: accentColor }}
      align="center"
    >
      <Flex align="center" experimental_spaceX="4">
        <Image src={imageIcon} w="10" alt={title} />
        <Box>
          <Text fontWeight="medium" color="gray.600">
            {title}
          </Text>
          <Text fontSize="11px" color="gray.500">
            {subTitle}
          </Text>
        </Box>
      </Flex>
      <Box
        pl="2"
        transitionDuration="200ms"
        color="gray.600"
        _groupHover={{ transform: "scale(1.2)" }}
      >
        <Plus />
      </Box>
    </Flex>
  );
}
