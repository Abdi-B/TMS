import { Box, Typography } from "@mui/material";
import React from "react";

import CreateUser from "./CreateUser";
import ViewUsers from "./ViewUsers";

const Administration = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: "inherit",
      }}
    >
      <Box>
        <Typography variant="h4">Manage Users</Typography>
        <CreateUser />
      </Box>
      <Box>
        <Typography variant="h4">ATM</Typography>
        <CreateUser />
      </Box>
      <Box>
        <Typography variant="h4">Users</Typography>
        <ViewUsers />
      </Box>
      <Box>
        <Typography variant="h4">ATM</Typography>
        <ViewUsers />
      </Box>
    </Box>
  );
};

export default Administration;
