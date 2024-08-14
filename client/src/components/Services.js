// Services.js
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import {
  AccessAlarm,
  Security,
  PersonAdd,
  Terminal,
  Assessment,
  ManageAccounts,
} from "@mui/icons-material";
import { useAuthContext } from "../context/AuthContext";

// Styled components
const Tile = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: theme.shadows[6],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
}));

const Services = () => {
  const { role } = useAuthContext();
  const admin_services = [
    {
      title: "Terminal Creation",
      description:
        "Create and manage terminals with ease. Set up new terminals and configure them according to your needs.",
      icon: <AccessAlarm style={{ fontSize: 60, color: "#0693e3" }} />,
    },
    {
      title: "User Access Control",
      description:
        "Control user access levels and permissions. Ensure that users have the right access to perform their tasks.",
      icon: <Security style={{ fontSize: 60, color: "#0693e3" }} />,
    },
    {
      title: "User Creation",
      description:
        "Easily create new user accounts and configure their details for seamless onboarding.",
      icon: <PersonAdd style={{ fontSize: 60, color: "#0693e3" }} />,
    },
    {
      title: "User Management",
      description:
        "Manage user profiles, update information, and handle user roles and permissions.",
      icon: <ManageAccounts style={{ fontSize: 60, color: "#0693e3" }} />,
    },
    {
      title: "Terminal Management",
      description:
        "Oversee and control the operation and status of terminals within your system.",
      icon: <Terminal style={{ fontSize: 60, color: "#0693e3" }} />,
    },
    {
      title: "Report",
      description:
        "Generate and view detailed reports on various aspects of the system for better insights.",
      icon: <Assessment style={{ fontSize: 60, color: "#0693e3" }} />,
    },
  ];

  const user_services = [
    {
      title: "Terminal Management",
      description:
        "Oversee and control the operation and status of terminals within your system.",
      icon: <Terminal style={{ fontSize: 60, color: "#0693e3" }} />,
    },
    {
      title: "Report",
      description:
        "Generate and view detailed reports on various aspects of the system for better insights.",
      icon: <Assessment style={{ fontSize: 60, color: "#0693e3" }} />,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Typography variant="h4" gutterBottom>
        Things You Can Do
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {(role === "admin" || role === "superadmin") &&
          admin_services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Tile>
                <IconWrapper>{service.icon}</IconWrapper>
                <Title variant="h6">{service.title}</Title>
                <Description>{service.description}</Description>
              </Tile>
            </Grid>
          ))}
        {role === "user" &&
          user_services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Tile>
                <IconWrapper>{service.icon}</IconWrapper>
                <Title variant="h6">{service.title}</Title>
                <Description>{service.description}</Description>
              </Tile>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Services;
