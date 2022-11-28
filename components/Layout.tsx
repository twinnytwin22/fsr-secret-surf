import { Container } from "@mui/material";
import { useEffect } from "react";
import Header from "./Header";
interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          height: scrollHeight,
          width: "100vw",
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
