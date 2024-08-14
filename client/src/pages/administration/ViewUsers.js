import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { LockOpen } from "@mui/icons-material";

export default function ViewUsers() {
  const navigate = useNavigate();
  const { role } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataRows, setDataRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleClickOpen = (rowId) => {
    setSelectedRowId(rowId);
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
      return;
    }
    try {
      await axios.patch(
        `${apiUrl}/auth/deleteUser/${selectedRowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const updatedData = await fetchRows();
      setDataRows(updatedData);

      handleClose();
      toast.success("User successfully deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response.data.message);
      handleClose();
    }
  };

  const handleReset = async (rowId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      toast.error("User is not an authenticated user.");
      navigate("/home");
      return;
    }
    try {
      await axios.patch(
        `${apiUrl}/auth/resetCount/${rowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const updatedData = await fetchRows();
      setDataRows(updatedData);
      toast.success("Password count is successfully reset.");
    } catch (error) {
      console.error("Error resetting wrong password count", error);
      toast.error("Error: while resetting wrong password count.");
    }
  };

  const handleResetPassword = async (rowId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      toast.error("User is not an authenticated user.");
      navigate("/home");
      return;
    }
    try {
      await axios.patch(
        `${apiUrl}/auth/resetPassword/${rowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const updatedData = await fetchRows();
      setDataRows(updatedData);
      toast.success("Password reset is successfull.");
    } catch (error) {
      console.error("Error resetting user password:", error);
      toast.error("Error: while resetting user password.");
    }
  };

  const columns = [
    { field: "id", headerName: "No", flex: 0.1 },
    { field: "username", headerName: "Username", flex: 0.5 },
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.fatherName || ""} ${
          row.gfatherName || ""
        }`,
      flex: 1,
    },
    { field: "department", headerName: "Department", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "createdBy", headerName: "createdBy", flex: 1 },
    { field: "createdAt", headerName: "Date Created", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.5 },
    { field: "wrongPasswordCount", headerName: "Login Failure", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%", // Ensure the Box takes the full height of the cell
            width: "100%",
            margin: "auto",
          }}
        >
          <Tooltip title="Reset Password Count">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleReset(params.row._id)}
              margin="auto"
            >
              <LockOpen />
            </IconButton>
          </Tooltip>

          {role === "superadmin" && (
            <>
              <Tooltip title="Reset Password">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => handleResetPassword(params.row._id)}
                >
                  <LockResetIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete User">
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => handleClickOpen(params.row._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ];

  async function fetchRows() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      toast.error("User is not authenticated");
      navigate("/home");
      return [];
    }
    try {
      const response = await axios.get(`${apiUrl}/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.users;
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      navigate("/home");
      return [];
    }
  }

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows();
        setDataRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
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
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box
    // sx={{
    //   display: "flex",
    //   flexDirection: "column",
    //   gap: 2,
    //   width: "100%",
    //   boxSizing: "border-box",
    // }}
    >
      <Box>
        <Typography variant="h4">User Management</Typography>
      </Box>
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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[15, 30, 50]}
          checkboxSelection
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
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
}
