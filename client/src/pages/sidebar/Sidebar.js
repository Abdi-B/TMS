import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import HomeLink from "../../components/HomeLink";
import {
  Dashboard,
  Atm,
  Assessment,
  AddBox,
  Summarize,
  AdminPanelSettings,
  Add,
  PersonAdd,
  Outlet,
  ManageSearch,
  ManageAccounts,
  SettingsInputComposite,
  LocalActivity,
  Home,
} from "@mui/icons-material";
import { useAuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openAdmin, setOpenAdmin] = useState(true);
  const [openReport, setOpenReport] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { role, loading } = useAuthContext();

  if (!role) {
    return null;
  }

  const handleAdminClick = () => {
    setOpenAdmin(!openAdmin);
  };

  const handleReportClick = () => {
    setOpenReport(!openReport);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        width: "100%", // Ensures the Box takes full width of the Drawer
        // height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: "15%", // This should match the sidebar width in Layout
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "15%", // Ensure the Drawer paper is also set to the correct width
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <HomeLink />
          <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
            TMS
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[
            {
              text: "Home",
              path: "/home",
              icon: <Home sx={{ color: theme.palette.primary.main }} />,
            },
            {
              text: "Dashboard",
              path: "/dashboard",
              icon: <Dashboard sx={{ color: theme.palette.primary.main }} />,
            },
            ...(role === "user"
              ? [
                  {
                    text: "Explore ATM",
                    path: "/view",
                    icon: <Atm sx={{ color: theme.palette.primary.main }} />,
                  },
                ]
              : []),
            {
              text: "Reports",
              path: "/report",
              icon: <Assessment sx={{ color: theme.palette.primary.main }} />,
            },
          ].map((item, index) =>
            item.text === "Reports" ? (
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleReportClick}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {!isCollapsed && (
                      <ListItemText
                        primary={item.text}
                        sx={{ color: theme.palette.text.primary }}
                      />
                    )}
                    {openReport ? (
                      <ExpandLess sx={{ color: theme.palette.text.primary }} />
                    ) : (
                      <ExpandMore sx={{ color: theme.palette.text.primary }} />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openReport} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {[
                      {
                        text: "General Report",
                        path: "/generalreport",
                        icon: (
                          <Summarize
                            sx={{ color: theme.palette.primary.main }}
                          />
                        ),
                      },
                    ].map((subItem) => (
                      <ListItem key={subItem.text} disablePadding>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => navigate(subItem.path)}
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          {!isCollapsed && (
                            <ListItemText
                              primary={subItem.text}
                              sx={{ color: theme.palette.text.primary }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.text}
                      sx={{ color: theme.palette.text.primary }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )
          )}

          {(role === "admin" || role === "superadmin") && (
            <React.Fragment key="Administration">
              <ListItem disablePadding>
                <ListItemButton onClick={handleAdminClick}>
                  <ListItemIcon>
                    <AdminPanelSettings
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary="Administration"
                      sx={{ color: theme.palette.text.primary }}
                    />
                  )}
                  {openAdmin ? (
                    <ExpandLess sx={{ color: theme.palette.text.primary }} />
                  ) : (
                    <ExpandMore sx={{ color: theme.palette.text.primary }} />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {[
                    {
                      text: "Create ATM",
                      path: "/add",
                      icon: <Add sx={{ color: theme.palette.primary.main }} />,
                    },
                    ...(role === "superadmin"
                      ? [
                          {
                            text: "Create User",
                            path: "/createuser",
                            icon: (
                              <PersonAdd
                                sx={{ color: theme.palette.primary.main }}
                              />
                            ),
                          },
                        ]
                      : []),
                    {
                      text: "Create Port",
                      path: "/ports",
                      icon: (
                        <Outlet sx={{ color: theme.palette.primary.main }} />
                      ),
                    },
                    {
                      text: "Manage ATM",
                      path: "/manageterminal",
                      icon: (
                        <ManageSearch
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ),
                    },
                    {
                      text: "Manage User",
                      path: "/viewuser",
                      icon: (
                        <ManageAccounts
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ),
                    },
                    {
                      text: "Manage Port",
                      path: "/viewports",
                      icon: (
                        <SettingsInputComposite
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ),
                    },
                    ...(role === "superadmin"
                      ? [
                          {
                            text: "Activity Log",
                            path: "/activitylog",
                            icon: (
                              <LocalActivity
                                sx={{ color: theme.palette.primary.main }}
                              />
                            ),
                          },
                        ]
                      : []),
                  ].map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => navigate(subItem.path)}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        {!isCollapsed && (
                          <ListItemText
                            primary={subItem.text}
                            sx={{ color: theme.palette.text.primary }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          )}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
