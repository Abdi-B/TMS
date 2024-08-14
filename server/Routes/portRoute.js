import express from "express";
const app = express();
const router = express.Router();

import {
  createPort,
  getPorts,
  getAssignedPorts,
  deletePort,
} from "../Controllers/portController.js";
import isAuthenticated from "../Middleware/authenticate.js";
import { isAuthorized } from "../Middleware/authorization.js";

// CREATE command
router.route("/createPort").post(isAuthenticated, isAuthorized(), createPort);

// get command
router.route("/getPorts").get(isAuthenticated, isAuthorized(), getPorts);

// get port routes
router.route("/getAssignedPorts").get(getAssignedPorts);

router
  .route("/deletePort/:id")
  .delete(isAuthenticated, isAuthorized(), deletePort);

export default router;
