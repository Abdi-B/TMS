import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "No",
    flex: 1,
  },
  {
    field: "_id",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "count",
    headerName: "Total Operational Terminals",
    flex: 1,
  },
];

// const rows = [
//   {
//     id: 1,
//     type: "NCR",
//     no_terminals: "12",
//   },
//   {
//     id: 2,
//     type: "CRM",
//     no_terminals: "500",
//   },
// ];

// Mock function for demonstration

const TerminalTypeReports = () => {
  const navigate = useNavigate();
  const [data_rows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasShownToast = useRef(false); // Use ref to track if the toast has been shown

  async function fetchRows() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      if (!hasShownToast.current) {
        toast.error("User is not authenticated");
        hasShownToast.current = true; // Mark that the toast has been shown
        navigate("/home"); // Redirect to the home page
      }
      return [];
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/terminal/getTerminalCounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.terminalsCount; // Adjust this line based on your JSON structure
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!hasShownToast.current) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while fetching data.";
        toast.error(`Error: ${errorMessage}`);
        hasShownToast.current = true; // Mark that the toast has been shown
        navigate("/home"); // Redirect to the home page
      }
      throw error; // Rethrow error to be caught in the calling function
    }
  }

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows();
        setDataRows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadRows();
  }, []);

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows();
        setDataRows(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadRows();
  }, []);

  const rows = data_rows.map((row, index) => ({
    id: index + 1,
    ...row,
  }));
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }
  return (
    <Box>
      <Typography variant="h4">Total Terminals Added</Typography>

      <Box
        sx={{
          //   height: 400,
          width: "auto",
          "& .super-app-theme--header": {
            backgroundColor: "#0693e3",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#0693e3",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#0693e3",
          },
        }}
      >
        <DataGrid
          {...rows}
          loading={loading}
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default TerminalTypeReports;
