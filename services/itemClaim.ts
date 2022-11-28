import { useMutation, useQuery } from "@tanstack/react-query";
import { UseItemClaimResult } from "../utils/types";
import apiInstance from "./api";

/**
 * Gets the state associated with a specific claim.
 */
export const fetchItemClaim = async (claimToken: string) => {
  const { data } = await apiInstance.get(`v2/public/redeem/${claimToken}`);
  return data;
};

/**
 * This sends a pin code to the email registered on file for this claim.
 */
const verifyClaim = async (key: string) => {
  const { data } = await apiInstance.post(`v2/public/verify-claim/${key}`);
  return data;
};

/**
 * This sends the collectible to the specified address, if the pin is valid.
 */
const redeemClaim = async ({
  key,
  pin,
  address,
}: {
  key: string;
  pin: string;
  address: string;
}) => {
  const payload = {
    address,
    pin,
  };

  const { data } = await apiInstance.post(`v2/public/redeem/${key}`, payload);

  return data;
};

/**
 * Retrieves an item claim by its token and exposes other item mutations.
 */
export const useItemClaim = (claimToken: string): UseItemClaimResult => {
  const {
    data: itemClaim,
    status,
    error,
    isSuccess,
  } = useQuery(["itemClaim", claimToken], () => fetchItemClaim(claimToken), {
    enabled: Boolean(claimToken),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  // Verifies the ownership of an item by sending a PIN code to the email that has claim on the item.
  const {
    status: verifyItemClaimStatus,
    mutate: verifyItemClaim,
    error: verifyItemClaimStatusError,
  } = useMutation((claimToken: string) => verifyClaim(claimToken), {
    onSuccess: () => {},
    onError: (error: any) => {
      console.error(error);
    },
  });

  // Send the collectible to the specified address, if the pin is valid.
  const {
    status: redeemItemClaimStatus,
    mutateAsync: redeemItemClaim,
    error: redeemItemClaimError,
  } = useMutation(
    (redeemItemParameters: any) => redeemClaim({ ...redeemItemParameters }),
    {
      onSuccess: () => {},
      onError: (error: any) => {
        console.error(error);
      },
    }
  );

  if (isSuccess && itemClaim) itemClaim.token = claimToken;

  return {
    itemClaim,
    status,
    statusErrorMessage: (error as any)?.response?.data?.error?.detail,

    verifyItemClaim,
    verifyItemClaimStatus,
    verifyItemClaimStatusErrorMessage:
      verifyItemClaimStatusError?.response?.data?.error?.detail,

    redeemItemClaim,
    redeemItemClaimStatus,
    redeemItemClaimStatusErrorMessage:
      redeemItemClaimError?.response?.data?.error?.detail,
  };
};
