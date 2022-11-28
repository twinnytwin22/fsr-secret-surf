import { Box, Typography } from "@mui/material";

const ErrorView = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="60vh"
      width={1}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "600px" },
        }}
      >
        <Typography variant="h4" component="div" textAlign="center">
          Oops there's an error
        </Typography>
        <Typography variant="body1" component="div" textAlign="center">
          You might have already claimed this NFT. If you believe there is an
          error, please contact support.
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorView;
