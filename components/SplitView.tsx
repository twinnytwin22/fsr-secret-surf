import { Box, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import theme from "../theme";

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
}

const SplitView = ({ left, right }: SplitViewProps) => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      display="flex"
      flexDirection={isMobileOrTablet ? "column" : "row"}
      alignItems="flex-start"
      justifyContent="center"
      mb={6}
    >
      <Box
        sx={{
          width: isMobileOrTablet ? 1 : "50%",
          mx: isMobileOrTablet ? 0 : 8,
          px: isMobileOrTablet ? 0 : 1,
        }}
      >
        {left}
      </Box>
      <Box
        sx={{
          width: isMobileOrTablet ? 1 : "50%",
          mx: isMobileOrTablet ? 0 : 8,
          px: isMobileOrTablet ? 0 : 1,
        }}
      >
        {right}
      </Box>
    </Box>
  );
};

export default SplitView;
