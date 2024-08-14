import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";

function countTerminalTypes(data) {
  let ncrCount = 0;
  let crmCount = 0;

  data.forEach((item) => {
    if (item.type === "NCR") {
      ncrCount++;
    }
    if (item.type === "CRM") {
      crmCount++;
    }
  });

  return { ncrCount, crmCount };
}

const TotalTerminalPieChart = ({ data }) => {
  console.log("piechart", data);

  const counts = countTerminalTypes(data);
  console.log(counts, counts[0]);

  return (
    <Box>
      <Box>
        <Typography>Terminals Count by Type</Typography>
        <Box>
          <PieChart
            colors={["orange", "#00AEEF"]}
            series={[
              {
                data: [
                  { id: 0, value: counts.ncrCount, label: "NCR" },
                  { id: 1, value: counts.crmCount, label: "CRM" },
                ],
              },
            ]}
            width={600}
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TotalTerminalPieChart;
