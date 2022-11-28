import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  wallet,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraKey, alchemyKey } from "./config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const { chains, provider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: infuraKey, priority: 0 }),
  ...(alchemyKey ? [alchemyProvider({ apiKey: alchemyKey, priority: 1 })] : []),
  publicProvider({ priority: 2 }),
]);

const needsInjectedWalletFallback =
  typeof window !== "undefined" &&
  window.ethereum &&
  !window.ethereum.isMetaMask;

const connectors: any = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [wallet.metaMask({ chains })],
  },
  {
    groupName: "Others",
    wallets: [
      wallet.walletConnect({ chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const AppProviders = ({ children }: any) => {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "CNFTravel #1",
          learnMoreUrl:
            "https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask",
        }}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default AppProviders;
