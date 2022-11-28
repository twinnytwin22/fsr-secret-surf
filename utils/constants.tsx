import { ReactNode, useMemo } from "react";

export const CLAIMFLOW_STEP = {
  CHECK_EMAIL: "Check email",
  CONNECT_METAMASK: "Connect MetaMask",
  VERIFY_IDENTITY_AND_CLAIM: "Verify Identity And Claim",
  SUCCESSFULLY_CLAIMED: "Successfully Claimed NFT",
};

export const useItemClaimFlowSteps = (): Array<{
  label: string;
  description: ReactNode;
}> => {
  return useMemo(
    () => [
      {
        label: "Check your email",
        description:
          "Click the Claim NFT link in the email you’ve just received. This will take you to our site for redeeming your new NFT.",
      },
      {
        label: "Create or connect your MetaMask wallet",
        description:
          "Connect your MetaMask wallet or create a new one. This will be the address that the NFT is sent to after a successful claim.",
      },
      {
        label: "Send security code",
        description: `Generate a new unique security code to your email address. This security code will verify that you own the email address on our records.`,
      },
      {
        label: "Claim your NFT",
        description: `In a short while, the NFT will be transferred to your MetaMask wallet. You should be able to see it in your favorite marketplaces.`,
      },
    ],
    []
  );
};

export enum MediaType {
  video = "video",
  image = "image",
  placeholder = "placeholder",
}

export const QUERY_STATUS = {
  loading: "loading",
  success: "success",
  error: "error",
  idle: "idle",
};

export const NETWORK: { [id: number]: string } = {
  1: "Ethereum",
  4: "Rinkeby",
  5: "Goerli",
  137: "Polygon",
  12345: "Local",
};

export const defaultCollectionId = "f2e10074-8409-4039-be74-8d5e27d7c6b5";
export const createClaimBaseUrl =
  "https://sls-eus-dev-item-claim-serverless.azurewebsites.net/api";
export const apiBaseUrl = "https://platform.consensys-nft.com/api/";
