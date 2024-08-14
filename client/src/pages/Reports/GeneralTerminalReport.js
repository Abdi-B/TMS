import { Box, Typography } from "@mui/material";
import React from "react";
import TerminalTypeReports from "./TerminalTypeReports";
import TerminalSiteReport from "./TerminalSiteReport";

const GeneralTerminalReport = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "inherit",
      }}
    >
      <Typography variant="h4">Reports</Typography>
      <TerminalSiteReport />
    </Box>
  );
};

export default GeneralTerminalReport;
