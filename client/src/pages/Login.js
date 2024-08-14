import React, { useState } from "react";
import left_image2 from "../assets/login.avif";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
  Grid,
  Avatar,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import coop from "../assets/coop.gif";

const Login = () => {
  const INITIAL_FORM_STATE = {
    username: "",
    password: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { setRole } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (user_data) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(apiUrl);

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/loginUser`, {
        username: user_data.username,
        password: user_data.password,
      });

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      setRole(data.data.role);
      console.log("role in login", data.data.role);

      if (data.data.status === "New") {
        // window.history.back();
        navigate("/changepassword");
      } else {
        // window.history.back();
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        `Login Error: ${error.response?.data?.message || error.message}`
      );
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isMatch ? (
            <Stack
              sx={{
                width: "80%",
                height: "80%",
                boxShadow: "0.3rem 0.3rem 0.6rem grey",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={left_image2}
                  alt="login picture"
                />
              </Card>
              <Box sx={{ width: "100%", display: "flex", gap: 5 }}>
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        gap: 10,
                      }}
                    >
                      <Stack gap={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Avatar
                              src={coop}
                              sx={{
                                width: 100,
                                borderRadius: 0,
                                objectFit: "cover",
                                marginY: "auto",
                              }}
                            />
                          </Box>
                          <Typography variant="h3">TMS</Typography>
                        </Box>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </Typography>

                        <Field
                          as={TextField}
                          name="username"
                          label="Username"
                          variant="outlined"
                          fullWidth
                          error={touched.username && !!errors.username}
                          helperText={<ErrorMessage name="username" />}
                        />

                        <FormControl
                          variant="outlined"
                          error={touched.password && !!errors.password}
                          fullWidth
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </FormControl>
                      </Stack>
                      <Stack>
                        <Button type="submit" variant="contained">
                          Login
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
          ) : (
            <Stack
              gap={2}
              sx={{
                width: "60%",
                height: "60%",
                boxShadow: "0.3rem 0.3rem 0.6rem grey",
                paddingRight: "1rem",
                display: "flex",
                flexDirection: "row !important",
                justifyContent: "space-evenly",
              }}
            >
              <Card
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column !important",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <CardMedia
                  component="img"
                  image={left_image2}
                  alt="login picture"
                />
              </Card>

              <Box
                sx={{
                  width: "50%",
                  margin: "auto",
                }}
              >
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        gap: 10,
                      }}
                    >
                      <Stack gap={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Avatar
                              src={coop}
                              sx={{
                                width: 100,
                                borderRadius: 0,
                                objectFit: "cover",
                                marginY: "auto",
                              }}
                            />
                          </Box>
                          <Typography variant="h3">TMS</Typography>
                        </Box>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </Typography>

                        <Field
                          as={TextField}
                          name="username"
                          label="Username"
                          variant="outlined"
                          fullWidth
                          error={touched.username && !!errors.username}
                          helperText={<ErrorMessage name="username" />}
                        />

                        <FormControl
                          variant="outlined"
                          error={touched.password && !!errors.password}
                          fullWidth
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </FormControl>
                      </Stack>
                      <Stack>
                        <Button type="submit" variant="contained">
                          Login
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
