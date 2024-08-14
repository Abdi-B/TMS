import express from "express";
const app = express();
const router = express.Router();

import {
  loginUser,
  createUser,
  getUser,
  deleteUser,
  logoutUser,
  getUserProfile,
  getUserRole,
  resetCount,
  forgotPassword,
  resetPassword,
} from "../Controllers/userController.js";
import isAuthenticated from "../Middleware/authenticate.js";
import {
  isAuthorized,
  isSuperAuthorized,
} from "../Middleware/authorization.js";

// CREATE USER
router
  .route("/createUser")
  .post(isAuthenticated, isSuperAuthorized(), createUser);

// get users
router.route("/getUser").get(isAuthenticated, isAuthorized(), getUser);

// get user profile
router.route("/getUserProfile").get(isAuthenticated, getUserProfile);

// get user role
router.route("/getUserRole").get(isAuthenticated, getUserRole);

// LOGIN
router.route("/loginUser").post(loginUser);

// DELETE
router
  .route("/deleteUser/:id")
  .patch(isAuthenticated, isSuperAuthorized(), deleteUser);

// Patch reset password count
// DELETE
router
  .route("/resetCount/:id")
  .patch(isAuthenticated, isAuthorized(), resetCount);

// LOGOUT
router.route("/logoutUser").post(isAuthenticated, logoutUser);

// Forgot Password
router.route("/forgotPassword").post(isAuthenticated, forgotPassword);

router
  .route("/resetPassword/:id")
  .patch(isAuthenticated, isSuperAuthorized(), resetPassword);

export default router;
