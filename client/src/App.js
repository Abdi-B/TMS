import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewTerminal from "./pages/administration/ViewTerminal";
import Report from "./pages/Reports/GeneralTerminalReport";
import TerminalReport from "./pages/Reports/TerminalReport";
import GeneralTerminalReport from "./pages/Reports/GeneralTerminalReport";
import Account from "./pages/account/Account";
import UserProfile from "./pages/account/UserProfile";
import ViewATMDetail from "./components/ViewATMDetail";
import AddTerminal from "./pages/administration/AddTerminal";
import EditTerminal from "./pages/administration/EditTerminal";
import CreateUser from "./pages/administration/CreateUser";
import Administration from "./pages/administration/Administration";
import ViewUsers from "./pages/administration/ViewUsers";
import ManageTerminal from "./pages/administration/ManageTerminal";
import CreateCommands from "./pages/administration/CreateCommands";
import ViewCommands from "./pages/administration/ViewCommands";
import ForgotPassword from "./components/ForgotPassword";
import Port from "./pages/administration/Port";
import ViewPort from "./pages/administration/ViewPort";
import Logout from "./pages/Logout";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import UserActivityLog from "../src/pages/administration/UserActivityLog";

// Protect routes based on role
const ProtectedRoutes = ({ requiredRole }) => {
  const { role } = useAuthContext();

  if (role === null) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (
    role === "tempo_user" ||
    role === "tempo_admin" ||
    role === "tempo_superadmin"
  ) {
    return <Navigate to="/changepassword" />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    // User doesn't have the required role
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

// Protected Login Route
const ProtectedLogin = () => {
  const { role } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user" || role === "admin" || role === "superadmin") {
      navigate("/home", { replace: true });
    } else if (
      role === "tempo_user" ||
      role === "tempo_admin" ||
      role === "tempo_superadmin"
    ) {
      navigate("/changepassword");
    }
  }, [role, navigate]);

  return <Login />;
};

function App() {
  const { role, loading } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<ProtectedLogin />} />

          {/* <Route
            element={
              <ProtectedRoutes
                requiredRole={[
                  "user",
                  "admin",
                  "superadmin",
                  "tempo_user",
                  "tempo_admin",
                ]}
              />
            }
          > */}
          <Route path="/changepassword" element={<ForgotPassword />} />
          {/* </Route> */}

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoutes requiredRole={["user", "admin", "superadmin"]} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view" element={<ViewTerminal />} />
            <Route path="/report" element={<Report />} />
            <Route path="/terminalreport" element={<TerminalReport />} />
            <Route path="/generalreport" element={<GeneralTerminalReport />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/viewdetail" element={<ViewATMDetail />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={<ProtectedRoutes requiredRole={["admin", "superadmin"]} />}
          >
            <Route path="/add" element={<AddTerminal />} />
            <Route path="/edit" element={<EditTerminal />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/viewuser" element={<ViewUsers />} />
            <Route path="/manageterminal" element={<ManageTerminal />} />
            <Route path="/ports" element={<Port />} />
            <Route path="/viewports" element={<ViewPort />} />
            <Route path="/new_command" element={<CreateCommands />} />
            <Route path="/commands" element={<ViewCommands />} />
          </Route>

          {/* Super Admin Routes */}
          <Route element={<ProtectedRoutes requiredRole={["superadmin"]} />}>
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/activitylog" element={<UserActivityLog />} />
          </Route>

          {/* Catch-All Route */}
          <Route
            path="*"
            element={
              role === "tempo_user" ||
              role === "tempo_admin" ||
              role === "tempo_superadmin" ? (
                <Navigate to="/changepassword" replace />
              ) : (
                <Navigate to={role ? "/home" : "/login"} replace />
              )
            }
          />
        </Routes>
        <Toaster />
      </Layout>
    </Box>
  );
}

export default App;
