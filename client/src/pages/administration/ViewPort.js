import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ViewPort = () => {
  const navigate = useNavigate();
  const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const hasShownToast = useRef(false);

  async function fetchRows() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      if (!hasShownToast.current) {
        toast.error("User is not authenticated");
        hasShownToast.current = true;
      }
      navigate("/home"); // Redirect to the home page
      return []; // Exit the function and return an empty array
    }
    try {
      const response = await axios.get(`${apiUrl}/port/getports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.ports; // Adjust this line based on your JSON structure
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!hasShownToast.current) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
        hasShownToast.current = true;
      }
      // setError(error.response?.data?.message || "Failed to fetch data.");
      navigate("/home");
      return []; // Return an empty array in case of an error
    }
  }

  const handleClickOpen = (rowId) => {
    setSelectedRowId(rowId);
    console.log("selected port id", rowId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRowId) return;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      toast.error("User is not authenticated");
      navigate("/home");
      return; // Exit the function if no token is found
    }
    try {
      await axios.delete(`${apiUrl}/port/deletePort/${selectedRowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Re-fetch the data to reflect the changes
      const updatedData = await fetchRows();
      setDataRows(updatedData);

      handleClose();
      toast.success("Port successfully deleted.");
    } catch (error) {
      console.error("Error deleting Port:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      hasShownToast.current = true; // Mark that the toast has been shown
    }
  };

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows();
        setDataRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }

    loadRows();
  }, []);

  const rows =
    dataRows?.map((row, index) => ({
      id: index + 1, // Ensure each row has a unique ID
      ...row,
    })) ?? [];

  const columns = [
    {
      field: "id",
      headerName: "No",
      flex: 0.1, // Adjust flex as needed
    },
    {
      field: "portName",
      headerName: "Port Name",
      type: "string",
      flex: 1,
    },
    {
      field: "portNumber",
      headerName: "Port Number",
      type: "string",
      flex: 1,
    },
    {
      field: "portAssignment",
      headerName: "Port ATM Type Usage",
      type: "string",
      flex: 1,
    },
    {
      field: "portSiteAssignment",
      headerName: "Port ATM Site Usage",
      type: "string",
      flex: 1,
    },
    {
      field: "usedPorts",
      headerName: "Used Ports",
      type: "string",
      flex: 1,
    },
    {
      field: "portCapacity",
      headerName: "Port Max Capacity",
      type: "string",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            width: "auto",
          }}
        >
          <Tooltip title="Delete Port">
            <IconButton
              color="secondary"
              size="small"
              onClick={() => handleClickOpen(params.row._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>; // Make sure `error` is a string
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        All Ports
      </Typography>
      <Box
        sx={{
          width: "100%",
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
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          // getRowId={(row) => row.id} // Ensure unique row ID
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this port?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewPort;
