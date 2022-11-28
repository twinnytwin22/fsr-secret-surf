import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

interface PageProps {
  title?: string;
  children?: any;
}

const Page = ({ title, children }: PageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box component="div" title={title}>
      {children}
      <Outlet />
    </Box>
  );
};

export default Page;
