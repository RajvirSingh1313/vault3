import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../utils/providers/User.provider";
import theme from "../styles/theme.chakra";
import "regenerator-runtime/runtime.js";
import PageWrapper from "../components/Wrappers/PageWrapper.wrapper";
import { ImageKeyProvider } from "../utils/providers/ImageKey.provider";
import config from "../utils/helpers/config";

function App({ Component, pageProps }: AppProps) {
  const supportedChainIds = [config.chainId];
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
      chainId: config.chainId,
    },
    walletconnect: {},
    walletlink: {
      appName: "vault3",
      url: "https://thirdweb.com",
      darkMode: false,
    },
  };

  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider theme={theme}>
        <UserProvider>
          <PageWrapper>
            <ImageKeyProvider>
              <Component {...pageProps} />
            </ImageKeyProvider>
          </PageWrapper>
        </UserProvider>
      </ChakraProvider>
    </ThirdwebWeb3Provider>
  );
}

export default App;
