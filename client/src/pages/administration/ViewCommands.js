import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";

// Mock function for demonstration
async function fetchRows() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.get(`${apiUrl}/command/getCommand`); // Replace with your actual API endpoint
  return response.data.commands; // Adjust this line based on your JSON structure
}

export default function Commands({ role = "admin" }) {
  const [data_rows, setDataRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [edited, setEdited] = useState({});

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows();
        setDataRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    loadRows();
  }, []);

  const rows = data_rows.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  const allColumns = [
    {
      field: "id",
      headerName: "No",
    },
    {
      field: "command",
      headerName: "Command",
      type: "string",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      flex: 1,
    },
    {
      field: "example",
      headerName: "Example",
      type: "string",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            width: "auto",
          }}
        >
          <IconButton
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEdited({ ...row });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdited({ ...edited, [name]: value });
  };

  const handleSave = (id) => {
    // Add your save logic here
    setEditingRow(null);
  };

  const handleDelete = (id) => {
    // Add your delete logic here
  };

  const columns =
    role === "user"
      ? allColumns.filter((col) => col.field !== "actions")
      : role === "admin"
      ? allColumns
      : allColumns.filter((col) => col.field !== "actions");

  return (
    <Box>
      <Typography variant="h4">Commands</Typography>
      <Box
        sx={{
          height: 400,
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
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
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
}
