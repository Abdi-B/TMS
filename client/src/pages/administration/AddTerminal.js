import React, { useRef } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import ATMForm from "../../components/ATMForm";
import { useNavigate } from "react-router-dom";

const AddTerminal = () => {
  const navigate = useNavigate();
  const hasShownToast = useRef(false); // Use ref to track if the toast has been shown

  const handleSubmit = async (values, { setSubmitting }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      if (!hasShownToast.current) {
        toast.error("User is not authenticated");
        hasShownToast.current = true;
      }
      navigate("/home");
      return; // Exit the function if no token is found
    }
    try {
      const response = await axios.post(
        `${apiUrl}/terminal/createTerminal`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("New ATM is added:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Error adding an ATM:",
        error,
        error.response?.data?.message
      );
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      hasShownToast.current = true;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ATMForm initialValues={{}} onSubmit={handleSubmit} isEdit={false} />
    </Box>
  );
};

export default AddTerminal;
