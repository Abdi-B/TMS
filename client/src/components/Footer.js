import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box>
      <Typography fontSize={10}>
        {" "}
        &copy; 2024 Cooperative Bank of Oromia. All Rights Reserved | Designed,
        Built and Maintained by{" "}
        <a
          href="https://www.linkedin.com/in/latiiLA/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Lata Amenu
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
