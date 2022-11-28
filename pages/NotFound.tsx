import { Box, Typography } from "@mui/material";
import BackToHomepage from "../components/BackToHomepage";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <BackToHomepage />
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="60vh"
      >
        <Typography variant="h3">Oops</Typography>
        <Typography variant="body1">
          We cannot find what you are looking for.
        </Typography>
      </Box>
    </Layout>
  );
};

export default NotFound;
