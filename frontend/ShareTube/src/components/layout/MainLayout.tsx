import Navigation from "./Navigation";
import { User } from "../../types/user";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import theme from "../../theme";

interface MainLayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentUser,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navigation currentUser={currentUser} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            px: { xs: 2, md: 3 },
            backgroundColor: "background.default",
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
