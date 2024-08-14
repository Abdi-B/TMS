import express from "express";
const app = express();
const router = express.Router();

import { getActivity } from "../Controllers/userActivityLogController.js";
import isAuthenticated from "../Middleware/authenticate.js";
import { isSuperAuthorized } from "../Middleware/authorization.js";

// get log activity
router
  .route("/getactivity")
  .get(isAuthenticated, isSuperAuthorized(), getActivity);

export default router;
