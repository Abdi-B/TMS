import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCommands = () => {
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    command: "",
    description: "",
    example: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    command: Yup.string().required("Command is required"),
    description: Yup.string().required("Command description is required"),
    example: Yup.string().required("Command example is required"),
  });

  const handleSubmit = async (data) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.post(`${apiUrl}/command/createCommand`, {
        command: data.command,
        description: data.description,
        example: data.example,
      });
      console.log("New command is created:", response.data);
      alert("Command is created");
    } catch (error) {
      console.error("Error creating a command:", error);
      alert("Error creating a command");
    }
  };

  return (
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
                  Add New Commands
                </Typography>
                <Typography variant="h6">Command Information</Typography>

                <Field
                  as={TextField}
                  name="command"
                  label="Command"
                  variant="outlined"
                  fullWidth
                  error={touched.command && !!errors.command}
                  helperText={<ErrorMessage name="command" />}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={touched.description && !!errors.description}
                  helperText={<ErrorMessage name="description" />}
                />
                <Field
                  as={TextField}
                  name="example"
                  label="Example"
                  variant="outlined"
                  fullWidth
                  error={touched.example && !!errors.example}
                  helperText={<ErrorMessage name="example" />}
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
  );
};

export default CreateCommands;
