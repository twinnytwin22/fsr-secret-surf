import { Box, CardMedia, Typography, useMediaQuery } from "@mui/material";
import DaytimeImage from "../assets/daytime.png";
import theme from "../theme";

interface ItemSnippetProps {
  tokenId: number;
}

const ItemSnippet = ({ tokenId }: ItemSnippetProps) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        background: "transparent",
      }}
    >
      <CardMedia
        component="img"
        image={DaytimeImage}
        alt="CNFTravel #1"
        sx={{ objectFit: "contain", borderRadius: 2, width: 0.4 }}
      />

      <Box sx={{ minWidth: 0.5, ml: isMobileOrTablet ? 2 : 4 }}>
        <Typography component="div" variant="subtitle1" mb={1}>
          CNFTravel #1
        </Typography>
        {tokenId > 0 && (
          <>
            <Typography
              component="div"
              variant="subtitle2"
              fontWeight={600}
              color="text.secondary"
              mt={1}
            >
              Token ID {tokenId}
            </Typography>
          </>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          component="div"
          sx={{ mt: isMobileOrTablet ? 1 : 3, fontSize: "0.8rem" }}
        >
          A memento of our time IRL together celebrating ConsenSys and the
          future of Ethereum.
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemSnippet;
