import { Box } from "@mui/material";
import React from "react";
import ViewTerminal from "./ViewTerminal";

const ManageTerminal = ({ role }) => {
  return (
    <Box>
      <ViewTerminal role="admin" />
    </Box>
  );
};

export default ManageTerminal;
