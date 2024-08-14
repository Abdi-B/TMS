import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TerminalReport = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasShownToast = useRef(false); // Use ref to track if the toast has been shown

  const columns = [
    { field: "id", headerName: "No", type: "number", width: 80 },
    { field: "unitId", headerName: "Unit ID", type: "number", flex: 1 },
    { field: "terminalId", headerName: "Terminal ID", flex: 1 },
    { field: "terminalName", headerName: "Terminal Name", flex: 1 },
    { field: "branchName", headerName: "Branch Name", flex: 1 },
    { field: "acceptorLocation", headerName: "Acceptor Location", flex: 1 },
    { field: "cbsAccount", headerName: "CBS Account", flex: 1 },
    { field: "port", headerName: "Port", flex: 1 },
    { field: "ipAddress", headerName: "IP Address", flex: 1 },
    { field: "type", headerName: "ATM TYPE", flex: 1 },
    { field: "dateCreated", headerName: "Date Created", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  async function fetchRows(navigate) {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      if (!hasShownToast.current) {
        toast.error("The user is not authenticated.");
        hasShownToast.current = true;
      }

      navigate("/home"); // Redirect to login
      return null;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/terminal/getTerminal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }); // Replace with your actual API endpoint

      console.log("fetchRows", response.data.terminals);
      return response.data.terminals; // Adjust this line based on your JSON structure
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = error.response?.data?.message || error;
      if (!hasShownToast.current) {
        toast.error(`Error: ${errorMessage}`);
        hasShownToast.current = true;
      }

      navigate("/home");
      // throw error; // Rethrow error to be caught in useEffect
    }
  }

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows(navigate);
        if (data) {
          setDataRows(data);
        }
      } catch (error) {
        setError(error.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    }

    loadRows();
  }, [navigate]); // Dependency array includes navigate

  const rows =
    dataRows.map((row, index) => ({
      id: index + 1,
      ...row,
    })) ?? [];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 2, color: theme.palette.text.primary }}
      >
        Terminal Report
      </Typography>
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.background.default,
          borderRadius: 1,
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: theme.palette.primary.dark,
          },
          "& .MuiDataGrid-toolbar": {
            color: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-cell--textLeft": {
            color: theme.palette.text.primary,
          },
          // Adjust footer cell text color based on theme
          "& .MuiDataGrid-footerCell": {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <DataGrid
          rows={rows} // Correctly pass rows
          columns={columns}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default TerminalReport;
