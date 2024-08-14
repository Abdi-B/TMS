import React from "react";
import { Box, Typography } from "@mui/material";
import Services from "../components/Services";
import { styled } from "@mui/system";

// Styled components
const WelcomeText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

const IntroText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  maxWidth: "800px",
  textAlign: "center",
}));

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <WelcomeText variant="h1">Welcome to COOP TMS.</WelcomeText>
      </Box>
      <Box>
        <IntroText variant="h4">
          Automate workflows effortlessly by centralizing data and enabling
          seamless data sharing. Simplify tasks, enhance clarity, and minimize
          errors with comprehensive tools.
        </IntroText>
      </Box>
      <Box>
        <Services />
      </Box>
    </Box>
  );
};

export default Home;
