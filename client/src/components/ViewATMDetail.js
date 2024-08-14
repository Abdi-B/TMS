import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewATMDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { row } = location.state;
  console.log(row);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // margin: "auto",
      }}
    >
      <Typography variant="h4" margin="auto">
        Terminal Details
      </Typography>
      <Card
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: { xs: "100%", sm: "90%", md: "90%" },
          gap: 2,
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "49%",
          }}
        >
          <TextField
            name="type"
            label="ATM Type"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.type}
          />
          <TextField
            name="unitId"
            label="Unit ID"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.unitId}
          />
          <TextField
            name="terminalId"
            label="Terminal ID"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.terminalId}
          />
          <TextField
            name="terminalName"
            label="Terminal Name"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.terminalName}
          />
          <TextField
            name="branchName"
            label="Branch Name"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.branchName}
          />
          <TextField
            name="district"
            label="District"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.district}
          />
          <TextField
            name="site"
            label="Terminal Site"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.site}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "49%",
          }}
        >
          <TextField
            name="cbsAccount"
            label="CBS Account"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.cbsAccount}
          />
          <TextField
            name="port"
            label="Port"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.port}
          />
          <TextField
            name="ipAddress"
            label="IP Address"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.ipAddress}
          />
          <TextField
            name="createdAt"
            label="Creation Date"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.createdAt}
          />
          <TextField
            name="updatedAt"
            label="Updated Date"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.updatedAt}
          />
          <TextField
            name="status"
            label="Status"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            defaultValue={row.status}
          />
        </Box>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/view")}>View Terminals</Button>
      </Box>
    </Box>
  );
};

export default ViewATMDetail;
