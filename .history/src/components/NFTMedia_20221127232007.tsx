import { CardMedia, useMediaQuery } from "@mui/material";
import theme from "../theme";
import DaytimeImage from "../assets/secrectsurfnft.jpeg";
import { MediaType } from "../utils/constants";

const NFTVideo = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CardMedia
      component="video"
      src="sustainability-motion.mp4"
      sx={{ my: 2, width: isMobileOrTablet ? 1 : 500, height: "auto" }}
      autoPlay
      loop
      muted
      controls
      poster={DaytimeImage}
      preload="auto"
    />
  );
};

const NFTPlaceholder = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CardMedia
      component="img"
      image={DaytimeImage}
      alt="cnft-travel-1"
      sx={{
        p: 4,
        my: 4,
        width: isMobileOrTablet ? 1 : 500,
        height: "auto",
        backgroundColor: "#F5F5F5",
        borderRadius: 3,
        boxShadow: "10px 10px 20px 20px #dddddd",
      }}
    />
  );
};

interface NFTImageProps {
  image?: string;
}

const NFTImage = ({ image }: NFTImageProps) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CardMedia
      component="img"
      image={image ?? DaytimeImage}
      alt="cnft-travel-1"
      sx={{
        p: 4,
        my: 4,
        width: isMobileOrTablet ? 1 : 500,
        height: "auto",
        backgroundColor: "#F5F5F5",
        borderRadius: 3,
        boxShadow: "10px 10px 20px 20px #dddddd",
      }}
    />
  );
};

export interface NFTMediaProps {
  type: MediaType;
  image?: string;
}

const NFTMedia = ({ type, image }: NFTMediaProps) => {
  if (type === MediaType.video) {
    return <NFTVideo />;
  } else if (type === MediaType.placeholder) {
    return <NFTPlaceholder />;
  } else {
    return <NFTImage image={image} />;
  }
};

export default NFTMedia;
