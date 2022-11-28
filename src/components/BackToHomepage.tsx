import { Link, useMediaQuery } from "@mui/material";
import theme from "../theme";
import { ReactComponent as BackArrow } from "../assets/back-arrow.svg";

interface BackToHomepageProps {
  url?: string;
}

const BackToHomepage = ({ url }: BackToHomepageProps) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Link
      underline="hover"
      href={url ?? "/"}
      rel="noopener noreferrer"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width={isMobileOrTablet ? "220px" : "250px"}
      variant="subtitle2"
      my={isMobileOrTablet ? 2 : 6}
      mx={isMobileOrTablet ? 0 : 8}
      color="black"
    >
      <BackArrow width={isMobileOrTablet ? 30 : 50} />
      Back to HomePage
    </Link>
  );
};

export default BackToHomepage;
