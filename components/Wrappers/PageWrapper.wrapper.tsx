/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/providers/User.provider";
import SwitchNetwork from "../Modals/SwitchNetwork.modal";
import { useWeb3 } from "@3rdweb/hooks";
import { Box } from "@chakra-ui/react";

const PageWrapper: NextPage = ({ children }) => {
  const { setUser } = useContext<any>(UserContext);
  const [isUnsupportedChainId, setIsUnsupportedChainId] = useState(false);
  const { address, chainId, error } = useWeb3();

  useEffect(() => {
    console.log(error?.name);
    if (error?.name === "UnsupportedChainIdError") {
      setIsUnsupportedChainId(true);
    } else {
      setIsUnsupportedChainId(false);
    }
  }, [error]);

  useEffect(() => {
    console.log(address);
    setUser({
      address,
      chainId,
    });
  }, [address, chainId]);
  return (
    <Box bg="white" minH="100vh" color="brand.black">
      {isUnsupportedChainId && <SwitchNetwork />}
      <Box maxW="6xl" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default PageWrapper;
