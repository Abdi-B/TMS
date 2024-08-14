import { Edit, Preview } from "@mui/icons-material";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ViewTerminalGridComponent = ({ rows }) => {
  const navigate = useNavigate();
  const { role } = useAuthContext();
  const columns = [
    { field: "id", headerName: "No", type: "number", width: 10 },
    { field: "unitId", headerName: "Unit ID", type: "number", flex: 1 },
    { field: "terminalId", headerName: "Terminal ID", flex: 1 },
    { field: "terminalName", headerName: "Terminal Name", flex: 1 },
    { field: "branchName", headerName: "Branch Name", flex: 1 },
    { field: "district", headerName: "District", flex: 1 },
    { field: "cbsAccount", headerName: "CBS Account", flex: 1 },
    { field: "port", headerName: "Port", flex: 1 },
    { field: "ipAddress", headerName: "IP Address", flex: 1 },
    { field: "type", headerName: "ATM TYPE" },
    { field: "site", headerName: "Terminal Site" },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Tooltip title="Edit Terminal">
            <IconButton
              color="primary"
              size="small"
              disabled={role === "user"}
              style={{ display: role === "user" ? "none" : "inline-flex" }}
              onClick={() => navigate("/edit", { state: { row: params.row } })}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Terminal">
            <IconButton
              color="primary"
              size="small"
              onClick={() =>
                navigate("/viewdetail", { state: { row: params.row } })
              }
            >
              <Preview />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          width: "auto",
          "& .super-app-theme--header": {
            backgroundColor: "#0693e3",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#0693e3",
            color: "#fff",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#0693e3",
            color: "#fff",
          },
          "& .MuiDataGrid-root": {
            overflow: "hidden",
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "hidden !important", // Hides the vertical scrollbar
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar for WebKit browsers
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            display: "none",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default ViewTerminalGridComponent;
