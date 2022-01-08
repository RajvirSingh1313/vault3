import { ConnectorOptions, useWeb3 } from "@3rdweb/hooks";
import { Spinner, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AccessStatus } from "../types/accessStatus.enum";
import keyGetter from "../utils/helpers/keyGetter";
import { UserContext } from "../utils/providers/User.provider";

const Dashboard: NextPage = () => {
  const { address, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = async () => {
    console.log(address);
    const keyData = await keyGetter(
      JSON.parse(String(sessionStorage.getItem("imageKey"))),
      String(address)
    );
    console.log(keyData);
    if (keyData?.accessStatus !== AccessStatus.KEY_MATCHED) {
      window.location.href = "/";
    }
    setLoading(false);
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

  return <>{loading ? <Spinner /> : <Text>Dashboard</Text>}</>;
};

export default Dashboard;
