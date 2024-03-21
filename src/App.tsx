import "./styles/index.css";
import HomePage from "./pages/home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/muiTheme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </>
  );
}

export default App;
