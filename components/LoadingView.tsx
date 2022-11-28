import { Box, CircularProgress } from "@mui/material";

const LoadingView = () => {
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
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default LoadingView;
