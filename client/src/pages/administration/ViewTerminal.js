import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import ViewTerminalGridComponent from "../../components/ViewTerminalGridComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export default function ViewTerminal() {
  const navigate = useNavigate();
  const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("user");
  const [value, setValue] = useState(0); // State for the active tab
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchRows = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      toast.error("User is not authenticated");
      navigate("/home");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/terminal/getTerminal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setDataRows(response.data.terminals);
      setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching terminals:", error);
      setError(error.message);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows =
    dataRows?.map((row, index) => ({
      id: index + 1,
      ...row,
    })) ?? [];

  const crmRows = rows.filter((row) => row.type === "CRM");
  const ncrRows = rows.filter((row) => row.type === "NCR");

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Tabs value={value} onChange={handleChange} aria-label="Terminal Tabs">
        <Tab label="All Terminals" />
        <Tab label="CRM Terminals" />
        <Tab label="NCR Terminals" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {/* <Typography variant="h4" gutterBottom>
          All Terminals
        </Typography> */}
        <ViewTerminalGridComponent rows={rows} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* <Typography variant="h4" gutterBottom>
          CRM Terminals
        </Typography> */}
        <ViewTerminalGridComponent rows={crmRows} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* <Typography variant="h4" gutterBottom>
          NCR Terminals
        </Typography> */}
        <ViewTerminalGridComponent rows={ncrRows} />
      </TabPanel>
    </Box>
  );
}
