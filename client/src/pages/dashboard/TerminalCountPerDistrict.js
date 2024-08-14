import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";

const TerminalCountPerType = () => {
  const [terminalData, setTerminalData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchTerminals() {
      try {
        const response = await axios.get(`${apiUrl}/terminal/getTerminal`);
        setTerminalData(response.data.terminals);
      } catch (error) {
        console.error("Failed to fetch terminals:", error);
      }
    }
    fetchTerminals();
  }, []);

  // Function to count CRM and NCR terminals by the first three digits of terminalId
  function countTerminalsByType(terminals) {
    const terminalCounts = {};

    terminals.forEach((terminal) => {
      if (terminal.terminalId && terminal.type) {
        const type = terminal.terminalId.substring(0, 3); // Extract the first three digits
        const terminalType = terminal.type.toUpperCase(); // Normalize type to uppercase

        if (terminalType === "CRM" || terminalType === "NCR") {
          if (!terminalCounts[type]) {
            terminalCounts[type] = { CRM: 0, NCR: 0 };
          }

          terminalCounts[type][terminalType]++;
        }
      }
    });

    return terminalCounts;
  }

  // Calculate terminal counts once data is fetched
  const terminalCounts = countTerminalsByType(terminalData);
  console.log("terminal counts", terminalCounts);

  // Prepare data for chart
  const labels = Object.keys(terminalCounts);
  const crmData = labels.map((label) => terminalCounts[label].CRM || 0);
  const ncrData = labels.map((label) => terminalCounts[label].NCR || 0);

  return (
    <Box>
      <Typography variant="h6">Terminal Count per Type</Typography>
      <BarChart
        xAxis={{ categories: labels }}
        series={[
          { name: "CRM", data: crmData },
          { name: "NCR", data: ncrData },
        ]}
        height={400}
      />
    </Box>
  );
};

export default TerminalCountPerType;
