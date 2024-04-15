import "./styles/index.css";
import HomePage from "./pages/home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/muiTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
