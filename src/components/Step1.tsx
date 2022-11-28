import {
  Divider,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import theme from "../theme";
import { WalletButton } from "./WalletButton";

const Step1View = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Typography variant="h4" color="primary.main">
        Connect Your Wallet
      </Typography>
      <Typography variant="body1">
        Connect MetaMask to begin the NFT claim process.
      </Typography>
      <Box display="flex" flexDirection={isMobileOrTablet ? "column" : "row"}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid white",
            borderRadius: 5,
            width: isMobileOrTablet ? 1 : 0.5,
            mr: isMobileOrTablet ? 0 : 2,
            mb: isMobileOrTablet ? 2 : null,
          }}
        >
          <CardContent sx={{ textAlign: "center", py: 4, height: 1 }}>
            <Typography variant="subtitle1">Have a wallet?</Typography>
            <Typography variant="body2">
              Trusted by over 21 million users, MetaMask provides the simplest
              yet most secure way to connect to web3.
            </Typography>
            <Divider variant="middle" />
            <WalletButton />
          </CardContent>
        </Card>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid white",
            borderRadius: 5,
            width: isMobileOrTablet ? 1 : 0.5,
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              py: 4,
              height: 1,
            }}
          >
            <Typography variant="subtitle1">Don't have a wallet?</Typography>
            <Typography variant="body2">
              Create and install a secure MetaMask wallet in your browser in
              just a few easy steps.
            </Typography>
            <Divider variant="middle" />
            <Button
              variant="outlined"
              sx={{
                color: "black",
                backgroundColor: "transparent",
                borderColor: "black",
              }}
              onClick={() =>
                window.open(
                  "https://metamask.io/",
                  "_blank",
                  "noopener, noreferrer"
                )
              }
            >
              Install MetaMask
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Step1View;
