import { Box, Typography } from "@mui/material";
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
    field: "type",
    headerName: "ATM Type",
    flex: 1,
  },
  {
    field: "onsite",
    headerName: "Onsite Terminals",
    flex: 1,
  },
  {
    field: "offsite",
    headerName: "Offsite Terminals",
    flex: 1,
  },
  {
    field: "total",
    headerName: "Total Terminals",
    flex: 1,
  },
];

const TerminalSiteReport = () => {
  const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const hasShownToast = useRef(false); // Use ref to track if the toast has been shown

  async function fetchRows() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      if (!hasShownToast.current) {
        toast.error("User is not authenticated");
        hasShownToast.current = true; // Mark that the toast has been shown
        navigate("/home");
      }
      return [];
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/terminal/getSiteCounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(response.data.data, "inside site report");
      return response.data.data; // Adjust this line based on your JSON structure
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!hasShownToast.current) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while fetching data.";
        toast.error(`Error: ${errorMessage}`);
        hasShownToast.current = true; // Mark that the toast has been shown
        navigate("/home");
      }
      throw error; // Rethrow error to be caught in useEffect
    }
  }

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

  const rows = dataRows.map((row, index) => ({
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
      <Typography variant="h4">Total Terminal Site Report</Typography>
      <Box
        sx={{
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#0693e3",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#0693e3",
            color: "#fff",
            "& .MuiCheckbox-root": {
              color: "#fff",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#0693e3",
            color: "#fff !important",
          },
          "& .MuiTablePagination-root": {
            backgroundColor: "#0693e3",
            color: "#fff !important",
          },
          "& .MuiTablePagination-actions button": {
            color: "#fff",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "& .MuiPaginationItem-root": {
            color: "#fff !important",
          },
        }}
      >
        <DataGrid
          rows={rows} // Provide rows directly
          columns={columns} // Provide columns directly
          loading={loading}
          slots={{ toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default TerminalSiteReport;
