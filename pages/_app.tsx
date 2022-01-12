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
import { FileProvider } from "../utils/providers/File.provider";
import { QueriedFilesProvider } from "../utils/providers/QueriedFiles.provider";
import { StorageProvider } from "../utils/providers/Database.provider";

import { NextSeo } from "next-seo";

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
      appName: "Vault3",
      url: "https://vault3.vercel.app",
      darkMode: false,
    },
  };

  return (
    <>
      <NextSeo
        title="Vault3"
        description="The safest and decentralised vault built!"
        defaultTitle="Vault3"
        canonical="https://vault3.vercel.app"
        openGraph={{
          url: "https://vault3.vercel.app",
          title: "Vault3",
          description: "The safest and decentralised vault built!",
          images: [
            {
              url: "/assests/vault_art.png",
              alt: "Og Image",
              type: "image/png",
            },
          ],
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content: "web3, vault, decentralised, storage, hackathon, data",
          },
        ]}
      />
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <ChakraProvider theme={theme}>
          <UserProvider>
            <PageWrapper>
              <ImageKeyProvider>
                <FileProvider>
                  <QueriedFilesProvider>
                    <StorageProvider>
                      <Component {...pageProps} />
                    </StorageProvider>
                  </QueriedFilesProvider>
                </FileProvider>
              </ImageKeyProvider>
            </PageWrapper>
          </UserProvider>
        </ChakraProvider>
      </ThirdwebWeb3Provider>
    </>
  );
}

export default App;
