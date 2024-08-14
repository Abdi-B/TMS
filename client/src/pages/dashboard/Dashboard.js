import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../../components/Header";
import TotalTerminalPieChart from "./TotalTerminalPieChart";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import TerminalCountPerDistrict from "./TerminalCountPerDistrict";
import PortGraph from "./PortGraph";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dataRows, setDataRows] = useState([]);
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
      }
      navigate("/home"); // Redirect to the home page
      return []; // Exit the function and return an empty array
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/terminal/getTerminal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("fetchRows", response.data.terminals);
      return response.data.terminals; // Adjust this line based on your JSON structure
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!hasShownToast.current) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
        hasShownToast.current = true;
      }
      navigate("/home");
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: "inherit",
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      <TotalTerminalPieChart data={dataRows} />
      {/* <PortGraph data={dataRows} /> */}
      {/* <TerminalCountPerDistrict data={dataRows} /> */}
    </Box>
  );
};

export default Dashboard;
