import { Box, SvgIcon, useMediaQuery, Link } from "@mui/material";
import theme from "../theme";
import { ReactComponent as fsrBlack } from "../assets/fsrBlack.svg";
import { WalletButton } from "./WalletButton";

const Header = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        height: isMobileOrTablet ? 80 : 100,
        backgroundColor: "#ffffff",
        px: isMobileOrTablet ? 2 : 6,
      }}
      component="div"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="480px"
      >
        <Link
          href="https://consensys.net/nft"
          target="_blank"
          rel="noopener noreferrer"
          display="flex"
          alignItems="center"
        >
          <SvgIcon
            component={fsrBlack}
            inheritViewBox
            sx={{
              width: "auto",
              height: isMobileOrTablet ? "30px" : "40px",
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>
      <WalletButton compact={isMobileOrTablet} />
    </Box>
  );
};

export default Header;
