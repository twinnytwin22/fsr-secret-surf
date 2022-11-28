import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: "#27919F",
    },
    secondary: {
      main: "#DE6632",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F3F2EE",
    },
    text: {
      primary: "#000000",
      secondary: "#6E7191",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h3: {
      fontWeight: 700,
      fontSize: "4rem",
      "@media (max-width:900px)": {
        fontSize: "3.375rem",
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: "1.5rem",
      textTransform: "uppercase",
      lineHeight: 1.2,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "1.25rem",
      lineHeight: 1.25,
    },
    body1: {
      fontWeight: 300,
      fontSize: "1.5rem",
      lineHeight: 1.25,
    },
    body2: {
      fontSize: "1.25rem",
    },
    overline: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    caption: {
      fontSize: "1rem",
    },
    button: {
      fontSize: "1rem",
      fontWeight: 700,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins",
          margin: "32px 0",
        },
        h3: {
          fontFamily: "Playfair Display",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 60px",
          color: "white",
          borderColor: "#DE6632",
          backgroundColor: "#000000",
          "&:hover": {
            color: "#DE6632",
            backgroundColor: "transparent",
            borderColor: "#DE6632",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#3F3F46",
          margin: "24px 0",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "#fff",
          },
          "&:hover *": {
            transition: "none",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
