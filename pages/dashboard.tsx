import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { AccessStatus } from "../types/accessStatus.enum";

const Dashboard: NextPage = () => {
  useEffect(() => {
    if (
      sessionStorage.getItem("accessStatus") !==
      String(AccessStatus.KEY_MATCHED)
    ) {
      window.location.href = "/";
    }
  });

  return <Text>Dashboard</Text>;
};

export default Dashboard;
