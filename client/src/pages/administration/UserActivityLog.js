import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const UserActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to fetch logs
  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/log/getactivity`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      });
      setLogs(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to fetch logs.");
      setLoading(false);
    }
  };

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userMap = response.data.users.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUsers(userMap);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchUsers();
    const intervalId = setInterval(fetchLogs, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: "600px",
        overflowY: "auto",
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary,
        padding: "16px",
        borderRadius: "8px",
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : logs.length === 0 ? (
        <Typography>No logs available.</Typography>
      ) : (
        logs.map((log, index) => {
          const user = users[log.userId];
          return (
            <Card key={index} sx={{ marginBottom: "8px", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {user
                    ? `${user.username} (${user.firstName})`
                    : "User not found"}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  {log.action} - {log.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  IP Address: {log.ipAddress} - User Agent: {log.userAgent}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(log.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default UserActivityLog;
