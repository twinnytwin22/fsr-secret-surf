import {
  Alert,
  Box,
  Button,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useWallet } from "../services/wallet";
import theme from "../theme";
import { NETWORK, QUERY_STATUS } from "../utils/constants";
import { useState } from "react";
import { ItemClaim } from "../utils/types";
import { UseMutateFunction } from "@tanstack/react-query";
import { truncateString } from "../utils/helpers";

interface Step2ViewProps {
  pinFromUrl: string;
  itemClaim: ItemClaim;
  verifyItemClaim: UseMutateFunction<any, any, any, any>;
  verifyItemClaimStatus: string;
  verifyItemClaimStatusErrorMessage: string;
  redeemItemClaim: UseMutateFunction<any, any, any, any>;
  redeemItemClaimStatus: string;
  redeemItemClaimStatusErrorMessage: string;
  advanceToPreviousStep: () => void;
  advanceToNextStep: () => void;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step2View = ({
  pinFromUrl,
  itemClaim,
  verifyItemClaim,
  verifyItemClaimStatus,
  verifyItemClaimStatusErrorMessage,
  redeemItemClaim,
  redeemItemClaimStatus,
  redeemItemClaimStatusErrorMessage,
  advanceToPreviousStep,
  advanceToNextStep,
  activeStep,
  setActiveStep,
}: Step2ViewProps) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [pinCode, setPincode] = useState<string>(pinFromUrl);
  const { address, chain } = useWallet();

  if (!address || !itemClaim?.item) {
    advanceToPreviousStep();
  }

  const itemNetworkId = itemClaim.item?.token_contract?.network_id;

  const differentNetwork = chain?.id !== itemNetworkId;

  const onSendSecurityCode = () => {
    if (!itemClaim?.token) return;
    setActiveStep(activeStep + 1);
    verifyItemClaim(itemClaim.token);
  };

  const onClaimNFT = () => {
    if (!itemClaim?.token || !pinCode || !address) return;
    redeemItemClaim({
      key: itemClaim.token,
      pin: pinCode,
      address: address,
    });
  };

  if (redeemItemClaimStatus === QUERY_STATUS.success) {
    advanceToNextStep();
  }

  return (
    <>
      <Typography variant="h4" color="primary.main">
        Verify Ownership
      </Typography>
      <Typography variant="body1">
        Use the form below to receive a unique security code at the email you
        claimed the NFT with.
      </Typography>
      <Typography variant="h4" color="primary.main">
        Enter your security code
      </Typography>
      <Typography variant="body1">
        Use the form below to receive a unique security code at the email you
        claimed the NFT with.
      </Typography>
      {(verifyItemClaimStatus === QUERY_STATUS.idle ||
        verifyItemClaimStatus === QUERY_STATUS.loading) && (
        <Button
          variant="outlined"
          sx={{
            width: isMobileOrTablet ? 1 : 320,
          }}
          onClick={onSendSecurityCode}
          disabled={verifyItemClaimStatus === QUERY_STATUS.loading}
        >
          Send security code
        </Button>
      )}
      {verifyItemClaimStatus === QUERY_STATUS.error && (
        <Alert severity="error">
          Failed to send a security code to the email address that has claim on
          the NFT. {verifyItemClaimStatusErrorMessage}
        </Alert>
      )}
      {verifyItemClaimStatus === QUERY_STATUS.success && (
        <>
          <Alert severity="success">
            Successfully sent a security code to the email address that has
            claim on the NFT.
          </Alert>
          {chain && differentNetwork && (
            <Alert
              icon={false}
              sx={{ my: 2, width: { xs: "100%" } }}
              severity="warning"
            >
              You are connected to the <b>{NETWORK[chain.id]} Network</b>. This
              NFT will be transferred to your wallet on the{" "}
              <b>{NETWORK[itemNetworkId]} Network</b>. Please make sure{" "}
              <Link
                href="https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC"
                target="_blank"
                color="inherit"
              >
                you have access to this address on the {NETWORK[itemNetworkId]}{" "}
                Blockchain
              </Link>{" "}
              before claiming this NFT.
            </Alert>
          )}
          <Typography variant="h4" color="primary.main">
            Confirm Address
          </Typography>
          <Typography variant="body1" mb={0}>
            Your NFT will be sent to the address below:
          </Typography>
          <Typography variant="overline" mt={0}>
            {isMobileOrTablet ? truncateString(address!, 30, "...") : address}
          </Typography>
          <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my={2}
          >
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              type="text"
              size="small"
              id="security-code"
              sx={{ width: "25ch" }}
              onChange={(event) => setPincode(event?.target?.value)}
              value={pinCode}
              placeholder="Enter the security code"
            />
            <Button
              variant="outlined"
              sx={{
                width: 100,
                ml: 2,
              }}
              onClick={onClaimNFT}
              disabled={redeemItemClaimStatus === QUERY_STATUS.loading}
            >
              Claim
            </Button>
          </Box>
          <Typography variant="caption">
            Didn't receive your code?{" "}
            <Link
              underline="hover"
              onClick={onSendSecurityCode}
              sx={{ fontWeight: 600, color: "black", cursor: "pointer" }}
            >
              Resend
            </Link>
          </Typography>
          {redeemItemClaimStatus === QUERY_STATUS.error && (
            <Alert severity="error">
              An error has occurred: {redeemItemClaimStatusErrorMessage} Please
              refresh this page and try again.
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default Step2View;
