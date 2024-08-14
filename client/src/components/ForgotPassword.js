import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { role, setRole } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();

  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);
  const handleMouseDownPassword3 = (event) => event.preventDefault();

  // useEffect(() => {
  //   // Handle redirection or other logic if necessary
  //   if (!["tempo_user", "tempo_admin", "tempo_superadmin"].includes(role)) {
  //     window.location.href = "/home";
  //   }
  // }, [role]);

  const handleSubmit = async (update_data) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not authenticated");
      navigate("/login");
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/auth/forgotPassword`,
        {
          password: update_data.password,
          newPassword: update_data.newPassword,
          confirmNewPassword: update_data.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (
        role === "tempo_user" ||
        role === "tempo_admin" ||
        role === "tempo_superadmin"
      ) {
        localStorage.removeItem("token", token);
        setRole(null);
      }

      toast.success("Password changed successfully.");
      window.location.href = "/home";
      // navigate("/home");
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const INITIAL_FORM_STATE = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .notOneOf(
        [Yup.ref("password")],
        "New password must be different from the current password"
      ),

    confirmNewPassword: Yup.string()
      .required("Confirm new password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <Card
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: { xs: "80%", sm: "70%", md: "40%" },
        }}
      >
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Update Password
                </Typography>

                <FormControl
                  variant="outlined"
                  error={touched.password && !!errors.password}
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Current Password
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Current Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  error={touched.newPassword && !!errors.newPassword}
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password2">
                    New Password
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="outlined-adornment-password2"
                    type={showPassword2 ? "text" : "password"}
                    name="newPassword"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  error={
                    touched.confirmNewPassword && !!errors.confirmNewPassword
                  }
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password3">
                    Confirm New Password
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="outlined-adornment-password3"
                    type={showPassword3 ? "text" : "password"}
                    name="confirmNewPassword"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword3}
                          onMouseDown={handleMouseDownPassword3}
                          edge="end"
                        >
                          {showPassword3 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm New Password"
                  />
                  <ErrorMessage
                    name="confirmNewPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>

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

export default ForgotPassword;
