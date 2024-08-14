import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import ViewTerminalGridComponent from "../../components/ViewTerminalGridComponent";

const ViewCRM = ({ rows }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        CRM Terminals
      </Typography>
      <ViewTerminalGridComponent rows={rows} />
    </Box>
  );
};

export default ViewCRM;
