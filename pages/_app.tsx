import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@3rdweb/react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../utils/providers/User.provider";
import theme from "../styles/theme.chakra";
import "regenerator-runtime/runtime.js";
import PageWrapper from "../components/Wrappers/PageWrapper.wrapper";

function App({ Component, pageProps }: AppProps) {
  const supportedChainIds = [137];
  /**
   * Include the connectors you want to support
   * injected - MetaMask
   * magic - Magic Link
   * walletconnect - Wallet Connect
   * walletlink - Coinbase Wallet
   */
  const connectors = {
    injected: {},
    magic: {
      apiKey: String(process.env.REACT_APP_MAGIC_KEY),
      chainId: 137,
    },
    walletconnect: {},
    walletlink: {
      appName: "vault3",
      url: "https://thirdweb.com",
      darkMode: false,
    },
  };

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider theme={theme}>
        <UserProvider>
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
        </UserProvider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default App;
