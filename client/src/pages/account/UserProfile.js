import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataRows, setDataRows] = useState({
    firstName: "",
    fatherName: "",
    gfatherName: "",
    gender: "",
    department: "",
    email: "",
    username: "",
    phoneNumber: "",
  });

  async function fetchRows() {
    const apiUrl = process.env.REACT_APP_API_URL;
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
    const response = await axios.get(`${apiUrl}/auth/getUserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.user; // Assuming response.data contains 'users' array
  }

  useEffect(() => {
    async function loadRows() {
      try {
        const data = await fetchRows();
        console.log("data in user profil", data);
        setDataRows(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadRows();
  }, []);

  const Gender = [
    { value: "MALE", label: "MALE" },
    { value: "FEMALE", label: "FEMALE" },
    // Add more options as needed
  ];

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters"),
    fatherName: Yup.string().required("Father Name is required"),
    gfatherName: Yup.string().required("Grand Father Name is required"),
    gender: Yup.string(),
    department: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    phoneNumber: Yup.string().matches(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits"
    ),
  });

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/updateUser",
        {
          firstName: data.firstName,
          fatherName: data.fatherName,
          gfatherName: data.gfatherName,
          email: data.email,
          department: data.department,
          gender: data.gender,
          username: data.username,
          phoneNumber: data.phoneNumber,
        }
      );
      console.log("Profile updated successfully:", response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Profile Info</Typography>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip title="Update Photo" arrow>
            <label htmlFor="profilePhotoInput">
              <Avatar
                alt="Profile Photo"
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : "https://media.gettyimages.com/id/1203239465/photo/woman-from-borana-tribe-holding-her-baby-ethiopia-africa.jpg?s=612x612&w=gi&k=20&c=y2HnpsGtq1BrR_vjKJpYRJR2GDc6YmJK_GEczfZjOPE="
                }
                sx={{ width: 150, height: 150, cursor: "pointer" }}
              />
            </label>
          </Tooltip>
          <Input
            accept="image/*"
            id="profilePhotoInput"
            type="file"
            onChange={handleFileChange}
            sx={{ display: "none" }}
          />
          <Formik
            initialValues={dataRows} // Initialize with fetched data
            validationSchema={FORM_VALIDATION}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Your form fields */}
                <button type="submit" style={{ display: "none" }} />{" "}
                {/* Hidden submit button */}
              </Form>
            )}
          </Formik>
        </Box>
        <Box>
          <Formik
            initialValues={dataRows} // Initialize with fetched data
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {dataRows.firstName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
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
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={touched.firstName && !!errors.firstName}
                        helperText={<ErrorMessage name="firstName" />}
                      />
                      <Field
                        as={TextField}
                        name="fatherName"
                        label="Father Name"
                        variant="outlined"
                        fullWidth
                        error={touched.fatherName && !!errors.fatherName}
                        helperText={<ErrorMessage name="fatherName" />}
                      />

                      <Field
                        as={TextField}
                        name="gfatherName"
                        label="GrandFather Name"
                        variant="outlined"
                        fullWidth
                        error={touched.gfatherName && !!errors.gfatherName}
                        helperText={<ErrorMessage name="gfatherName" />}
                      />
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={touched.gender && !!errors.gender}
                      >
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Field
                          as={Select}
                          name="gender"
                          labelId="gender-label"
                          label="Gender"
                        >
                          {Gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "49%",
                      }}
                    >
                      <Field
                        as={TextField}
                        name="department"
                        label="Department"
                        variant="outlined"
                        fullWidth
                        disabled
                        error={touched.department && !!errors.department}
                        helperText={<ErrorMessage name="department" />}
                      />
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        disabled
                        error={touched.email && !!errors.email}
                        helperText={<ErrorMessage name="email" />}
                      />

                      <Field
                        as={TextField}
                        name="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        disabled
                        error={touched.username && !!errors.username}
                        helperText={<ErrorMessage name="username" />}
                      />
                      <Field
                        as={TextField}
                        name="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        error={touched.phoneNumber && !!errors.phoneNumber}
                        helperText={<ErrorMessage name="phoneNumber" />}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      padding="2"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
