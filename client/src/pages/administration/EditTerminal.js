import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ATMForm from "../../components/ATMForm";

const EditTerminal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;

  const [error, setError] = useState(null);

  if (!row) {
    return <Typography>Error: No data to edit</Typography>;
  }

  const handleSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      toast.error("User is not authenticated");
      navigate("/home");
      return; // Exit the function if no token is found
    }
    try {
      console.log("editing data", data);
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(
        `${apiUrl}/terminal/updateTerminal/${row._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("The ATM is successfully updated:", response.data);
      await toast.success(response.data.message);
      navigate("/viewdetail", { state: { row: data } });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating the ATM:", error);
        toast.error("An error occurred while updating the ATM.");
        setError("An error occurred while updating the ATM."); // Set a generic error message
      }
    }
  };

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <ATMForm initialValues={row} onSubmit={handleSubmit} isEdit />
    </Box>
  );
};

export default EditTerminal;
