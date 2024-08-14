// import { Box, Typography } from "@mui/material";
// import React from "react";
// import { Bar } from "react-chartjs-2";

// // Function to count used ports by terminal type
// function countPorts(data) {
//   const usedPorts = {
//     NCR: new Set(),
//     CRM: new Set(),
//   };

//   data.forEach((item) => {
//     if (item.type === "NCR") {
//       usedPorts.NCR.add(item.port);
//     }
//     if (item.type === "CRM") {
//       usedPorts.CRM.add(item.port);
//     }
//   });

//   return usedPorts;
// }

// const PortGraph = ({ data }) => {
//   // Calculate used ports by type
//   const usedPorts = countPorts(data);

//   const chartData = {
//     labels: ["NCR", "CRM"],
//     datasets: [
//       {
//         label: "Number of Ports",
//         data: [usedPorts.NCR.size, usedPorts.CRM.size],
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.2)", // NCR color
//           "rgba(255, 99, 132, 0.2)", // CRM color
//         ],
//         borderColor: [
//           "rgba(75, 192, 192, 1)", // NCR border color
//           "rgba(255, 99, 132, 1)", // CRM border color
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Terminal Port Usage",
//       },
//     },
//   };

//   return (
//     <Box>
//       <Typography variant="h6" align="center" gutterBottom>
//         Terminal Port Usage
//       </Typography>
//       <Bar data={chartData} options={options} />
//     </Box>
//   );
// };

// export default PortGraph;
