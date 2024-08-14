import { Box, Typography } from "@mui/material";
import React from "react";
import ViewTerminalGridComponent from "../../components/ViewTerminalGridComponent";

const ViewNCR = ({ rows }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        NCR Terminals
      </Typography>
      <ViewTerminalGridComponent rows={rows} />
    </Box>
  );
};

export default ViewNCR;
