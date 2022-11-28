// @ts-nocheck
import { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Layout from "../components/Layout";
import theme from "../theme";
import SplitView from "../components/SplitView";
import NFTMedia from "../components/NFTMedia";
import { MediaType } from "../utils/constants";
import ReactCardFlip from "react-card-flip";

const MediaCard = ({ isFlipped }: any) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
      <NFTMedia type={MediaType.placeholder} />

      <Box
        sx={{
          py: 4,
          px: "10px",
          my: 4,
          width: isMobileOrTablet ? 1 : 500,
          height: "auto",
          backgroundColor: "#F5F5F5",
          borderRadius: 3,
          boxShadow: "10px 10px 20px 20px #dddddd",
        }}
      >
        <iframe
          allow="fullscreen"
          frameBorder="0"
          height="360"
          src="https://giphy.com/embed/uhYPkjP03h9RvVdazZ/video"
          width="480"
          title="alt image"
        ></iframe>
      </Box>
    </ReactCardFlip>
  );
};

export const Intro = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: isMobileOrTablet ? 2 : 0,
          lineHeight: 1,
          color: "primary.main",
        }}
      >
        SECRECT SURF MIA '22
      </Typography>
      <Typography variant="subtitle2" mb={0}>
CLAIMABLE NFTS      </Typography>

      <Typography
        variant="body1"
        component="div"
        sx={{ width: isMobileOrTablet ? 1 : 0.7 }}
      >
        This is a commemorative stamp representing attendance at the first ever 
        Future Surf event in Miami, our 2nd event ever overall, and the very 
        first Secret Surf. Holding this stamp will unlock a token-gated website 
        with the full Future Surf Miami recap, as well as permit you priority 
        access to tickets at other Future Surf events.
      </Typography>
      <Typography variant="overline" component="div">
        Free!
      </Typography>
    </>
  );
};

const LandingPage = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Layout>
      <Box my={isMobileOrTablet ? 0 : 8} mx={isMobileOrTablet ? 0 : 8}></Box>
      <SplitView
        left={
          <>
            <Intro />
            <Button
              variant="outlined"
              sx={{
                width: isMobileOrTablet ? 1 : 320,
                p: 3,
              }}
              onClick={() => setIsFlipped(true)}
              disabled={isFlipped}
            >
              {isFlipped ? "Mint closed" : "Claim now"}
            </Button>
          </>
        }
        right={<MediaCard isFlipped={isFlipped} />}
      />
    </Layout>
  );
};

export default LandingPage;
