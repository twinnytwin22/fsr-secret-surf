import { Box, Button, Stack, Typography } from "@mui/material";
import TokenDetails from "./TokenDetails";
import { ItemClaim } from "../utils/types";
import { openSeaUrl } from "../config";

interface Step3ViewProps {
  itemClaim: ItemClaim;
}
const Step3View = ({ itemClaim }: Step3ViewProps) => {
  const tokenId = Number(itemClaim.item?.token_id);
  const tokenContract = itemClaim.item?.token_contract?.address;
  const itemNetworkId = itemClaim.item?.token_contract?.network_id;
  const tokenType = itemClaim.item.token_contract.token_type;
  const openSeaSupported = itemNetworkId in [1, 137];

  const onViewOnOpenSeaClick = () => {
    if ((!openSeaUrl && !tokenContract) || !openSeaSupported) return;

    if (openSeaUrl) {
      window.open(openSeaUrl);
    } else if (itemNetworkId === 1) {
      window.open(
        `https://opensea.io/assets/ethereum/${tokenContract}/${tokenId}`,
        "_blank",
        "noopener, noreferrer"
      );
    } else if (itemNetworkId === 137) {
      window.open(
        `https://opensea.io/assets/matic/${tokenContract}/${tokenId}`,
        "_blank",
        "noopener, noreferrer"
      );
    }
  };

  return (
    <>
      <Typography variant="h4" color="primary.main">
        Your NFT has been redeemed
      </Typography>
      <Typography variant="body1">
        Congratulations on acquiring a CNFT. The NFT has now been transferred to
        your MetaMask wallet.
      </Typography>
      <Box mt={6}>
        <Typography variant="subtitle1">View Your NFT</Typography>
        <Typography variant="body1">
          You can view CNFTravel #1 in MetaMask Mobile or Opensea. Follow the
          link below to see it in your collection.
        </Typography>
        {itemNetworkId && tokenType && tokenContract && (
          <TokenDetails
            tokenId={tokenId}
            networkId={itemNetworkId}
            tokenType={tokenType}
            contractAddress={tokenContract}
          />
        )}
        <Stack direction="column" spacing={2}>
          <Button
            variant="outlined"
            sx={{
              p: "10px 40px",
            }}
            href="https://metamask.zendesk.com/hc/en-us/articles/360058238591-NFT-tokens-in-your-MetaMask-wallet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Import NFT in MetaMask Mobile
          </Button>
          {tokenId && openSeaSupported && (
            <Button
              variant="outlined"
              sx={{
                p: "10px 40px",
              }}
              onClick={onViewOnOpenSeaClick}
            >
              View NFT in OpenSea
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Step3View;
