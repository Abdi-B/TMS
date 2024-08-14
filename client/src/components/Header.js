import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkMode from "../DarkMode/DarkMode";
import Search from "./SearchComponent";
import { AccountCircle, Notifications } from "@mui/icons-material";
const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Account", link: "/account" },
  { name: "Logout", link: "/logout" },
];

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = (link, onClick) => {
    handleCloseUserMenu(); // Close the menu
    navigate(link); // Navigate to the corresponding route
    onClick(); // Execute the original onClick function
  };
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          flexShrink: 0,
          backgroundColor: theme.palette.background.default,
          border: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <Search /> */}
          <Box></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "Center",
            }}
          >
            {/* <Tooltip
              title="Open notification"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="theme"
              >
                <Badge badgeContent={17} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Open setting">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt="User Photo"
                  // src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
                  src="https://media.gettyimages.com/id/1203239465/photo/woman-from-borana-tribe-holding-her-baby-ethiopia-africa.jpg?s=612x612&w=gi&k=20&c=y2HnpsGtq1BrR_vjKJpYRJR2GDc6YmJK_GEczfZjOPE="
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ name, link }) => (
                <MenuItem
                  key={name}
                  onClick={() => handleMenuItemClick(link, handleCloseUserMenu)}
                >
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <DarkMode />
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
    </Box>
  );
};

export default Header;
