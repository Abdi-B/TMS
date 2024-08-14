import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import ViewPort from "./ViewPort";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Port = () => {
  const navigate = useNavigate();
  const atm_type = [
    { value: "CRM", label: "CRM" },
    { value: "NCR", label: "NCR" },
    { value: "BothType", label: "Both Type" },
  ];
  const sites = [
    { value: "Offsite", label: "OFFSITE" },
    { value: "Onsite", label: "ONSITE" },
    { value: "BothSite", label: "Both Site" },
  ];
  const INITIAL_FORM_STATE = {
    portName: "",
    portNumber: "",
    portAssignment: "",
    portSiteAssignment: "",
    portCapacity: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    portName: Yup.string().required("Port is required"),
    portNumber: Yup.number().required("Port number description is required"),
    portAssignment: Yup.string().required(
      "Port CRM or NCR assignment is required"
    ),
    portSiteAssignment: Yup.string().required(
      "Port onsite or offsite assignment is required"
    ),
    portCapacity: Yup.number().required(
      "maximum capacity of terminals the port should handle should assigned"
    ),
  });

  const handleSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      // if (!hasShownToast.current) {
      toast.error("User is not authenticated");
      //   hasShownToast.current = true;
      // }
      navigate("/home");
      return; // Exit the function if no token is found
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/port/createPort`,
        {
          portName: data.portName,
          portNumber: data.portNumber,
          portAssignment: data.portAssignment,
          portSiteAssignment: data.portSiteAssignment,
          portCapacity: data.portCapacity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("New port is created:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating a port:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error adding port:", error);
        toast.error(error.message);
      }
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // border: "2px solid #dee2e6",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "75%", md: "60%" },
          }}
        >
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Add New Port
                  </Typography>
                  <Typography variant="h6">Port Information</Typography>

                  <Field
                    as={TextField}
                    name="portName"
                    label="Port Name"
                    variant="outlined"
                    fullWidth
                    error={touched.portName && !!errors.portName}
                    helperText={<ErrorMessage name="portName" />}
                  />
                  <Field
                    as={TextField}
                    name="portNumber"
                    label="Port Number"
                    variant="outlined"
                    fullWidth
                    error={touched.portNumber && !!errors.portNumber}
                    helperText={<ErrorMessage name="portNumber" />}
                  />
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={touched.portAssignment && !!errors.portAssignment}
                  >
                    <InputLabel id="type-label">Port ATM Type Usage</InputLabel>
                    <Field
                      as={Select}
                      name="portAssignment"
                      labelId="type-label"
                      label="Port ATM Type Usage"
                    >
                      {atm_type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="portAssignment"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={
                      touched.portSiteAssignment && !!errors.portSiteAssignment
                    }
                  >
                    <InputLabel id="type-label">Port Site Usage</InputLabel>
                    <Field
                      as={Select}
                      name="portSiteAssignment"
                      labelId="type-label"
                      label="Port Site Usage"
                    >
                      {sites.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="portSiteAssignment"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>
                  <Field
                    as={TextField}
                    name="portCapacity"
                    label="Maximum Port Capacity"
                    variant="outlined"
                    fullWidth
                    error={touched.portCapacity && !!errors.portCapacity}
                    helperText={<ErrorMessage name="portCapacity" />}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </Box>
  );
};

export default Port;
