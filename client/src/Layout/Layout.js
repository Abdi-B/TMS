import React from "react";
import Sidebar from "../pages/sidebar/Sidebar";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import Footer from "../components/Footer";
import { useAuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const theme = useTheme();
  const { role } = useAuthContext();

  // Define the sidebar width as a percentage
  const sidebarWidth = "15%";

  // Calculate the content width based on sidebar presence
  const contentWidth = role ? `calc(100% - ${sidebarWidth})` : "100%";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {(role === "user" || role === "admin" || role === "superadmin") && (
        <Box
          sx={{
            width: sidebarWidth,
            minHeight: "100vh",
            backgroundColor: theme.palette.background.paper,
            flexShrink: 0, // Prevent shrinking
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Sidebar />
        </Box>
      )}

      <Box
        sx={{
          flex: 1, // Allow content area to grow
          width: contentWidth,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {(role === "user" || role === "admin" || role === "superadmin") && (
          <Header />
        )}

        {/* Container to handle content and footer positioning */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1, // Allow this container to grow and fill space
          }}
        >
          <Box sx={{ padding: "1rem", flexGrow: 1 }}>{children}</Box>

          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              marginTop: "auto", // Push footer to the bottom
            }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
