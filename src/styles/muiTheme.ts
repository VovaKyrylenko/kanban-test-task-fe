import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          backgroundColor: "#3E85F3",
          color: "#FFF",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            backgroundColor: "#1E70D1",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            color: "#000",
            backgroundColor: "#E3F3FF",
            border: "1px dashed #3E85F3",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              backgroundColor: "#CAE8FF",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              border: "1px dashed #3E85F3",
            },
            ".MuiTouchRipple-child": {
              backgroundColor: "#3E85F3",
            },
          },
        },
      ],
    },
  },
});
