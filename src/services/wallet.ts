import { useMemo } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export const useWallet = () => {
  const { connect, connectors, pendingConnector, isLoading, error } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const filteredConnectors = useMemo(() => {
    const injectedConnector = connectors.find((conn) => conn.id === "injected");
    // If injected is metamask then can remove from the connectors as the
    // MetamaskConnector will still be available
    if (injectedConnector && injectedConnector.name === "MetaMask") {
      return connectors.filter((conn) => conn.id !== "injected");
    } else {
      return connectors;
    }
  }, [connectors]);

  return {
    connect,
    connector,
    isConnected,
    disconnect,
    address,
    chain,
    switchNetwork,
    connectors: filteredConnectors,
    pendingConnector,
    isLoading,
    error,
  };
};
