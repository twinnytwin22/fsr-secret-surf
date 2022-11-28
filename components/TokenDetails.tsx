import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Stack,
  Typography,
  useMediaQuery,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { truncateString } from "../utils/helpers";
import theme from "../theme";
import { NETWORK } from "../utils/constants";

interface ItemProps {
  name: any;
  value: any;
}
const Item = ({ name, value }: ItemProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" my={0}>
        {name}
      </Typography>
      <Typography variant="body2" fontWeight={600} my={0}>
        {value}
      </Typography>
    </Box>
  );
};

interface TokenDetailsProps {
  tokenId?: number;
  contractAddress: string;
  networkId: number;
  tokenType: string;
}

const TokenDetails = ({
  tokenId,
  contractAddress,
  networkId,
  tokenType,
}: TokenDetailsProps) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const explorerSupported = networkId in [1, 4, 5, 137];

  const onViewInExplorerClick = () => {
    if (!contractAddress || !explorerSupported) return;

    if (networkId === 1) {
      window.open(
        `https://etherscan.io/address/${contractAddress}`,
        "_blank",
        "noopener, noreferrer"
      );
    } else if (networkId === 137) {
      window.open(
        `https://polygonscan.com/address/${contractAddress}`,
        "_blank",
        "noopener, noreferrer"
      );
    } else if (networkId === 4) {
      window.open(
        `https://rinkeby.etherscan.io/address/${contractAddress}`,
        "_blank",
        "noopener, noreferrer"
      );
    } else if (networkId === 5) {
      window.open(
        `https://goerli.etherscan.io/address/${contractAddress}`,
        "_blank",
        "noopener, noreferrer"
      );
    }
  };

  return (
    <Accordion sx={{ background: "transparent" }} defaultExpanded elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        sx={{ p: 0, width: 180 }}
      >
        <Typography variant="overline" m={0} p={0}>
          Token Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, mb: 4 }}>
        <Stack
          spacing={1}
          component={Card}
          sx={{
            borderRadius: 2,
            background: "transparent",
            p: 2,
            border: "1px solid black",
          }}
          elevation={0}
        >
          <Item
            name={
              <Box display="flex" alignItems="center" sx={{ m: 0 }}>
                Contract Address
                {explorerSupported && (
                  <Link onClick={onViewInExplorerClick}>
                    <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </Link>
                )}
              </Box>
            }
            value={
              isMobileOrTablet
                ? truncateString(contractAddress, 10, "...")
                : truncateString(contractAddress, 20, "...")
            }
          />
          <Item name="Token Standard" value={tokenType} />
          <Item name="Blockchain" value={NETWORK[networkId]} />
          {tokenId && <Item name="Token Id" value={tokenId} />}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default TokenDetails;
