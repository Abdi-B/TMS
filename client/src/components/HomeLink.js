import { Link } from "react-router-dom";
import { Box, Avatar } from "@mui/material"; // Assuming you're using MUI
import { useState } from "react";
import coop from "../assets/coop.gif"; // Adjust the path to your image

const HomeLink = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500); // Reset after 0.5s
  };

  return (
    <Link to="/home" style={{ textDecoration: "none" }}>
      <Box
        onClick={handleClick}
        sx={{ cursor: "pointer", display: "inline-block" }}
      >
        <Avatar
          src={coop}
          sx={{
            width: 100,
            borderRadius: 0,
            objectFit: "cover",
            marginY: "auto",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
            ...(clicked && {
              animation: "rotate 0.5s ease-in-out",
            }),
          }}
        />
      </Box>
      <style>
        {`
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(15deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
        `}
      </style>
    </Link>
  );
};

export default HomeLink;
