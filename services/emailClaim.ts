import axios from "axios";
import { createClaimBaseUrl, defaultCollectionId } from "../utils/constants";

export const createEmailClaim = async (email: string) => {
  localStorage.setItem("email", email);

  const payload = {
    email,
    collectionId: defaultCollectionId,
  };

  const { data } = await axios({
    method: "post",
    url: `${createClaimBaseUrl}/claim`,
    data: payload,
  });

  return data;
};
