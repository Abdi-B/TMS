import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
// import "./DarkMode.css";
import { useTheme } from "../context/ThemeProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Example dark mode icon
import LightModeIcon from "@mui/icons-material/LightMode"; // Example light mode icon
import { IconButton } from "@mui/material";

const DarkMode = () => {
  const { darkMode, toggleTheme } = useTheme();
  console.log(darkMode);
  return (
    <IconButton onClick={toggleTheme}>
      {darkMode ? <LightModeIcon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkMode;
